import type { EventItem } from './events';
import { artistBySlug } from './artists';
import type { Lang } from '../i18n/ui';

// schema.org Event for dated events. Undated archive entries get no Event markup (Google requires a startDate).
export function eventJsonLd(e: EventItem, lang: Lang, site: URL) {
  if (!e.date) return null;
  const url = new URL((lang === 'tr' ? '/tr' : '') + `/events/${e.slug}/`, site).href;
  const start = `${e.date}T${e.doors ?? '19:00'}:00+${isDst(e.date) ? '11' : '10'}:00`;
  const performers = (e.artists ?? []).map(artistBySlug).filter(Boolean).map((a) => ({ '@type': a!.slug === 'manga' ? 'MusicGroup' : 'Person', name: a!.name }));
  return {
    '@context': 'https://schema.org', '@type': 'Event', name: e.title[lang], startDate: start, url,
    eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: e.venue || 'Sydney', address: { '@type': 'PostalAddress', streetAddress: e.address, addressLocality: 'Sydney', addressRegion: 'NSW', addressCountry: 'AU' } },
    ...(performers.length ? { performer: performers } : {}),
    organizer: e.kind === 'supported' ? undefined : { '@type': 'Organization', name: 'Orange Tree Events', url: site.href },
    ...(e.tickets ? { offers: { '@type': 'Offer', url: e.tickets.url ?? url, price: e.tickets.from, priceCurrency: 'AUD', availability: 'https://schema.org/InStock' } } : {}),
    description: e.note?.[lang],
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
