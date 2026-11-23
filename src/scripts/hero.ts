// Hero slideshow: slow, cinematic transitions drawn on a 2D canvas (soft dissolve, feathered light sweep, focus pull)
// with a gentle Ken Burns drift. Progressive enhancement: the first photo is a real <picture>; the canvas fades in over it.
// Pauses off-screen and in background tabs; reduced motion gets a plain crossfade and starts paused.
// Between transitions the drift is a compositor animation, so the canvas is only redrawn while photos change.

type Slide = { src: string; big?: string; cap: string; alt: string; px: number };
type Fx = 'dissolve' | 'sweep' | 'focus' | 'fade';
const DUR: Record<Fx, number> = { dissolve: 2400, sweep: 2800, focus: 2600, fade: 1200 };
const HOLD = 7600;
const ZOOM = .06;
const CYCLE: Fx[] = ['dissolve', 'sweep', 'focus'];

const ease = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mk = (w: number, h: number) => Object.assign(document.createElement('canvas'), { width: w, height: h });

function cover(ctx: CanvasRenderingContext2D, img: CanvasImageSource & { naturalWidth?: number; naturalHeight?: number; width?: number; height?: number }, w: number, h: number, zoom: number, panx: number) {
  const iw = (img as HTMLImageElement).naturalWidth || (img as HTMLCanvasElement).width, ih = (img as HTMLImageElement).naturalHeight || (img as HTMLCanvasElement).height;
  if (!iw || !ih) return;
  const s = Math.max(w / iw, h / ih) * zoom, dw = iw * s, dh = ih * s;
  ctx.drawImage(img, (w - dw) / 2 + panx, (h - dh) / 2, dw, dh);
}

export function mountHero() {
  const root = document.querySelector<HTMLElement>('[data-hero]');
  const canvas = root?.querySelector<HTMLCanvasElement>('canvas.stage');
  const intro = document.querySelector<HTMLElement>('[data-intro]');
  if (!root || !canvas) return;

  let reduced = false;
  try { reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch {}

  // Intro: once every 30 days per browser, never with reduced motion or Data Saver (keeps repeat visits instant).
  let seen = false;
  try {
    const last = Number(localStorage.getItem('ot-intro') || 0);
    seen = Date.now() - last < 30 * 864e5 || !!(navigator as any).connection?.saveData;
    if (!seen) localStorage.setItem('ot-intro', String(Date.now()));
  } catch {}
  let onIntroEnd = () => {};
  const endIntro = () => { intro?.classList.add('gone'); onIntroEnd(); };
  if (intro) {
    if (seen || reduced) endIntro();
    else {
      intro.querySelector('[data-skip-intro]')?.addEventListener('click', endIntro);
      intro.addEventListener('animationend', (e) => { if ((e as AnimationEvent).animationName.includes('iris')) endIntro(); });
      setTimeout(endIntro, 3700);
    }
  }
  document.querySelector('[data-replay-intro]')?.addEventListener('click', () => {
    if (!intro || reduced) return;
    intro.classList.remove('gone');
    intro.style.animation = 'none'; void intro.offsetWidth; intro.style.animation = '';
    scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(endIntro, 3700);
  });

  const slides: Slide[] = JSON.parse(root.dataset.slides || '[]');
  const L = JSON.parse(root.dataset.labels || '{}');
  if (slides.length < 2) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const capEl = root.querySelector<HTMLElement>('[data-cap]')!;
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-pause]')!;
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-dot]')];

  let W = 0, H = 0, cssW = 1;
  const resize = () => {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.max(2, Math.min(2200, Math.round(r.width * dpr))), h = Math.max(2, Math.round(r.height * dpr));
    cssW = r.width || 1;
    if (w === W && h === H) return;
    canvas.width = W = w; canvas.height = H = h;
    if (mode === 'hold' && ready) paintHold();
  };

  // Slide 0 reuses the photo already on screen (no second download). Others load one ahead, sized to the screen.
  const still = root.querySelector<HTMLImageElement>('.still img, img.still');
  const imgs: HTMLImageElement[] = slides.map((_, i) => (i === 0 && still ? still : new Image()));
  const load = (i: number) => {
    const im = imgs[i];
    if (im.src) return;
    im.decoding = 'async';
    im.src = W > 1100 && slides[i].big ? slides[i].big! : slides[i].src;
  };
  const ok = (i: number) => imgs[i].complete && imgs[i].naturalWidth > 0;
  const idle = (cb: () => void) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(cb, { timeout: 4000 }) : setTimeout(cb, 1500));

  let cur = 0, next = 0, mode: 'hold' | 'trans' = 'hold', t0 = 0, last = 0, visible = true, paused = reduced, ready = false, fx: Fx = 'fade', fxCount = 0;
  let A: HTMLCanvasElement, B: HTMLCanvasElement, drift: Animation | null = null, raf = 0, waiting = false;
  let introOn = !!intro && !intro.classList.contains('gone');

  const hasFilter = (() => { try { const c = mk(1, 1).getContext('2d')!; c.filter = 'blur(2px)'; return c.filter === 'blur(2px)'; } catch { return false; } })();
  let M: HTMLCanvasElement | null = null;
  const snapshot = (i: number, zoom: number, pan: number) => {
    const c = mk(W, H), x = c.getContext('2d')!;
    x.fillStyle = '#0D0B0A'; x.fillRect(0, 0, W, H); cover(x, imgs[i], W, H, zoom, pan); return c;
  };
  const drawA = (p: number) => { ctx.fillStyle = '#0D0B0A'; ctx.fillRect(0, 0, W, H); cover(ctx, A, W, H, 1 + .015 * p, 0); };
  const renderDissolve = (p: number) => {
    drawA(p);
    ctx.globalAlpha = eSine(p); cover(ctx, B, W, H, 1.035 - .035 * ease(p), 0); ctx.globalAlpha = 1;
  };
  const renderSweep = (p: number) => {
    // A soft band of light travels across; the new photo is revealed behind its feathered edge.
    drawA(p);
    if (!M || M.width !== W || M.height !== H) M = mk(W, H);
    const m = M.getContext('2d')!, k = ease(p), band = .38, x0 = (-band + k * (1 + band * 2)) * W;
    m.globalCompositeOperation = 'source-over'; m.clearRect(0, 0, W, H); m.drawImage(B, 0, 0);
    const g = m.createLinearGradient(x0 - band * W, 0, x0, H * .35);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    m.globalCompositeOperation = 'destination-in'; m.fillStyle = g; m.fillRect(0, 0, W, H);
    ctx.drawImage(M, 0, 0);
    const glow = Math.sin(Math.PI * p) * .16;
    if (glow > .005) {
      const l = ctx.createLinearGradient(x0 - band * W * .9, 0, x0 + band * W * .1, H * .35);
      l.addColorStop(0, 'rgba(255,214,170,0)'); l.addColorStop(.75, `rgba(255,214,170,${glow.toFixed(3)})`); l.addColorStop(1, 'rgba(255,214,170,0)');
      ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = l; ctx.fillRect(0, 0, W, H); ctx.restore();
    }
  };
  const renderFocus = (p: number) => {
    if (!hasFilter) return renderDissolve(p);
    const blur = Math.round(Math.min(W, H) * .012);
    ctx.fillStyle = '#0D0B0A'; ctx.fillRect(0, 0, W, H);
    ctx.filter = `blur(${(blur * ease(clamp(p / .7))).toFixed(1)}px)`; cover(ctx, A, W, H, 1 + .02 * p, 0);
    ctx.filter = `blur(${(blur * (1 - ease(clamp((p - .3) / .7)))).toFixed(1)}px)`;
    ctx.globalAlpha = eSine(clamp((p - .15) / .75)); cover(ctx, B, W, H, 1.02 - .02 * ease(p), 0);
    ctx.globalAlpha = 1; ctx.filter = 'none';
  };
  const renderFade = (p: number) => { ctx.drawImage(A, 0, 0); ctx.globalAlpha = ease(p); ctx.drawImage(B, 0, 0); ctx.globalAlpha = 1; };

  // Hold: the photo is painted once and the slow Ken Burns drift runs as a compositor transform,
  // so the main thread does no work between transitions (good for battery and for TBT/INP).
  const panPx = (i: number) => (reduced ? 0 : slides[i].px * W * .03);
  const driftAt = (q: number) => { const k = eSine(clamp(q)); return { z: 1 + ZOOM * k, x: (panPx(cur) * k * cssW) / W }; };
  const paintHold = () => { ctx.fillStyle = '#0D0B0A'; ctx.fillRect(0, 0, W, H); cover(ctx, imgs[cur], W, H, 1, 0); };
  const progress = () => (drift && typeof drift.currentTime === 'number' ? drift.currentTime / HOLD : 0);
  const syncDrift = () => {
    if (!drift) return;
    const run = !paused && !introOn && visible && !document.hidden;
    if (run && drift.playState !== 'running') drift.play();
    else if (!run && drift.playState === 'running') drift.pause();
  };
  const hold = () => {
    mode = 'hold';
    canvas.style.transform = '';
    paintHold();
    canvas.classList.add('on');
    load((cur + 1) % slides.length);
    if (reduced) {
      drift = canvas.animate([{ opacity: 1 }, { opacity: 1 }], { duration: HOLD });
    } else {
      const frames = Array.from({ length: 21 }, (_, n) => { const d = driftAt(n / 20); return { transform: `translateX(${d.x.toFixed(2)}px) scale(${d.z.toFixed(4)})` }; });
      drift = canvas.animate(frames, { duration: HOLD, easing: 'linear', fill: 'forwards' });
    }
    drift.onfinish = () => start((cur + 1) % slides.length);
    syncDrift();
  };

  const sync = () => {
    capEl.textContent = slides[cur].cap;
    dots.forEach((d, i) => (i === cur ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
  };
  const frame = (ts: number) => {
    raf = 0;
    const dt = last ? ts - last : 0; last = ts;
    if (!visible || document.hidden) t0 += dt;
    else {
      const p = clamp((ts - t0) / DUR[fx]);
      ({ dissolve: renderDissolve, sweep: renderSweep, focus: renderFocus, fade: renderFade })[fx](p);
      if (p >= 1) { cur = next; sync(); hold(); return; }
    }
    raf = requestAnimationFrame(frame);
  };
  const start = (to: number) => {
    if (mode === 'trans' || to === cur || !ready) return;
    load(to);
    if (!ok(to)) {
      // Not downloaded yet (slow network): try again shortly rather than skipping a beat.
      if (!waiting) { waiting = true; imgs[to].addEventListener('load', () => { waiting = false; start(to); }, { once: true }); }
      return;
    }
    const d = driftAt(reduced ? 0 : progress());
    drift?.cancel(); drift = null;
    canvas.style.transform = '';
    next = to; fx = reduced ? 'fade' : CYCLE[fxCount++ % CYCLE.length];
    A = snapshot(cur, d.z, (d.x * W) / cssW);
    B = snapshot(to, 1, 0);
    mode = 'trans'; last = 0; t0 = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  };
  const go = (i: number) => start((i + slides.length) % slides.length);

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; syncDrift(); }).observe(canvas);
  document.addEventListener('visibilitychange', syncDrift);
  onIntroEnd = () => { introOn = false; syncDrift(); };

  // Start only once the page is idle: the first photo is already on screen as a real <picture>,
  // so nothing competes with first paint or input.
  const begin = () => {
    resize();
    if (!ok(0)) { imgs[0].addEventListener('load', begin, { once: true }); return; }
    ready = true; hold();
  };
  setTimeout(() => idle(begin), 1200);

  const setPaused = (v: boolean) => { paused = v; pauseBtn.textContent = v ? L.play : L.pause; pauseBtn.setAttribute('aria-pressed', String(v)); syncDrift(); };
  setPaused(paused);
  pauseBtn.addEventListener('click', () => setPaused(!paused));
  root.querySelector('[data-prev]')!.addEventListener('click', () => go(cur - 1));
  root.querySelector('[data-next]')!.addEventListener('click', () => go(cur + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(Number(d.dataset.dot))));
}
