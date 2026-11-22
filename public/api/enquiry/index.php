<?php
// Expression-of-interest form (work-with-us) on WPX hosting. Emails the enquiry to the team and keeps a private copy.
// Optional config keys in ot-config.php: 'ENQUIRY_TO' => 'info@orangetree.events', 'ENQUIRY_FROM' => 'website@orangetree.events'
// Optional: Brevo keys (as for /api/subscribe/) add the person to the mailing list when they tick "send me news".
declare(strict_types=1);
// Server config: prefer one level above the web root; WPX's SFTP user can only write inside it,
// so the deploy puts it in /_private/, which _private/.htaccess denies to the web.
function ot_config(): array {
  foreach ([dirname($_SERVER['DOCUMENT_ROOT']) . '/ot-config.php', $_SERVER['DOCUMENT_ROOT'] . '/_private/ot-config.php'] as $f) {
    if (is_file($f)) return (array)(require $f);
  }
  return [];
}
date_default_timezone_set('Australia/Sydney');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); http_response_code(405); exit; }
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https://((www|new)\.)?orangetree\.events$#', $origin)) { http_response_code(403); exit; }
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) { http_response_code(413); exit; }

$lang = (($_POST['lang'] ?? '') === 'tr') ? 'tr' : 'en';
$pre = $lang === 'tr' ? '/tr' : '';
$go = function (string $to): void { header('Location: ' . $to, true, 303); exit; };
$fail = function (string $why) use ($go, $pre): void { $go($pre . '/thanks/?sent=enquiry&error=' . $why); };

// Spam checks: honeypot, too fast (under 3 s), too many links.
if (!empty($_POST['website'])) $go($pre . '/thanks/?sent=enquiry&topic=' . $type);
$t = (int)($_POST['t'] ?? 0);
if ($t > 0 && (microtime(true) * 1000 - $t) < 3000) $go($pre . '/thanks/?sent=enquiry&topic=' . $type);

$clean = function ($v, int $max = 300): string {
  $v = is_array($v) ? implode(', ', array_map('strval', $v)) : (string)$v;
  $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
  return mb_substr(trim($v), 0, $max);
};
$oneLine = fn(string $v) => str_replace(["\r", "\n"], ' ', $v);

$types = ['concert' => 'Bring a concert to Sydney', 'promotion' => 'Promote my event', 'sponsor' => 'Sponsor or partner', 'venue' => 'Venue or supplier',
  'general' => 'General question', 'tickets' => 'Ticket help', 'volunteer' => 'Volunteer or crew', 'media' => 'Media and press'];
$src = (($_POST['src'] ?? '') === 'contact') ? 'contact' : 'work-with-us';
$type = $clean($_POST['type'] ?? '', 20);
if (!isset($types[$type])) $fail('type');
$name = $oneLine($clean($_POST['name'] ?? '', 120));
$email = strtolower($oneLine($clean($_POST['email'] ?? '', 254)));
$message = $clean($_POST['message'] ?? '', 4000);
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($message) < 10 || ($_POST['consent'] ?? '') !== 'yes') $fail('fields');
if ($type === 'concert' && $clean($_POST['artist'] ?? '') === '') $fail('fields');
if ($type === 'promotion' && $clean($_POST['event'] ?? '') === '') $fail('fields');
if ($type === 'tickets' && $clean($_POST['tEvent'] ?? '') === '') $fail('fields');
if ($type === 'volunteer' && ($_POST['adult'] ?? '') !== 'yes') $fail('fields');
if ($type === 'media' && $clean($_POST['outlet'] ?? '') === '') $fail('fields');
if (preg_match_all('#https?://#i', $message) > 4) $go($pre . '/thanks/?sent=enquiry&topic=' . $type);

// Simple per-IP rate limit: 5 enquiries an hour.
$store = $_SERVER['DOCUMENT_ROOT'] . '/_private';
if (!is_dir($store)) @mkdir($store, 0700, true);
$ipKey = $store . '/rl-' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('YmdH'));
$hits = (int)@file_get_contents($ipKey);
if ($hits >= 5) $fail('busy');
@file_put_contents($ipKey, (string)($hits + 1), LOCK_EX);

$fields = [
  'Type' => $types[$type], 'Name' => $name, 'Email' => $email, 'Phone' => $clean($_POST['phone'] ?? '', 40),
  'Organisation' => $clean($_POST['org'] ?? '', 160), 'Role' => $clean($_POST['role'] ?? '', 60), 'Website' => $clean($_POST['site'] ?? '', 300),
];
$more = [
  'concert' => ['Artist' => 'artist', 'Genre' => 'genre', 'Dates' => 'dates', 'Cities' => 'cities', 'Audience' => 'audience', 'Arrangement' => 'deal', 'Links' => 'links'],
  'promotion' => ['Event' => 'event', 'Event date' => 'eventDate', 'Venue' => 'venue', 'Tickets' => 'ticketUrl', 'Help wanted' => 'help'],
  'sponsor' => ['Interested in' => 'interest', 'Budget' => 'budget', 'Goals' => 'goals'],
  'venue' => [],
  'general' => [],
  'tickets' => ['Event' => 'tEvent', 'Order' => 'orderRef', 'Needs' => 'issue'],
  'volunteer' => ['Available' => 'when', 'Roles' => 'jobs', 'Languages' => 'langs', 'Experience' => 'exp', '18 or older' => 'adult'],
  'media' => ['Outlet' => 'outlet', 'Media type' => 'mediaType', 'Requests' => 'ask', 'Deadline' => 'deadline'],
][$type];
// Personal topics don't carry business fields even if the browser sent them.
if (in_array($type, ['general', 'tickets', 'volunteer'], true)) { $fields['Organisation'] = ''; $fields['Role'] = ''; $fields['Website'] = ''; }
foreach ($more as $label => $key) $fields[$label] = $clean($_POST[$key] ?? '', 500);
$fields['Newsletter'] = (($_POST['newsletter'] ?? '') === 'yes') ? 'Yes' : 'No';
$fields['Language'] = strtoupper($lang);

$body = '';
foreach ($fields as $k => $v) if ($v !== '') $body .= str_pad($k . ':', 15) . $v . "\n";
$body .= "\nMessage:\n" . $message . "\n\n-- \nSent from orangetree.events/{$src}/ at " . date('Y-m-d H:i T') . "\n";

$cfg = ot_config();
$to = (string)($cfg['ENQUIRY_TO'] ?? 'info@orangetree.events');
$from = (string)($cfg['ENQUIRY_FROM'] ?? 'website@orangetree.events');
$subject = '=?UTF-8?B?' . base64_encode(($src === 'contact' ? 'Contact: ' : 'Enquiry: ') . $types[$type] . ' · ' . $name . ($fields['Organisation'] ? ' (' . $fields['Organisation'] . ')' : '')) . '?=';
$headers = implode("\r\n", [
  'From: Orange Tree Events website <' . $from . '>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'X-Mailer: orangetree.events',
]);

// Keep a private copy (outside the web root) so nothing is lost if mail fails.
@file_put_contents($store . '/enquiries-' . date('Y-m') . '.jsonl', json_encode(['at' => date('c'), 'fields' => $fields, 'message' => $message], JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
@chmod($store . '/enquiries-' . date('Y-m') . '.jsonl', 0600);

$sent = mail($to, $subject, $body, $headers, '-f' . $from);
if (!$sent) { error_log('enquiry: mail() failed'); }

// Optional: add to the mailing list (double opt-in if configured).
if ($fields['Newsletter'] === 'Yes' && !empty($cfg['BREVO_API_KEY'])) {
  $listId = (int)($lang === 'tr' ? ($cfg['BREVO_LIST_TR'] ?? 0) : ($cfg['BREVO_LIST_EN'] ?? 0));
  $doi = (int)($cfg['BREVO_DOI_TEMPLATE_ID'] ?? 0);
  $host = $_SERVER['HTTP_HOST'] ?? 'orangetree.events';
  [$url, $payload] = $doi
    ? ['https://api.brevo.com/v3/contacts/doubleOptinConfirmation', ['email' => $email, 'includeListIds' => [$listId], 'templateId' => $doi, 'redirectionUrl' => 'https://' . $host . $pre . '/thanks/?confirmed=1']]
    : ['https://api.brevo.com/v3/contacts', ['email' => $email, 'listIds' => [$listId], 'updateEnabled' => true]];
  $ch = curl_init($url);
  curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 6,
    CURLOPT_HTTPHEADER => ['api-key: ' . $cfg['BREVO_API_KEY'], 'content-type: application/json', 'accept: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload)]);
  curl_exec($ch); curl_close($ch);
}
$go($pre . '/thanks/?sent=enquiry&topic=' . $type);
