import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import type { CollectionKey } from 'astro:content';
import { SITE, COLLECTION_BASE, entryUrl } from '../data/site';
import { publishedEntries } from '../lib/entries';

export async function GET(context: APIContext) {
  const all = (
    await Promise.all(
      (Object.keys(COLLECTION_BASE) as CollectionKey[]).map((c) => publishedEntries(c))
    )
  ).flat();
  const items = all
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.pubDate,
      link: entryUrl(e.collection, e.id),
    }));

  return rss({
    title: `${SITE.name}｜${SITE.nameZh}`,
    description: SITE.tagline,
    site: context.site ?? SITE.url,
    items,
    customData: '<language>zh-cn</language>',
  });
}
