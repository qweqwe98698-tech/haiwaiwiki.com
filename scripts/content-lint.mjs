/**
 * 源码级内容检查(在 build 之前跑,比 dist 检查更早发现问题)
 *
 * 1. YAML 陷阱:frontmatter 字段值里出现 ASCII 双引号 → js-yaml 解析失败。中文一律用「」。
 * 2. CJK 加粗陷阱:`**……。**后接文字` 不会被 CommonMark 渲染成 <strong>,
 *    页面会直接显示字面 **。修法:把收尾标点移到 ** 之外。
 * 3. 未定义的 relatedSlugs 目标文件(构建时也会报,但这里能一次列全)。
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { micromark } from 'micromark';

const ROOT = process.cwd();
const CONTENT = join(ROOT, 'src', 'content');
const errors = [];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(CONTENT).filter((f) => /\.mdx?$/.test(f));

for (const file of files) {
  const rel = relative(ROOT, file).split('\\').join('/');
  const raw = readFileSync(file, 'utf-8');
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = fmMatch?.[1] ?? '';
  const bodyStart = fmMatch ? fmMatch[0].length : 0;

  // 1. frontmatter ASCII 双引号
  fm.split(/\r?\n/).forEach((line, i) => {
    if (line.includes('"')) {
      errors.push(`[yaml-quote] ${rel}:${i + 2} frontmatter 含 ASCII 双引号(中文请用「」):${line.trim().slice(0, 50)}`);
    }
  });

  // 2. CJK 加粗渲染失败
  // 必须按「空行分隔的块」判断:加粗可以跨行书写,逐行检测会误报。
  const bodyLines = raw.slice(bodyStart).split(/\r?\n/);
  const fmLineCount = raw.slice(0, bodyStart).split(/\r?\n/).length - 1;
  let block = [];
  let blockStart = 0;
  const flush = () => {
    const text = block.join('\n');
    if (text.includes('**') && micromark(text).includes('**')) {
      const offender = block.find((l) => l.includes('**')) ?? text;
      errors.push(
        `[cjk-bold] ${rel}:${fmLineCount + blockStart + 1} 加粗未渲染(收尾标点需移到 ** 之外):${offender.trim().slice(0, 50)}`
      );
    }
    block = [];
  };
  bodyLines.forEach((line, i) => {
    if (line.trim() === '') {
      if (block.length) flush();
      return;
    }
    if (!block.length) blockStart = i;
    block.push(line);
  });
  if (block.length) flush();

  // 3. relatedSlugs 目标存在性
  const relatedBlock = fm.match(/relatedSlugs:\s*\n((?:\s*-\s*.+\n?)*)/)?.[1] ?? '';
  for (const m of relatedBlock.matchAll(/-\s*(\S+)/g)) {
    const ref = m[1].trim();
    const hit = ['md', 'mdx'].some((ext) => existsSync(join(CONTENT, `${ref}.${ext}`)));
    if (!hit) errors.push(`[related] ${rel} relatedSlugs 指向不存在的条目:${ref}`);
  }
}

console.log(`\n—— 内容源检查 ——\n文件:${files.length}`);
for (const e of errors) console.log(`ERROR ${e}`);
if (errors.length) {
  console.error(`\n内容检查失败:${errors.length} 个问题`);
  process.exit(1);
}
console.log('内容检查通过');
