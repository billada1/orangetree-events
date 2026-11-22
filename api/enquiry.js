// Vercel preview twin of public/api/enquiry/index.php. The preview has no mail service,
// so it validates the form and shows the thank-you page without sending anything.
export const config = { runtime: 'nodejs' };
export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).end(); }
  const chunks = []; let size = 0;
  for await (const c of req) { size += c.length; if (size > 16384) return res.status(413).end(); chunks.push(c); }
  const f = new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
  const pre = f.get('lang') === 'tr' ? '/tr' : '';
  const ok = f.get('name') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.get('email') || '') && (f.get('message') || '').length >= 10 && f.get('consent') === 'yes';
  return res.redirect(303, `${pre}/thanks/?sent=enquiry${ok ? '&preview=1' : '&error=fields'}`);
}
