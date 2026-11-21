import type { Lang } from '../i18n/ui';

export interface StoryFrontmatter {
  title: string; date: string | Date; event?: string; artist?: string; hero: string;
  excerpt: string; timeline?: [string, string][]; gallery?: string[];
}
export interface Story { slug: string; lang: Lang; fm: StoryFrontmatter; Content: any; }

const mods = import.meta.glob<{ frontmatter: StoryFrontmatter; Content: any }>('../content/stories/*.md', { eager: true });

export const stories: Story[] = Object.entries(mods).map(([path, m]) => {
  const file = path.split('/').pop()!.replace(/\.md$/, '');
  const [slug, lang] = [file.replace(/\.(en|tr)$/, ''), (file.match(/\.(en|tr)$/)?.[1] ?? 'en') as Lang];
  return { slug, lang, fm: m.frontmatter, Content: m.Content };
});

export const storySlugs = () => [...new Set(stories.map((s) => s.slug))];
// Turkish falls back to English if no translation exists yet.
export const getStory = (slug: string, lang: Lang) =>
  stories.find((s) => s.slug === slug && s.lang === lang) ?? stories.find((s) => s.slug === slug && s.lang === 'en')!;
export const isoDate = (d: string | Date) => (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10);
