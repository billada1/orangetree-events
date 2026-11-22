import type { ImageMetadata } from 'astro';
import { photos } from './photos';
import { events, type EventItem } from './events';
import type { Artist } from './artists';

const load = (mods: Record<string, { default: ImageMetadata }>) =>
  Object.fromEntries(Object.entries(mods).map(([p, m]) => [p.split('/').pop()!.replace(/\.(jpe?g|png|webp)$/, ''), m.default]));

export const posters = load(import.meta.glob<{ default: ImageMetadata }>('../assets/posters/*.{jpg,jpeg,png,webp}', { eager: true }));
const artistImgs = load(import.meta.glob<{ default: ImageMetadata }>('../assets/artists/*.{jpg,jpeg,png,webp}', { eager: true }));

export const posterFor = (e: EventItem): ImageMetadata | undefined => (e.poster ? posters[e.poster] : undefined);

// Artist picture: a clean photo of the artist only (never a poster). Without one, pages show a designed monogram.
export function artistImage(a: Artist): { src: ImageMetadata; poster: boolean } | undefined {
  if (a.image && artistImgs[a.image]) return { src: artistImgs[a.image], poster: false };
  return undefined;
}

// Every poster with its event, newest first, for the poster wall.
export const posterWall = () =>
  events
    .filter((e) => e.poster && posters[e.poster])
    .sort((a, b) => (b.date ?? b.year ?? '').localeCompare(a.date ?? a.year ?? ''))
    .map((e) => ({ e, src: posters[e.poster!] }));

// Story images: a site photo key, or "poster:<event-slug>" for an event poster.
export function storyImage(key: string, lang: 'en' | 'tr'): { src: ImageMetadata; alt: string; poster: boolean } {
  if (key.startsWith('poster:')) {
    const e = events.find((x) => x.poster === key.slice(7) || x.slug === key.slice(7));
    const src = e?.poster ? posters[e.poster] : undefined;
    if (!e || !src) throw new Error(`No poster for ${key}`);
    return { src, alt: (lang === 'tr' ? 'Afiş: ' : 'Poster: ') + e.title[lang], poster: true };
  }
  const p = photos[key];
  if (!p) throw new Error(`No photo ${key}`);
  return { src: p.src, alt: p.alt[lang], poster: false };
}
