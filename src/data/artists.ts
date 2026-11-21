export interface Artist {
  slug: string;
  name: string;
  role: { en: string; tr: string };
  bio?: { en: string[]; tr: string[] };
  facts?: { label: { en: string; tr: string }; value: string }[];
  links?: { label: string; url: string }[];
  image?: string; // key in photos map
  gallery?: string[];
}

const singer = { en: 'Singer and songwriter', tr: 'Şarkıcı, söz yazarı' };
const musician = { en: 'Musician', tr: 'Müzisyen' };
const comedian = { en: 'Comedian', tr: 'Komedyen' };

export const artists: Artist[] = [
  {
    slug: 'ilyas-yalcintas', name: 'İlyas Yalçıntaş', role: singer, image: 'artistCrowd',
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
  { slug: 'buray', name: 'Buray', role: singer },
  { slug: 'teoman', name: 'Teoman', role: { en: 'Rock singer and songwriter', tr: 'Rock şarkıcısı, söz yazarı' } },
  { slug: 'cahit-berkay', name: 'Cahit Berkay', role: { en: 'Musician, Moğollar', tr: 'Müzisyen, Moğollar' } },
  { slug: 'emrah-karaca', name: 'Emrah Karaca', role: { en: 'Lead singer, Moğollar', tr: 'Solist, Moğollar' } },
  { slug: 'tibet-agirtan', name: 'Tibet Ağırtan', role: { en: 'Rock musician, Mavi Sakal', tr: 'Rock müzisyeni, Mavi Sakal' } },
  { slug: 'yilmaz-erdogan', name: 'Yılmaz Erdoğan', role: { en: 'Actor, poet and comedian', tr: 'Oyuncu, şair, komedyen' } },
  { slug: 'koray-avci', name: 'Koray Avcı', role: singer },
  { slug: 'kibariye', name: 'Kibariye', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'haluk-levent', name: 'Haluk Levent', role: { en: 'Rock singer', tr: 'Rock şarkıcısı' } },
  { slug: 'manga', name: 'maNga', role: { en: 'Rock band', tr: 'Rock grubu' } },
  { slug: 'emre-aydin', name: 'Emre Aydın', role: singer },
  { slug: 'oguz-aksac', name: 'Oğuz Aksaç', role: musician },
  { slug: 'sevcan-orhan', name: 'Sevcan Orhan', role: { en: 'Folk singer', tr: 'Türkü sanatçısı' } },
  { slug: 'erkan-kolcak-kostendil', name: 'Erkan Kolçak Köstendil', role: comedian },
  { slug: 'gulben-ergen', name: 'Gülben Ergen', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'isin-karaca', name: 'Işın Karaca', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'hakan-altun', name: 'Hakan Altun', role: { en: 'Singer', tr: 'Şarkıcı' } },
  { slug: 'tahir-bilgic', name: 'Tahir Bilgiç', role: comedian },
];

export const artistBySlug = (s: string) => artists.find((a) => a.slug === s);
