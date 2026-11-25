# Invite v4 for Brevo: same content as v3, hosted images, clean links, Brevo personalisation.
# Contact attributes: FIRSTNAME, INVITE_NIGHT ("ilyas-2018" or "tvibes-2019").
import html as H
F = "font-family:Helvetica,Arial,sans-serif"
IMG = "https://orangetree.events/email/"

def U(p, c):
    p, _, frag = p.partition('#')
    base = p if p.startswith('http') else f"https://orangetree.events{p}"
    return base + f"?utm_source=past-buyers&amp;utm_medium=email&amp;utm_campaign=nye-invite-2026-11&amp;utm_content={c}" + (f"#{frag}" if frag else "")

def night(tv, ilyas):
    return '{% if contact.INVITE_NIGHT == "tvibes-2019" %}' + tv + '{% else %}' + ilyas + '{% endif %}'

def page(lang):
    tr = lang == 'tr'
    if tr:
        name = '{{ contact.FIRSTNAME | default : "değerli misafirimiz" }}'
        pre = "31 Aralık, The Renaissance, Lidcombe: ATAM’ın 15. yılı. Masanızı ayırtın."
        hi = f"Merhaba {name},"
        p1 = night("2019’da Coolibah Hotel’deki Turkish Vibes gecesinde", "2018’de Max Watt’s’taki İlyas Yalçıntaş konserinde") + \
             " bizimle olduğunuz için tekrar teşekkür ederiz. Bilet alırken gelecek etkinliklerimizden haberdar olmak istediğinizi belirtmiştiniz; sıradaki gecemiz şu:"
        cap = night("Turkish Vibes, Coolibah Hotel, Kasım 2019", "İlyas Yalçıntaş, Max Watt’s, Aralık 2018")
        pa = "ATAM ile Yılbaşı 2027 afişi: sunucu Tahir Bilgiç ve DJ Ilka, 31 Aralık 2026, 19.00’dan geç saate kadar, ATAM’ın 15. yılı"
        k = "Sırada"; t = "ATAM ile Yılbaşı 2027"; w = "31 Aralık Perşembe · Kapılar 19.00 · The Renaissance, Piano Room, Lidcombe"
        d = "Meze ve üç çeşit akşam yemeği, bira, şarap ve meşrubat, sunucu Tahir Bilgiç ve gece yarısına kadar DJ Ilka. Genel $150, VIP $180, 5-11 yaş çocuklar $75’ten. Gelir ATAM’ın topluluk merkezi projesi Ortak Evimiz’e gidiyor."
        btn = "Masanızı ayırtın"; book = "https://atam.asn.au/tr/nye27/#tickets"; more = "Ayrıntılar"; nye = "/tr/events/nye-2027/"
        site = "Yenilenen sitemizde 2014’ten bu yana tüm gecelerimiz, sanatçı sayfaları ve hikâyeler var:"; home = "/tr/"
        sign = "Saygılarımla,"
        foot = ("Bu e-postayı, bilet alırken gelecek Orange Tree Events etkinliklerinden haberdar olmak istediğiniz için alıyorsunuz. "
                "İstemezseniz <a href=\"{{ unsubscribe }}\" style=\"color:#8A7C74\">abonelikten çıkın</a> ya da “abonelikten çık” yazarak yanıtlayın. "
                f"Aylık bültenimiz için: <a href=\"{U('/tr/subscribe/', 'subscribe')}\" style=\"color:#8A7C74\">orangetree.events/tr/subscribe</a>")
    else:
        name = '{{ contact.FIRSTNAME | default : "there" }}'
        pre = "31 December at The Renaissance, Lidcombe: ATAM’s 15th year. Book your table."
        hi = f"Hi {name},"
        p1 = "Thank you again for joining us for " + night("Turkish Vibes at the Coolibah Hotel in 2019", "İlyas Yalçıntaş at Max Watt’s in 2018") + \
             ". When you booked, you asked to hear about our future events, so here is our next night."
        cap = night("Turkish Vibes, Coolibah Hotel, November 2019", "İlyas Yalçıntaş at Max Watt’s, December 2018")
        pa = "NYE 2027 poster: MC Tahir Bilgiç and DJ Ilka, 31 December 2026, 7pm until late, celebrating 15 years of ATAM"
        k = "Coming up"; t = "NYE 2027 with ATAM"; w = "Thursday 31 December · Doors 7pm · The Renaissance, Piano Room, Lidcombe"
        d = "Meze and a three-course dinner, beer, wine and soft drinks, Tahir Bilgiç as MC and DJ Ilka until late. General $150, VIP $180, children 5 to 11 from $75. Proceeds support Our Shared Home, ATAM’s community premises project."
        btn = "Book your table"; book = "https://atam.asn.au/nye27/#tickets"; more = "Event details"; nye = "/events/nye-2027/"
        site = "Our new website has every night since 2014, with artist pages and stories:"; home = "/"
        sign = "Kind regards,"
        foot = ("You’re receiving this because you asked to hear about future Orange Tree Events when you booked. "
                "To stop, <a href=\"{{ unsubscribe }}\" style=\"color:#8A7C74\">unsubscribe</a> or reply “unsubscribe”. "
                f"For our monthly newsletter, join at <a href=\"{U('/subscribe/', 'subscribe')}\" style=\"color:#8A7C74\">orangetree.events/subscribe</a>")
    photo = night(IMG + "invite-tvibes-2019.jpg", IMG + "invite-maxwatts-2018.jpg")
    return (
        f'<!DOCTYPE html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<meta name="color-scheme" content="light"><title>{H.escape(t)}</title></head>'
        f'<body style="margin:0;padding:0;background:#F6F1EC">'
        f'<div style="display:none;max-height:0;overflow:hidden;opacity:0">{pre}</div>'
        f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#F6F1EC" style="background:#F6F1EC;{F}"><tr><td align="center" style="padding:24px 10px">'
        f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="{F};max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">'
        f'<tr><td bgcolor="#1A1311" style="background:#1A1311;padding:18px 24px"><a href="{U(home, "logo")}"><img src="{IMG}logo.png" width="120" height="35" alt="Orange Tree Events" style="display:block;border:0;width:120px;height:35px"></a></td></tr>'
        f'<tr><td style="padding:24px 24px 6px;font-size:16px;line-height:1.6;color:#1A1311"><p style="margin:0 0 14px">{hi}</p><p style="margin:0 0 18px">{p1}</p></td></tr>'
        f'<tr><td style="padding:0 24px 22px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EFE4DC;border-radius:10px;overflow:hidden">'
        f'<tr><td><a href="{U(nye, "nye-img")}"><img src="{IMG}nye-2027-poster.jpg" width="510" alt="{pa}" style="display:block;width:100%;height:auto;border:0"></a></td></tr>'
        f'<tr><td style="padding:16px 18px 20px;color:#1A1311"><p style="margin:0 0 2px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#BF3E1E;font-weight:bold">{k}</p>'
        f'<p style="margin:0 0 4px;font-size:20px;font-weight:bold">{t}</p><p style="margin:0 0 10px;font-size:14px;color:#6B5A52">{w}</p>'
        f'<p style="margin:0 0 16px;font-size:14px;line-height:1.55">{d}</p>'
        f'<table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-table"><tr><td bgcolor="#BF3E1E" style="background:#BF3E1E;border-radius:999px">'
        f'<a href="{U(book, "book")}" style="display:inline-block;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px;font-size:15px">{btn}</a></td></tr></table>'
        f' &nbsp; <a href="{U(nye, "nye")}" style="color:#BF3E1E;font-weight:bold;font-size:14px">{more} →</a></td></tr></table></td></tr>'
        f'<tr><td style="padding:0 24px 18px"><img src="{photo}" width="510" alt="{cap}" style="display:block;width:100%;height:auto;border:0;border-radius:10px"><p style="margin:6px 0 0;font-size:12px;color:#8A7C74">{cap}</p></td></tr>'
        f'<tr><td style="padding:0 24px 8px;font-size:15px;line-height:1.6;color:#1A1311"><p style="margin:0 0 16px">{site} <a href="{U(home, "site")}" style="color:#BF3E1E">orangetree.events</a></p><p style="margin:0 0 20px">{sign}<br>Bülent Ada<br>Orange Tree Events</p></td></tr>'
        f'<tr><td bgcolor="#FBF8F5" style="padding:14px 24px 18px;background:#FBF8F5;font-size:11px;line-height:1.5;color:#8A7C74">{foot}<br>Orange Tree Group Pty Ltd · ABN 94 617 622 321 · Suite 1, Level 3, 20 Wentworth St, Parramatta NSW 2150 · info@orangetree.events</td></tr>'
        '</table></td></tr></table></body></html>')

if __name__ == '__main__':
    for l in ['en', 'tr']:
        open(f'brevo-{l}.html', 'w').write(page(l))
