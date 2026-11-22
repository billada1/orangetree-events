export type Lang = 'en' | 'tr';
export const langs: Lang[] = ['en', 'tr'];

export const ui = {
  en: {
    siteName: 'Orange Tree Events',
    tagline: 'Turkish and multicultural concerts, comedy and celebrations in Sydney',
    metaDescription: 'Turkish and multicultural concerts, comedy, cultural nights and New Year’s Eve in Sydney since 2013. Every night out also supports community and student organisations.',
    skip: 'Skip to content',
    nav: { on: 'What’s on', past: 'Past events', artists: 'Artists', stories: 'Stories', giving: 'Giving back', partner: 'Partner with us', tickets: 'My tickets', getTickets: 'Get tickets', menu: 'Menu', close: 'Close menu', main: 'Main' },
    hero: { eyebrow: 'Sydney · since 2013', lead: 'Live music, comedy, cultural nights and New Year’s Eve. Every night out also gives back to community and student organisations.', cta: 'See what’s on', prev: 'Previous photo', next: 'Next photo', pause: 'Pause', play: 'Play', photo: 'Photo', of: 'of' },
    intro: { skip: 'Skip intro', replay: 'Replay intro' },
    on: { h: 'What’s on', sub: 'Our shows, and nights we are proud to support', onSale: 'On sale now', support: 'We support', choose: 'Choose a table', details: 'Details', countdownLabel: 'Time until doors open', days: 'days', hours: 'hours', mins: 'mins', secs: 'secs', doors: 'Doors', nextH: 'Next headline concert: announcing soon', nextP: 'Mailing list gets early-bird tickets first, in English or Türkçe.', email: 'Email address', notify: 'Get first notice', emailPh: 'you@example.com' },
    past: { h: 'Every night since 2015', p: 'The shows we presented, every New Year’s Eve, our fundraisers, the tours we helped promote and produce, and the community nights we were proud to support.', filter: 'Filter past events', all: 'All', confirmNote: 'Details marked “to confirm” are being checked against our Instagram and Facebook archives.', toConfirm: 'to confirm', dateToConfirm: 'Date to confirm', soldOut: 'sold out', with: 'with', stat: { presented: 'shows presented', nye: 'New Year’s Eves', supported: 'nights supported', promotion: 'as promotion partner' } },
    kinds: { presented: 'Presented', nye: 'New Year’s Eve', fundraiser: 'Fundraiser', promotion: 'Promotion partner', supported: 'Supported' },
    role: { co: 'Co-presented with', with: 'With', org: 'Organised by', promo: 'Promoted with' },
    artistsUi: { local: 'Sydney acts', localP: 'The local bands and DJs who make our nights.', visiting: 'Visiting artists', follow: 'Instagram', posters: 'Posters', postersP: 'Every night has a poster. Here are some we made, and some we were proud to share.' },
    kindsPlural: { presented: 'Presented', nye: 'New Year’s Eve', fundraiser: 'Fundraisers', promotion: 'Promotion partner', supported: 'Supported' },
    giving: { h: 'Every ticket gives something back', p: 'Proceeds from our events have supported community and student organisations, including ATAM, Orange Tree, ITSA and earthquake appeals.', orgs: ['ATAM', 'Orange Tree', 'ITSA', 'Türkiye earthquake appeal', 'Our Shared Home'] },
    stories: { h: 'Stories', all: 'All stories →', fromArchive: 'From the archive', read: 'Read the story', photos: 'Photos', nightInPhotos: 'The night in photos', ranHow: 'How the night ran' },
    moments: { h: 'Moments', removeQ: 'In a photo and want it removed?', remove: 'Report or remove a photo' },
    partner: { h: 'Partner with us', p: 'Put your business in front of Sydney’s Turkish community at concerts and New Year’s Eve. Thank you to partners including Firebrand and Kekilli Jewellery.', cta: 'Sponsorship enquiries' },
    artist: { withUs: 'With Orange Tree', about: 'About', more: 'More artists', notifyH: (n: string) => `Want ${n} back in Sydney?`, notifyP: 'We’ll email you first if they return, and about similar shows.', notify: 'Notify me', listen: 'Listen' },
    event: { when: 'When', where: 'Where', partnerWith: 'Presented with', past: 'This event has finished.', seeArtist: 'Artist', tickets: 'Tickets', ticketsSoon: 'Table booking opens soon. Join the mailing list for first notice.', addCal: 'Add to calendar' },
    footer: { blurb: 'Turkish and multicultural concerts and celebrations in Sydney since 2013.', events: 'Events', help: 'Help', refunds: 'Tickets and refunds', access: 'Accessibility', contact: 'Contact', family: 'Family', terms: 'Terms of sale', privacy: 'Privacy', ack: 'We acknowledge the Traditional Custodians of the lands where our events take place, and pay our respects to Elders past and present.' },
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    switchTo: 'Türkçe',
  },
  tr: {
    siteName: 'Orange Tree Events',
    tagline: 'Sydney’de Türk ve çok kültürlü konserler, stand-up ve kutlamalar',
    metaDescription: '2013’ten beri Sydney’de Türk ve çok kültürlü konserler, stand-up, kültür geceleri ve yılbaşı kutlamaları. Her etkinliğimiz toplum ve öğrenci kuruluşlarına da katkı sağlar.',
    skip: 'İçeriğe geç',
    nav: { on: 'Etkinlikler', past: 'Geçmiş etkinlikler', artists: 'Sanatçılar', stories: 'Hikâyeler', giving: 'Topluma katkı', partner: 'Sponsorluk', tickets: 'Biletlerim', getTickets: 'Bilet al', menu: 'Menü', close: 'Menüyü kapat', main: 'Ana menü' },
    hero: { eyebrow: 'Sydney · 2013’ten beri', lead: 'Canlı müzik, stand-up, kültür geceleri ve yılbaşı. Her etkinliğimiz toplum ve öğrenci kuruluşlarına da katkı sağlar.', cta: 'Etkinliklere bak', prev: 'Önceki fotoğraf', next: 'Sonraki fotoğraf', pause: 'Duraklat', play: 'Oynat', photo: 'Fotoğraf', of: '/' },
    intro: { skip: 'Girişi geç', replay: 'Girişi tekrar oynat' },
    on: { h: 'Etkinlikler', sub: 'Kendi etkinliklerimiz ve gururla desteklediğimiz geceler', onSale: 'Biletler satışta', support: 'Destekliyoruz', choose: 'Masanı seç', details: 'Ayrıntılar', countdownLabel: 'Kapıların açılmasına kalan süre', days: 'gün', hours: 'saat', mins: 'dk', secs: 'sn', doors: 'Kapılar', nextH: 'Sıradaki büyük konser: yakında açıklanıyor', nextP: 'Erken bilet fırsatları önce e-posta listemize gelir, Türkçe veya İngilizce.', email: 'E-posta adresi', notify: 'İlk ben haberdar olayım', emailPh: 'siz@ornek.com' },
    past: { h: '2015’ten bu yana her gece', p: 'Sunduğumuz konserler, tüm yılbaşı gecelerimiz, bağış etkinliklerimiz, tanıtım ve prodüksiyonuna katkı verdiğimiz turneler ve gururla desteklediğimiz topluluk geceleri.', filter: 'Geçmiş etkinlikleri filtrele', all: 'Tümü', confirmNote: '“Teyit edilecek” bilgiler Instagram ve Facebook arşivlerimizden kontrol ediliyor.', toConfirm: 'teyit edilecek', dateToConfirm: 'Tarih teyit edilecek', soldOut: 'kapalı gişe', with: 'ile', stat: { presented: 'sunduğumuz gösteri', nye: 'yılbaşı gecesi', supported: 'desteklenen gece', promotion: 'tanıtım ortağı olarak' } },
    kinds: { presented: 'Sunduk', nye: 'Yılbaşı', fundraiser: 'Bağış etkinliği', promotion: 'Tanıtım ortağı', supported: 'Destekledik' },
    role: { co: 'Birlikte sunan', with: 'Birlikte', org: 'Organizasyon', promo: 'Tanıtım ortağı olduğumuz organizasyon' },
    artistsUi: { local: 'Sydney’li sanatçılar', localP: 'Gecelerimizi yapan yerel gruplar ve DJ’ler.', visiting: 'Konuk sanatçılar', follow: 'Instagram', posters: 'Afişler', postersP: 'Her gecenin bir afişi var. Bazılarını biz tasarladık, bazılarını gururla paylaştık.' },
    kindsPlural: { presented: 'Sunduklarımız', nye: 'Yılbaşı', fundraiser: 'Bağış etkinlikleri', promotion: 'Tanıtım ortağı', supported: 'Desteklediklerimiz' },
    giving: { h: 'Her bilet topluma bir şey kazandırır', p: 'Etkinliklerimizin geliri ATAM, Orange Tree, ITSA ve deprem yardım kampanyaları gibi toplum ve öğrenci kuruluşlarına destek oldu.', orgs: ['ATAM', 'Orange Tree', 'ITSA', 'Türkiye deprem kampanyası', 'Ortak Evimiz'] },
    stories: { h: 'Hikâyeler', all: 'Tüm hikâyeler →', fromArchive: 'Arşivden', read: 'Hikâyeyi oku', photos: 'Fotoğraflar', nightInPhotos: 'Fotoğraflarla o gece', ranHow: 'Gece nasıl geçti' },
    moments: { h: 'Anlar', removeQ: 'Bir fotoğrafta siz mi varsınız?', remove: 'Fotoğraf bildir veya kaldırt' },
    partner: { h: 'Sponsorluk', p: 'İşletmenizi konserlerde ve yılbaşı gecelerinde Sydney’deki Türk toplumuyla buluşturun. Firebrand ve Kekilli Jewellery başta olmak üzere tüm destekçilerimize teşekkürler.', cta: 'Sponsorluk başvurusu' },
    artist: { withUs: 'Orange Tree ile', about: 'Hakkında', more: 'Diğer sanatçılar', notifyH: (n: string) => `${n} Sydney’e dönsün mü?`, notifyP: 'Yeniden gelirse ve benzer konserler olursa önce size haber verelim.', notify: 'Haber ver', listen: 'Dinle' },
    event: { when: 'Ne zaman', where: 'Nerede', partnerWith: 'Birlikte sunan', past: 'Bu etkinlik sona erdi.', seeArtist: 'Sanatçı', tickets: 'Biletler', ticketsSoon: 'Masa rezervasyonu yakında açılıyor. İlk haber için e-posta listemize katılın.', addCal: 'Takvime ekle' },
    footer: { blurb: '2013’ten beri Sydney’de Türk ve çok kültürlü konserler ve kutlamalar.', events: 'Etkinlikler', help: 'Yardım', refunds: 'Bilet ve iadeler', access: 'Erişilebilirlik', contact: 'İletişim', family: 'Ailemiz', terms: 'Satış koşulları', privacy: 'Gizlilik', ack: 'Etkinliklerimizin yapıldığı toprakların Geleneksel Sahiplerini tanır, geçmiş ve bugünkü büyüklerine saygılarımızı sunarız.' },
    months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    switchTo: 'English',
  },
} as const;

export type UI = (typeof ui)['en'];
export const t = (lang: Lang) => ui[lang] as unknown as UI;

// Path helpers: English lives at the root, Turkish under /tr.
export const href = (lang: Lang, path: string) => (lang === 'tr' ? '/tr' + (path === '/' ? '/' : path) : path);
export const otherLangPath = (lang: Lang, path: string) => (lang === 'tr' ? path.replace(/^\/tr(?=\/|$)/, '') || '/' : '/tr' + path);

export function fmtDate(iso: string, lang: Lang, opts: { weekday?: boolean; year?: boolean } = {}) {
  const d = new Date(iso + 'T12:00:00+11:00');
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-AU', {
    timeZone: 'Australia/Sydney', day: 'numeric', month: 'long',
    ...(opts.year !== false ? { year: 'numeric' } : {}),
    ...(opts.weekday ? { weekday: 'long' } : {}),
  }).format(d);
}
