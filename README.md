# HaiwaiWiki｜海外Wiki

haiwaiwiki.com — 中文机场与海外网络工具知识库。Astro 静态站,零 UI 框架,SEO/GEO 优先。

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

## 常用命令

| 命令 | 作用 |
|---|---|
| `pnpm dev` | 开发服务器 |
| `pnpm build` | 构建 + 生成 Pagefind 搜索索引(输出 `dist/`)|
| `pnpm preview` | 预览构建产物 |
| `pnpm check` | astro check(TS/组件诊断)|
| `pnpm audit:seo` | 对 dist/ 跑 SEO 审计(需先 build)|
| `pnpm lint:content` | 源码级内容检查(不需要 build,最快)|
| `pnpm verify` | content-lint + check + build + seo-audit 全链路(发布前必跑)|
| `pnpm gen:og` | 重新生成 `public/og-default.png`(仅品牌视觉变更时)|
| `pnpm submit:indexnow` | 部署后向 IndexNow 提交 URL(Bing 系)|

`pnpm build` 内含三步:`astro build` → `pagefind` 建索引 → `sitemap-lastmod.mjs`
用 frontmatter 的真实时间改写 sitemap 的 lastmod(否则全站重建会让所有页面看起来都更新了)。

`verify` 会在以下情况失败:

- **源码层**(content-lint):frontmatter 出现 ASCII 双引号(YAML 会解析失败)、
  CJK 加粗未渲染(`**……。**后接文字` 的写法)、relatedSlugs 指向不存在的条目;
- **产物层**(seo-audit):重复 title/description/primaryKeyword、缺失或多个 H1、
  canonical 不一致或 noindex 页误带 canonical、站内断链、孤立页面、
  noindex 页进 sitemap、正文残留字面 `**`、JSON-LD 语法错误或含 http/示例域名、
  FAQPage 无对应可见问答、外链非 HTTPS、`target="_blank"` 缺 noopener、
  推广链接缺 `rel="sponsored nofollow"`、链接指向 localhost/示例域名、
  正文残留 TODO、图片缺 alt。
  警告项(不阻断构建):标题层级跳级、正文过薄、title/description 过长或过短。

### 两个中文写作陷阱(踩过多次)

1. **加粗**:`**这句话。**下一句` 不会渲染,页面显示字面 `**`。
   把收尾标点移到外面:`**这句话**。下一句`;
2. **frontmatter 引号**:中文内容一律用「」,不要用 ASCII `"`。

## 新增内容

1. 在 `src/content/{collection}/` 下新建 `.md`(集合:airport/review/tutorial/protocol/free-nodes/risk/tools);
2. frontmatter 必填:title、description、pubDate、primaryKeyword、searchIntent、contentType;
   建议填:quickAnswer(GEO)、relatedSlugs、lastVerified、faq;各集合扩展字段见 `src/content.config.ts`;
3. **primaryKeyword 全站唯一**——先查 `SEO-STRATEGY.md` 登记表,新词写入登记表;
4. `relatedSlugs` 格式 `collection/slug`,指向不存在的条目会 build fail;
5. 注意:frontmatter 中文文本不要以 ASCII 双引号开头(YAML 解析陷阱),引号用「」;
6. 发布前 `pnpm verify`。

品牌档案数据在 `src/data/brands.json`(仅官方公开资料,勿写入未实测数据)。
静态页 SEO 元数据集中在 `src/data/site.ts` 的 `STATIC_PAGES`(audit 脚本共用)。

### 图表组件(MDX 内可用)

```mdx
import PriceGbChart from '../../components/PriceGbChart.astro';
import ClaimsMatrix from '../../components/ClaimsMatrix.astro';
import LineTopology from '../../components/LineTopology.astro';

<PriceGbChart title="每 GB 成本排序" limit={8} />
<ClaimsMatrix dims={['iepl', 'ai', 'stream']} />
<LineTopology />
```

三者的数据都来自 `brands.json` 的官方公开字段或纯原理示意。
**不要新增基于未实测数据的图表**(测速图、解锁评分、质量排名)——
理由与既往决策记录在 `CONTENT-MAP.md` 的「图表方针」一节。

## 项目文档

`SITE-DNA.md`(品牌与设计基因)· `INFORMATION-ARCHITECTURE.md`(栏目/URL/导航)·
`SEO-STRATEGY.md`(关键词登记)· `CONTENT-MAP.md`(内容地图与计划)·
`INTERNAL-LINK-MAP.md`(内链关系)· `UNIQUENESS-AUDIT.md`(原创性审计)

## 部署(Cloudflare Pages)

| 配置 | 值 |
|---|---|
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node version | `24`(环境变量 `NODE_VERSION=24`)|
| 包管理 | pnpm(Pages 自动识别 `pnpm-lock.yaml`)|

环境变量(可选,在 Pages 项目设置里加,加了才会输出对应 meta):

| 变量 | 用途 |
|---|---|
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console 的 HTML 标记验证值 |
| `PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster 的 `msvalidate.01` 值 |

`public/_headers` 已配置安全响应头与缓存策略(哈希资源永久缓存、HTML 走协商缓存)。

### 上线后必须在控制台完成的三件事

1. **域名规范化**:`haiwaiwiki.com`(non-www)为 canonical。
   在 Cloudflare 加一条重定向规则 `www.haiwaiwiki.com/* → https://haiwaiwiki.com/$1`(301),
   并开启 Always Use HTTPS。**Pages 的 `_redirects` 文件无法按主机名匹配,这一步只能在控制台做。**
2. **提交 sitemap**:Google Search Console 与 Bing Webmaster 都提交
   `https://haiwaiwiki.com/sitemap-index.xml`。
3. **IndexNow**:确认 `https://haiwaiwiki.com/126b66223b7e490c9cce8b3c1065ef6c.txt`
   可以访问,然后运行 `pnpm submit:indexnow`(Bing/Yandex 系,Google 不参与该协议)。

之后每次批量更新内容,重新跑一次 `pnpm submit:indexnow` 即可主动通知。
真机 Lighthouse 建议在正式域名上跑(本地 preview 的分数不代表 CDN 环境)。
