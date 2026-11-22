import type { ImageMetadata } from 'astro';
import { photos } from './photos';
import { events, type EventItem } from './events';
import type { Artist } from './artists';

const load = (mods: Record<string, { default: ImageMetadata }>) =>
  Object.fromEntries(Object.entries(mods).map(([p, m]) => [p.split('/').pop()!.replace(/\.(jpe?g|png|webp)$/, ''), m.default]));

export const posters = load(import.meta.glob<{ default: ImageMetadata }>('../assets/posters/*.{jpg,jpeg,png,webp}', { eager: true }));
const artistImgs = load(import.meta.glob<{ default: ImageMetadata }>('../assets/artists/*.{jpg,jpeg,png,webp}', { eager: true }));

export const posterFor = (e: EventItem): ImageMetadata | undefined => (e.poster ? posters[e.poster] : undefined);

// Artist picture: their own photo, else a site photo, else the newest poster they appear on.
export function artistImage(a: Artist): { src: ImageMetadata; poster: boolean } | undefined {
  if (a.image && artistImgs[a.image]) return { src: artistImgs[a.image], poster: false };
  if (a.image && photos[a.image]) return { src: photos[a.image].src, poster: false };
  const withPoster = events
    .filter((e) => e.artists?.includes(a.slug) && e.poster && posters[e.poster])
    .sort((x, y) => (y.date ?? '').localeCompare(x.date ?? ''));
  return withPoster[0] ? { src: posters[withPoster[0].poster!], poster: true } : undefined;
}

// Every poster with its event, newest first, for the poster wall.
export const posterWall = () =>
  events
    .filter((e) => e.poster && posters[e.poster])
    .sort((a, b) => (b.date ?? b.year ?? '').localeCompare(a.date ?? a.year ?? ''))
    .map((e) => ({ e, src: posters[e.poster!] }));
