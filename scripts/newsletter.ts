// Builds the Orange Tree Events newsletter (English, or Turkish with --lang tr) from the site's own data, as table-based HTML with inline
// styles that works in Gmail, Outlook and Apple Mail. Paste the output into Brevo as a campaign or template.
//
//   npx tsx scripts/newsletter.ts --issue 2026-12 --send 2026-11-27 --story meyhane-gecesi-2025
//
// --send     the day it will go out: only events on or after this date are included (default: today, Sydney)
// --feature  slug of the main event (default: our own on-sale night, else the next event)
// --story    story slug for "From the archive" (optional)
// --lang     en (default) or tr: Turkish copy, Turkish page links, writes newsletter-<issue>-tr.html
// Writes public/email/newsletter-<issue>.html and email-sized images to public/email/nl/.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import sharp from 'sharp';
import { events, type EventItem } from '../src/data/events';
import { artistBySlug } from '../src/data/artists';

const arg = (k: string, d = '') => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const sydToday = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney' }).format(new Date());
const issue = arg('issue', sydToday.slice(0, 7));
const send = arg('send', sydToday);
const storySlug = arg('story');
const L: 'en' | 'tr' = arg('lang', 'en') === 'tr' ? 'tr' : 'en';
const TR = L === 'tr';
const path = (u: string) => (TR && u.startsWith('/') && !u.startsWith('/tr/') ? `/tr${u}` : u);
const S = TR ? {
  nyeKicker: 'ATAM ile yılbaşı', coming: 'Sırada', doors: 'Kapılar', to: '–', included: (t: string) => `${t}. Bilete dahil olanlar:`,
  book: (v: string) => `${v} ile yer ayırtın`, details: 'Ayrıntılar', cal: 'Takvime ekle', also: 'Yaklaşan diğer geceler', alsoH: 'Gururla desteklediğimiz geceler',
  alsoP: 'Orange Tree Events dostlarının etkinlikleri. Biletleri her organizatör kendisi satıyor.', more: 'Ayrıntılar', archive: 'Arşivden · 2014’ten beri',
  read: 'Hikâyeyi okuyun', every: 'Tüm geçmiş geceler', work: 'Bizimle çalışın', workH: 'Sponsorlar, sanatçılar, organizatörler ve mekânlar',
  workP: 'Markanızı Sydney’nin Türk ve çok kültürlü topluluğuyla buluşturun ya da Avustralya’ya bir gösteri getirin. İki iş günü içinde yanıt veriyoruz.',
  enquiry: 'Bize yazın', since: 'Sydney · 2014’ten beri', browser: 'Tarayıcıda görüntüle', other: 'English', otherSite: 'English site', otherPath: '/',
  thanks: 'Gecelerimizin parçası olduğunuz için teşekkürler,', team: 'Bülent ve Orange Tree Events ekibi',
  legal: 'Bu e-postayı orangetree.events üzerinden Orange Tree Events e-posta listesine katıldığınız için alıyorsunuz.', unsub: 'Abonelikten çık', privacy: 'Gizlilik',
} : {
  nyeKicker: 'New Year’s Eve with ATAM', coming: 'Coming up', doors: 'Doors', to: ' to ', included: (t: string) => `It’s ${t}. Here’s what’s included:`,
  book: (v: string) => `Book with ${v}`, details: 'See details', cal: 'Add to calendar', also: 'Also coming up', alsoH: 'Nights we’re proud to support',
  alsoP: 'Shows by friends of Orange Tree Events. Tickets are sold by each organiser.', more: 'Details', archive: 'From the archive · since 2014',
  read: 'Read the story', every: 'Every past night', work: 'Work with us', workH: 'Sponsors, artists, promoters and venues',
  workP: 'Put your brand in front of Sydney’s Turkish and multicultural community, or bring a show to Australia. We reply within two business days.',
  enquiry: 'Send an enquiry', since: 'Sydney · since 2014', browser: 'View in browser', other: 'Türkçe', otherSite: 'Türkçe site', otherPath: '/tr/',
  thanks: 'Thanks for being part of our nights,', team: 'Bülent and the Orange Tree Events team',
  legal: 'You’re receiving this because you joined the Orange Tree Events mailing list at orangetree.events.', unsub: 'Unsubscribe', privacy: 'Privacy',
};
const BASE = 'https://orangetree.events';
const utm = (u: string, content: string, raw = false) => {
  const url = new URL(u.startsWith('http') || raw ? u : path(u), BASE);
  url.searchParams.set('utm_source', 'newsletter'); url.searchParams.set('utm_medium', 'email');
  url.searchParams.set('utm_campaign', `newsletter-${issue}`); url.searchParams.set('utm_content', content);
  return url.toString().replace(/&/g, '&amp;');
};

// Brand (matches the site; light card on warm paper so it reads well in light and dark mail apps)
const C = { orange: '#F05A28', orangeDk: '#BF3E1E', ink: '#1A1311', ink2: '#4A3F39', muted: '#7A6A62', paper: '#FFF8F3', card: '#FFFFFF', line: '#F0E6DF', dark: '#1A1311' };
const F = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- images ----------
mkdirSync('public/email/nl', { recursive: true });
async function img(src: string, name: string, w: number, h?: number) {
  const out = `public/email/nl/${name}.jpg`;
  const p = sharp(src).rotate();
  await (h ? p.resize(w * 2, h * 2, { fit: 'cover', position: 'attention' }) : p.resize(w * 2)).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
  return `${BASE}/email/nl/${name}.jpg`;
}
const poster = (slug: string) => [`src/assets/posters/${slug}.jpg`, `src/assets/posters/${slug}.png`, `src/assets/posters/${slug}.webp`].find(existsSync);

// ---------- data ----------
const up = events.filter((e) => e.date && !e.cancelled && e.date >= send).sort((a, b) => a.date!.localeCompare(b.date!));
const feature = up.find((e) => e.slug === arg('feature')) ?? up.find((e) => e.tickets?.url && (e.kind === 'nye' || e.kind === 'presented')) ?? up[0];
const others = up.filter((e) => e !== feature).slice(0, 3);
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(TR ? 'tr-TR' : 'en-AU', { timeZone: 'UTC', ...o }).format(new Date(iso + 'T12:00:00Z'));
const longDate = (e: EventItem) => fmt(e.date!, { weekday: 'long', day: 'numeric', month: 'long' });
const time = (t?: string) => { if (!t) return ''; if (TR) return t.replace(':', '.'); const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`; };
const people = (e: EventItem) => (e.artists ?? []).map((a) => artistBySlug(a)?.name).filter(Boolean).join(', ');

function readStory(slug: string) {
  const f = `src/content/stories/${slug}.${L}.md`;
  if (!slug || !existsSync(f)) return null;
  const fm = Object.fromEntries([...readFileSync(f, 'utf8').split('---')[1].matchAll(/^(\w+):\s*"?(.*?)"?\s*$/gm)].map((m) => [m[1], m[2]]));
  return { slug, title: fm.title, excerpt: fm.excerpt, hero: fm.hero as string };
}

// ---------- blocks ----------
const btn = (label: string, url: string, solid = true, w = 260) => {
  const [bg, fg, bd] = solid ? [C.orange, '#FFFFFF', C.orange] : ['#FFFFFF', C.ink, '#E3D3C8'];
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-table;margin:0 8px 10px 0;"><tr><td style="border-radius:999px;background:${bg};border:1.5px solid ${bd};">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${url}" style="height:48px;v-text-anchor:middle;width:${w}px;" arcsize="50%" stroke="f" fillcolor="${bg}"><center style="color:${fg};font-family:Arial;font-size:15px;font-weight:bold;">${label}</center></v:roundrect><![endif]-->
<!--[if !mso]><!--><a href="${url}" style="display:inline-block;padding:14px 26px;font-family:${F};font-size:15px;font-weight:700;line-height:20px;color:${fg};text-decoration:none;border-radius:999px;">${label}</a><!--<![endif]-->
</td></tr></table>`;
};
const kicker = (t: string, color = C.orangeDk) => `<p style="margin:0 0 10px;font-family:${F};font-size:12px;line-height:16px;letter-spacing:.14em;font-weight:700;color:${color};text-transform:uppercase;">${t}</p>`;
const h2 = (t: string) => `<p class="h2" style="margin:0 0 6px;font-family:${F};font-size:24px;line-height:30px;font-weight:800;color:${C.ink};">${t}</p>`;
const p = (t: string, extra = '') => `<p style="margin:0 0 14px;font-family:${F};font-size:16px;line-height:25px;color:${C.ink2};${extra}">${t}</p>`;
const section = (inner: string, pad = '32px 36px') => `<tr><td class="px" style="background:${C.card};padding:${pad};border-top:1px solid ${C.line};">${inner}</td></tr>`;

async function build() {
  if (!feature) throw new Error(`No events on or after ${send}`);
  const heroSrc = feature.image ? `src/assets/photos/${feature.image.replace(/([a-z])(\d)/g, '$1-$2').replace(/(\d)([a-zA-Z])/g, '$1-$2').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}.webp` : '';
  // The night's own photo (cropped 600 × 320); else its poster, uncropped; the NYE stage photo only for NYE nights.
  const ownPhoto = heroSrc && existsSync(heroSrc) ? heroSrc : '';
  const posterFile = !ownPhoto && feature.poster ? poster(feature.poster) : undefined;
  const heroFile = ownPhoto || posterFile || (feature.kind === 'nye' ? 'src/assets/photos/nye-2025-stage.webp' : '');
  let heroH = 320;
  if (posterFile) { const m = await sharp(posterFile).metadata(); heroH = Math.round(600 * (m.height ?? 320) / (m.width ?? 600)); }
  const heroUrl = heroFile ? await img(heroFile, `${issue}-hero-${feature.slug}`, 600, posterFile ? undefined : 320) : '';
  const fUrl = utm(`/events/${feature.slug}/`, 'feature');
  const tix = feature.tickets?.url && TR ? feature.tickets.url.replace(/^(https:\/\/atam\.asn\.au)\/(?!tr\/)/, '$1/tr/') : feature.tickets?.url;
  const bookUrl = tix ? utm(tix, 'feature-book') : fUrl;
  const calUrl = utm(`/events/${feature.slug}.ics`, 'feature-calendar');
  const incl = feature.included?.[L] ?? [];
  const theme = TR ? /^([^:]+):/.exec(feature.note?.tr ?? '')?.[1] : /^An? ([^:]+):/i.exec(feature.note?.en ?? '')?.[1];
  const proceeds = (TR ? /Gelir[^.]*\./ : /Proceeds[^.]*\./).exec(feature.note?.[L] ?? '')?.[0];

  const featureBlock = `${heroUrl ? `<tr><td style="background:${C.card};padding:0;"><a href="${fUrl}"><img src="${heroUrl}" width="600" height="${heroH}" alt="${esc(feature.title[L])}" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a></td></tr>` : ''}
<tr><td class="px" style="background:${C.card};padding:30px 36px 24px;">
  ${kicker(feature.kind === 'nye' ? S.nyeKicker : S.coming)}
  <p class="h1" style="margin:0 0 10px;font-family:${F};font-size:30px;line-height:36px;font-weight:800;color:${C.ink};">${esc(feature.title[L])}</p>
  <p style="margin:0 0 18px;font-family:${F};font-size:16px;line-height:24px;font-weight:700;color:${C.ink};">${longDate(feature)}${feature.doors ? ` · ${S.doors} ${time(feature.doors)}${feature.ends ? `${S.to}${time(feature.ends)}` : ''}` : ''}<br><span style="font-weight:400;color:${C.muted};">${esc(feature.venue.replace(/,\s*Lidcombe$/, ''))}${feature.address ? ` · ${esc(feature.address)}` : ''}</span></p>
  ${theme ? p(esc(S.included(TR ? theme : theme.replace(/^./, (c) => c.toLowerCase()).replace(/^all/, 'an All')))) : ''}
  ${incl.length > 2 ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 18px;">${incl.map((x) => `<tr><td valign="top" style="padding:0 10px 8px 0;font-family:${F};font-size:16px;line-height:24px;color:${C.orange};">&#9679;</td><td style="padding:0 0 8px;font-family:${F};font-size:16px;line-height:24px;color:${C.ink2};">${esc(x.charAt(0).toUpperCase() + x.slice(1))}</td></tr>`).join('')}</table>` : p(esc(feature.note?.[L] ?? ''))}
  ${proceeds ? p(esc(proceeds), `padding:12px 16px;background:${C.paper};border-radius:12px;font-size:15px;line-height:22px;`) : ''}
  ${feature.tickets ? `<p style="margin:0 0 18px;font-family:${F};font-size:17px;line-height:24px;font-weight:700;color:${C.ink};">${esc(feature.tickets.label[L])}</p>` : ''}
  <div>${btn(feature.tickets?.url ? S.book(feature.tickets.via ?? 'Orange Tree') : S.details, bookUrl)}${btn(S.cal, calUrl, false, 200)}</div>
</td></tr>`;

  let alsoBlock = '';
  if (others.length) {
    const rows = await Promise.all(others.map(async (e) => {
      const pf = e.poster && poster(e.poster);
      const thumb = pf ? await img(pf, `${e.slug}`, 96, 120) : `${BASE}/email/logo.png`;
      const url = utm(`/events/${e.slug}/`, `also-${e.slug}`);
      const meta = [esc(e.venue.split(',').slice(0, 2).join(',')), people(e) && !e.title[L].includes(people(e)) ? esc(people(e)) : ''].filter(Boolean).join(' · ');
      return `<tr><td style="padding:0 0 18px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
        <td width="96" valign="top" style="padding-right:16px;"><a href="${url}"><img src="${thumb}" width="96" height="120" alt="" style="display:block;width:96px;height:120px;border:0;border-radius:10px;object-fit:cover;"></a></td>
        <td valign="top" style="font-family:${F};">
          <p style="margin:0 0 4px;font-size:13px;line-height:18px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.orangeDk};">${fmt(e.date!, { weekday: 'short', day: 'numeric', month: 'short' })}</p>
          <p style="margin:0 0 4px;font-size:18px;line-height:24px;font-weight:700;"><a href="${url}" style="color:${C.ink};text-decoration:none;">${esc(e.title[L])}</a></p>
          <p style="margin:0 0 6px;font-size:14px;line-height:20px;color:${C.muted};">${meta}</p>
          ${e.note?.[L] ? `<p style="margin:0 0 6px;font-size:15px;line-height:22px;color:${C.ink2};">${esc(e.note[L])}</p>` : ''}
          <p style="margin:0;font-size:15px;line-height:22px;font-weight:700;"><a href="${url}" style="color:${C.orange};text-decoration:none;">${S.more} &rarr;</a></p>
        </td></tr></table></td></tr>`;
    }));
    alsoBlock = section(`${kicker(S.also)}${h2(S.alsoH)}${p(S.alsoP, 'margin-bottom:22px;')}<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${rows.join('')}</table>`);
  }

  let storyBlock = '';
  const st = readStory(storySlug);
  if (st) {
    const src = st.hero.startsWith('poster:') ? poster(st.hero.slice(7)) : `src/assets/photos/${st.hero}.webp`;
    const pic = src && existsSync(src) ? await img(src, `${issue}-story`, 528, 300) : '';
    const url = utm(`/stories/${st.slug}/`, 'story');
    storyBlock = section(`${kicker(S.archive)}
      ${pic ? `<a href="${url}"><img src="${pic}" width="528" height="300" alt="" style="display:block;width:100%;max-width:528px;height:auto;border:0;border-radius:14px;margin:0 0 18px;"></a>` : ''}
      ${h2(`<a href="${url}" style="color:${C.ink};text-decoration:none;">${esc(st.title)}</a>`)}
      ${p(esc(st.excerpt))}
      <p style="margin:0;font-family:${F};font-size:15px;font-weight:700;"><a href="${url}" style="color:${C.orange};text-decoration:none;">${S.read} &rarr;</a> &nbsp;<span style="color:${C.line};">|</span>&nbsp; <a href="${utm('/events/#past-events', 'archive')}" style="color:${C.orange};text-decoration:none;">${S.every} &rarr;</a></p>`);
  }

  const workBlock = `<tr><td class="px" style="background:${C.dark};padding:30px 36px;">
    ${kicker(S.work, '#FFB199')}
    <p class="h2" style="margin:0 0 8px;font-family:${F};font-size:22px;line-height:28px;font-weight:800;color:#FFFFFF;">${S.workH}</p>
    <p style="margin:0 0 18px;font-family:${F};font-size:15px;line-height:23px;color:#E9DCD3;">${S.workP}</p>
    ${btn(S.enquiry, utm('/work-with-us/', 'work-with-us'), true, 220)}
  </td></tr>`;

  const subject = TR
    ? (feature.kind === 'nye' ? `ATAM ile ${feature.title.tr.split(' · ')[0]} ve diğer geceler` : `${feature.title.tr} ve yaklaşan geceler`)
    : (feature.kind === 'nye' ? `${feature.title.en.split(' · ')[0]} with ATAM, and more nights out` : `${feature.title.en}, and what’s on`);
  const preheader = TR
    ? (feature.kind === 'nye' ? `Akşam yemeği, ${people(feature)} ve Lidcombe’da geri sayım, ${longDate(feature)}.` : `${longDate(feature)}, ${feature.venue}.`)
    : (feature.kind === 'nye' ? `Dinner, ${people(feature)} and the midnight countdown in Lidcombe, ${longDate(feature)}.` : `${longDate(feature)}, ${feature.venue}.`);
  const html = `<!DOCTYPE html>
<html lang="${L}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body { margin:0; padding:0; width:100% !important; background:${C.paper}; -webkit-text-size-adjust:100%; }
  a { color:${C.orange}; }
  img { -ms-interpolation-mode:bicubic; }
  @media (max-width:620px) {
    .px { padding-left:22px !important; padding-right:22px !important; }
    .h1 { font-size:26px !important; line-height:32px !important; }
    .h2 { font-size:21px !important; line-height:27px !important; }
  }
</style></head>
<body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(preheader)}${'&#8199;&#65279;&#847;'.repeat(30)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${C.paper};"><tr><td align="center" style="padding:16px 12px 40px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">
  <tr><td style="padding:0 6px 12px;font-family:${F};font-size:12px;line-height:18px;color:${C.muted};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
      <td>${esc(preheader.split('.')[0])}.</td>
      <td align="right" style="white-space:nowrap;"><a href="{{ mirror }}" style="color:${C.muted};">${S.browser}</a> &nbsp;·&nbsp; <a href="${utm(S.otherPath, 'other-lang', true)}" lang="${TR ? 'en' : 'tr'}" style="color:${C.muted};">${S.other}</a></td>
    </tr></table>
  </td></tr>
  <tr><td class="px" style="background:${C.dark};border-radius:20px 20px 0 0;padding:22px 36px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
      <td><a href="${utm('/', 'logo')}"><img src="${BASE}/email/logo.png" width="140" height="41" alt="Orange Tree Events" style="display:block;border:0;width:140px;height:41px;"></a></td>
      <td align="right" style="font-family:${F};font-size:12px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:#FFB199;">${S.since}</td>
    </tr></table>
  </td></tr>
  ${featureBlock}
  ${alsoBlock}
  ${storyBlock}
  ${workBlock}
  <tr><td class="px" style="background:${C.card};border-radius:0 0 20px 20px;padding:26px 36px 30px;font-family:${F};">
    <p style="margin:0 0 12px;font-size:15px;line-height:22px;color:${C.ink2};">${S.thanks}<br><strong style="color:${C.ink};">${S.team}</strong></p>
    <p style="margin:0 0 14px;font-size:14px;line-height:20px;"><a href="${utm('/', 'footer')}" style="color:${C.orange};text-decoration:none;font-weight:700;">orangetree.events</a> &nbsp;·&nbsp; <a href="https://www.instagram.com/orangetree.events/" style="color:${C.orange};text-decoration:none;font-weight:700;">Instagram</a> &nbsp;·&nbsp; <a href="${utm(S.otherPath, 'footer-other', true)}" lang="${TR ? 'en' : 'tr'}" style="color:${C.orange};text-decoration:none;font-weight:700;">${S.otherSite}</a></p>
    <p style="margin:0;padding-top:14px;border-top:1px solid ${C.line};font-size:12px;line-height:18px;color:${C.muted};">${S.legal} Orange Tree Group Pty Ltd · ABN 94 617 622 321 · Suite 1, Level 3, 20 Wentworth Street, Parramatta NSW 2150 · info@orangetree.events<br><a href="{{ unsubscribe }}" style="color:${C.muted};">${S.unsub}</a> · <a href="${BASE}${path('/privacy/')}" style="color:${C.muted};">${S.privacy}</a></p>
  </td></tr>
</table></td></tr></table>
</body></html>
`;
  const out = `public/email/newsletter-${issue}${TR ? '-tr' : ''}.html`;
  writeFileSync(out, html);
  writeFileSync(`emails/newsletter-${issue}${TR ? '-tr' : ''}.json`, JSON.stringify({ subject, preheader, send, feature: feature.slug, also: others.map((e) => e.slug), story: st?.slug ?? null }, null, 2) + '\n');
  console.log(`${out}: ${(html.length / 1024).toFixed(1)} KB · feature ${feature.slug} · also ${others.map((e) => e.slug).join(', ') || 'none'} · story ${st?.slug ?? 'none'}\nsubject: ${subject}\npreheader: ${preheader}`);
}
build();
