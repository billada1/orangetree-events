# Builds the one-off past-buyer invite emails (EN and TR) as table-based HTML with inline styles,
# ready to paste into Brevo ("Paste your code"). Images are served from https://orangetree.events/email/.
import html
BASE = 'https://orangetree.events'
ORANGE, INK, PAPER, MUTED, CARD = '#F05A28', '#1A1311', '#FFF8F3', '#7A6A62', '#FFFFFF'
FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"
T = {
 'en': dict(lang='en', subject='You came to one of our nights. Can we stay in touch?', pre='One email, one question, and NYE 2027 with ATAM.',
   hi='Hi {{ contact.FIRSTNAME | default : "there" }},',
   p1='You bought tickets from Orange Tree Events for {{ contact.LAST_EVENT | default : "one of our nights" }}. Thank you for being part of it.',
   p2='We’ve rebuilt orangetree.events. It now has every concert, comedy night and New Year’s Eve we’ve run or supported since 2014, plus artist pages and stories from the nights.',
   p3='We’re writing once to ask whether you’d like to hear about future events. If you don’t say yes, we won’t email you again.',
   yes='Yes, keep me posted', yesUrl=f'{BASE}/?utm_source=invite&utm_medium=email&utm_campaign=past-buyers#stay-in-touch',
   kicker='COMING UP', ev='NYE 2027 · ATAM’s 15th year', when='Thursday 31 December · Doors 7pm', where='The Renaissance Piano Room, Lidcombe',
   desc='Meze and a three-course dinner, Tahir Bilgiç as MC and DJ Ilka until late. Proceeds go to Our Shared Home, ATAM’s community premises project.',
   price='General $150 · VIP $180 · Children 5 to 11 from $75', book='Book NYE 2027', bookUrl='https://atam.asn.au/nye27/?utm_source=orangetree&utm_medium=email&utm_campaign=past-buyers',
   site='Visit orangetree.events', siteUrl=f'{BASE}/?utm_source=invite&utm_medium=email&utm_campaign=past-buyers',
   sign='Thanks,<br>Bülent and the Orange Tree Events team',
   foot='You’re getting this one-off email because you bought tickets from Orange Tree Events at orangetree.events.',
   unsub='Unsubscribe', alt='Guests dancing at Orange Tree’s New Year’s Eve with ATAM'),
 'tr': dict(lang='tr', subject='Gecelerimizden birine geldiniz. İletişimde kalalım mı?', pre='Tek bir e-posta, tek bir soru ve ATAM ile Yılbaşı 2027.',
   hi='Merhaba {{ contact.FIRSTNAME | default : "değerli misafirimiz" }},',
   p1='Orange Tree Events’ten {{ contact.LAST_EVENT | default : "gecelerimizden biri" }} için bilet almıştınız. O gecenin parçası olduğunuz için teşekkür ederiz.',
   p2='orangetree.events’i yeniledik. 2014’ten bu yana düzenlediğimiz ya da desteklediğimiz tüm konserler, stand-up geceleri ve yılbaşı kutlamaları, sanatçı sayfaları ve gecelerden hikâyeler artık burada.',
   p3='Size yalnızca bir kez, gelecek etkinliklerden haberdar olmak isteyip istemediğinizi sormak için yazıyoruz. “Evet” demezseniz size bir daha e-posta göndermeyeceğiz.',
   yes='Evet, haberdar olmak istiyorum', yesUrl=f'{BASE}/tr/?utm_source=invite&utm_medium=email&utm_campaign=past-buyers#stay-in-touch',
   kicker='SIRADA', ev='Yılbaşı 2027 · ATAM’ın 15. yılı', when='31 Aralık Perşembe · Kapılar 19.00', where='The Renaissance Piano Room, Lidcombe',
   desc='Meze ve üç çeşit akşam yemeği, sunucu Tahir Bilgiç ve gece boyu DJ Ilka. Gelir, ATAM’ın topluluk merkezi projesi Ortak Evimiz’e gidiyor.',
   price='Genel $150 · VIP $180 · 5-11 yaş çocuk $75’ten', book='Yılbaşı 2027 için yer ayırtın', bookUrl='https://atam.asn.au/nye27/?utm_source=orangetree&utm_medium=email&utm_campaign=past-buyers',
   site='orangetree.events’i ziyaret edin', siteUrl=f'{BASE}/tr/?utm_source=invite&utm_medium=email&utm_campaign=past-buyers',
   sign='Teşekkürler,<br>Bülent ve Orange Tree Events ekibi',
   foot='Bu tek seferlik e-postayı, orangetree.events üzerinden Orange Tree Events’ten bilet aldığınız için alıyorsunuz.',
   unsub='Abonelikten çık', alt='ATAM ile Orange Tree yılbaşı gecesinde dans eden konuklar'),
}
def btn(label, url, solid=True):
    bg, fg, bd = (ORANGE, '#FFFFFF', ORANGE) if solid else ('#FFFFFF', INK, '#E9DCD3')
    return f'''<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;"><tr><td style="border-radius:999px;background:{bg};border:1.5px solid {bd};">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="{url}" style="height:50px;v-text-anchor:middle;width:300px;" arcsize="50%" stroke="f" fillcolor="{bg}"><center style="color:{fg};font-family:Arial;font-size:16px;font-weight:bold;">{label}</center></v:roundrect><![endif]-->
<!--[if !mso]><!--><a href="{url}" style="display:inline-block;padding:15px 30px;font-family:{FONT};font-size:16px;font-weight:700;line-height:20px;color:{fg};text-decoration:none;border-radius:999px;">{label}&nbsp;&rarr;</a><!--<![endif]-->
</td></tr></table>'''
def build(t):
    return f'''<!DOCTYPE html>
<html lang="{t['lang']}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>{html.escape(t['subject'])}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body {{ margin:0; padding:0; width:100% !important; background:{PAPER}; }}
  a {{ color:{ORANGE}; }}
  @media (max-width:620px) {{ .px {{ padding-left:22px !important; padding-right:22px !important; }} .h1 {{ font-size:26px !important; line-height:32px !important; }} .ev {{ font-size:22px !important; }} }}
</style></head>
<body style="margin:0;padding:0;background:{PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">{t['pre']}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:{PAPER};"><tr><td align="center" style="padding:28px 12px 40px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">
  <tr><td style="background:{INK};border-radius:20px 20px 0 0;padding:26px 36px;" class="px">
    <a href="{t['siteUrl']}"><img src="{BASE}/email/logo.png" width="150" height="44" alt="Orange Tree Events" style="display:block;border:0;width:150px;height:44px;"></a>
  </td></tr>
  <tr><td style="background:{CARD};padding:38px 36px 10px;font-family:{FONT};color:{INK};" class="px">
    <p style="margin:0 0 18px;font-size:18px;line-height:28px;font-weight:700;">{t['hi']}</p>
    <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:#3A2E29;">{t['p1']}</p>
    <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:#3A2E29;">{t['p2']}</p>
    <p style="margin:0 0 28px;font-size:16px;line-height:26px;color:#3A2E29;">{t['p3']}</p>
    {btn(t['yes'], t['yesUrl'])}
    <p style="margin:34px 0 0;height:1px;line-height:1px;font-size:1px;background:#F0E5DD;">&nbsp;</p>
  </td></tr>
  <tr><td style="background:{CARD};padding:28px 36px 0;" class="px">
    <a href="{t['bookUrl']}"><img src="{BASE}/email/nye-2027.jpg" width="528" alt="{html.escape(t['alt'])}" style="display:block;width:100%;max-width:528px;height:auto;border:0;border-radius:16px;"></a>
  </td></tr>
  <tr><td style="background:{CARD};padding:22px 36px 34px;font-family:{FONT};color:{INK};" class="px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;font-weight:700;color:{ORANGE};">{t['kicker']}</p>
    <p class="ev" style="margin:0 0 8px;font-size:26px;line-height:32px;font-weight:800;text-transform:uppercase;letter-spacing:.3px;">{t['ev']}</p>
    <p style="margin:0 0 2px;font-size:15px;line-height:22px;font-weight:700;">{t['when']}</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:22px;color:{MUTED};">{t['where']}</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:24px;color:#3A2E29;">{t['desc']}</p>
    <p style="margin:0 0 24px;font-size:14px;line-height:22px;font-weight:700;color:{INK};background:#FFF1E8;border-radius:10px;padding:10px 14px;">{t['price']}</p>
    {btn(t['book'], t['bookUrl'])}
    <p style="margin:30px 0 0;font-size:16px;line-height:26px;color:#3A2E29;">{t['sign']}</p>
  </td></tr>
  <tr><td style="background:{INK};border-radius:0 0 20px 20px;padding:24px 36px;font-family:{FONT};" class="px">
    <p style="margin:0 0 10px;font-size:14px;line-height:20px;"><a href="{t['siteUrl']}" style="color:#FFB199;font-weight:700;text-decoration:none;">{t['site']} &rarr;</a> &nbsp; <a href="https://www.instagram.com/orangetree.events/" style="color:#FFB199;font-weight:700;text-decoration:none;">Instagram</a></p>
    <p style="margin:0;font-size:12px;line-height:19px;color:#BFAFA6;">{t['foot']}<br>Orange Tree Group Pty Ltd · ABN 94 617 622 321 · Sydney NSW · <a href="mailto:info@orangetree.events" style="color:#BFAFA6;">info@orangetree.events</a><br><a href="{{{{ unsubscribe }}}}" style="color:#BFAFA6;">{t['unsub']}</a></p>
  </td></tr>
</table></td></tr></table>
</body></html>
'''
for k, t in T.items():
    open(f'emails/invite-{k}.html', 'w').write(build(t))
    print('wrote', k, t['subject'])
