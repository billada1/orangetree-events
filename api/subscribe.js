// Vercel serverless function: mailing-list sign-up → Brevo contact (double opt-in).
// Env: BREVO_API_KEY, BREVO_LIST_EN, BREVO_LIST_TR, BREVO_DOI_TEMPLATE_ID (optional, enables double opt-in).
export const config = { runtime: 'nodejs' };

const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]{1,253}\.[a-z]{2,}$/i;
const SLUG = /^[a-z0-9-]{1,80}$/;

async function readForm(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = []; let size = 0;
  for await (const c of req) { size += c.length; if (size > 4096) throw new Error('too large'); chunks.push(c); }
  return Object.fromEntries(new URLSearchParams(Buffer.concat(chunks).toString('utf8')));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).end(); }
  // Same-origin form posts only.
  const origin = req.headers.origin || '';
  if (origin && !/^https:\/\/(www\.)?orangetree\.events$/.test(origin) && !/^http:\/\/localhost:\d+$/.test(origin)) return res.status(403).end();

  let f;
  try { f = await readForm(req); } catch { return res.status(413).end(); }
  const lang = f.lang === 'tr' ? 'tr' : 'en';
  const back = lang === 'tr' ? '/tr/thanks/' : '/thanks/';
  if (f.website) return res.redirect(303, back); // honeypot: pretend success
  const email = String(f.email || '').trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return res.redirect(303, (lang === 'tr' ? '/tr' : '') + '/thanks/?error=email');

  const attributes = { LANGUAGE: lang.toUpperCase() };
  if (SLUG.test(f.event || '')) attributes.INTEREST_EVENT = f.event;
  if (SLUG.test(f.artist || '')) attributes.INTEREST_ARTIST = f.artist;
  const listId = Number(lang === 'tr' ? process.env.BREVO_LIST_TR : process.env.BREVO_LIST_EN);
  const doi = Number(process.env.BREVO_DOI_TEMPLATE_ID || 0);
  const headers = { 'api-key': process.env.BREVO_API_KEY || '', 'content-type': 'application/json', accept: 'application/json' };
  try {
    const url = doi ? 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation' : 'https://api.brevo.com/v3/contacts';
    const body = doi
      ? { email, attributes, includeListIds: [listId], templateId: doi, redirectionUrl: 'https://orangetree.events' + back + '?confirmed=1' }
      : { email, attributes, listIds: [listId], updateEnabled: true };
    const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal: AbortSignal.timeout(8000) });
    if (!r.ok && r.status !== 400) throw new Error('brevo ' + r.status); // 400 = already subscribed / duplicate
  } catch (e) {
    console.error('subscribe failed', e?.message);
    return res.redirect(303, back + '?error=server');
  }
  return res.redirect(303, back);
}
