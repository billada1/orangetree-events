// Copy for the two search landing pages. Facts here must match src/data (events, artists); lists are built from data.
import type { Lang } from './ui';

export type Topic = 'concerts' | 'nye';
type QA = { q: string; a: string; ev?: string }; // ev: only shown while that event is upcoming
type Copy = { slug: string; title: string; meta: string; eyebrow: string; h1: string; lead: string; upH: string; upNone: string; histH: string; histP: string; artistsH: string; faqH: string; faq: QA[]; joinH: string; joinP: string; crumb: string };

export const landing: Record<Topic, Record<Lang, Copy>> = {
  concerts: {
    en: {
      slug: '/turkish-concerts-sydney/', crumb: 'Turkish concerts in Sydney',
      title: 'Turkish concerts in Sydney: what’s on and past shows',
      meta: 'Upcoming Turkish concerts, comedy and cultural nights in Sydney, plus every show Orange Tree Events has presented, promoted or supported since 2014.',
      eyebrow: 'Sydney · since 2014', h1: 'Turkish concerts in Sydney',
      lead: 'Live Turkish music, comedy and cultural nights in Sydney, in one place. Orange Tree Events has presented, promoted and supported them since 2014, from Teoman and maNga to Kibariye and Buray.',
      upH: 'Coming up', upNone: 'No dates are on sale right now. Join the mailing list and you’ll hear first.',
      histH: 'Shows we’ve presented', histP: 'Concerts and comedy we put on ourselves or with partners. The full archive, with filters, is on the past events page.',
      artistsH: 'Artists who’ve played our nights',
      faqH: 'Questions',
      faq: [
        { q: 'Where can I find Turkish concerts in Sydney?', a: 'This page lists the Turkish and multicultural concerts, comedy and cultural nights coming up in Sydney that we present, promote or support. Each one links to its event page with the date, venue and the official ticket seller.' },
        { q: 'How do I buy tickets?', a: 'Use the ticket link on the event page. It goes to the official seller for that night, such as the venue, ATAM or the touring promoter. We list the seller so you always know who you are paying.' },
        { q: 'Are the concerts in Turkish?', a: 'Most artists sing or perform in Turkish. Our pages, emails and help are in English and Turkish.' },
        { q: 'Can children come?', a: 'It depends on the night. Many concerts are at licensed venues and are 18+. New Year’s Eve with ATAM has children’s tickets. The event page gives the age rule for each night.' },
        { q: 'How do I hear about new concerts first?', a: 'Join our mailing list in English or Turkish. New shows and early-bird tickets go there before anywhere else, and you can unsubscribe at any time.' },
        { q: 'I’m an artist or promoter. Can we work together?', a: 'Yes. Send an expression of interest through Work with us and tell us about the artist, dates and cities.' },
      ],
      joinH: 'Hear about the next show first', joinP: 'New concerts and early-bird tickets, in English or Türkçe. One email to confirm, and you can leave any time.',
    },
    tr: {
      slug: '/turkish-concerts-sydney/', crumb: 'Sydney’de Türk konserleri',
      title: 'Sydney’de Türk konserleri: yaklaşan ve geçmiş etkinlikler',
      meta: 'Sydney’de yaklaşan Türk konserleri, stand-up ve kültür geceleri; Orange Tree Events’in 2014’ten bu yana sunduğu, tanıttığı ve desteklediği tüm geceler.',
      eyebrow: 'Sydney · 2014’ten beri', h1: 'Sydney’de Türk konserleri',
      lead: 'Sydney’deki Türkçe canlı müzik, stand-up ve kültür geceleri tek bir yerde. Orange Tree Events, Teoman ve maNga’dan Kibariye ve Buray’a kadar bu geceleri 2014’ten beri sunuyor, tanıtıyor ve destekliyor.',
      upH: 'Yaklaşan etkinlikler', upNone: 'Şu anda satışta olan bir tarih yok. E-posta listemize katılın, ilk siz duyun.',
      histH: 'Sunduğumuz geceler', histP: 'Kendimiz ya da ortaklarımızla düzenlediğimiz konserler ve stand-up geceleri. Filtrelerle birlikte tüm arşiv, geçmiş etkinlikler sayfasında.',
      artistsH: 'Gecelerimizde sahne alan sanatçılar',
      faqH: 'Sık sorulanlar',
      faq: [
        { q: 'Sydney’deki Türk konserlerini nerede bulabilirim?', a: 'Bu sayfada, Sydney’de sunduğumuz, tanıttığımız ya da desteklediğimiz yaklaşan Türk ve çok kültürlü konserler, stand-up ve kültür geceleri yer alıyor. Her biri tarih, mekân ve resmî bilet satıcısının yer aldığı etkinlik sayfasına bağlanıyor.' },
        { q: 'Bileti nasıl alırım?', a: 'Etkinlik sayfasındaki bilet bağlantısını kullanın. Bağlantı o gecenin resmî satıcısına gider: mekân, ATAM ya da turne organizatörü gibi. Kime ödeme yaptığınızı her zaman bilmeniz için satıcıyı açıkça yazıyoruz.' },
        { q: 'Konserler Türkçe mi?', a: 'Sanatçıların çoğu Türkçe şarkı söylüyor ya da gösteri yapıyor. Sayfalarımız, e-postalarımız ve destek Türkçe ve İngilizce.' },
        { q: 'Çocuklar gelebilir mi?', a: 'Geceye göre değişir. Pek çok konser alkol ruhsatlı mekânlarda yapılıyor ve 18 yaş sınırı var. ATAM ile yılbaşı gecesinde çocuk bileti de var. Her gecenin yaş kuralı etkinlik sayfasında yazıyor.' },
        { q: 'Yeni konserleri ilk nasıl duyarım?', a: 'Türkçe ya da İngilizce e-posta listemize katılın. Yeni konserler ve erken bilet fırsatları önce oraya gelir; istediğiniz zaman abonelikten çıkabilirsiniz.' },
        { q: 'Sanatçı ya da organizatörüm. Birlikte çalışabilir miyiz?', a: 'Evet. Bizimle çalışın sayfasından ön başvuru gönderin; sanatçıyı, tarihleri ve şehirleri anlatın.' },
      ],
      joinH: 'Bir sonraki konseri ilk siz duyun', joinP: 'Yeni konserler ve erken bilet fırsatları, Türkçe ya da İngilizce. Onay için tek bir e-posta; istediğiniz zaman ayrılabilirsiniz.',
    },
  },
  nye: {
    en: {
      slug: '/new-years-eve-sydney/', crumb: 'Turkish New Year’s Eve in Sydney',
      title: 'Turkish New Year’s Eve in Sydney with ATAM',
      meta: 'A Turkish New Year’s Eve party in Sydney: dinner, MC, DJ and the midnight countdown at The Renaissance, Lidcombe, with ATAM. Tickets, what’s included and past nights.',
      eyebrow: 'New Year’s Eve · Lidcombe', h1: 'Turkish New Year’s Eve in Sydney',
      lead: 'Dinner, music and the countdown with Sydney’s Turkish community. Orange Tree Events and ATAM host New Year’s Eve at The Renaissance in Lidcombe, and the proceeds go back to the community.',
      upH: 'This year', upNone: 'This year’s night will be announced soon. Join the mailing list and you’ll hear first.',
      histH: 'Every New Year’s Eve with ATAM', histP: 'The nights so far, with the acts who played them.',
      artistsH: 'Who’s played our New Year’s Eves',
      faqH: 'Questions',
      faq: [
        { ev: 'nye-2027', q: 'What’s included?', a: 'For NYE 2027: meze and a three-course dinner, beer, wine and soft drinks, Tahir Bilgiç as MC, DJ Ilka until late, arcade games, raffle prizes and the midnight countdown.' },
        { ev: 'nye-2027', q: 'How much are tickets?', a: 'General $150, VIP $180 and children 5 to 11 from $75. Bookings are handled by ATAM.' },
        { ev: 'nye-2027', q: 'Where is it?', a: 'The Renaissance, Piano Room, 3 New St E, Lidcombe NSW 2141. Doors open at 7pm and the night runs until 1am.' },
        { ev: 'nye-2027', q: 'Is there a dress code?', a: 'NYE 2027 is an All White & Summer night.' },
        { q: 'Where does the money go?', a: 'Proceeds go to Our Shared Home, ATAM’s community premises project.' },
        { ev: 'nye-2027', q: 'Can I add it to my calendar?', a: 'Yes. The event page has an Apple, Outlook and phone calendar file and a Google Calendar link.' },
      ],
      joinH: 'Get first notice for next year', joinP: 'Early-bird tables and lineup news, in English or Türkçe.',
    },
    tr: {
      slug: '/new-years-eve-sydney/', crumb: 'Sydney’de Türk yılbaşı gecesi',
      title: 'Sydney’de ATAM ile Türk yılbaşı gecesi',
      meta: 'Sydney’de Türk yılbaşı partisi: Lidcombe’daki The Renaissance’ta ATAM ile yemek, sunucu, DJ ve geri sayım. Biletler, nelerin dahil olduğu ve geçmiş geceler.',
      eyebrow: 'Yılbaşı · Lidcombe', h1: 'Sydney’de Türk yılbaşı gecesi',
      lead: 'Sydney’deki Türk toplumuyla yemek, müzik ve geri sayım. Orange Tree Events ve ATAM, yılbaşını Lidcombe’daki The Renaissance’ta düzenliyor; gelir topluma geri dönüyor.',
      upH: 'Bu yıl', upNone: 'Bu yılın gecesi yakında açıklanacak. E-posta listemize katılın, ilk siz duyun.',
      histH: 'ATAM ile tüm yılbaşı gecelerimiz', histP: 'Bugüne kadarki geceler ve sahne alan sanatçılar.',
      artistsH: 'Yılbaşı gecelerimizde sahne alanlar',
      faqH: 'Sık sorulanlar',
      faq: [
        { ev: 'nye-2027', q: 'Neler dahil?', a: 'Yılbaşı 2027 için: meze ve üç çeşit akşam yemeği, bira, şarap ve meşrubat, sunucu Tahir Bilgiç, gece boyu DJ Ilka, oyunlar, çekiliş ve geri sayım.' },
        { ev: 'nye-2027', q: 'Biletler ne kadar?', a: 'Genel $150, VIP $180, 5-11 yaş çocuk $75’ten başlayan fiyatlarla. Rezervasyonları ATAM yürütüyor.' },
        { ev: 'nye-2027', q: 'Nerede?', a: 'The Renaissance, Piano Room, 3 New St E, Lidcombe NSW 2141. Kapılar 19.00’da açılıyor, gece 01.00’e kadar sürüyor.' },
        { ev: 'nye-2027', q: 'Kıyafet kuralı var mı?', a: 'Yılbaşı 2027 beyaz ve yaz temalı bir gece.' },
        { q: 'Gelir nereye gidiyor?', a: 'Gelir, ATAM’ın topluluk merkezi projesi Ortak Evimiz’e gidiyor.' },
        { ev: 'nye-2027', q: 'Takvimime ekleyebilir miyim?', a: 'Evet. Etkinlik sayfasında Apple, Outlook ve telefon için takvim dosyası ile Google Takvim bağlantısı var.' },
      ],
      joinH: 'Gelecek yıl için ilk haberi alın', joinP: 'Erken masa fırsatları ve sanatçı haberleri, Türkçe ya da İngilizce.',
    },
  },
};
