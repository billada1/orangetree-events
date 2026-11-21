<?php
// Mailing-list sign-up for WPX hosting → Brevo (double opt-in). Mirrors api/subscribe.js (used on the Vercel preview).
// Secrets live OUTSIDE the web root in ../../../ot-config.php (written by the deploy workflow):
//   <?php return ['BREVO_API_KEY' => '...', 'BREVO_LIST_EN' => 1, 'BREVO_LIST_TR' => 2, 'BREVO_DOI_TEMPLATE_ID' => 0];
declare(strict_types=1);
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

$cfgFile = dirname($_SERVER['DOCUMENT_ROOT']) . '/ot-config.php';
$cfg = is_file($cfgFile) ? (require $cfgFile) : [];
$key = (string)($cfg['BREVO_API_KEY'] ?? '');
if ($key === '') { error_log('subscribe: missing Brevo config'); $go($back . '?error=server'); }

$attributes = ['LANGUAGE' => strtoupper($lang)];
foreach (['event' => 'INTEREST_EVENT', 'artist' => 'INTEREST_ARTIST'] as $field => $attr) {
  $v = (string)($_POST[$field] ?? '');
  if (preg_match('/^[a-z0-9-]{1,80}$/', $v)) $attributes[$attr] = $v;
}
$listId = (int)($lang === 'tr' ? ($cfg['BREVO_LIST_TR'] ?? 0) : ($cfg['BREVO_LIST_EN'] ?? 0));
$doi = (int)($cfg['BREVO_DOI_TEMPLATE_ID'] ?? 0);
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
curl_exec($ch);
$status = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);
if ($status >= 300 && $status !== 400) { error_log('subscribe: brevo ' . $status); $go($back . '?error=server'); } // 400 = already on the list
$go($back);
