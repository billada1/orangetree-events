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
import nye2025tahir from '../assets/photos/nye-2025-tahir.webp';
import nye2025dance from '../assets/photos/nye-2025-dance.webp';
import tvHosts from '../assets/photos/turkish-vibes-hosts.webp';
import tvPlanning from '../assets/photos/turkish-vibes-planning.webp';
import r100Crowd from '../assets/photos/r100-crowd.webp';
import r100Dancers from '../assets/photos/r100-dancers.webp';
import r100Circle from '../assets/photos/r100-circle.webp';
import r100Cheering from '../assets/photos/r100-cheering.webp';
import r100Sikma from '../assets/photos/r100-sikma.webp';
import r100FlagStage from '../assets/photos/r100-flag-stage.webp';
import r100Banner from '../assets/photos/r100-banner.webp';
import oldLiveBand from '../assets/photos/old-live-band.jpg';
import oldBwStage from '../assets/photos/old-bw-stage.jpg';
import oldGuitar from '../assets/photos/old-guitar.jpg';
import oldCrowdHands from '../assets/photos/old-crowd-hands.jpg';
import halukSydney from '../assets/photos/haluk-levent-sydney.jpg';
import yilmazOvation from '../assets/photos/yilmaz-ovation.jpg';
import korayCrowd from '../assets/photos/koray-avci-crowd.jpg';
import crowdPhones from '../assets/photos/crowd-phones.jpg';

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
  oldLiveBand: { src: oldLiveBand, alt: { en: 'A band playing live under red and blue stage lights', tr: 'Kırmızı ve mavi sahne ışıkları altında canlı çalan grup' } },
  oldBwStage: { src: oldBwStage, alt: { en: 'Black and white view of a rock show from behind the stage', tr: 'Sahnenin arkasından siyah beyaz bir rock konseri' } },
  oldGuitar: { src: oldGuitar, alt: { en: 'A guitarist in the spotlight', tr: 'Spot ışığı altında bir gitarist' } },
  oldCrowdHands: { src: oldCrowdHands, alt: { en: 'Hands in the air at a concert', tr: 'Konserde havaya kalkan eller' } },
  halukSydney: { src: halukSydney, alt: { en: 'Haluk Levent on stage', tr: 'Haluk Levent sahnede' } },
  yilmazOvation: { src: yilmazOvation, alt: { en: 'A standing ovation for Yılmaz Erdoğan on the Münaşaka tour', tr: 'Münaşaka turnesinde Yılmaz Erdoğan’a ayakta alkış' } },
  korayCrowd: { src: korayCrowd, alt: { en: 'Koray Avcı and a full house in black and white', tr: 'Koray Avcı ve dolu salon, siyah beyaz' } },
  crowdPhones: { src: crowdPhones, alt: { en: 'The audience filming the show on their phones', tr: 'Konseri telefonlarıyla çeken seyirciler' } },
  nye2025floor: { src: nye2025floor, alt: { en: 'A full dance floor at New Year’s Eve', tr: 'Yılbaşı gecesi dolu dans pisti' } },
  nye2025tahir: { src: nye2025tahir, alt: { en: 'Tahir Bilgiç with the microphone, the band laughing behind him, under the Happy New Year 2025 banner', tr: 'Mikrofon elinde Tahir Bilgiç, arkasında gülen müzisyenler; Mutlu Yıllar 2025 pankartının önünde' } },
  r100Crowd: { src: r100Crowd, alt: { en: 'A woman in a red Turkish-flag T-shirt waves a large Turkish flag among a cheering crowd at Republic 100', tr: 'Cumhuriyet 100’de tezahürat yapan kalabalığın içinde büyük bir Türk bayrağı sallayan, kırmızı bayraklı tişörtlü bir kadın' } },
  r100Dancers: { src: r100Dancers, alt: { en: 'Dancers in traditional costume lead a line dance through the crowd as a Turkish flag is held aloft', tr: 'Havaya kaldırılmış bir Türk bayrağı eşliğinde kalabalığın arasından halay başı çeken geleneksel kıyafetli dansçılar' } },
  r100Circle: { src: r100Circle, alt: { en: 'A large circle of people, some in traditional Anatolian costume, link arms for a folk dance', tr: 'Bazıları geleneksel Anadolu kıyafetli kalabalık bir grup, kol kola girip halay çekiyor' } },
  r100Cheering: { src: r100Cheering, alt: { en: 'A seated audience raises their arms and cheers at Republic 100', tr: 'Cumhuriyet 100’de kollarını kaldırıp tezahürat yapan seyirciler' } },
  r100Sikma: { src: r100Sikma, alt: { en: 'Volunteers at the ATAM and Orange Tree sıkma stall under a Republic 100 banner', tr: 'Cumhuriyet 100 pankartının altında ATAM ve Orange Tree sıkma tezgâhındaki gönüllüler' } },
  r100FlagStage: { src: r100FlagStage, alt: { en: 'A volunteer waves a Turkish flag on the Republic 100 stage at night, an Atatürk portrait in balloons behind', tr: 'Gece, Cumhuriyet 100 sahnesinde Türk bayrağı sallayan bir gönüllü; arkada balonlarla çevrili Atatürk portresi' } },
  r100Banner: { src: r100Banner, alt: { en: 'Republic 100 banner: Cumhuriyet Bayramı Kutlu Olsun, Sydney, 29.10.2023', tr: 'Cumhuriyet 100 afişi: Cumhuriyet Bayramı Kutlu Olsun, Sydney, 29.10.2023' } },
  tvHosts: { src: tvHosts, alt: { en: 'Two hosts smiling at the DJ booth with the Turkish Vibes logo on the screen behind them, 2018', tr: 'Arkadaki ekranda Turkish Vibes logosuyla DJ kabininde gülümseyen iki sunucu, 2018' } },
  tvPlanning: { src: tvPlanning, alt: { en: 'The Turkish Vibes team around a long table with laptops and flyers, one holding up the poster for the 13 October 2018 night', tr: 'Dizüstü bilgisayarlar ve el ilanlarıyla uzun bir masanın etrafındaki Turkish Vibes ekibi; biri 13 Ekim 2018 gecesinin afişini tutuyor' } },
  nye2025dance: { src: nye2025dance, alt: { en: 'Guests dancing hand in hand in front of the New Year 2025 stage at Star Palace', tr: 'Star Palace’ta Yılbaşı 2025 sahnesinin önünde el ele dans eden konuklar' } },
};

export const heroSlides: { key: string; cap: L; px: number }[] = [
  { key: 'heroStage', cap: { en: 'İlyas Yalçıntaş · Max Watt’s · Dec 2018', tr: 'İlyas Yalçıntaş · Max Watt’s · Aralık 2018' }, px: -1 },
  { key: 'oldLiveBand', cap: { en: 'Live in Sydney', tr: 'Sydney’de canlı' }, px: 1 },
  { key: 'nye2023screen', cap: { en: 'New Year’s Eve · welcome 2023 · with ATAM', tr: 'Yılbaşı · 2023’e merhaba · ATAM ile' }, px: -1 },
  { key: 'yilmazOvation', cap: { en: 'Yılmaz Erdoğan · Münaşaka tour', tr: 'Yılmaz Erdoğan · Münaşaka turnesi' }, px: 1 },
  { key: 'halukSydney', cap: { en: 'Haluk Levent · live', tr: 'Haluk Levent · sahnede' }, px: 0 },
  { key: 'oldBwStage', cap: { en: 'From the wings', tr: 'Kulisten' }, px: -1 },
  { key: 'nye2025stage', cap: { en: 'New Year’s Eve · welcome 2025 · with ATAM', tr: 'Yılbaşı · 2025’e merhaba · ATAM ile' }, px: 1 },
  { key: 'korayCrowd', cap: { en: 'Koray Avcı · live', tr: 'Koray Avcı · sahnede' }, px: 0 },
  { key: 'oldGuitar', cap: { en: 'In the spotlight', tr: 'Spot ışığında' }, px: 1 },
  { key: 'crowdPhones', cap: { en: 'Every phone in the air', tr: 'Bütün telefonlar havada' }, px: -1 },
  { key: 'oldCrowdHands', cap: { en: 'Hands up, Sydney', tr: 'Eller havaya, Sydney' }, px: 0 },
];
