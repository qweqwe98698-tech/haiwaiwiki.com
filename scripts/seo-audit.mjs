/**
 * HaiwaiWiki SEO/GEO 审计脚本
 * 对 dist/ 构建产物 + src/content/ 前置数据做全站检查,任何 ERROR 都以非零码退出(build fail)。
 *
 * 检查项:
 *  1. 每个可索引页面:唯一 <title>、非空 description、唯一 canonical、唯一 <h1>
 *  2. 全站重复 title / description
 *  3. canonical 与页面路径一致(https://haiwaiwiki.com + path)
 *  4. 站内链接:无 href=""/#,全部指向存在的构建产物
 *  5. 孤立页面:可索引页必须有站内入链(首页除外)
 *  6. primaryKeyword 全站唯一(md frontmatter + src/data/site.ts STATIC_PAGES)
 *  7. sitemap 与可索引页面互相一致;noindex 页不得进 sitemap
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://haiwaiwiki.com';
const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error('dist/ 不存在,请先构建');
  process.exit(1);
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html') && !f.includes(`${sep}pagefind${sep}`));

/** dist 内相对路径 → URL path */
function toPath(file) {
  let rel = relative(DIST, file).split(sep).join('/');
  if (rel.endsWith('index.html')) rel = rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

const pages = htmlFiles.map((file) => {
  const html = readFileSync(file, 'utf-8');
  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => m[1].trim());
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '';
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]*)"/gi)].map((m) => m[1]);
  const h1s = [...html.matchAll(/<h1[\s>]/gi)];
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const links = [...html.matchAll(/href="([^"]*)"/gi)].map((m) => m[1]);
  return { file, path: toPath(file), html, title: titles[0] ?? '', titleCount: titles.length, desc, canonicals, h1Count: h1s.length, noindex, links };
});

const indexable = pages.filter((p) => !p.noindex && p.path !== '/404.html');

/* 1. 单页结构检查 */
for (const p of pages) {
  const is404 = p.path === '/404.html';
  if (p.titleCount !== 1) errors.push(`[title] ${p.path} 有 ${p.titleCount} 个 <title>`);
  if (!p.title) errors.push(`[title] ${p.path} 标题为空`);
  if (!p.desc) errors.push(`[desc] ${p.path} 缺少 meta description`);
  if (p.h1Count !== 1) errors.push(`[h1] ${p.path} 有 ${p.h1Count} 个 <h1>(应为 1)`);
  // noindex 页面不应输出 canonical(矛盾信号);可索引页必须有且仅有一个
  if (p.noindex || is404) {
    if (p.canonicals.length > 0) errors.push(`[canonical] ${p.path} 是 noindex 页却输出了 canonical`);
  } else if (p.canonicals.length !== 1) {
    errors.push(`[canonical] ${p.path} 有 ${p.canonicals.length} 个 canonical`);
  }
}

/* 1.5 CJK 加粗渲染失败检查:正文出现字面 ** 说明 CommonMark 分隔符未闭合
   (典型:「。**」后紧跟汉字;修法是把标点移出加粗边界) */
for (const p of pages) {
  const body = p.html.match(/<main[\s>][\s\S]*?<\/main>/i)?.[0] ?? '';
  if (body.includes('**')) errors.push(`[raw-emphasis] ${p.path} 正文含未渲染的 **(CJK 加粗边界问题)`);
}

/* 2. 重复 title / description(仅可索引页) */
for (const key of ['title', 'desc']) {
  const seen = new Map();
  for (const p of indexable) {
    const v = p[key];
    if (!v) continue;
    if (seen.has(v)) errors.push(`[duplicate-${key}] ${p.path} 与 ${seen.get(v)} 重复:${v.slice(0, 40)}…`);
    else seen.set(v, p.path);
  }
}

/* 3. canonical 一致性 */
for (const p of indexable) {
  const expected = SITE_URL + p.path;
  if (p.canonicals[0] && p.canonicals[0] !== expected) {
    errors.push(`[canonical] ${p.path} canonical=${p.canonicals[0]},应为 ${expected}`);
  }
}

/* 4. 站内链接 */
const distPathExists = (path) => {
  if (path === '/') return true;
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  return (
    existsSync(join(DIST, clean, 'index.html')) ||
    existsSync(join(DIST, clean)) ||
    existsSync(join(DIST, clean + '.html'))
  );
};
const inbound = new Map(); // path -> Set(来源)
for (const p of pages) {
  for (const raw of p.links) {
    if (raw === '' || raw === '#') {
      errors.push(`[link] ${p.path} 存在空链接 href="${raw}"`);
      continue;
    }
    if (!raw.startsWith('/')) continue; // 外链/锚点/mailto 不查
    const path = raw.split('#')[0].split('?')[0];
    if (path.startsWith('/pagefind/')) continue;
    if (!distPathExists(path)) {
      errors.push(`[broken-link] ${p.path} → ${raw} 目标不存在`);
      continue;
    }
    if (!inbound.has(path)) inbound.set(path, new Set());
    inbound.get(path).add(p.path);
  }
}

/* 5. 孤立页面 */
for (const p of indexable) {
  if (p.path === '/') continue;
  const sources = inbound.get(p.path);
  const external = sources ? [...sources].filter((s) => s !== p.path) : [];
  if (external.length === 0) errors.push(`[orphan] ${p.path} 没有任何站内入链`);
}

/* 6. primaryKeyword 唯一性 */
const kwMap = new Map();
function addKw(kw, source) {
  if (!kw) return;
  if (kwMap.has(kw)) errors.push(`[duplicate-keyword] 「${kw}」同时用于 ${kwMap.get(kw)} 与 ${source}`);
  else kwMap.set(kw, source);
}
const contentDir = join(ROOT, 'src', 'content');
if (existsSync(contentDir)) {
  for (const f of walk(contentDir).filter((x) => x.endsWith('.md') || x.endsWith('.mdx'))) {
    const raw = readFileSync(f, 'utf-8');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    if (/^draft:\s*true/m.test(fm)) continue;
    const kw = fm.match(/^primaryKeyword:\s*(.+)$/m)?.[1]?.trim();
    addKw(kw, relative(ROOT, f));
  }
}
const siteTs = readFileSync(join(ROOT, 'src', 'data', 'site.ts'), 'utf-8');
for (const m of siteTs.matchAll(/'([^']+)':\s*\{[^}]*?primaryKeyword:\s*'([^']+)'/gs)) {
  addKw(m[2], `site.ts ${m[1]}`);
}

/* 7. sitemap 一致性 */
const sitemapFiles = allFiles.filter((f) => /sitemap.*\.xml$/.test(f));
const sitemapUrls = new Set();
for (const f of sitemapFiles) {
  const xml = readFileSync(f, 'utf-8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const u = m[1];
    if (u.endsWith('.xml')) continue; // sitemap index 引用
    sitemapUrls.add(u);
  }
}
if (sitemapFiles.length === 0) {
  errors.push('[sitemap] 未生成 sitemap 文件');
} else {
  for (const p of indexable) {
    if (!sitemapUrls.has(SITE_URL + p.path)) warnings.push(`[sitemap] 可索引页不在 sitemap:${p.path}`);
  }
  for (const p of pages.filter((x) => x.noindex)) {
    if (sitemapUrls.has(SITE_URL + p.path)) errors.push(`[sitemap] noindex 页出现在 sitemap:${p.path}`);
  }
}

/* 8. JSON-LD 语法与域名检查 */
for (const p of pages) {
  const blocks = [...p.html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const types = [];
  for (const [, body] of blocks) {
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      errors.push(`[jsonld] ${p.path} JSON-LD 语法错误`);
      continue;
    }
    types.push(data['@type']);
    const json = JSON.stringify(data);
    if (/localhost|127\.0\.0\.1|example\.com/.test(json)) {
      errors.push(`[jsonld] ${p.path} JSON-LD 含本地或示例域名`);
    }
    for (const m of json.matchAll(/"(https?:\/\/[^"]+)"/g)) {
      if (m[1].startsWith('http://')) errors.push(`[jsonld] ${p.path} JSON-LD 含 http 链接:${m[1]}`);
    }
  }
  const dupes = types.filter((t, i) => t && types.indexOf(t) !== i && t !== 'WebPage');
  if (dupes.length) warnings.push(`[jsonld] ${p.path} 同类型 JSON-LD 重复:${[...new Set(dupes)].join(', ')}`);
  // FAQPage 必须对应页面上真实存在的问答块
  if (types.includes('FAQPage') && !/<summary/i.test(p.html)) {
    errors.push(`[jsonld] ${p.path} 输出了 FAQPage 但页面没有可见问答`);
  }
}

/* 9. 外链检查:https、rel 属性、可疑域名 */
for (const p of pages) {
  for (const m of p.html.matchAll(/<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi)) {
    const attrs = `${m[1]} ${m[3]}`;
    const href = m[2];
    if (href.startsWith(SITE_URL)) continue;
    if (href.startsWith('http://')) errors.push(`[extlink] ${p.path} 外链未用 HTTPS:${href}`);
    const rel = attrs.match(/rel="([^"]*)"/)?.[1] ?? '';
    const targetBlank = /target="_blank"/.test(attrs);
    if (targetBlank && !(rel.includes('noopener') && rel.includes('noreferrer'))) {
      errors.push(`[extlink] ${p.path} target=_blank 缺少 noopener noreferrer:${href}`);
    }
    // 推广链接必须声明 sponsored + nofollow
    const isAff = /aff|code=|register\?/i.test(href);
    if (isAff && !(rel.includes('sponsored') && rel.includes('nofollow'))) {
      errors.push(`[extlink] ${p.path} 推广链接缺少 rel="sponsored nofollow":${href}`);
    }
  }
}

/* 10. 占位与开发残留
   注意:example.com 是 IETF 保留的示例域名,正文里用作举例是正确写法,
   只有出现在真实链接属性(href/src/action)里才算残留。 */
for (const p of pages) {
  const body = p.html.match(/<body[\s>][\s\S]*?<\/body>/i)?.[0] ?? p.html;

  for (const m of body.matchAll(/(?:href|src|action)="([^"]*)"/gi)) {
    const v = m[1];
    if (/localhost|127\.0\.0\.1|example\.(com|org|net)|your-domain|测试域名/i.test(v)) {
      errors.push(`[placeholder] ${p.path} 链接指向占位/本地地址:${v}`);
    }
  }

  const text = body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
  for (const [name, re] of [
    ['TODO', /\bTODO\b|\bFIXME\b/],
    ['占位文本', /Lorem ipsum|占位文本|此处待补充|正文待写/i],
  ]) {
    if (re.test(text)) errors.push(`[placeholder] ${p.path} 正文残留「${name}」`);
  }
}

/* 11. 标题层级与正文长度 */
for (const p of indexable) {
  const levels = [...p.html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      warnings.push(`[heading] ${p.path} 标题层级跳级:h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }
  const main = p.html.match(/<main[\s>][\s\S]*?<\/main>/i)?.[0] ?? '';
  const text = main.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  if (text.length < 300) warnings.push(`[thin] ${p.path} 正文仅 ${text.length} 字,内容偏薄`);
}

/* 12. 图片 alt */
for (const p of pages) {
  for (const m of p.html.matchAll(/<img\s([^>]*)>/gi)) {
    if (!/\balt=/.test(m[1])) errors.push(`[img-alt] ${p.path} 存在缺少 alt 的 <img>`);
  }
}

/* 13. Title / Description 长度(过长会被搜索结果截断) */
for (const p of indexable) {
  if (p.title.length > 62) warnings.push(`[title-len] ${p.path} title ${p.title.length} 字符,可能被截断`);
  if (p.desc.length > 160) warnings.push(`[desc-len] ${p.path} description ${p.desc.length} 字符,可能被截断`);
  if (p.desc.length < 50) warnings.push(`[desc-len] ${p.path} description 仅 ${p.desc.length} 字符,偏短`);
}

/* 14. sitemap 的 lastmod */
{
  const withLastmod = [...sitemapUrls].length;
  const files = sitemapFiles.map((f) => readFileSync(f, 'utf-8')).join('');
  const lastmodCount = [...files.matchAll(/<lastmod>/g)].length;
  if (withLastmod > 0 && lastmodCount === 0) {
    warnings.push('[sitemap] sitemap 缺少 lastmod,搜索引擎无法判断更新时间');
  }
}

/* 输出 */
console.log(`\n—— HaiwaiWiki SEO 审计 ——`);
console.log(`页面:${pages.length}(可索引 ${indexable.length})· 关键词:${kwMap.size} · sitemap URL:${sitemapUrls.size}`);
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
if (errors.length) {
  console.error(`\n审计失败:${errors.length} 个错误`);
  process.exit(1);
}
console.log(`\n审计通过${warnings.length ? `(${warnings.length} 个警告)` : ''}`);
