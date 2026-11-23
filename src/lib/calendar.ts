// Calendar helpers for upcoming events: an .ics file (Apple, Outlook, phones) and a Google Calendar link.
// Times are Sydney local; both outputs use UTC so no timezone tables are needed.
import type { EventItem } from '../data/events';
import type { Lang } from '../i18n/ui';

const SITE = 'https://orangetree.events';

// UTC instant for a Sydney wall-clock time (handles AEST/AEDT).
function sydneyToUtc(date: string, time: string): Date {
  const guess = new Date(`${date}T${time}:00Z`);
  const part = new Intl.DateTimeFormat('en-US', { timeZone: 'Australia/Sydney', timeZoneName: 'longOffset' })
    .formatToParts(guess).find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+10:00';
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(part);
  const mins = m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0)) : 600;
  return new Date(guess.getTime() - mins * 60_000);
}

export function eventTimes(e: EventItem) {
  if (!e.date) return null;
  const doors = e.doors ?? '19:00';
  const start = sydneyToUtc(e.date, doors);
  let end: Date;
  if (e.ends) {
    end = sydneyToUtc(e.date, e.ends);
    if (end <= start) end = new Date(end.getTime() + 864e5); // finishes after midnight
  } else end = new Date(start.getTime() + 4 * 3600e3);
  return { start, end };
}

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (x: string) => x.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
// RFC 5545: lines over 75 octets are folded.
const fold = (line: string) => {
  const out: string[] = []; let cur = ''; let bytes = 0;
  for (const ch of line) {
    const b = new TextEncoder().encode(ch).length;
    if (bytes + b > 74) { out.push(cur); cur = ' '; bytes = 1; }
    cur += ch; bytes += b;
  }
  out.push(cur);
  return out.join('\r\n');
};

export const eventUrl = (e: EventItem, lang: Lang) => `${SITE}${lang === 'tr' ? '/tr' : ''}/events/${e.slug}/`;
const place = (e: EventItem) => [e.venue, e.address].filter(Boolean).join(', ');

export function ics(e: EventItem, lang: Lang): string | null {
  const t = eventTimes(e);
  if (!t) return null;
  const desc = [e.note?.[lang], e.tickets?.url ? `${lang === 'tr' ? 'Rezervasyon' : 'Bookings'}: ${e.tickets.url}` : '', eventUrl(e, lang)].filter(Boolean).join('\n\n');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Orange Tree Events//orangetree.events//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.slug}@orangetree.events`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(t.start)}`, `DTEND:${stamp(t.end)}`,
    `SUMMARY:${esc(e.title[lang])}`,
    `LOCATION:${esc(place(e))}`,
    `DESCRIPTION:${esc(desc)}`,
    `URL:${eventUrl(e, lang)}`,
    'ORGANIZER;CN=Orange Tree Events:mailto:info@orangetree.events',
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.title[lang])}`, 'TRIGGER:-PT3H', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ].map(fold).join('\r\n');
}

export function googleCalUrl(e: EventItem, lang: Lang): string | null {
  const t = eventTimes(e);
  if (!t) return null;
  const u = new URL('https://calendar.google.com/calendar/render');
  u.searchParams.set('action', 'TEMPLATE');
  u.searchParams.set('text', e.title[lang]);
  u.searchParams.set('dates', `${stamp(t.start)}/${stamp(t.end)}`);
  u.searchParams.set('location', place(e));
  u.searchParams.set('details', [e.note?.[lang], eventUrl(e, lang)].filter(Boolean).join('\n\n'));
  u.searchParams.set('ctz', 'Australia/Sydney');
  return u.toString();
}
