/**
 * 向 IndexNow 提交本站 URL(Bing / Yandex 等共用该协议,Google 不参与)。
 * 部署完成后手动运行:node scripts/indexnow.mjs
 *
 * 前提:https://haiwaiwiki.com/<KEY>.txt 必须能访问且内容为 KEY 本身
 *      (文件已放在 public/,随构建产物一起部署)。
 *
 * 可选参数:传入若干 URL 只提交这几条,否则提交 sitemap 里的全部 URL。
 *   node scripts/indexnow.mjs https://haiwaiwiki.com/airport/cheap/
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const KEY = '126b66223b7e490c9cce8b3c1065ef6c';
const HOST = 'haiwaiwiki.com';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

let urls = process.argv.slice(2).filter((a) => a.startsWith('http'));

if (urls.length === 0) {
  const files = walk(join(process.cwd(), 'dist')).filter((f) => /sitemap-\d+\.xml$/.test(f));
  if (files.length === 0) {
    console.error('未找到 sitemap-*.xml,请先运行 pnpm build');
    process.exit(1);
  }
  const set = new Set();
  for (const f of files) {
    for (const m of readFileSync(f, 'utf-8').matchAll(/<loc>([^<]+)<\/loc>/g)) set.add(m[1]);
  }
  urls = [...set];
}

if (urls.length === 0) {
  console.error('没有可提交的 URL');
  process.exit(1);
}

// IndexNow 单次建议不超过 10000 条
const payload = { host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(0, 10000) };

console.log(`准备提交 ${payload.urlList.length} 条 URL 到 IndexNow…`);
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

// 200/202 都表示已接受;422 通常是 key 文件无法访问
console.log(`HTTP ${res.status} ${res.statusText}`);
if (res.status === 200 || res.status === 202) {
  console.log('已提交。收录与否由搜索引擎决定,提交本身不保证索引。');
} else {
  console.log(await res.text().catch(() => ''));
  console.log('提交未被接受。请先确认 key 文件可访问:', `${SITE}/${KEY}.txt`);
  process.exit(1);
}
