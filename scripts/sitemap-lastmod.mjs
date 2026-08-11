/**
 * 用内容 frontmatter 的真实时间改写 sitemap 里的 lastmod。
 * @astrojs/sitemap 只能给出统一的构建时间,那对搜索引擎没有参考价值——
 * 一次全站重建会让所有页面看起来都更新了。
 *
 * 在 build 之后运行:node scripts/sitemap-lastmod.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const CONTENT = join(ROOT, 'src', 'content');
const SITE = 'https://haiwaiwiki.com';

const BASE = {
  airport: '/airport/',
  review: '/review/',
  tutorial: '/tutorial/',
  protocol: '/protocol/',
  'free-nodes': '/free-nodes/',
  risk: '/risk/',
  tools: '/tools/',
};

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** URL → ISO 日期 */
const dates = new Map();
let newest = null;

for (const file of walk(CONTENT).filter((f) => /\.mdx?$/.test(f))) {
  const raw = readFileSync(file, 'utf-8');
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  if (/^draft:\s*true/m.test(fm)) continue;

  const rel = relative(CONTENT, file).split(sep).join('/');
  const slash = rel.indexOf('/');
  const collection = rel.slice(0, slash);
  const id = rel.slice(slash + 1).replace(/\.mdx?$/, '');
  const base = BASE[collection];
  if (!base) continue;

  const pub = fm.match(/^pubDate:\s*(.+)$/m)?.[1]?.trim();
  const upd = fm.match(/^updatedDate:\s*(.+)$/m)?.[1]?.trim();
  const d = new Date(upd || pub);
  if (Number.isNaN(d.valueOf())) continue;

  const iso = d.toISOString();
  dates.set(`${SITE}${base}${id}/`, iso);
  if (!newest || iso > newest) newest = iso;
}

const sitemaps = walk(DIST).filter((f) => /sitemap-\d+\.xml$/.test(f));
if (sitemaps.length === 0) {
  console.error('未找到 sitemap-*.xml,请先构建');
  process.exit(1);
}

let rewritten = 0;
let fallback = 0;
for (const file of sitemaps) {
  let xml = readFileSync(file, 'utf-8');
  xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc) return block;
    // 内容页用 frontmatter 时间;栏目页与站务页用全站最新内容时间
    const iso = dates.get(loc) ?? newest;
    if (!iso) return block;
    dates.has(loc) ? rewritten++ : fallback++;
    return block.includes('<lastmod>')
      ? block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${iso}</lastmod>`)
      : block.replace('</loc>', `</loc><lastmod>${iso}</lastmod>`);
  });
  writeFileSync(file, xml);
}

console.log(`sitemap lastmod:内容页 ${rewritten} 条按 frontmatter 写入,其余 ${fallback} 条用最新内容时间兜底`);
