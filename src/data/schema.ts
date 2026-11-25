import type { EventItem } from './events';
import { artistBySlug } from './artists';
import { posterFor } from './media';
import { photos } from './photos';
import type { Lang } from '../i18n/ui';

const HOURS = 4; // an evening runs about four hours unless the event says when it ends

// Local Sydney time stamp for a date and HH:MM.
const stamp = (date: string, hm: string) => `${date}T${hm}:00+${isDst(date) ? '11' : '10'}:00`;

// End time: e.ends (HH:MM; earlier than the doors means after midnight), else doors plus four hours.
function endOf(e: EventItem): string {
  const doors = e.doors ?? '19:00';
  const [h, m] = (e.ends ?? '').split(':').map(Number);
  const [dh, dm] = doors.split(':').map(Number);
  const endMin = e.ends ? h * 60 + m : dh * 60 + dm + HOURS * 60;
  const nextDay = endMin >= 24 * 60 || (!!e.ends && endMin <= dh * 60 + dm);
  const day = new Date(`${e.date}T00:00:00Z`);
  if (nextDay) day.setUTCDate(day.getUTCDate() + 1);
  const min = endMin % (24 * 60);
  const iso = day.toISOString().slice(0, 10);
  return stamp(iso, `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`);
}

// The event's own picture: its poster, else its photo, else the site's share image.
function imageOf(e: EventItem, site: URL): string[] {
  const src = posterFor(e)?.src ?? (e.image ? photos[e.image]?.src.src : undefined);
  return [new URL(src ?? '/og-default.jpg', site).href];
}

// Who organised it: Orange Tree Events for our own nights (with a co-presenter), the named partner for
// nights we supported. Nobody is invented when a supported night names no organiser.
function organizerOf(e: EventItem, site: URL) {
  const ote = { '@type': 'Organization', name: 'Orange Tree Events', url: site.href };
  if (e.kind === 'supported') return e.partner ? { '@type': 'Organization', name: e.partner } : undefined;
  return e.co && e.partner ? [ote, { '@type': 'Organization', name: e.partner }] : ote;
}

// Tickets: the price and link when we sell them; the seller's link for nights sold elsewhere.
function offersOf(e: EventItem, url: string) {
  const availability = e.soldOut ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock';
  if (e.tickets) return { '@type': 'Offer', url: e.tickets.url ?? url, price: e.tickets.from, priceCurrency: 'AUD', availability };
  if (e.externalUrl) return { '@type': 'Offer', url: e.externalUrl, availability };
  return undefined;
}

// schema.org Event for dated events. Undated archive entries get no Event markup (Google requires a startDate).
export function eventJsonLd(e: EventItem, lang: Lang, site: URL) {
  if (!e.date) return null;
  const url = new URL((lang === 'tr' ? '/tr' : '') + `/events/${e.slug}/`, site).href;
  const start = stamp(e.date, e.doors ?? '19:00');
  const performers = (e.artists ?? []).map(artistBySlug).filter(Boolean).map((a) => ({ '@type': a!.slug === 'manga' ? 'MusicGroup' : 'Person', name: a!.name }));
  const names = performers.map((p) => p.name);
  const fallback = lang === 'tr'
    ? `${e.title.tr}, ${e.venue || 'Sydney'}.${names.length ? ` Sahnede: ${names.join(', ')}.` : ''}`
    : `${e.title.en} at ${e.venue || 'Sydney'}.${names.length ? ` With ${names.join(', ')}.` : ''}`;
  const organizer = organizerOf(e, site);
  const offers = offersOf(e, url);
  return {
    '@context': 'https://schema.org', '@type': 'Event', name: e.title[lang], startDate: start, endDate: endOf(e), url,
    eventStatus: e.cancelled ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: e.venue || 'Sydney', address: { '@type': 'PostalAddress', ...(e.address ? { streetAddress: e.address } : {}), addressLocality: 'Sydney', addressRegion: 'NSW', addressCountry: 'AU' } },
    image: imageOf(e, site),
    description: e.note?.[lang] ?? fallback,
    ...(performers.length ? { performer: performers } : {}),
    ...(organizer ? { organizer } : {}),
    ...(offers ? { offers } : {}),
  };
}

// Sydney daylight saving: first Sunday in October to first Sunday in April.
function isDst(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const firstSun = (yy: number, mm: number) => { const dt = new Date(Date.UTC(yy, mm - 1, 1)); return 1 + ((7 - dt.getUTCDay()) % 7); };
  if (m > 4 && m < 10) return false;
  if (m < 4 || m > 10) return true;
  if (m === 4) return d < firstSun(y, 4);
  return d >= firstSun(y, 10);
}
