// Turkish pages use lang="tr", so CSS uppercase turns i into İ. That is right for Turkish words but wrong for
// English names ("TURKİSH VİBES", "LİBERTY HALL"). After the build, this marks those names lang="en" in the
// Turkish pages' text, so they uppercase the English way and screen readers pronounce them in English.
// Turkish names (Tahir, Nida, Kibariye ...) are deliberately not listed.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const EN = `Adelaide Analytics Association Austolian Australia Australian Brisbane Circular Community Coolibah Darlinghurst
Diamond Diviner English Entertainment Eurovision Favourite Firebrand Flamingo Francis Function Habibs Hill Hills Laila
Liberty Lidcombe Living Marrickville Mercier Metropolitan Mirage Mukaiyama Music Nights Phillip Piano Point Principles
Privacy Promotions Reception Renaissance River Sakhalinio Sapphire Seiji Silverwater Soloist Spotify Station Straight
Supporting Time Turkish Vibes Vincent Website White Wikipedia Wish With friends Live Night Lodge Peppers Kingsgrove
Smithfield Hospitality Mind Village Victoria`.split(/\s+/).filter(Boolean);
const re = new RegExp(`(?<![\\p{L}])(${EN.join('|')})(?![\\p{L}])`, 'gu');
const SKIP = /^(script|style|title|textarea|option|select|svg|code|pre)$/i;
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out); else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

let files = 0, hits = 0;
for (const file of walk(new URL('../dist/tr', import.meta.url).pathname)) {
  const src = readFileSync(file, 'utf8');
  const bodyAt = src.indexOf('<body');
  if (bodyAt < 0) continue;
  let out = src.slice(0, bodyAt), n = 0;
  // Walk tags with a stack; only text inside uppercased elements (headings, eyebrows, badges, tags) is touched,
  // so no flex layouts elsewhere gain extra items.
  const stack = [];
  const inUpper = () => stack.some((x) => x.upper) && !stack.some((x) => x.skip);
  for (const part of src.slice(bodyAt).split(/(<[^>]*>)/)) {
    if (part.startsWith('<')) {
      const m = /^<(\/?)([a-zA-Z0-9-]+)/.exec(part);
      if (m) {
        const tag = m[2].toLowerCase();
        if (m[1]) { const i = stack.map((x) => x.tag).lastIndexOf(tag); if (i >= 0) stack.length = i; }
        else if (!VOID.has(tag) && !part.endsWith('/>')) {
          const cls = /\sclass="([^"]*)"/.exec(part)?.[1] ?? '';
          stack.push({ tag, skip: SKIP.test(tag), upper: /^h[1-3]$/.test(tag) || /(^|\s)(eyebrow|badge|tag|yh|kicker)(\s|$|-)/.test(cls) });
        }
      }
      out += part;
    } else if (!part.trim() || !inUpper()) out += part;
    else out += part.replace(re, (w) => { n++; return `<span lang="en">${w}</span>`; });
  }
  if (n) { writeFileSync(file, out); files++; hits += n; }
}
console.log(`tr-case: marked ${hits} English words in ${files} Turkish pages`);
