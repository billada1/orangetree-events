// Single source of truth for every event the site lists.
// kind: presented (our own shows), nye, fundraiser, promotion (we helped promote or produce), supported (community nights we backed).
// Dates are local Sydney dates (YYYY-MM-DD). Leave `date` out and set `year` (or nothing) when the date is still being confirmed.

export type Kind = 'presented' | 'nye' | 'fundraiser' | 'promotion' | 'supported';

export interface EventItem {
  slug: string;
  title: { en: string; tr: string };
  date?: string;
  year?: string;
  doors?: string; // 24 h local time, e.g. '19:00'
  venue: string;
  address?: string;
  kind: Kind;
  artists?: string[]; // artist slugs
  note?: { en: string; tr: string };
  partner?: string;
  story?: string; // story slug
  image?: string; // key in photos map
  soldOut?: boolean;
  tickets?: { label: { en: string; tr: string }; from: number }; // upcoming events only
  externalUrl?: string; // supported events sell elsewhere
  confirm?: boolean; // details still being checked
}

const nye = (welcome: number) => ({
  en: `New Year’s Eve: welcome ${welcome}`,
  tr: `Yılbaşı: ${welcome}${trDative(welcome)} merhaba`,
});

// Turkish dative suffix for a year read aloud (2018’e, 2019’a, 2020’ye ...).
export function trDative(n: number): string {
  const last = n % 10, tens = Math.floor(n / 10) % 10;
  const map: Record<number, string> = { 0: '’a', 1: '’e', 2: '’ye', 3: '’e', 4: '’e', 5: '’e', 6: '’ya', 7: '’ye', 8: '’e', 9: '’a' };
  if (last === 0) {
    const tensMap: Record<number, string> = { 0: '’e', 1: '’a', 2: '’ye', 3: '’a', 4: '’a', 5: '’ye', 6: '’a', 7: '’e', 8: '’e', 9: '’a' };
    return n % 100 === 0 ? '’e' : tensMap[tens];
  }
  return map[last];
}

export const events: EventItem[] = [
  {
    slug: 'nye-2027', kind: 'nye', date: '2026-12-31', doors: '19:00',
    title: { en: 'NYE 2027 · ATAM’s 15th year', tr: 'Yılbaşı 2027 · ATAM’ın 15. yılı' },
    venue: 'The Renaissance, Piano Room, Lidcombe', address: '3 New St E, Lidcombe NSW 2141',
    note: { en: 'With ATAM. Proceeds go to Our Shared Home.', tr: 'ATAM ile. Gelir Ortak Evimiz projesine gidiyor.' },
    tickets: { label: { en: 'General $150 · VIP $180', tr: 'Genel $150 · VIP $180' }, from: 150 },
    image: 'nye2025stage',
  },
  {
    slug: 'mahmut-orhan-zuri-2026', kind: 'supported', date: '2026-12-19',
    title: { en: 'Mahmut Orhan at ZURI Festival Sydney', tr: 'Mahmut Orhan, ZURI Festival Sydney' },
    venue: 'White Bay Power Station, Rozelle',
    note: { en: 'With Francis Mercier, Marten Lou and more.', tr: 'Francis Mercier, Marten Lou ve daha fazlası ile.' },
  },
  {
    slug: 'nida-rock-2026', kind: 'supported', date: '2026-11-27',
    title: { en: 'Nida Rock & friends', tr: 'Nida Rock & friends' },
    venue: 'Peppers The Hills Lodge, Castle Hill',
    note: { en: 'Live Turkish music with special guests Özgür and Kübra.', tr: 'Özel konuklar Özgür ve Kübra ile canlı Türkçe müzik.' },
  },
  { slug: 'muharrem-aslan-2026', kind: 'supported', date: '2026-09-13', title: { en: 'Sounds of Anatolia: Muharrem Aslan', tr: 'Anadolu’nun Sesleri: Muharrem Aslan' }, venue: '21 Shepherd Living Room Theatre, Marrickville' },
  { slug: 'afara-ugur-aslan-2026', kind: 'supported', date: '2026-05-29', title: { en: 'AFARA with Uğur Aslan', tr: 'AFARA ve Uğur Aslan' }, venue: 'Sydney' },
  { slug: 'community-iftar-2026', kind: 'supported', date: '2026-03-14', title: { en: 'Community Iftar', tr: 'Topluluk iftarı' }, venue: 'Greystanes Community Centre' },
  { slug: 'meyhane-night-2025', kind: 'supported', year: '2025', title: { en: 'Meyhane Night', tr: 'Meyhane Gecesi' }, venue: '', confirm: true },
  { slug: 'buray-2025', kind: 'presented', date: '2025-03-28', title: { en: 'Buray: Live Concert in Sydney', tr: 'Buray: Sydney Konseri' }, venue: 'Mary’s Underground, Circular Quay', partner: 'Culture Crew Australia', artists: ['buray'] },
  { slug: 'nye-2025', kind: 'nye', date: '2024-12-31', title: nye(2025), venue: '', partner: 'ATAM', confirm: true, image: 'nye2025floor' },
  { slug: 'buray-2023', kind: 'presented', date: '2023-11-12', doors: '18:00', title: { en: 'Buray: Live in Sydney', tr: 'Buray: Sydney Konseri' }, venue: 'Liberty Hall, Entertainment Quarter, Moore Park', partner: 'Culture Crew Australia', artists: ['buray'] },
  { slug: 'republic-100', kind: 'supported', date: '2023-10-29', title: { en: 'Republic 100', tr: 'Cumhuriyet 100' }, venue: 'Wyatt Park, Lidcombe' },
  { slug: 'childrens-day-2023', kind: 'supported', date: '2023-04-23', title: { en: 'Children’s Day festival', tr: '23 Nisan Çocuk Bayramı şenliği' }, venue: 'Western Sydney' },
  { slug: 'earthquake-appeal-comedy-2023', kind: 'fundraiser', year: '2023', title: { en: 'Comedy for the Türkiye earthquake appeal, hosted by Tahir Bilgiç', tr: 'Türkiye depremi için stand-up gecesi, sunucu Tahir Bilgiç' }, venue: 'Enmore Theatre, Newtown', artists: ['tahir-bilgic'] },
  { slug: 'nye-2023', kind: 'nye', date: '2022-12-31', title: { en: 'New Year’s Eve: welcome 2023, ATAM’s 10th year', tr: 'Yılbaşı: 2023’e merhaba, ATAM’ın 10. yılı' }, venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', note: { en: 'Turkish Vibes resident DJs Ilka and Ada on deck all night.', tr: 'Turkish Vibes’ın DJ’leri Ilka ve Ada bütün gece sahnede.' }, image: 'nye2023screen' },
  { slug: 'nye-2022', kind: 'nye', date: '2021-12-31', title: nye(2022), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', note: { en: 'With DJ Ilka and DJ Ada.', tr: 'DJ Ilka ve DJ Ada ile.' } },
  { slug: 'nye-2020', kind: 'nye', date: '2019-12-31', title: nye(2020), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', soldOut: true, note: { en: 'With Turkish-Balkan band KINTALA and DJ Gurbz.', tr: 'Türk-Balkan grubu KINTALA ve DJ Gurbz ile.' } },
  { slug: 'turkish-vibes-2019', kind: 'presented', date: '2019-11-02', doors: '19:00', title: { en: 'Turkish Vibes 2019', tr: 'Turkish Vibes 2019' }, venue: 'Coolibah Hotel, Merrylands', soldOut: true },
  { slug: 'nye-2019', kind: 'nye', year: '2018', title: nye(2019), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', confirm: true },
  { slug: 'ilyas-yalcintas-2018', kind: 'presented', date: '2018-12-15', doors: '19:30', title: { en: 'İlyas Yalçıntaş: Live in Sydney', tr: 'İlyas Yalçıntaş: Sydney Konseri' }, venue: 'Max Watt’s, Entertainment Quarter, Moore Park', artists: ['ilyas-yalcintas'], story: 'ilyas-yalcintas-max-watts-2018', image: 'heroStage' },
  { slug: 'turkish-vibes-2018', kind: 'presented', date: '2018-10-13', title: { en: 'Turkish Vibes 2018', tr: 'Turkish Vibes 2018' }, venue: 'Coolibah Hotel, Merrylands' },
  { slug: 'kibariye-2018', kind: 'presented', date: '2018-05-13', doors: '18:00', title: { en: 'Kibariye: Mother’s Day concert', tr: 'Kibariye: Anneler Günü konseri' }, venue: 'The Renaissance, Lidcombe', artists: ['kibariye'] },
  { slug: 'koray-avci-2018', kind: 'presented', date: '2018-01-25', doors: '20:00', title: { en: 'Koray Avcı Unplugged', tr: 'Koray Avcı Unplugged' }, venue: 'Bankstown Sports Club', artists: ['koray-avci'] },
  { slug: 'nye-2018', kind: 'nye', date: '2017-12-31', doors: '19:00', title: nye(2018), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', note: { en: 'Sydney’s favourite Turkish band EKOL with DJ Baki. Proceeds to ATAM.', tr: 'Sydney’nin sevilen Türk grubu EKOL ve DJ Baki ile. Gelir ATAM’a.' } },
  { slug: 'munasaka-2017', kind: 'presented', date: '2017-04-29', title: { en: 'Münaşaka: Yılmaz Erdoğan’s one-man show', tr: 'Münaşaka: Yılmaz Erdoğan’ın tek kişilik gösterisi' }, venue: 'Seymour Centre, Sydney', artists: ['yilmaz-erdogan'] },
  { slug: 'teoman-rockfest-2017', kind: 'presented', date: '2017-04-23', doors: '19:30', title: { en: 'Teoman Rockfest', tr: 'Teoman Rockfest' }, venue: 'Marquee, The Star Sydney', artists: ['teoman', 'cahit-berkay', 'emrah-karaca', 'tibet-agirtan'], note: { en: 'With Cahit Berkay, Emrah Karaca and Tibet Ağırtan. Also Crown, Melbourne, 22 April.', tr: 'Cahit Berkay, Emrah Karaca ve Tibet Ağırtan ile. Ayrıca 22 Nisan’da Crown, Melbourne.' } },
  { slug: 'nye-2017', kind: 'nye', year: '2016', title: nye(2017), venue: '', partner: 'ATAM', confirm: true },
  { slug: 'nye-2016', kind: 'nye', year: '2015', title: nye(2016), venue: '', partner: 'ATAM', confirm: true },
  { slug: 'haluk-levent', kind: 'presented', title: { en: 'Haluk Levent', tr: 'Haluk Levent' }, venue: '', artists: ['haluk-levent'], confirm: true },
  { slug: 'manga', kind: 'presented', title: { en: 'maNga', tr: 'maNga' }, venue: '', artists: ['manga'], confirm: true },
  { slug: 'emre-aydin', kind: 'presented', title: { en: 'Emre Aydın', tr: 'Emre Aydın' }, venue: '', artists: ['emre-aydin'], confirm: true },
  { slug: 'oguz-aksac', kind: 'presented', title: { en: 'Oğuz Aksaç', tr: 'Oğuz Aksaç' }, venue: '', artists: ['oguz-aksac'], confirm: true },
  { slug: 'sevcan-orhan-2022', kind: 'promotion', date: '2022-05-20', title: { en: 'Sevcan Orhan live in Sydney', tr: 'Sevcan Orhan Sydney konseri' }, venue: 'Club Burwood', partner: 'Waves Sydney', artists: ['sevcan-orhan'], note: { en: 'Folk singer Sevcan Orhan with her band from Türkiye. Organised by Waves Sydney.', tr: 'Türk halk müziğinin güçlü sesi Sevcan Orhan, Türkiye’den müzisyen kadrosuyla. Organizasyon: Waves Sydney.' } },
  { slug: 'erkan-kolcak-kostendil-2019', kind: 'presented', date: '2019-05-03', title: { en: 'Erkan Kolçak Köstendil: 12 Numaralı Adam', tr: 'Erkan Kolçak Köstendil: 12 Numaralı Adam' }, venue: 'C3 Church, Silverwater', artists: ['erkan-kolcak-kostendil'], note: { en: 'One-man theatre show by the actor known as Vartolu in Çukur.', tr: 'Çukur dizisinin Vartolu’su Erkan Kolçak Köstendil’in tek kişilik tiyatro gösterisi.' } },
  { slug: 'gulben-ergen-2024', kind: 'promotion', date: '2024-11-29', title: { en: 'Gülben Ergen: first Australian concert', tr: 'Gülben Ergen: Avustralya’daki ilk konseri' }, venue: 'Grand Royale, Sydney', partner: 'Diamond Stage Events and Turkuaz Nights', artists: ['gulben-ergen'], note: { en: 'Also Laila Reception, Melbourne, 30 November.', tr: 'Ayrıca 30 Kasım’da Laila Reception, Melbourne.' } },
  { slug: 'isin-karaca-2022', kind: 'promotion', date: '2022-03-25', title: { en: 'Işın Karaca live in Sydney', tr: 'Işın Karaca Sydney konseri' }, venue: 'Club Burwood', partner: 'Diamond Stage Events', artists: ['isin-karaca'] },
  { slug: 'hakan-altun-2020', kind: 'promotion', date: '2020-02-22', title: { en: 'Hakan Altun live in Sydney', tr: 'Hakan Altun Sydney konseri' }, venue: 'Bankstown Sports Club', partner: 'Diamond Stage Events and Turkuaz Nights', artists: ['hakan-altun'], note: { en: 'Also La Mirage, Melbourne, 21 February.', tr: 'Ayrıca 21 Şubat’ta La Mirage, Melbourne.' } },
];

// "Today" in Sydney, so upcoming/past flips at local midnight even when built elsewhere.
export function sydneyToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

export const isUpcoming = (e: EventItem, today = sydneyToday()) => !!e.date && e.date >= today;
export const upcoming = () => events.filter((e) => isUpcoming(e)).sort((a, b) => a.date!.localeCompare(b.date!));
export const past = () => events.filter((e) => !isUpcoming(e));
