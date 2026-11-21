// Hero slideshow: burn, paper-scrunch and emblem-iris transitions drawn on a 2D canvas.
// Progressive enhancement: the first photo is a real <picture>; the canvas fades in over it once ready.
// Pauses off-screen and in background tabs; reduced motion gets a gentle fade and starts paused.

type Slide = { src: string; cap: string; alt: string; px: number };
type Fx = 'burn' | 'scrunch' | 'iris' | 'fade';
const DUR: Record<Fx, number> = { burn: 2000, scrunch: 2300, iris: 1500, fade: 700 };
const HOLD = 5600;
const CYCLE: Fx[] = ['burn', 'scrunch', 'iris'];

const ease = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eIn = (t: number) => t * t * t;
const eOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mk = (w: number, h: number) => Object.assign(document.createElement('canvas'), { width: w, height: h });

function cover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, zoom: number, panx: number) {
  const iw = img.naturalWidth, ih = img.naturalHeight;
  if (!iw || !ih) return;
  const s = Math.max(w / iw, h / ih) * zoom, dw = iw * s, dh = ih * s;
  ctx.drawImage(img, (w - dw) / 2 + panx, (h - dh) / 2, dw, dh);
}

function fbm(w: number, h: number) {
  const out = new Float32Array(w * h);
  for (const [g, amp] of [[5, .5], [11, .25], [23, .15], [47, .1]] as const) {
    const gw = Math.ceil(g * w / h) + 2, gh = g + 2, grid = new Float32Array(gw * gh);
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random();
    for (let y = 0; y < h; y++) {
      const fy = y / h * g, y0 = Math.floor(fy), ty = fy - y0, sy = ty * ty * (3 - 2 * ty);
      for (let x = 0; x < w; x++) {
        const fx = x / h * g, x0 = Math.floor(fx), tx = fx - x0, sx = tx * tx * (3 - 2 * tx);
        const a = grid[y0 * gw + x0], b = grid[y0 * gw + x0 + 1], c = grid[(y0 + 1) * gw + x0], d = grid[(y0 + 1) * gw + x0 + 1];
        const top = a + (b - a) * sx, bot = c + (d - c) * sx;
        out[y * w + x] += amp * (top + (bot - top) * sy);
      }
    }
  }
  return out;
}

type Tile = { x: number; y: number; w: number; h: number; d: number; r: number[] };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; r: number };

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
  const endIntro = () => intro?.classList.add('gone');
  if (intro) {
    if (seen || reduced) endIntro();
    else {
      intro.querySelector('[data-skip-intro]')?.addEventListener('click', endIntro);
      intro.addEventListener('animationend', (e) => { if ((e as AnimationEvent).animationName.includes('iris')) endIntro(); });
      setTimeout(endIntro, 2100);
    }
  }
  document.querySelector('[data-replay-intro]')?.addEventListener('click', () => {
    if (!intro || reduced) return;
    intro.classList.remove('gone');
    intro.style.animation = 'none'; void intro.offsetWidth; intro.style.animation = '';
    scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(endIntro, 2100);
  });

  const slides: Slide[] = JSON.parse(root.dataset.slides || '[]');
  const L = JSON.parse(root.dataset.labels || '{}');
  if (slides.length < 2) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const capEl = root.querySelector<HTMLElement>('[data-cap]')!;
  const fxEl = root.querySelector<HTMLElement>('[data-fx]')!;
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-pause]')!;
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-dot]')];
  const fxName: Record<Fx, string> = JSON.parse(document.documentElement.lang.startsWith('tr')
    ? '{"burn":"Yanma","scrunch":"Kâğıt buruşturma","iris":"Amblem geçişi","fade":"Solma"}'
    : '{"burn":"Burn","scrunch":"Paper scrunch","iris":"Emblem iris","fade":"Fade"}');

  // Load the first two now, the rest when idle.
  const imgs = slides.map(() => new Image());
  const load = (i: number) => { if (!imgs[i].src) { imgs[i].decoding = 'async'; imgs[i].src = slides[i].src; } };
  load(0); load(1);
  const idle = (cb: () => void) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(cb, { timeout: 4000 }) : setTimeout(cb, 1500));
  idle(() => slides.forEach((_, i) => load(i)));
  const emblem = new Image(); emblem.src = '/emblem.svg';

  let W = 0, H = 0, cur = 0, next = 0, mode: 'hold' | 'trans' = 'hold', t0 = 0, last = 0, visible = true, paused = reduced, fx: Fx = 'fade', fxCount = 0;
  let A: HTMLCanvasElement, B: HTMLCanvasElement, tiles: Tile[] | null = null, noiseBase: Float32Array | null = null;
  let small: HTMLCanvasElement, bw = 0, bh = 0, dA: Uint8ClampedArray, dB: Uint8ClampedArray, noise: Float32Array, out: ImageData, sparks: Spark[] = [];

  const resize = () => {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.max(2, Math.min(2200, Math.round(r.width * dpr))), h = Math.max(2, Math.round(r.height * dpr));
    if (w === W && h === H) return;
    canvas.width = W = w; canvas.height = H = h; tiles = null; noiseBase = null;
  };
  resize();
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(canvas);
  document.addEventListener('visibilitychange', () => { if (document.hidden) last = 0; });

  const snapshot = (i: number, zoom: number, pan: number) => {
    const c = mk(W, H), x = c.getContext('2d')!;
    x.fillStyle = '#0D0B0A'; x.fillRect(0, 0, W, H); cover(x, imgs[i], W, H, zoom, pan); return c;
  };

  const prepBurn = () => {
    const nbw = Math.min(900, W), nbh = Math.max(2, Math.round(H * nbw / W));
    if (!noiseBase || bw !== nbw || bh !== nbh) { bw = nbw; bh = nbh; noiseBase = fbm(bw, bh); small = mk(bw, bh); }
    const sx = small.getContext('2d', { willReadFrequently: true })!;
    sx.drawImage(A, 0, 0, bw, bh); dA = sx.getImageData(0, 0, bw, bh).data;
    sx.drawImage(B, 0, 0, bw, bh); dB = sx.getImageData(0, 0, bw, bh).data;
    const ox = Math.random() < .5 ? bw * (.1 + Math.random() * .3) : bw * (.6 + Math.random() * .3);
    const oy = bh * (.3 + Math.random() * .5), md = Math.hypot(bw, bh) * .75;
    noise = new Float32Array(bw * bh); let lo = 9, hi = -9;
    for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
      const i = y * bw + x, v = .5 * noiseBase[i] + .5 * Math.hypot(x - ox, y - oy) / md;
      noise[i] = v; if (v < lo) lo = v; if (v > hi) hi = v;
    }
    for (let i = 0; i < noise.length; i++) noise[i] = (noise[i] - lo) / (hi - lo);
    out = sx.createImageData(bw, bh); sparks = [];
  };

  const renderBurn = (p: number) => {
    const o = out.data, t = ease(p) * 1.16 - .06, e = .028, c = .085;
    for (let i = 0, j = 0; i < noise.length; i++, j += 4) {
      const v = noise[i] - t;
      if (v < 0) { o[j] = dB[j]; o[j + 1] = dB[j + 1]; o[j + 2] = dB[j + 2]; }
      else if (v < e) { const k = v / e; o[j] = 255; o[j + 1] = 236 - 160 * k; o[j + 2] = 150 - 140 * k; }
      else if (v < e + c) { const k = (v - e) / c, f = .12 + .88 * k * k; o[j] = dA[j] * f + (1 - f) * 70; o[j + 1] = dA[j + 1] * f + (1 - f) * 26; o[j + 2] = dA[j + 2] * f + (1 - f) * 8; }
      else { o[j] = dA[j]; o[j + 1] = dA[j + 1]; o[j + 2] = dA[j + 2]; }
      o[j + 3] = 255;
    }
    small.getContext('2d')!.putImageData(out, 0, 0);
    ctx.drawImage(small, 0, 0, W, H);
    const sx = W / bw, sy = H / bh;
    for (let k = 0; k < 70 && sparks.length < 180; k++) {
      const i = (Math.random() * noise.length) | 0, v = noise[i] - t;
      if (v >= 0 && v < e) sparks.push({ x: (i % bw) * sx, y: ((i / bw) | 0) * sy, vx: (Math.random() - .5) * 1.2, vy: -(1 + Math.random() * 2.4), life: 1, r: 1 + Math.random() * 2.2 });
    }
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    sparks = sparks.filter((s) => s.life > 0);
    for (const s of sparks) {
      s.x += s.vx; s.y += s.vy; s.vy *= .985; s.life -= .022;
      ctx.fillStyle = `rgba(255,${(150 + 80 * s.life) | 0},70,${(s.life * .9).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * (W / 1440 + .5), 0, 6.283); ctx.fill();
    }
    ctx.restore();
  };

  const prepTiles = () => {
    if (tiles) return;
    const cols = 13, rows = Math.max(5, Math.round(cols * H / W)), tw = W / cols, th = H / rows;
    tiles = [];
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
      const x = q * tw, y = r * th, d = Math.hypot((x + tw / 2) / W - .5, (y + th / 2) / H - .5) / .71;
      tiles.push({ x, y, w: tw, h: th, d, r: [0, 0, 0, 0, 0].map(Math.random) });
    }
  };
  const sheet = (img: HTMLCanvasElement, k: number, gx: number, gy: number, gs: number, flip: boolean) => {
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) * .11;
    ctx.save(); ctx.translate(cx + gx, cy + gy); ctx.scale(gs, gs); ctx.translate(-cx, -cy);
    for (const t of tiles!) {
      const m = eIn(clamp((k - (flip ? t.d : 1 - t.d) * .18) / .82));
      const tx = t.x + t.w / 2, ty = t.y + t.h / 2, ex = cx + (t.r[0] - .5) * R * 1.7, ey = cy + (t.r[1] - .5) * R * 1.7;
      ctx.save(); ctx.translate(tx + (ex - tx) * m, ty + (ey - ty) * m); ctx.rotate((t.r[3] - .5) * 2.6 * m);
      const sc = 1 - (.8 - t.r[2] * .1) * m; ctx.scale(sc, sc * (1 - .25 * m * t.r[4]));
      ctx.drawImage(img, t.x, t.y, t.w, t.h, -t.w / 2 - .6, -t.h / 2 - .6, t.w + 1.2, t.h + 1.2);
      ctx.fillStyle = t.r[4] > .5 ? `rgba(0,0,0,${(.5 * m * t.r[1]).toFixed(3)})` : `rgba(255,244,230,${(.28 * m * t.r[2]).toFixed(3)})`;
      ctx.fillRect(-t.w / 2, -t.h / 2, t.w, t.h);
      ctx.restore();
    }
    ctx.restore();
  };
  const renderScrunch = (p: number) => {
    ctx.fillStyle = '#0D0B0A'; ctx.fillRect(0, 0, W, H);
    const qIn = clamp((p - .44) / .56);
    if (qIn > 0) sheet(B, 1 - eOut(qIn), 0, 0, 1, true);
    const q = clamp(p / .62);
    if (q < 1) { const fly = eIn(clamp((q - .78) / .22)); sheet(A, clamp(q / .8), fly * W * .62, -fly * H * .34, 1 - .7 * fly, false); }
  };
  const renderIris = (p: number) => {
    const cx = W / 2, cy = H * .42, r = ease(clamp((p - .18) / .82)) * Math.hypot(W, H) * .6, grow = r / (Math.hypot(W, H) * .6);
    ctx.drawImage(A, 0, 0);
    if (r > 1) {
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
      ctx.save(); ctx.strokeStyle = '#EE5A3A'; ctx.globalAlpha = 1 - grow; ctx.lineWidth = 10 * (1 - grow) + 2;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); ctx.restore();
    }
    if (emblem.complete && emblem.naturalWidth) {
      const appear = eOut(clamp(p / .22)), fade = 1 - clamp((p - .3) / .35);
      if (fade > 0) {
        const size = Math.max(Math.min(W, H) * .22 * appear, r * 2.25), eh = size * 566 / 490;
        ctx.save(); ctx.globalAlpha = fade * appear; ctx.translate(cx, cy); ctx.rotate((1 - appear) * -.6);
        ctx.drawImage(emblem, -size / 2, -eh * .567, size, eh); ctx.restore();
      }
    }
  };
  const renderFade = (p: number) => { ctx.drawImage(A, 0, 0); ctx.globalAlpha = ease(p); ctx.drawImage(B, 0, 0); ctx.globalAlpha = 1; };

  const sync = () => {
    capEl.textContent = slides[cur].cap;
    dots.forEach((d, i) => (i === cur ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
  };
  const start = (to: number) => {
    if (mode === 'trans' || to === cur) return;
    load(to);
    if (!imgs[to].complete || !imgs[to].naturalWidth) return;
    next = to; fx = reduced ? 'fade' : CYCLE[fxCount++ % CYCLE.length];
    A = snapshot(cur, reduced ? 1 : 1.08, reduced ? 0 : slides[cur].px * W * .03);
    B = snapshot(to, 1, 0);
    if (fx === 'burn') prepBurn();
    if (fx === 'scrunch') prepTiles();
    mode = 'trans'; t0 = last;
    fxEl.textContent = '· ' + fxName[fx];
  };
  const go = (i: number) => start((i + slides.length) % slides.length);

  const loop = (ts: number) => {
    requestAnimationFrame(loop);
    const dt = last ? ts - last : 0; last = ts;
    if (!visible || document.hidden) { t0 += dt; return; }
    if (mode === 'hold') {
      const introOn = intro && !intro.classList.contains('gone');
      if (paused || introOn) t0 += dt;
      const img = imgs[cur];
      if (!img.complete || !img.naturalWidth) { t0 = ts; return; }
      const p = clamp((ts - t0) / HOLD);
      ctx.fillStyle = '#0D0B0A'; ctx.fillRect(0, 0, W, H);
      cover(ctx, img, W, H, reduced ? 1 : 1 + .08 * p, reduced ? 0 : slides[cur].px * W * .03 * p);
      canvas.classList.add('on');
      if (p >= 1) start((cur + 1) % slides.length);
    } else {
      const p = clamp((ts - t0) / DUR[fx]);
      ({ burn: renderBurn, scrunch: renderScrunch, iris: renderIris, fade: renderFade })[fx](p);
      if (p >= 1) { cur = next; mode = 'hold'; t0 = ts; fxEl.textContent = ''; sync(); }
    }
  };
  requestAnimationFrame((ts) => { t0 = last = ts; loop(ts); });

  const setPaused = (v: boolean) => { paused = v; pauseBtn.textContent = v ? L.play : L.pause; pauseBtn.setAttribute('aria-pressed', String(v)); };
  setPaused(paused);
  pauseBtn.addEventListener('click', () => setPaused(!paused));
  root.querySelector('[data-prev]')!.addEventListener('click', () => go(cur - 1));
  root.querySelector('[data-next]')!.addEventListener('click', () => go(cur + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(Number(d.dataset.dot))));
}
