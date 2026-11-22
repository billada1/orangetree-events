export interface Artist {
  slug: string;
  name: string;
  role: { en: string; tr: string };
  bio?: { en: string[]; tr: string[] };
  facts?: { label: { en: string; tr: string }; value: string }[];
  links?: { label: string; url: string }[];
  image?: string; // key in photos map, or a file in src/assets/artists (without .jpg)
  local?: boolean; // Sydney-based act
  instagram?: string; // handle without @
  gallery?: string[];
  spotify?: string;
  youtube?: string;
  wiki?: { en?: string; tr?: string };
  credit?: { by: string; licence: string; file: string };
}

const singer = { en: 'Singer and songwriter', tr: 'Şarkıcı, söz yazarı' };
const musician = { en: 'Musician', tr: 'Müzisyen' };
const comedian = { en: 'Comedian', tr: 'Komedyen' };

import { extra } from './artist-extra';

const list: Artist[] = [
  {
    slug: 'ilyas-yalcintas', instagram: 'ilyasyalcintas', name: 'İlyas Yalçıntaş', role: singer, image: 'artistCrowd',
    gallery: ['band', 'guitar', 'bwStage', 'crowd', 'stageWide'],
    bio: {
      en: [
        'İlyas Yalçıntaş first reached a wide audience in 2014, when his performance of “İncir” on X Factor Türkiye caught the country’s attention. A run of hits followed, including “İçimdeki Duman”, “Gel Be Gökyüzüm” and “Sadem”.',
        'His debut album, İçimdeki Duman, came out in 2016. Fans know him for his relaxed, smooth voice, his guitar playing and a live show that mixes his own songs with well-loved covers.',
      ],
      tr: [
        'İlyas Yalçıntaş adını 2014’te X Factor Türkiye’de seslendirdiği “İncir” ile duyurdu. Ardından “İçimdeki Duman”, “Gel Be Gökyüzüm” ve “Sadem” gibi sevilen şarkılar geldi.',
        'İlk albümü İçimdeki Duman 2016’da çıktı. Yumuşak sesi, gitarı ve kendi şarkılarıyla sevilen cover’ları buluşturan konserleriyle tanınıyor.',
      ],
    },
    facts: [
      { label: { en: 'Born', tr: 'Doğum' }, value: '1989, Erzincan' },
      { label: { en: 'Known for', tr: 'Bilinen şarkıları' }, value: 'İncir, İçimdeki Duman, Gel Be Gökyüzüm' },
      { label: { en: 'Debut album', tr: 'İlk albüm' }, value: 'İçimdeki Duman (2016)' },
      { label: { en: 'Award', tr: 'Ödül' }, value: 'Altın Kelebek, Best Debut by a Soloist (2015)' },
    ],
  },
  { slug: 'buray', image: 'buray', instagram: 'buraymusic', name: 'Buray', role: singer },
  { slug: 'teoman', image: 'teoman', instagram: 'teomanofficial', name: 'Teoman', role: { en: 'Rock singer and songwriter', tr: 'Rock şarkıcısı, söz yazarı' } },
  { slug: 'cahit-berkay', image: 'cahit-berkay', name: 'Cahit Berkay', role: { en: 'Musician, Moğollar', tr: 'Müzisyen, Moğollar' } },
  { slug: 'emrah-karaca', image: 'emrah-karaca', name: 'Emrah Karaca', role: { en: 'Lead singer, Moğollar', tr: 'Solist, Moğollar' } },
  { slug: 'tibet-agirtan', image: 'tibet-agirtan', name: 'Tibet Ağırtan', role: { en: 'Rock musician, Mavi Sakal', tr: 'Rock müzisyeni, Mavi Sakal' } },
  { slug: 'yilmaz-erdogan', image: 'yilmaz-erdogan', name: 'Yılmaz Erdoğan', role: { en: 'Actor, poet and comedian', tr: 'Oyuncu, şair, komedyen' } },
  { slug: 'koray-avci', image: 'koray-avci-2', name: 'Koray Avcı', role: singer },
  { slug: 'kibariye', image: 'kibariye', name: 'Kibariye', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'haluk-levent', image: 'haluk-levent', instagram: 'halukleventacil', name: 'Haluk Levent', role: { en: 'Rock singer', tr: 'Rock şarkıcısı' } },
  { slug: 'manga', name: 'maNga', role: { en: 'Rock band', tr: 'Rock grubu' } },
  { slug: 'eypio', image: 'eypio', name: 'Eypio', role: { en: 'Rapper', tr: 'Rapçi' } },
  { slug: 'emre-aydin', name: 'Emre Aydın', role: singer },
  { slug: 'oguz-aksac', name: 'Oğuz Aksaç', role: musician },
  { slug: 'sevcan-orhan', instagram: 'sevcanorhan', name: 'Sevcan Orhan', role: { en: 'Folk singer', tr: 'Türkü sanatçısı' } },
  { slug: 'erkan-kolcak-kostendil', instagram: 'erkankeka', name: 'Erkan Kolçak Köstendil', role: { en: 'Actor, known as Vartolu in Çukur', tr: 'Oyuncu, Çukur’un Vartolu’su' } },
  { slug: 'gulben-ergen', instagram: 'gulben123', name: 'Gülben Ergen', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'isin-karaca', image: 'isin-karaca', instagram: 'isinkaraca', name: 'Işın Karaca', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'hakan-altun', instagram: 'hakanaltunmusic', name: 'Hakan Altun', role: { en: 'Singer', tr: 'Şarkıcı' } },
  // Sydney acts
  { slug: 'nida-rock', name: 'Nida Rock', local: true, instagram: 'nida_rock', role: { en: 'Sydney band: meyhane songs, Anatolian rock and Turkish classics', tr: 'Sydney grubu: meyhane şarkıları, Anadolu rock ve Türkçe klasikler' } },
  { slug: 'levent-ozkan', name: 'Levent & Özkan', local: true, instagram: 'leventartn', role: { en: 'Sydney duo', tr: 'Sydney’li ikili' } },
  { slug: 'muharrem-aslan', name: 'Muharrem Aslan', local: true, instagram: 'muharremaslanofficial', role: { en: 'Musician and music therapist: Sounds of Anatolia', tr: 'Müzisyen ve müzik terapisti: Anadolu’nun Sesleri' } },
  { slug: 'dj-ilka', name: 'DJ Ilka', local: true, instagram: 'dj.ilka', role: { en: 'DJ, Turkish Vibes resident', tr: 'DJ, Turkish Vibes’ın DJ’i' } },
  { slug: 'dj-ada', name: 'DJ Göksel Ada', local: true, instagram: 'djada_goksel', role: { en: 'DJ, Turkish Vibes resident', tr: 'DJ, Turkish Vibes’ın DJ’i' } },
  { slug: 'dj-gurbz', name: 'DJ Gurbz', local: true, instagram: 'djgurbuzaslan', role: { en: 'DJ', tr: 'DJ' } },
  { slug: 'dj-baki', name: 'DJ Baki', local: true, role: { en: 'DJ', tr: 'DJ' } },
  { slug: 'ekol', name: 'EKOL', local: true, role: { en: 'Sydney Turkish band', tr: 'Sydney’li Türk grubu' } },
  { slug: 'kintala', name: 'KINTALA', local: true, role: { en: 'Sydney Turkish-Balkan band', tr: 'Sydney’li Türk-Balkan grubu' } },
  { slug: 'funkatolia', name: 'Funkatolia', local: true, role: { en: 'Sydney Turkish funk band', tr: 'Sydney’li Türk funk grubu' } },
  { slug: 'selcuk-balci', name: 'Selçuk Balcı', instagram: 'selcukbalcii', role: { en: 'Black Sea folk singer, kemençe', tr: 'Karadeniz türküleri, kemençe' } },
  { slug: 'baris-komurcuoglu', name: 'Barış Kömürcüoğlu', instagram: 'bariskomurcuogluofficial', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'mehmet-erdem', name: 'Mehmet Erdem', instagram: 'mehmetmusic', role: singer },
  { slug: 'burak-bulut', name: 'Burak Bulut', instagram: 'burakkbulut23', role: singer },
  { slug: 'serhan-ilbeyi', name: 'Serhan İlbeyi', instagram: 'serhanilbeyi', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'tahir-bilgic', instagram: 'tahircomedian', name: 'Tahir Bilgiç', role: comedian },
];

// Merge bios, facts and listening links (own data wins).
export const artists: Artist[] = list.map((a) => ({ ...extra[a.slug], ...a, bio: a.bio ?? extra[a.slug]?.bio, facts: a.facts ?? extra[a.slug]?.facts }));

export const artistBySlug = (s: string) => artists.find((a) => a.slug === s);
