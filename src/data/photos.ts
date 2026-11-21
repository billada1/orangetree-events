import type { ImageMetadata } from 'astro';
import heroStage from '../assets/photos/hero-stage.jpg';
import heroDesk from '../assets/photos/hero-desk.jpg';
import stageWide from '../assets/photos/stage-wide.jpg';
import artistCrowd from '../assets/photos/artist-crowd.jpg';
import band from '../assets/photos/band.jpg';
import thankYou from '../assets/photos/thank-you.jpg';
import queue from '../assets/photos/queue.jpg';
import crowd from '../assets/photos/crowd.jpg';
import bwStage from '../assets/photos/bw-stage.jpg';
import guitar from '../assets/photos/guitar.jpg';
import nye2023screen from '../assets/photos/nye-2023-screen.webp';
import nye2023floor from '../assets/photos/nye-2023-floor.webp';
import nye2025stage from '../assets/photos/nye-2025-stage.webp';
import nye2025floor from '../assets/photos/nye-2025-floor.webp';

type L = { en: string; tr: string };
export interface Photo { src: ImageMetadata; alt: L }

export const photos: Record<string, Photo> = {
  heroStage: { src: heroStage, alt: { en: 'View from the stage over a packed crowd at Max Watt’s', tr: 'Max Watt’s’ta sahneden dolu salona bakış' } },
  heroDesk: { src: heroDesk, alt: { en: 'A full room in blue light seen from the sound desk', tr: 'Ses masasından görülen mavi ışıklı dolu salon' } },
  stageWide: { src: stageWide, alt: { en: 'Band on stage under the Live in Sydney screen', tr: 'Live in Sydney ekranının altında sahnedeki grup' } },
  artistCrowd: { src: artistCrowd, alt: { en: 'İlyas Yalçıntaş gives the crowd a thumbs up', tr: 'İlyas Yalçıntaş kalabalığa başparmağını kaldırıyor' } },
  band: { src: band, alt: { en: 'İlyas Yalçıntaş singing with the band', tr: 'İlyas Yalçıntaş grubuyla şarkı söylüyor' } },
  thankYou: { src: thankYou, alt: { en: '“Thank you Sydney” on the screen above the stage', tr: 'Sahnenin üstündeki ekranda “Thank you Sydney” yazısı' } },
  queue: { src: queue, alt: { en: 'Fans queuing outside the venue before doors', tr: 'Kapılar açılmadan önce sıra bekleyen hayranlar' } },
  crowd: { src: crowd, alt: { en: 'The crowd singing along under blue light', tr: 'Mavi ışık altında şarkılara eşlik eden kalabalık' } },
  bwStage: { src: bwStage, alt: { en: 'Black and white shot of the band on stage', tr: 'Sahnedeki grubun siyah beyaz fotoğrafı' } },
  guitar: { src: guitar, alt: { en: 'Guitarist mid-solo', tr: 'Solo atan gitarist' } },
  nye2023screen: { src: nye2023screen, alt: { en: 'A packed New Year’s Eve dance floor with the Orange Tree logo on screen', tr: 'Ekranda Orange Tree logosuyla dolu yılbaşı dans pisti' } },
  nye2023floor: { src: nye2023floor, alt: { en: 'Guests dancing under the ATAM 10th year screen', tr: 'ATAM 10. yıl ekranının altında dans eden konuklar' } },
  nye2025stage: { src: nye2025stage, alt: { en: 'Guests dancing in front of the New Year 2025 stage', tr: 'Yılbaşı 2025 sahnesinin önünde dans eden konuklar' } },
  nye2025floor: { src: nye2025floor, alt: { en: 'A full dance floor at New Year’s Eve', tr: 'Yılbaşı gecesi dolu dans pisti' } },
};

export const heroSlides: { key: string; cap: L; px: number }[] = [
  { key: 'heroStage', cap: { en: 'İlyas Yalçıntaş · Max Watt’s · Dec 2018', tr: 'İlyas Yalçıntaş · Max Watt’s · Aralık 2018' }, px: -1 },
  { key: 'nye2023screen', cap: { en: 'New Year’s Eve · welcome 2023 · with ATAM', tr: 'Yılbaşı · 2023’e merhaba · ATAM ile' }, px: 1 },
  { key: 'artistCrowd', cap: { en: 'İlyas Yalçıntaş · Live in Sydney · 2018', tr: 'İlyas Yalçıntaş · Sydney Konseri · 2018' }, px: -1 },
  { key: 'nye2025stage', cap: { en: 'New Year’s Eve · welcome 2025 · with ATAM', tr: 'Yılbaşı · 2025’e merhaba · ATAM ile' }, px: 1 },
  { key: 'stageWide', cap: { en: 'Live in Sydney · Max Watt’s · 2018', tr: 'Sydney Konseri · Max Watt’s · 2018' }, px: 0 },
  { key: 'nye2025floor', cap: { en: 'New Year’s Eve · welcome 2025', tr: 'Yılbaşı · 2025’e merhaba' }, px: -1 },
  { key: 'heroDesk', cap: { en: 'Behind the desk · 2018', tr: 'Ses masasından · 2018' }, px: 1 },
];
