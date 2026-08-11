/**
 * 生成默认 OG 主图(1200×630)到 public/og-default.png。
 * 只在品牌视觉变更时手动运行:node scripts/gen-og.mjs
 * 不放进 build 流程,避免每次构建都跑图像处理。
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const W = 1200;
const H = 630;

// 与 SITE-DNA 一致:纸感底、墨绿主色、双细线、无渐变无阴影
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#faf9f5"/>
  <rect x="0" y="0" width="14" height="${H}" fill="#1e6b52"/>
  <g stroke="#dedbd0" stroke-width="2">
    <line x1="96" y1="132" x2="1104" y2="132"/>
    <line x1="96" y1="139" x2="1104" y2="139"/>
    <line x1="96" y1="498" x2="1104" y2="498"/>
    <line x1="96" y1="505" x2="1104" y2="505"/>
  </g>
  <g font-family="DejaVu Sans, Verdana, sans-serif">
    <text x="96" y="112" font-size="30" font-weight="700" fill="#1d221f" letter-spacing="1">
      Haiwai<tspan fill="#1e6b52">Wiki</tspan>
    </text>
    <text x="96" y="250" font-size="64" font-weight="700" fill="#1d221f">haiwaiwiki.com</text>
    <text x="96" y="330" font-size="34" fill="#5a6058">Proxy &amp; overseas network knowledge base</text>
    <text x="96" y="392" font-size="34" fill="#5a6058">Verifiable entries. Sources dated.</text>
    <text x="96" y="562" font-size="26" fill="#1e6b52" letter-spacing="4">01 — 08 INDEX</text>
  </g>
</svg>`;

const out = join(process.cwd(), 'public', 'og-default.png');
const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(out, buf);
console.log(`生成 ${out}(${(buf.length / 1024).toFixed(1)} KB)`);
