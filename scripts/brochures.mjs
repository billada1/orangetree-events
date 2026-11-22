// Prints the brochure pages to PDF with headless Chrome: node scripts/brochures.mjs (after `astro build` and with dist served on :4321).
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const chrome = process.env.CHROME ?? 'google-chrome';
mkdirSync('public/downloads', { recursive: true });
for (const kind of ['artists', 'sponsors']) for (const lang of ['en', 'tr']) {
  const out = `public/downloads/orange-tree-events-${kind}-${lang}.pdf`;
  execFileSync(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=8000', `--print-to-pdf=${out}`, `http://localhost:4321/print/${kind}-${lang}/`], { stdio: 'ignore' });
  console.log('wrote', out);
}
