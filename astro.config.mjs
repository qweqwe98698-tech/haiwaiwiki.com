// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://haiwaiwiki.com',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/search/'),
      // lastmod 让搜索引擎知道哪些页面值得重新抓取。
      // 内容页的时间来自 frontmatter,由 scripts/sitemap-lastmod.mjs 在构建后写入;
      // 这里给静态页一个统一的构建时间兜底。
      serialize: (item) => ({ ...item, lastmod: item.lastmod ?? new Date().toISOString() }),
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: Number(process.env.PORT) || 4321,
  },
});
