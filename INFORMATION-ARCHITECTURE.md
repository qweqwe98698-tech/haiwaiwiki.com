# INFORMATION-ARCHITECTURE.md — HaiwaiWiki

> 站点信息架构:栏目、URL、导航、页面类型与用户路径。
> 创建:2026-08-11 · v1

## 1. 栏目体系(编号即站内索引号)

| # | 栏目 | URL | 页面类型 | 承担 Intent |
|---|---|---|---|---|
| — | 首页 | `/` | 知识门户 | 品牌 + 分流 |
| 01 | 机场推荐 | `/airport/` | Pillar Hub | Commercial(怎么选)|
| 02 | 机场评测 | `/review/` | 评测数据库 Hub | Commercial Investigation |
| 03 | 机场导航 | `/directory/` | 目录/档案 | Discovery |
| 04 | 客户端教程 | `/tutorial/` | 教程中心 Hub | Tutorial |
| 05 | 代理知识 | `/protocol/` | 技术百科 Hub | Informational |
| 06 | 免费节点 | `/free-nodes/` | 知识中心 Hub | Informational/风险 |
| 07 | 风险预警 | `/risk/` | 观察中心 Hub | Risk/Informational |
| 08 | 网络工具 | `/tools/` | 应用指南 Hub | Troubleshooting |
| — | 专题 | `/topic/`(预留,第二阶段) | 聚合页 | 混合 |

辅助页面:

| 页面 | URL | 说明 |
|---|---|---|
| 关于本站 | `/about/` | 编辑部介绍、联系方式 |
| 编辑规范 | `/about/editorial/` | 内容生产/核验/更新规则(E-E-A-T)|
| 免责声明 | `/about/disclaimer/` | 法律与数据免责、Affiliate 披露 |
| 站内搜索 | `/search/` | Pagefind,noindex,不入 sitemap |
| 404 | `/404` | 自定义,带索引导航 |
| RSS | `/rss.xml` | 全站文章 |
| Sitemap | `/sitemap-index.xml` | @astrojs/sitemap 生成 |
| robots | `/robots.txt` | 指向 sitemap |

## 2. URL 规则

- 统一 `https://haiwaiwiki.com`(non-www 为 canonical,www 301 → non-www,在 Cloudflare 配置)。
- 全站 trailing slash:`/path/`(astro `trailingSlash: 'always'`)。
- 文章 URL:`/{栏目}/{slug}/`,slug 用短英文小写连字符,禁止日期/分类嵌套。
- 子教程可一层嵌套:`/tutorial/clash/import-subscription/`(仅教程栏目允许)。
- 禁止:`href=""`、`href="#"`、指向未建页面的内链。

## 3. 主导航

桌面(顶部单行,7 项):
机场推荐 · 机场评测 · 机场导航 · 客户端教程 · 代理知识 · 风险预警 · 网络工具

(免费节点不占一级导航位——它在首页栏目盘、footer 与相关内链中入口充分;控制一级导航数量)

移动端:CSS-only 展开(details),展开后为全宽编号索引列表(01–08 全量,含免费节点)。

Footer 四列:全部栏目索引 / 关于(about/editorial/disclaimer)/ 订阅(RSS/Sitemap)/ 声明。

## 4. 内容集合 → URL 映射

| 集合 | 目录 | URL 前缀 |
|---|---|---|
| airport | `src/content/airport/` | `/airport/` |
| review | `src/content/review/` | `/review/` |
| tutorial | `src/content/tutorial/` | `/tutorial/` |
| protocol | `src/content/protocol/` | `/protocol/` |
| freeNodes | `src/content/free-nodes/` | `/free-nodes/` |
| risk | `src/content/risk/` | `/risk/` |
| tools | `src/content/tools/` | `/tools/` |

`/directory/` 不是集合:由 `src/data/brands.json`(官方公开资料)驱动的档案页。

## 5. 用户路径(三类受众)

**新手(Primary)**
首页栏目盘 → /airport/(怎么选)→ 教程(怎么用)→ 工具页(装好后解决访问问题)

**进阶(Secondary)**
搜索/词条直达 → /protocol/ 词条 → 对比文章 → 相关词条网

**决策(Commercial)**
/airport/ 场景推荐 → /directory/ 档案对照 → /review/ 单品牌评测 → 官网(nofollow sponsored)

商业转化只发生在 02/03 与推荐场景页;01 之外的知识内容不插商业 CTA。

## 6. 点击深度

- 所有 Hub:首页 1 击。
- 所有文章:首页 ≤3 击(Hub → 文章,或首页精选直达)。
- 每篇文章通过 RelatedEntries + PrevNext 保证无孤页。

## 7. 页面模板

| 模板 | 用于 | 结构要点 |
|---|---|---|
| BaseLayout | 全站 | header 双细线刊头 + footer 索引 |
| HubLayout | 8 个栏目页 | 栏目号 + 定位语 + 索引行列表 + 本栏目怎么读 |
| ArticleLayout | 全部文章 | 见 SITE-DNA §5 articlePattern;按 contentType 动态启用 QuickAnswer/EntryDef/StepList/RiskNotice |
| 首页 | / | 刊头语 → 搜索 → SectionDial(8 格)→ 编辑精选(索引行)→ 最新修订 |
