# Double opt-in confirmation for the mailing list (one bilingual email, English then Turkish).
# Paste into Brevo as a template tagged "optin"; {{ doubleoptin }} is Brevo's confirmation link.
from build import btn, BASE, ORANGE, INK, PAPER, MUTED, CARD, FONT
subject = 'Confirm your email · E-postanızı onaylayın'
pre = 'One tap to join the Orange Tree Events mailing list. Listemize katılmak için tek dokunuş.'
blocks = [
  ('en', 'Confirm your email', 'Thanks for signing up for news from Orange Tree Events: concerts, comedy, New Year’s Eve and early-bird tickets, in English or Türkçe.', 'Please confirm it’s you. Until you do, we won’t email you.', 'Yes, subscribe me', 'Didn’t sign up? Ignore this email and you won’t hear from us.'),
  ('tr', 'E-postanızı onaylayın', 'Orange Tree Events haberleri için kaydolduğunuz için teşekkürler: konserler, stand-up, yılbaşı ve erken bilet fırsatları, Türkçe ya da İngilizce.', 'Lütfen bu adresin size ait olduğunu onaylayın. Onaylamadığınız sürece size e-posta göndermeyeceğiz.', 'Evet, abone olmak istiyorum', 'Kaydolmadıysanız bu e-postayı dikkate almayın, sizden haber almayacağız.'),
]
def block(lang, h, p1, p2, cta, ign, first):
    border = '' if first else f'border-top:1px solid #F0E6DF;'
    return f'''  <tr><td lang="{lang}" style="background:{CARD};padding:{'36px' if first else '30px'} 36px 30px;{border}font-family:{FONT};color:{INK};" class="px">
    <p class="h1" style="margin:0 0 14px;font-size:28px;line-height:34px;font-weight:800;">{h}</p>
    <p style="margin:0 0 12px;font-size:16px;line-height:25px;">{p1}</p>
    <p style="margin:0 0 24px;font-size:16px;line-height:25px;">{p2}</p>
    {btn(cta, '{{ doubleoptin }}')}
    <p style="margin:20px 0 0;font-size:13px;line-height:20px;color:{MUTED};text-align:center;">{ign}</p>
  </td></tr>'''
body = '\n'.join(block(*b, first=(i == 0)) for i, b in enumerate(blocks))
html = f'''<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>{subject}</title>
<style>
  body {{ margin:0; padding:0; width:100% !important; background:{PAPER}; }}
  a {{ color:{ORANGE}; }}
  @media (max-width:620px) {{ .px {{ padding-left:22px !important; padding-right:22px !important; }} .h1 {{ font-size:24px !important; line-height:30px !important; }} }}
</style></head>
<body style="margin:0;padding:0;background:{PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">{pre}&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:{PAPER};"><tr><td align="center" style="padding:28px 12px 40px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">
  <tr><td style="background:{INK};border-radius:20px 20px 0 0;padding:26px 36px;" class="px">
    <a href="{BASE}/"><img src="{BASE}/email/logo.png" width="150" height="44" alt="Orange Tree Events" style="display:block;border:0;width:150px;height:44px;"></a>
  </td></tr>
{body}
  <tr><td style="background:{CARD};border-radius:0 0 20px 20px;padding:0 36px 30px;font-family:{FONT};" class="px">
    <p style="margin:0;padding-top:20px;border-top:1px solid #F0E6DF;font-size:12px;line-height:18px;color:{MUTED};">Orange Tree Events · Orange Tree Group Pty Ltd · ABN 94 617 622 321 · Sydney NSW · <a href="{BASE}/privacy/" style="color:{MUTED};">Privacy</a> · <a href="{BASE}/tr/privacy/" style="color:{MUTED};">Gizlilik</a></p>
  </td></tr>
</table></td></tr></table>
</body></html>
'''
open('emails/doi.html', 'w').write(html)
print(len(html))
