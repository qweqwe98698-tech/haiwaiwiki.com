# 最终验收报告 — HaiwaiWiki

验收时间:2026-08-16 · 依据:《最终阶段:全站 SEO、GEO、索引与质量验收》十五项
构建状态:`pnpm verify` 全绿(content-lint 0 / astro check 0 错误 0 警告 / seo-audit 0 错误 0 警告)

---

## 一、检查范围

| 项目 | 数量 |
|---|---|
| 构建产出 HTML | 77 个(75 个可索引 + `/search/` + `/404`)|
| 内容条目(Markdown/MDX) | 61 篇 |
| 栏目页 | 8 个 |
| 站务页 | 关于 / 编辑规范 / 免责声明 / 隐私政策 / 网站地图 / 检索 |
| 登记关键词 | 70 个,零冲突 |
| 站内检索索引 | 75 页(此前仅 61 页,本次修复)|
| 构建产物 | 179 个文件;CSS 85 KB、非检索 JS **0 KB**、Pagefind 932 KB(仅检索页加载)、图片 35 KB |

---

## 二、本轮发现并已修复的问题

| # | 问题 | 处理 |
|---|---|---|
| 1 | **站内检索只覆盖 61 篇文章**,栏目页、品牌库、关于页搜不到 | `data-pagefind-body` 从文章布局上移到 BaseLayout 的 `<main>`,按 noindex 自动排除;索引 61 → 75 页 |
| 2 | **全站无 og:image**,社交与部分抓取工具无主图 | 用 sharp 生成品牌化 OG 图(1200×630,与 SITE-DNA 同一视觉语言),全站输出 `og:image` + `summary_large_image` |
| 3 | **缺 HTML 网站地图** | 新建 `/sitemap/`,按栏目分组列出全部 61 条目并标注更新时间 |
| 4 | **缺隐私政策** | 新建 `/about/privacy/`,如实说明无用户系统、检索在本地执行、托管商日志边界 |
| 5 | **sitemap 无 lastmod** | 新增 `scripts/sitemap-lastmod.mjs`,用 frontmatter 真实时间改写(避免全站重建让所有页面"看起来都更新了")|
| 6 | **noindex 页同时输出 canonical**(矛盾信号) | `/search/`、`/404` 不再输出 canonical;审计规则同步更新 |
| 7 | **Article 缺 dateModified 与 image** | 无修订时间时用发布时间兜底;补 image 与 publisher.logo |
| 8 | **WebSite 缺 SearchAction** | 补 `potentialAction`,指向 `/search/?q={search_term_string}` |
| 9 | **about 系页面缺页面类型 Schema** | 补 AboutPage / ContactPage / WebPage |
| 10 | **键盘焦点不可见** | 加 `:focus-visible` 墨绿描边 + 「跳到主要内容」跳过链接 |
| 11 | **未响应 prefers-reduced-motion** | 加媒体查询,系统开启减弱动效时禁用过渡 |
| 12 | **移动端 43 个链接点击区 < 24px**(WCAG 2.5.8) | footer/列表/索引行链接补 padding;价格图品牌名加 `py-1`;复测归零 |
| 13 | **无 IndexNow 接入** | 密钥文件入 `public/`,新增 `pnpm submit:indexnow` |
| 14 | **无站长验证入口** | 改为环境变量驱动(`PUBLIC_GOOGLE_SITE_VERIFICATION` / `PUBLIC_BING_SITE_VERIFICATION`),不在仓库存死值 |
| 15 | **无缓存与安全响应头** | 新增 `public/_headers`:哈希资源永久缓存、HTML 协商缓存、nosniff / Referrer-Policy / X-Frame-Options |
| 16 | 审计脚本覆盖不足 | 新增 9 类检查(见第四节)|
| 17 | 两处 TS 未使用变量警告 | 已清理,`astro check` 0 警告 |

### 一处判定为「不是问题」

审计初版把 `/tools/telegram-not-connecting/` 正文里的 `example.com` 报为占位残留。
`example.com` 是 IETF 保留的示例域名,在讲解「按域名匹配分流规则」时使用是正确写法。
**已收紧规则**:只有出现在 `href`/`src`/`action` 属性里才判为残留,正文举例不拦。

---

## 三、逐项对照结论

| 验收项 | 状态 | 说明 |
|---|---|---|
| 一、全站基础运行 | ✅ | 构建成功;无空白页、无控制台错误;中文编码正常;桌面/平板/移动实测无横向溢出;导航、面包屑、TOC、检索、分页均可用 |
| 二、页面级 SEO | ✅ | 75 个可索引页各自唯一 title/description/H1/canonical;OG 与 Twitter Card 齐全;无关键词堆砌;正文不依赖 JS 渲染 |
| 三、技术 SEO | ⚠️ 部分需控制台 | robots.txt、sitemap(带 lastmod)、RSS、HTML 网站地图、自定义 404、无孤立页、点击深度 ≤3 均已完成;**www→apex 与强制 HTTPS 必须在 Cloudflare 控制台配置** |
| 四、结构化数据 | ✅ | WebSite(含 SearchAction)、Organization、Article、BreadcrumbList、FAQPage、ItemList、AboutPage、ContactPage;全部通过 JSON 语法与域名校验;FAQPage 强制要求页面有可见问答 |
| 五、GEO | ✅ | 每篇有快答直接回答、定义段、对照表、步骤、检查清单;区分事实/观察/推测;标注发布与核验时间;责任主体明确;故障类内容统一「症状分诊 → 原因 → 步骤 → 仍未解决怎么办」 |
| 六、内容质量与关键词 | ✅ | 70 个关键词一词一页,冲突由构建强制拦截;十类搜索意图分别由对应页面承接 |
| 七、内部链接 | ✅ | 无孤立页;`relatedSlugs` 指向不存在条目会直接构建失败;锚文本按语境撰写,无批量重复 |
| 八、外链与推广链接 | ✅ | 全部 HTTPS;`target="_blank"` 必带 noopener noreferrer;推广链接必带 `rel="sponsored nofollow"`——三项均已写入审计强制检查 |
| 九、E-E-A-T | ✅ | 关于/联系方式/编辑规范/数据来源分级/更新机制/免责声明/推广披露/隐私政策齐全;未虚构团队规模、测试数据、运营年限或认证 |
| 十、性能与 CWV | ⚠️ 需部署后实测 | 非检索页 **零 JavaScript**;系统字体无 webfont 请求;无第三方脚本;无未设尺寸的图片(全站几乎无正文配图,CLS 风险极低);真实分数需在 CDN 环境测 |
| 十一、移动端与可访问性 | ✅ | 无横向滚动;点击区 ≥24px;表格与图表自带滚动容器;焦点可见;标题层级连续;`lang="zh-Hans"`;深浅色对比度 5.06–15.32:1,全部超 AA |
| 十二、索引策略 | ✅ | `/search/`、`/404` 为 noindex 且不进 sitemap;无标签页/空分类页/参数页 |
| 十三、部署环境 | ⚠️ 部分需控制台 | 构建配置、输出目录、`_headers`、IndexNow 密钥、绝对域名(canonical/OG/sitemap/robots)均已就位;**无 localhost、示例域名、TODO、占位图、虚假数据残留**(已加入强制检查) |
| 十四、最终构建与自动化 | ✅ | 见下节 |

---

## 四、自动化检查清单(已内置,每次 `pnpm verify` 执行)

**源码层 `content-lint.mjs`** — frontmatter ASCII 引号(YAML 崩溃前拦截)、
CJK 加粗渲染失败、relatedSlugs 断链。

**产物层 `seo-audit.mjs`** — 共 14 组检查:

1. 单页结构(title/description/H1/canonical 数量)
2. CJK 加粗残留
3. 全站重复 title / description
4. canonical 一致性 + noindex 页不得带 canonical
5. 站内断链、空 href
6. 孤立页面
7. primaryKeyword 全站唯一
8. sitemap 与可索引页一致、noindex 不得进 sitemap
9. **JSON-LD 语法 / http 链接 / 示例域名 / FAQPage 需有可见问答**
10. **外链 HTTPS、noopener noreferrer、推广链接 rel**
11. **占位与开发残留(localhost / 示例域名 / TODO)**
12. **标题层级跳级、正文过薄**(警告)
13. **图片缺 alt**
14. **title/description 长度**(警告)

任一错误级问题都会让构建失败,内容不会带着这些问题上线。

---

## 五、仍需站长手动完成(代码无法代劳)

| 事项 | 位置 | 说明 |
|---|---|---|
| www → 非 www 301 | Cloudflare 控制台 → 规则 | Pages 的 `_redirects` 不支持按主机名匹配 |
| 强制 HTTPS | Cloudflare → SSL/TLS → Always Use HTTPS | 一个开关 |
| 提交 sitemap | Google Search Console / Bing Webmaster | 提交 `https://haiwaiwiki.com/sitemap-index.xml` |
| 站长验证 | Pages 环境变量 | 填 `PUBLIC_GOOGLE_SITE_VERIFICATION` / `PUBLIC_BING_SITE_VERIFICATION` 后重新部署 |
| IndexNow 首次提交 | 部署后运行 `pnpm submit:indexnow` | 需先确认密钥文件可访问 |
| 真机 Lighthouse | 正式域名 | 本地 preview 分数不代表 CDN 环境 |

## 六、需部署后验证的项目

- HTTPS 跳转、www 归一、404 回退是否按预期生效;
- `_headers` 的缓存策略是否被 Cloudflare 正确应用;
- Core Web Vitals 实际数值(LCP / INP / CLS);
- 社交平台抓取 OG 图是否正常(可用各平台的调试工具验证)。

## 七、暂时无法验证的项目

- **搜索引擎是否收录、多久收录**——由搜索引擎决定,任何人无法保证;
- **16 家机场品牌的官方宣称是否属实**——本站未实测,页面已全部标注「官方宣称·未经本站验证」;
- **生成式搜索是否引用本站内容**——只能通过结构化、可抽取、标注来源的内容提高概率。

## 八、后续维护建议

1. **每批内容后跑 `pnpm verify`**,任何错误级问题会阻断构建;
2. **价格与优惠码每季度核验一次**,更新 `brands.json` 的 `lastVerified`——
   过期的价格比没有价格更伤可信度;
3. **上线 2–4 周后接 Search Console 数据**,按真实查询回头修订 title/description、补 FAQ,
   这比继续按关键词表铺量更有效;
4. **内容更新后运行 `pnpm submit:indexnow`** 主动通知 Bing 系;
5. 客户端教程注意版本漂移:本站教程刻意不写版本号与精确界面文字,但功能位置变化时仍需修订。

---

## 关于效果的说明

本报告不承诺任何关键词排名、收录时间或流量数字——这些不由建站方决定。
已完成的是可控部分:规范的技术架构、原创且标注来源的内容、清晰的主题结构、
零 JavaScript 的页面体验,以及一套会在构建阶段拦住劣化的自动检查。
