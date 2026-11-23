// GA4 loader. Nothing loads when the visitor has opted out here, or their browser sends GPC or Do Not Track.
export const OPT_KEY = 'ot-analytics';

export function analyticsAllowed(): boolean {
  let off = false;
  try { off = localStorage.getItem(OPT_KEY) === 'off'; } catch {}
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return !off && n.globalPrivacyControl !== true && n.doNotTrack !== '1';
}

type G = (...a: unknown[]) => void;

export function initAnalytics() {
  const id = document.querySelector('meta[name="ot-ga"]')?.getAttribute('content');
  if (!id || !analyticsAllowed()) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: G };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() { w.dataLayer.push(arguments); } as G;
  const gtag = w.gtag;
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('js', new Date());
  gtag('config', id, { allow_google_signals: false, allow_ad_personalization_signals: false });

  // Events queue in dataLayer straight away; the Google script itself loads after the page has settled
  // (or on the first tap, scroll or key press), so it never competes with first paint or input.
  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  };
  const opts = { once: true, passive: true } as const;
  ['pointerdown', 'keydown', 'scroll'].forEach((t) => addEventListener(t, load, opts));
  const later = () => setTimeout(() => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(load, { timeout: 3000 }) : load()), 4000);
  if (document.readyState === 'complete') later(); else addEventListener('load', later, { once: true });

  // Key events: form sends land on /thanks/ with a marker in the address.
  const q = new URLSearchParams(location.search);
  if (/\/thanks\/$/.test(location.pathname) && !q.has('error')) {
    if (q.get('sent') === 'enquiry') gtag('event', 'generate_lead', { form: q.get('topic') || 'enquiry' });
    else if (q.has('confirmed')) gtag('event', 'sign_up', { method: 'email_confirmed' });
    else gtag('event', 'sign_up', { method: 'email' });
  }
  // Ticket clicks to partner box offices.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a[data-ticket]') as HTMLAnchorElement | null;
    if (a) gtag('event', 'begin_checkout', { event_slug: a.dataset.ticket, link_url: a.href });
    const c = (e.target as Element).closest?.('a[data-cal]') as HTMLAnchorElement | null;
    if (c) gtag('event', 'add_to_calendar', { method: c.dataset.cal, page_path: location.pathname });
  });
}
