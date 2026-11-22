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
  partner?: string; // co-presenter (with co: true) or the organiser we worked with
  co?: boolean; // co-presented: shown as "Co-presented with <partner>"
  poster?: string; // file name in src/assets/posters (without .jpg)
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
    slug: 'mahmut-orhan-zuri-2026', poster: 'mahmut-orhan-zuri-2026', kind: 'supported', date: '2026-12-19',
    title: { en: 'Mahmut Orhan at ZURI Festival Sydney', tr: 'Mahmut Orhan, ZURI Festival Sydney' },
    venue: 'White Bay Power Station, Rozelle',
    note: { en: 'With Francis Mercier, Marten Lou and more.', tr: 'Francis Mercier, Marten Lou ve daha fazlası ile.' },
  },
  {
    slug: 'nida-rock-2026', poster: 'nida-rock-2026', kind: 'supported', date: '2026-11-27',
    title: { en: 'Nida Rock & friends', tr: 'Nida Rock & friends' },
    venue: 'Peppers The Hills Lodge, Castle Hill', artists: ['nida-rock'],
    note: { en: 'Live Turkish music with special guests Özgür and Kübra.', tr: 'Özel konuklar Özgür ve Kübra ile canlı Türkçe müzik.' },
  },
  { slug: 'muharrem-aslan-2026', poster: 'muharrem-aslan-2026', kind: 'supported', date: '2026-09-13', title: { en: 'Sounds of Anatolia: Muharrem Aslan', tr: 'Anadolu’nun Sesleri: Muharrem Aslan' }, venue: 'The Living Room Theatre, 21 Shepherd St, Marrickville', artists: ['muharrem-aslan'] },
  { slug: 'afara-ugur-aslan-2026', poster: 'afara-ugur-aslan-2026', kind: 'supported', date: '2026-05-29', title: { en: 'AFARA: an Arabesque musical with Uğur Aslan', tr: 'AFARA: Uğur Aslan ile bir arabesk müzikal' }, venue: 'The Concourse, Chatswood' },
  { slug: 'community-iftar-2026', kind: 'supported', date: '2026-03-14', title: { en: 'Community Iftar', tr: 'Topluluk iftarı' }, venue: 'Greystanes Community Centre' },
  { slug: 'meyhane-night-2025', poster: 'meyhane-night-2025', kind: 'presented', date: '2025-11-01', title: { en: 'Meyhane Gecesi: Nida Makamında', tr: 'Meyhane Gecesi: Nida Makamında' }, venue: 'Sapphire Function Centre, Auburn', partner: 'ATAM', soldOut: true, artists: ['nida-rock'], note: { en: 'A meyhane night of meze, music and friends, with live music by Nida Rock.', tr: 'Meze, müzik ve dostlarla bir meyhane gecesi; canlı müzik Nida Rock.' } },
  { slug: 'ekin-uzunlar-2025', poster: 'ekin-uzunlar-2025', kind: 'supported', date: '2025-11-14', title: { en: 'Ekin Uzunlar: King of the North, remembering Volkan Konak', tr: 'Ekin Uzunlar: Volkan Konak anısına' }, venue: 'Bankstown Sports Club', partner: 'Wish Events' },
  { slug: 'buray-2025', kind: 'presented', date: '2025-03-28', title: { en: 'Buray: Live Concert in Sydney', tr: 'Buray: Sydney Konseri' }, venue: 'Mary’s Underground, Circular Quay', partner: 'Culture Crew Australia', co: true, artists: ['buray'] },
  { slug: 'nye-2025', poster: 'nye-2025', kind: 'nye', date: '2024-12-31', title: nye(2025), venue: '', partner: 'ATAM', confirm: true, image: 'nye2025floor' },
  { slug: 'buray-2023', poster: 'buray-2023', kind: 'presented', date: '2023-11-12', doors: '18:00', title: { en: 'Buray: Live in Sydney', tr: 'Buray: Sydney Konseri' }, venue: 'Liberty Hall, Entertainment Quarter, Moore Park', partner: 'Culture Crew Australia', co: true, artists: ['buray'] },
  { slug: 'republic-100', poster: 'republic-100', kind: 'supported', date: '2023-10-29', title: { en: 'Republic 100', tr: 'Cumhuriyet 100' }, venue: 'Wyatt Park, Lidcombe' },
  { slug: 'childrens-day-2023', kind: 'supported', date: '2023-04-23', title: { en: 'Children’s Day festival', tr: '23 Nisan Çocuk Bayramı şenliği' }, venue: 'Western Sydney' },
  { slug: 'earthquake-appeal-comedy-2023', poster: 'earthquake-appeal-comedy-2023', kind: 'fundraiser', year: '2023', title: { en: 'Comedy for the Türkiye earthquake appeal, hosted by Tahir Bilgiç', tr: 'Türkiye depremi için stand-up gecesi, sunucu Tahir Bilgiç' }, venue: 'Enmore Theatre, Newtown', partner: 'Tahir Bilgiç and Turkuaz', note: { en: 'A benefit night of comedians and magicians helping survivors in Türkiye and Syria. We helped promote and run it.', tr: 'Türkiye ve Suriye’deki depremzedeler için komedyen ve sihirbazlarla bir yardım gecesi. Tanıtım ve organizasyonda yer aldık.' }, artists: ['tahir-bilgic'] },
  { slug: 'nye-2023', kind: 'nye', date: '2022-12-31', title: { en: 'New Year’s Eve: welcome 2023, ATAM’s 10th year', tr: 'Yılbaşı: 2023’e merhaba, ATAM’ın 10. yılı' }, venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', artists: ['dj-ilka', 'dj-ada'], note: { en: 'Turkish Vibes resident DJs Ilka and Ada on deck all night.', tr: 'Turkish Vibes’ın DJ’leri Ilka ve Ada bütün gece sahnede.' }, image: 'nye2023screen' },
  { slug: 'nye-2022', poster: 'nye-2022', kind: 'nye', date: '2021-12-31', title: nye(2022), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', artists: ['dj-ilka', 'dj-ada'], note: { en: 'With DJ Ilka and DJ Ada.', tr: 'DJ Ilka ve DJ Ada ile.' } },
  { slug: 'nye-2020', poster: 'nye-2020', kind: 'nye', date: '2019-12-31', title: nye(2020), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', soldOut: true, artists: ['kintala', 'dj-gurbz'], note: { en: 'With Turkish-Balkan band KINTALA and DJ Gurbz.', tr: 'Türk-Balkan grubu KINTALA ve DJ Gurbz ile.' } },
  { slug: 'turkish-vibes-2019', poster: 'turkish-vibes-2019', kind: 'presented', date: '2019-11-02', doors: '19:00', title: { en: 'Turkish Vibes 2019', tr: 'Turkish Vibes 2019' }, venue: 'Coolibah Hotel, Merrylands', soldOut: true, artists: ['dj-ada'], note: { en: 'Old-school R&B and Turkish dance night with guest DJ Ilker Aydın and DJ Göksel Ada.', tr: 'Konuk DJ Ilker Aydın ve DJ Göksel Ada ile old-school R&B ve Türkçe dans gecesi.' } },
  { slug: 'nye-2019', kind: 'nye', year: '2018', title: nye(2019), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', confirm: true },
  { slug: 'ilyas-yalcintas-2018', poster: 'ilyas-yalcintas-2018', kind: 'presented', date: '2018-12-15', doors: '19:30', title: { en: 'İlyas Yalçıntaş: Live in Sydney', tr: 'İlyas Yalçıntaş: Sydney Konseri' }, venue: 'Max Watt’s, Entertainment Quarter, Moore Park', artists: ['ilyas-yalcintas', 'funkatolia', 'dj-ada'], story: 'ilyas-yalcintas-max-watts-2018', image: 'heroStage' },
  { slug: 'turkish-vibes-2018', poster: 'turkish-vibes-2018', kind: 'presented', date: '2018-10-13', title: { en: 'Turkish Vibes 2018', tr: 'Turkish Vibes 2018' }, venue: 'Coolibah Hotel, Merrylands', artists: ['dj-ada'], note: { en: 'Old-school R&B and Turkish dance night with guest DJ Ilker Aydın and DJ Göksel Ada.', tr: 'Konuk DJ Ilker Aydın ve DJ Göksel Ada ile old-school R&B ve Türkçe dans gecesi.' } },
  { slug: 'kibariye-2018', poster: 'kibariye-2018', kind: 'presented', date: '2018-05-13', doors: '18:00', title: { en: 'Kibariye: Mother’s Day concert', tr: 'Kibariye: Anneler Günü konseri' }, venue: 'The Renaissance, Lidcombe', artists: ['kibariye'] },
  { slug: 'koray-avci-2018', kind: 'presented', date: '2018-01-25', doors: '20:00', title: { en: 'Koray Avcı Unplugged', tr: 'Koray Avcı Unplugged' }, venue: 'Bankstown Sports Club', artists: ['koray-avci'] },
  { slug: 'nye-2018', poster: 'nye-2018', kind: 'nye', date: '2017-12-31', doors: '19:00', title: nye(2018), venue: 'The Renaissance Piano Room, Lidcombe', partner: 'ATAM', artists: ['ekol', 'dj-baki'], note: { en: 'Sydney’s favourite Turkish band EKOL with DJ Baki. Proceeds to ATAM.', tr: 'Sydney’nin sevilen Türk grubu EKOL ve DJ Baki ile. Gelir ATAM’a.' } },
  { slug: 'munasaka-2017', poster: 'munasaka-2017', kind: 'presented', date: '2017-04-29', title: { en: 'Münaşaka: Yılmaz Erdoğan’s one-man show', tr: 'Münaşaka: Yılmaz Erdoğan’ın tek kişilik gösterisi' }, venue: 'Seymour Centre, Sydney', artists: ['yilmaz-erdogan'] },
  { slug: 'teoman-rockfest-2017', poster: 'teoman-rockfest-2017', kind: 'presented', date: '2017-04-23', doors: '19:30', title: { en: 'Teoman Rockfest', tr: 'Teoman Rockfest' }, venue: 'Marquee, The Star Sydney', artists: ['teoman', 'cahit-berkay', 'emrah-karaca', 'tibet-agirtan'], note: { en: 'With Cahit Berkay, Emrah Karaca and Tibet Ağırtan. Also Crown, Melbourne, 22 April.', tr: 'Cahit Berkay, Emrah Karaca ve Tibet Ağırtan ile. Ayrıca 22 Nisan’da Crown, Melbourne.' } },
  { slug: 'colours-of-turkiye-2026', poster: 'colours-of-turkiye-2026', kind: 'supported', date: '2026-05-17', doors: '18:00', title: { en: 'Colours of Türkiye 2026', tr: 'Türkiye’nin Renkleri 2026' }, venue: 'Club Burwood RSL', partner: 'Austolian Youth Association and Austolian Dance Academy', artists: ['baris-komurcuoglu'], note: { en: 'Turkish music, dance and culture with Barış Kömürcüoğlu and the Austolian Dance Academy.', tr: 'Barış Kömürcüoğlu ve Austolian Dans Akademisi ile Türk müziği, dansı ve kültürü.' } },
  { slug: 'selcuk-balci-2026', poster: 'selcuk-balci-2026', kind: 'supported', date: '2026-04-19', doors: '18:00', title: { en: 'Selçuk Balcı: 2026 Australia tour', tr: 'Selçuk Balcı: 2026 Avustralya turnesi' }, venue: 'The Theatre, Bankstown Sports Club', partner: 'Wish Events', artists: ['selcuk-balci'], note: { en: 'Black Sea horon and türkü, live with kemençe and tulum.', tr: 'Kemençe ve tulumla canlı Karadeniz horonu ve türküleri.' } },
  { slug: 'selcuk-balci-2024', poster: 'selcuk-balci-2024', kind: 'supported', date: '2024-04-20', doors: '19:00', title: { en: 'Selçuk Balcı live in Sydney', tr: 'Selçuk Balcı Sydney konseri' }, venue: 'The Theatre, Bankstown Sports Club', partner: 'Waves Sydney', artists: ['selcuk-balci'] },
  { slug: 'mehmet-erdem-2024', poster: 'mehmet-erdem-2024', kind: 'promotion', date: '2024-02-25', title: { en: 'Mehmet Erdem live in Sydney', tr: 'Mehmet Erdem Sydney konseri' }, venue: 'Crown Hotel, Parramatta', partner: 'Sultan Promotions, Josh Keleş Events and Turkuaz Nights', artists: ['mehmet-erdem', 'levent-ozkan'], note: { en: 'With local acts Levent & Özkan, DJ Ahmet Polat and DJ Teflon Murat.', tr: 'Yerel sanatçılar Levent & Özkan, DJ Ahmet Polat ve DJ Teflon Murat ile.' } },
  { slug: 'burak-bulut-2024', poster: 'burak-bulut-2024', kind: 'promotion', date: '2024-02-24', title: { en: 'Burak Bulut: Sydney concert', tr: 'Burak Bulut Sydney konseri' }, venue: 'Metro Theatre, Sydney', partner: 'Mango Events', artists: ['burak-bulut'] },
  { slug: 'serhan-ilbeyi-2023', poster: 'serhan-ilbeyi-2023', kind: 'promotion', date: '2023-04-21', title: { en: 'Serhan İlbeyi: Bayram celebration', tr: 'Serhan İlbeyi: Bayram eğlencesi' }, venue: 'The Renaissance, Lidcombe', partner: 'Rhythm Events', artists: ['serhan-ilbeyi'] },
  { slug: 'turkish-japanese-friendship', kind: 'supported', title: { en: 'Turkish and Japanese friendship night', tr: 'Türk-Japon dostluk gecesi' }, venue: '', confirm: true },
  { slug: 'nye-2017', kind: 'nye', year: '2016', title: nye(2017), venue: '', partner: 'ATAM', confirm: true },
  { slug: 'nye-2016', kind: 'nye', year: '2015', title: nye(2016), venue: '', partner: 'ATAM', confirm: true },
  { slug: 'haluk-levent-2015', kind: 'supported', date: '2015-11-07', title: { en: 'Haluk Levent live in Sydney', tr: 'Haluk Levent Sydney konseri' }, venue: 'Sydney · venue to confirm', artists: ['haluk-levent'] },
  { slug: 'manga-2019', kind: 'presented', co: true, date: '2019-02-09', title: { en: 'maNga live in Sydney', tr: 'maNga Sydney konseri' }, venue: 'Sydney · venue to confirm', partner: '[co-presenter to confirm]', artists: ['manga'] },
  { slug: 'emre-aydin-2017', kind: 'supported', date: '2017-05-12', title: { en: 'Emre Aydın live in Sydney', tr: 'Emre Aydın Sydney konseri' }, venue: 'Sydney · venue to confirm', artists: ['emre-aydin'] },
  { slug: 'oguz-aksac', kind: 'supported', title: { en: 'Oğuz Aksaç live in Sydney', tr: 'Oğuz Aksaç Sydney konseri' }, venue: '', artists: ['oguz-aksac'], confirm: true },
  { slug: 'sevcan-orhan-2022', poster: 'sevcan-orhan-2022', kind: 'promotion', date: '2022-05-20', title: { en: 'Sevcan Orhan live in Sydney', tr: 'Sevcan Orhan Sydney konseri' }, venue: 'Club Burwood', partner: 'Waves Sydney', artists: ['sevcan-orhan'], note: { en: 'Folk singer Sevcan Orhan with her band from Türkiye. Organised by Waves Sydney.', tr: 'Türk halk müziğinin güçlü sesi Sevcan Orhan, Türkiye’den müzisyen kadrosuyla. Organizasyon: Waves Sydney.' } },
  { slug: 'erkan-kolcak-kostendil-2019', poster: 'erkan-kolcak-kostendil-2019', kind: 'supported', date: '2019-05-03', title: { en: 'Erkan Kolçak Köstendil: 12 Numaralı Adam', tr: 'Erkan Kolçak Köstendil: 12 Numaralı Adam' }, venue: 'C3 Church, Silverwater', artists: ['erkan-kolcak-kostendil'], note: { en: 'One-man theatre show by the actor known as Vartolu in Çukur.', tr: 'Çukur dizisinin Vartolu’su Erkan Kolçak Köstendil’in tek kişilik tiyatro gösterisi.' } },
  { slug: 'gulben-ergen-2024', poster: 'gulben-ergen-2024', kind: 'promotion', date: '2024-11-29', title: { en: 'Gülben Ergen: first Australian concert', tr: 'Gülben Ergen: Avustralya’daki ilk konseri' }, venue: 'Grand Royale, Sydney', partner: 'Diamond Stage Events and Turkuaz Nights', artists: ['gulben-ergen'], note: { en: 'Also Laila Reception, Melbourne, 30 November.', tr: 'Ayrıca 30 Kasım’da Laila Reception, Melbourne.' } },
  { slug: 'isin-karaca-2022', poster: 'isin-karaca-2022', kind: 'promotion', date: '2022-03-25', title: { en: 'Işın Karaca live in Sydney', tr: 'Işın Karaca Sydney konseri' }, venue: 'Club Burwood', partner: 'Diamond Stage Events', artists: ['isin-karaca'] },
  { slug: 'hakan-altun-2020', poster: 'hakan-altun-2020', kind: 'promotion', date: '2020-02-22', title: { en: 'Hakan Altun live in Sydney', tr: 'Hakan Altun Sydney konseri' }, venue: 'Bankstown Sports Club', partner: 'Diamond Stage Events and Turkuaz Nights', artists: ['hakan-altun'], note: { en: 'Also La Mirage, Melbourne, 21 February.', tr: 'Ayrıca 21 Şubat’ta La Mirage, Melbourne.' } },
];

// "Today" in Sydney, so upcoming/past flips at local midnight even when built elsewhere.
export function sydneyToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

export const isUpcoming = (e: EventItem, today = sydneyToday()) => !!e.date && e.date >= today;
export const upcoming = () => events.filter((e) => isUpcoming(e)).sort((a, b) => a.date!.localeCompare(b.date!));
export const past = () => events.filter((e) => !isUpcoming(e));
