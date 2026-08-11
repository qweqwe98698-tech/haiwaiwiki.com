import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from 'astro:content';
import { COLLECTION_BASE, SECTIONS, entryUrl } from '../data/site';

export type AnyEntry = CollectionEntry<CollectionKey>;

export function sectionOf(collection: string) {
  const s = SECTIONS.find((x) => x.collection === collection);
  if (!s) throw new Error(`集合未对应栏目:${collection}`);
  return s;
}

/** 某集合全部已发布条目,按发布时间升序 */
export async function publishedEntries(collection: CollectionKey): Promise<AnyEntry[]> {
  const all = await getCollection(collection, ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
}

/** [...slug].astro 的 getStaticPaths 工厂 */
export async function staticPathsFor(collection: CollectionKey) {
  const entries = await publishedEntries(collection);
  return entries.map((entry, i) => ({
    params: { slug: entry.id },
    props: {
      entry,
      prev: i > 0 ? entries[i - 1] : undefined,
      next: i < entries.length - 1 ? entries[i + 1] : undefined,
    },
  }));
}

/** 解析 relatedSlugs("collection/slug")为 {title, url};目标不存在时构建失败 */
export async function resolveRelated(relatedSlugs: string[]) {
  const out: { title: string; url: string }[] = [];
  for (const ref of relatedSlugs) {
    const idx = ref.indexOf('/');
    const col = ref.slice(0, idx) as CollectionKey;
    const id = ref.slice(idx + 1);
    if (!(col in COLLECTION_BASE)) throw new Error(`relatedSlugs 集合不存在:${ref}`);
    const target = await getEntry(col, id);
    if (!target) throw new Error(`relatedSlugs 指向不存在的条目:${ref}`);
    out.push({ title: target.data.title, url: entryUrl(col, id) });
  }
  return out;
}

/** 中文阅读时长(约 400 字/分钟) */
export function readingMinutes(body: string | undefined): number {
  if (!body) return 1;
  const chars = body.replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 400));
}
