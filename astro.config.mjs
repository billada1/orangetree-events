// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://orangetree.events',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  i18n: { locales: ['en', 'tr'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } },
  integrations: [
    sitemap({ filter: (p) => !p.includes('/print/'), i18n: { defaultLocale: 'en', locales: { en: 'en-AU', tr: 'tr-TR' } } }),
  ],
  image: { responsiveStyles: true },
  // Never inline fonts or images as data: URIs, so the Content Security Policy can stay strict.
  vite: { build: { assetsInlineLimit: 0 } },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-src https://open.spotify.com https://www.youtube-nocookie.com",
      ],
    },
  },
});
