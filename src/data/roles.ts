import type { EventItem } from './events';
import { t, type Lang } from '../i18n/ui';

// "Co-presented with Culture Crew Australia", "With ATAM", "Organised by Wish Events"
export function roleLine(e: EventItem, lang: Lang): string {
  if (!e.partner) return '';
  const r = t(lang).role;
  if (e.co) return lang === 'tr' ? `${e.partner} ile birlikte` : `${r.co} ${e.partner}`;
  if (e.kind === 'supported' || e.kind === 'promotion') return lang === 'tr' ? `Organizasyon: ${e.partner}` : `${r.org} ${e.partner}`;
  return lang === 'tr' ? `${e.partner} ile` : `${r.with} ${e.partner}`;
}
