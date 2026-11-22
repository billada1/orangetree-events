// Bios, facts and listening links for artist pages.
// Sources: Wikipedia and Wikidata (Spotify and YouTube IDs), checked 22 Nov 2026. Photos from Wikimedia Commons carry their credit.
type L = { en: string; tr: string };
export interface ArtistExtra {
  bio?: { en: string[]; tr: string[] };
  facts?: { label: L; value: string }[];
  spotify?: string; // Spotify artist ID
  youtube?: string; // YouTube channel ID (UC…)
  wiki?: { en?: string; tr?: string }; // Wikipedia page titles
  credit?: { by: string; licence: string; file: string }; // Wikimedia Commons photo
  official?: boolean; // the artist's own press photo (as published on their official profiles)
}

const born: L = { en: 'Born', tr: 'Doğum' };
const known: L = { en: 'Known for', tr: 'Bilinen eserleri' };
const awards: L = { en: 'Awards', tr: 'Ödüller' };
const formed: L = { en: 'Formed', tr: 'Kuruluş' };
const also: L = { en: 'Also', tr: 'Ayrıca' };

export const extra: Record<string, ArtistExtra> = {
  'baris-komurcuoglu': { official: true },
  'muharrem-aslan': { credit: { by: 'Dreamboy3143', licence: 'CC BY-SA 4.0', file: 'Muharrem Aslan.jpge.jpg' } },
  'ilyas-yalcintas': { official: true, spotify: '2ekGsQEkeMtYFA16Jjes2M', youtube: 'UCkIBEEidtlqDC-Le3y7qW5w', wiki: { en: 'İlyas Yalçıntaş', tr: 'İlyas Yalçıntaş' } },
  buray: {
    spotify: '1qZ684TB9E1BjH58btdtYd', youtube: 'UCC0ogmiR2DxBMcpBhTitNiA', wiki: { en: 'Buray', tr: 'Buray' },
    credit: { by: 'Vincent Vega', licence: 'CC BY 4.0', file: 'Buray 2024 01.jpg' },
    bio: {
      en: ['Buray Hoşsöz is a Turkish Cypriot pop singer and songwriter, one of the most streamed voices in Turkish pop over the past decade. His songs mix big, warm choruses with heartfelt lyrics, and his live shows turn into one long singalong.'],
      tr: ['Buray Hoşsöz, son on yılda Türkçe popun en çok dinlenen seslerinden biri olan Kıbrıslı Türk şarkıcı ve söz yazarı. Şarkıları güçlü nakaratları içten sözlerle buluşturuyor; konserleri baştan sona hep bir ağızdan söylenen bir geceye dönüşüyor.'],
    },
    facts: [{ label: born, value: '15 June 1984' }, { label: known, value: 'Mecbursun, Sen Sevda Mısın' }],
  },
  teoman: {
    spotify: '40KlwpvpKEQtZTJgbml8lT', youtube: 'UCgBwHAuktyQLOCmx2u4dl3Q', wiki: { en: 'Teoman (singer)', tr: 'Teoman (şarkıcı)' },
    credit: { by: 'Nevit Dilmen', licence: 'CC BY-SA 3.0', file: 'Teoman P1360225.jpg' },
    bio: {
      en: ['Fazlı Teoman Yakupoğlu, known simply as Teoman, is one of Turkish rock’s best-loved singer-songwriters. Since the 1990s his songs about love, loss and city life have become standards, and fans know every word of “Paramparça”, “Senden Önce Senden Sonra”, “17” and “Papatya”.'],
      tr: ['Fazlı Teoman Yakupoğlu, kısaca Teoman, Türk rockunun en sevilen şarkıcı ve söz yazarlarından. 1990’lardan bu yana aşkı, kaybı ve şehir hayatını anlatan şarkıları klasikleşti; hayranları “Paramparça”, “Senden Önce Senden Sonra”, “17” ve “Papatya”nın her sözünü biliyor.'],
    },
    facts: [{ label: born, value: '20 November 1967, Istanbul' }, { label: known, value: 'Paramparça, Senden Önce Senden Sonra, 17, Papatya' }],
  },
  'cahit-berkay': {
    spotify: '2NaZUnDZ5k0I6MjUFmVX8T', wiki: { tr: 'Cahit Berkay' },
    credit: { by: 'Sakhalinio', licence: 'CC BY-SA 4.0', file: 'Cahit Berkay 20191214.jpg' },
    bio: {
      en: ['Cahit Berkay is a Turkish musician and composer and one of the founders of Moğollar, the band that helped create Anatolian rock by blending Turkish folk melodies with rock. He has also written music for many Turkish films.'],
      tr: ['Cahit Berkay, Türk halk ezgilerini rockla buluşturarak Anadolu rockunun doğuşunda rol oynayan Moğollar’ın kurucularından biri olan müzisyen ve besteci. Pek çok Türk filminin müziğine de imza attı.'],
    },
    facts: [{ label: born, value: '3 August 1946' }, { label: also, value: 'Founder of Moğollar' }],
  },
  'emrah-karaca': { official: true,
    spotify: '239hUCsDBFmNlQynSrk6Yl', wiki: { tr: 'Emrah Karaca' },
    bio: {
      en: ['Emrah Karaca is the lead singer of Moğollar. He is the son of the Anatolian rock legend Cem Karaca and the grandson of the actor Toto Karaca, and he carries that family’s songs to new audiences.'],
      tr: ['Emrah Karaca, Moğollar’ın solisti. Anadolu rockunun efsanesi Cem Karaca’nın oğlu, Toto Karaca’nın torunu; ailesinin şarkılarını yeni kuşaklara taşıyor.'],
    },
    facts: [{ label: born, value: '1976' }, { label: also, value: 'Lead singer of Moğollar' }],
  },
  'tibet-agirtan': { official: true,
    spotify: '49EEjGBTJY89TVzYfat8OM', youtube: 'UCVREMvYa56TANTvToPRjtBA', wiki: { tr: 'Tibet Ağırtan' },
    bio: {
      en: ['Tibet Ağırtan is a Turkish rock musician, known as the voice of Mavi Sakal. He first played in school bands at Tarsus American College and went on to become a familiar name in Turkish rock.'],
      tr: ['Tibet Ağırtan, Mavi Sakal’ın sesi olarak tanınan Türk rock müzisyeni. Müzikle Tarsus Amerikan Koleji’ndeki okul gruplarında tanıştı ve Türk rockunun bilinen isimlerinden biri oldu.'],
    },
    facts: [{ label: born, value: '1965' }],
  },
  'yilmaz-erdogan': { credit: { by: '25 Film', licence: 'CC BY 3.0', file: 'Yılmaz Erdoğan.jpg' },
    wiki: { en: 'Yılmaz Erdoğan', tr: 'Yılmaz Erdoğan' },
    bio: {
      en: ['Yılmaz Erdoğan is a Turkish filmmaker, actor and poet. He wrote and starred in the comedy series Bir Demet Tiyatro, directed the box-office hit Vizontele and founded BKM. He won Best Supporting Actor at the Australian AACTA Awards for The Water Diviner.', 'Münaşaka, the one-man show he brought to Sydney, is his evening of stories, poems and stand-up.'],
      tr: ['Yılmaz Erdoğan; yönetmen, oyuncu ve şair. Bir Demet Tiyatro’yu yazıp oynadı, gişe rekorları kıran Vizontele’yi yönetti ve BKM’yi kurdu. Su Elçisi (The Water Diviner) ile Avustralya AACTA Ödülleri’nde En İyi Yardımcı Erkek Oyuncu ödülünü kazandı.', 'Sydney’ye getirdiği Münaşaka; hikâye, şiir ve stand-up’tan oluşan tek kişilik gösterisi.'],
    },
    facts: [{ label: born, value: '4 November 1967' }, { label: known, value: 'Vizontele, Bir Demet Tiyatro, The Water Diviner' }, { label: awards, value: 'AACTA Best Supporting Actor' }],
  },
  'koray-avci': { official: true,
    spotify: '3sV7ijrP5xMHgWRlOnPTCi', wiki: { en: 'Koray Avcı (musician)', tr: 'Koray Avcı (müzisyen)' },
    bio: {
      en: ['Koray Avcı is a Turkish singer known for warm, acoustic takes on Turkish folk songs alongside his own music. His unplugged shows are intimate nights built around guitar and voice.'],
      tr: ['Koray Avcı, kendi şarkılarının yanında türkülere getirdiği sıcak, akustik yorumlarla tanınan şarkıcı. Unplugged konserleri gitar ve sesin öne çıktığı samimi gecelerdir.'],
    },
    facts: [{ label: born, value: '1984' }],
  },
  kibariye: { official: true,
    spotify: '1btod3aNfVEYNrEzIQgx90', wiki: { en: 'Kibariye', tr: 'Kibariye' },
    bio: {
      en: ['Kibariye, born Bahriye Tokmak, is one of Türkiye’s best-known arabesque-pop singers, loved for her powerful voice and emotional ballads over a career of more than four decades.'],
      tr: ['Asıl adı Bahriye Tokmak olan Kibariye, güçlü sesi ve duygusal şarkılarıyla kırk yılı aşkın kariyeri boyunca sevilen, Türkiye’nin en tanınmış arabesk-pop şarkıcılarından.'],
    },
    facts: [{ label: born, value: '10 August 1960' }],
  },
  'haluk-levent': { official: true,
    spotify: '1UV3ii5FWWXF3jkZVeA2bb', youtube: 'UCpIX4bNRuoEfbAiirr5udhA', wiki: { en: 'Haluk Levent', tr: 'Haluk Levent' },
    bio: {
      en: ['Haluk Levent is a Turkish rock singer who helped revive Anatolian rock in the 1990s. Beyond music, he is known for his humanitarian work: he founded the aid organisation AHBAP, and in 2023 Time named him one of the 100 most influential people in the world.'],
      tr: ['Haluk Levent, 1990’larda Anadolu rockunu yeniden canlandıran isimlerden biri. Müziğin yanında insani yardım çalışmalarıyla da tanınıyor: AHBAP Derneği’ni kurdu ve 2023’te Time dergisi onu dünyanın en etkili 100 kişisi arasında gösterdi.'],
    },
    facts: [{ label: born, value: '1968, Adana' }, { label: also, value: 'Founder of AHBAP' }],
  },
  manga: {
    spotify: '7rEIUw67hRTgievwuKQGSj', youtube: 'UCjT3Hl9FdnyeP7WYpbIMykA', wiki: { en: 'Manga (band)', tr: 'MaNga' },
    bio: {
      en: ['maNga is a Turkish rock band from Ankara that fuses Anatolian melodies with alternative rock, rap and electronics. In 2009 they won Best European Act at the MTV Europe Music Awards, and in 2010 they came second at Eurovision with “We Could Be the Same”.'],
      tr: ['maNga, Anadolu ezgilerini alternatif rock, rap ve elektronik müzikle harmanlayan Ankaralı rock grubu. 2009’da MTV Avrupa Müzik Ödülleri’nde En İyi Avrupa Grubu seçildi, 2010’da “We Could Be the Same” ile Eurovision’da ikinci oldu.'],
    },
    facts: [{ label: formed, value: '2001, Ankara' }, { label: awards, value: 'MTV EMA Best European Act (2009)' }, { label: known, value: 'We Could Be the Same, Bir Kadın Çizeceksin, Dursun Zaman' }],
  },
  eypio: {
    spotify: '6h5P3J0j1x2lhiDk9w4deZ', youtube: 'UCQbWGmPkJgkWo0yKlbv8WVQ', wiki: { en: 'Eypio', tr: 'Eypio' },
    credit: { by: 'Shadow4dark', licence: 'CC0', file: 'Eypio on 2024.jpg' },
    bio: {
      en: ['Eypio, born Abdurrahim Akça, is a Turkish rapper, singer and songwriter whose melodic hooks took Turkish rap to a mainstream audience.'],
      tr: ['Asıl adı Abdurrahim Akça olan Eypio, melodik nakaratlarıyla Türkçe rapi geniş kitlelere taşıyan rapçi, şarkıcı ve söz yazarı.'],
    },
    facts: [{ label: born, value: '2 February 1983' }],
  },
  'emre-aydin': { official: true,
    spotify: '66vIaZFb8okZH0npc4eQ5q', youtube: 'UCQ4O4hk_MIJFRIe0rAHNXdg', wiki: { en: 'Emre Aydın', tr: 'Emre Aydın' },
    bio: {
      en: ['Emre Aydın is a Turkish rock singer-songwriter and the former lead singer of 6. Cadde. His solo debut, Afili Yalnızlık, made him one of Turkish rock’s biggest names, and in 2008 he won Europe’s Favourite Act at the MTV Europe Music Awards.'],
      tr: ['Emre Aydın, 6. Cadde’nin eski solisti olan rock şarkıcısı ve söz yazarı. İlk solo albümü Afili Yalnızlık onu Türk rockunun en büyük isimlerinden biri yaptı; 2008’de MTV Avrupa Müzik Ödülleri’nde Avrupa’nın En Sevilen Sanatçısı seçildi.'],
    },
    facts: [{ label: born, value: '2 February 1981, Isparta' }, { label: known, value: 'Afili Yalnızlık, Bu Yağmurlar, Eyvah' }, { label: awards, value: 'MTV EMA Europe’s Favourite Act (2008)' }],
  },
  'oguz-aksac': { official: true,
    spotify: '0rs9X2h1jre7d0DdhPznzy', wiki: { tr: 'Oğuz Aksaç' },
    bio: {
      en: ['Oğuz Aksaç is a Turkish folk singer and bağlama player. In 1994 he co-founded Grup Çığ with his school friend Mustafa Özarslan, recording four albums with the group before going solo in 2004.'],
      tr: ['Oğuz Aksaç, Türk halk müziği sanatçısı ve bağlama icracısı. 1994’te lise arkadaşı Mustafa Özarslan ile Grup Çığ’ı kurdu; grupla dört albüm yaptıktan sonra 2004’te solo kariyerine başladı.'],
    },
    facts: [{ label: born, value: '4 September 1974' }, { label: also, value: 'Co-founder of Grup Çığ' }],
  },
  'sevcan-orhan': { official: true,
    youtube: 'UCTh4VzRa50H-bGJM0E7Lhvg', wiki: { tr: 'Sevcan Orhan' },
    bio: {
      en: ['Sevcan Orhan is a Turkish folk singer who trained in bağlama and music from a young age. Her clear, heartfelt voice has made her one of the best-loved interpreters of türkü today.'],
      tr: ['Sevcan Orhan, küçük yaştan bağlama ve müzik eğitimi alan türkü sanatçısı. Duru ve içten sesiyle günümüzün en sevilen türkü yorumcularından.'],
    },
    facts: [{ label: born, value: '16 August 1982' }],
  },
  'erkan-kolcak-kostendil': {
    wiki: { en: 'Erkan Kolçak Köstendil', tr: 'Erkan Kolçak Köstendil' },
    bio: {
      en: ['Erkan Kolçak Köstendil is a Turkish actor and director and a former footballer, best known as Vartolu in the hit series Çukur.'],
      tr: ['Erkan Kolçak Köstendil, en çok Çukur dizisindeki Vartolu rolüyle tanınan oyuncu, yönetmen ve eski futbolcu.'],
    },
    facts: [{ label: born, value: '16 January 1983' }, { label: known, value: 'Çukur (Vartolu)' }],
  },
  'gulben-ergen': { official: true,
    spotify: '6hypPYDPSsgioRRfBXve38', youtube: 'UCEIRl6s6cLBZrDsfKYjSsYA', wiki: { en: 'Gülben Ergen', tr: 'Gülben Ergen' },
    bio: {
      en: ['Gülben Ergen is a Turkish singer, actress and former model. After winning hearts as an actress, including a Golden Butterfly for the comedy series Dadı, she became one of Turkish pop’s biggest stage performers.'],
      tr: ['Gülben Ergen; şarkıcı, oyuncu ve eski manken. Dadı dizisiyle Altın Kelebek kazandığı oyunculuk kariyerinin ardından Türk popunun en güçlü sahne isimlerinden biri oldu.'],
    },
    facts: [{ label: born, value: '25 August 1972' }, { label: awards, value: 'Golden Butterfly, Best Actress (2001)' }],
  },
  'isin-karaca': {
    spotify: '0iKWCp8QXDXAD3wzFrExYr', youtube: 'UCAu0Y2lC-A6YM2BAKnycxMQ', wiki: { en: 'Işın Karaca', tr: 'Işın Karaca' },
    credit: { by: 'Cem Bayoğlu', licence: 'CC BY-SA 4.0', file: 'Işın Karaca.jpg' },
    bio: {
      en: ['Işın Karaca is a Turkish Cypriot singer known for her wide-ranging voice, moving easily between pop, ballads and Turkish classics.'],
      tr: ['Işın Karaca, pop, slow şarkılar ve Türk sanat müziği klasikleri arasında rahatça gezinen geniş sesiyle tanınan Kıbrıslı Türk şarkıcı.'],
    },
    facts: [{ label: born, value: '7 March 1973' }],
  },
  'hakan-altun': { official: true,
    wiki: { en: 'Hakan Altun', tr: 'Hakan Altun' },
    bio: {
      en: ['Hakan Altun is a Turkish singer, songwriter and instrumentalist from Istanbul. Trained in traditional Turkish music from childhood, he is loved for his rich voice and emotional ballads.'],
      tr: ['Hakan Altun, İstanbullu şarkıcı, söz yazarı ve çalgıcı. Çocukluğundan itibaren Türk müziği eğitimi aldı; güçlü sesi ve duygusal şarkılarıyla seviliyor.'],
    },
    facts: [{ label: born, value: '13 August 1972, Istanbul' }],
  },
  'selcuk-balci': { official: true,
    spotify: '4Xm86XAvDYWh36Z98FvKjc', wiki: { tr: 'Selçuk Balcı' },
    bio: {
      en: ['Selçuk Balcı is a Black Sea folk musician from Çayeli, Rize. He brings horon and Black Sea türkü to life with kemençe and tulum, and his concerts turn into dance floors.'],
      tr: ['Selçuk Balcı, Rize Çayeli’nden Karadeniz müzisyeni. Horonu ve Karadeniz türkülerini kemençe ve tulumla canlandırıyor; konserleri kısa sürede piste dönüşüyor.'],
    },
    facts: [{ label: born, value: '4 July 1988, Çayeli, Rize' }],
  },
  'mehmet-erdem': { official: true,
    spotify: '0ylYRIvKTpv9uvTfKbYjM0', youtube: 'UCrEdrlCaqUeikpijyg-Bn1A', wiki: { en: 'Mehmet Erdem', tr: 'Mehmet Erdem (şarkıcı)' },
    bio: {
      en: ['Mehmet Erdem is a Turkish singer-songwriter and musician, best known for “Herkes Aynı Hayatta”. His gentle, soulful songs have made him a favourite at concerts in Türkiye and abroad.'],
      tr: ['Mehmet Erdem, en çok “Herkes Aynı Hayatta” ile tanınan şarkıcı, söz yazarı ve müzisyen. Yumuşak ve içten şarkılarıyla yurt içinde ve dışında konserlerin sevilen ismi.'],
    },
    facts: [{ label: known, value: 'Herkes Aynı Hayatta' }],
  },
  'burak-bulut': { official: true,
    wiki: { tr: 'Burak Bulut' },
    bio: {
      en: ['Burak Bulut is a Turkish pop singer best known for his hit collaborations with Kurtuluş Kuş.'],
      tr: ['Burak Bulut, özellikle Kurtuluş Kuş ile yaptığı sevilen ortak şarkılarla tanınan pop şarkıcısı.'],
    },
    facts: [{ label: born, value: '26 September 1996' }],
  },
  'tahir-bilgic': {
    wiki: { en: 'Tahir Bilgiç' },
    bio: {
      en: ['Tahir Bilgiç is an Australian comedian and actor. He has written, directed and starred in live shows including Lord of the Kebabs, From Lebanon With Love and Straight Outta Compo, appeared in Australian film and TV, and co-created Here Come the Habibs.'],
      tr: ['Tahir Bilgiç, Avustralyalı komedyen ve oyuncu. Lord of the Kebabs, From Lebanon With Love ve Straight Outta Compo gibi gösterileri yazdı, yönetti ve sahneledi; Avustralya film ve dizilerinde rol aldı ve Here Come the Habibs’in yaratıcılarından biri oldu.'],
    },
    facts: [{ label: born, value: '12 December 1970' }, { label: known, value: 'Here Come the Habibs' }],
  },
};
