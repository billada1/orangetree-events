<?php
// Mailing-list sign-up for WPX hosting → Brevo (double opt-in). Mirrors api/subscribe.js (used on the Vercel preview).
// Secrets come from ot-config.php, written by the deploy workflow (see ot_config()):
//   <?php return ['BREVO_API_KEY' => '...', 'BREVO_LIST_EN' => 3, 'BREVO_LIST_TR' => 4, 'BREVO_DOI_TEMPLATE_ID' => 0];
declare(strict_types=1);
// Server config: prefer one level above the web root; WPX's SFTP user can only write inside it,
// so the deploy puts it in /_private/, which _private/.htaccess denies to the web.
function ot_config(): array {
  foreach ([dirname($_SERVER['DOCUMENT_ROOT']) . '/ot-config.php', $_SERVER['DOCUMENT_ROOT'] . '/_private/ot-config.php'] as $f) {
    if (is_file($f)) return (array)(require $f);
  }
  return [];
}
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); http_response_code(405); exit; }

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https://((www|new)\.)?orangetree\.events$#', $origin)) { http_response_code(403); exit; }
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 4096) { http_response_code(413); exit; }

$lang = (($_POST['lang'] ?? '') === 'tr') ? 'tr' : 'en';
$back = $lang === 'tr' ? '/tr/thanks/' : '/thanks/';
$go = function (string $to): void { header('Location: ' . $to, true, 303); exit; };

if (!empty($_POST['website'])) $go($back); // honeypot
$email = strtolower(trim((string)($_POST['email'] ?? '')));
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) $go($back . '?error=email');

$cfg = ot_config();
$key = (string)($cfg['BREVO_API_KEY'] ?? '');
if ($key === '') { error_log('subscribe: missing Brevo config'); $go($back . '?error=server'); }

// Language is carried by the list itself (EN or TR), so no custom Brevo attributes are needed.
$attributes = new stdClass();
$listId = (int)($lang === 'tr' ? ($cfg['BREVO_LIST_TR'] ?? 0) : ($cfg['BREVO_LIST_EN'] ?? 0));
// Brevo template #3 "Mailing list double opt-in (EN+TR)" (tagged optin). Config can override it; 0 there means use #3.
$doi = (int)($cfg['BREVO_DOI_TEMPLATE_ID'] ?? 0) ?: 3;
$host = $_SERVER['HTTP_HOST'] ?? 'orangetree.events';

if ($doi) {
  $url = 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation';
  $body = ['email' => $email, 'attributes' => $attributes, 'includeListIds' => [$listId], 'templateId' => $doi, 'redirectionUrl' => 'https://' . $host . $back . '?confirmed=1'];
} else {
  $url = 'https://api.brevo.com/v3/contacts';
  $body = ['email' => $email, 'attributes' => $attributes, 'listIds' => [$listId], 'updateEnabled' => true];
}
$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 8,
  CURLOPT_HTTPHEADER => ['api-key: ' . $key, 'content-type: application/json', 'accept: application/json'],
  CURLOPT_POSTFIELDS => json_encode($body),
]);
$res = (string)curl_exec($ch);
$status = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);
$code = (string)(json_decode($res, true)['code'] ?? '');
if ($status >= 300 && $code !== 'duplicate_parameter') { error_log('subscribe: brevo ' . $status . ' ' . $code); $go($back . '?error=server'); } // duplicate = already on the list
$go($back);
