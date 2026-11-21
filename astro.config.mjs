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
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-AU', tr: 'tr-TR' } } }),
  ],
  image: { responsiveStyles: true },
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
      ],
    },
  },
});
