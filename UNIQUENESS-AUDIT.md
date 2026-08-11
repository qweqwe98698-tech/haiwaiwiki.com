# UNIQUENESS-AUDIT.md — HaiwaiWiki 原创性审计

> 审计时间:2026-08-11(第一阶段完成时)· 审计者:编辑部(构建流程内自查)
> 背景:所有者同时运营多个同领域站点,本站必须通过「去品牌识别测试」——
> 删除 Logo/域名/主色后仍能被认出是独立网站。

## 评分(1–10,低于 8 必须整改)

| 维度 | 分 | 依据 |
|---|---|---|
| Brand Uniqueness | 9 | 「词条式知识库 + 编辑部」定位;Brand Promise 具体(可查证/可对照/可修订);三条编辑铁律成为可感知的产品特征(核验说明、快答、风险分档出现在每页) |
| UI Uniqueness | 9 | 纸面辞书语言:双细线刊头、2px 直角、索引行代替卡片网格、编号系统、汉字记号;无阴影无渐变无图标库 |
| Homepage Structure | 9 | 刊头语→检索→栏目号码盘→编辑精选+编辑部规矩侧栏→最新修订;无 Hero banner、无三按钮、无统计数字 |
| Navigation | 8 | 桌面 7 项文字链无按钮 CTA;移动端 CSS-only 全宽编号索引(非缩小版桌面);免费节点让位于 footer/栏目盘 |
| Information Architecture | 9 | 8 栏目各承担独立 Intent;directory(Discovery)与 review(Investigation)明确分工不重复;免费节点定位为「知识中心不发节点」 |
| Content Model | 9 | 7 集合独立 schema(评测含 dataSource/testedAt,风险含 riskLevel/sourceType);reviewStatus/lastVerified 全站强制 |
| Article Structure | 8 | 六种 Intent 六种结构:推荐=三步框架、对比=结论先行、风险=证据强度分档、教程=步骤+三类报错、问题解决=分层/按命中率排序;无统一模板 |
| Copywriting | 9 | 编辑部第一人称复数;「宁可少一个模块,不造一个数字」式具体承诺;全文无「随着互联网的发展/一站式/专业稳定安全」类套话;标题全部为具体判断句 |
| Components | 8 | IndexRow/SectionDial/QuickAnswer/VerifyNote/FaqList/RelatedEntries 视觉互异(线型/编号/底色区分),非同一圆角矩形 |
| Search Intent | 9 | 21 个登记关键词零冲突(audit 脚本强制);首页=海外网络工具,/airport/=机场推荐,分工延续既定决策 |
| Mobile UX | 8 | 单栏、索引行保持行式、TOC 与导航折叠、表格横向滚动、点击区 ≥44px;未做真机多设备实测(标记为后续项) |

**总评:全部 ≥8,通过。**

## 第二次审计(2026-08-15,68 个可索引 URL)

内容量从 12 篇扩到 56 篇后复审,重点看**规模化之后是否出现模板感**。

| 维度 | 分 | 变化与依据 |
|---|---|---|
| Brand Uniqueness | 9 | 不变。三条铁律在扩张中被反复执行:拒绝伪造测速图、图表改为可查证数据、宣称一律标注未验证 |
| UI Uniqueness | 9 | 不变。新增三个图表组件(PriceGbChart / ClaimsMatrix / LineTopology)延续 hairline + 墨绿 + 无阴影语言,未引入卡片阴影或渐变 |
| Homepage Structure | 9 | 不变 |
| Navigation | 8 | 不变。栏目数未增,新内容全部落进既有 8 个栏目 |
| Information Architecture | 9 | 强化。故障排查按「连接层 /tutorial/ vs 应用层 /tools/」分层,未新开平行栏目;拒绝了关键字文档建议的 /cheap-airport/ 等平行路由 |
| Content Model | 9 | 不变。新增 MDX 支持,schema 未变 |
| Article Structure | **9**(↑1) | 结构分化进一步扩大:场景页=框架+图表+购前清单、故障页=症状分诊表+按命中率排序、词条页=定义+对照+误区、评测页=档案骨架。同类之间也有差异(如 ranking 先讲「为什么不做打分榜」) |
| Copywriting | 9 | 不变。抽查 56 篇无套话;每篇首段各自成立,无统一开场句式 |
| Components | **9**(↑1) | 补齐了原标记为待办的对照类组件;图表组件均自带来源与未验证声明,成为品牌特征的一部分 |
| Search Intent | 9 | 65 个关键词零冲突;新增内耗规避决策(稳定机场推荐 vs 机场稳定性、Claude vs ChatGPT、Clash 导入订阅 vs TUN 模式)均记录在 SEO-STRATEGY |
| Mobile UX | 8 | 不变。375px 下实测无横向溢出、图表自带滚动容器;真机 Lighthouse 仍未做 |

**总评:两项提升,其余持平,全部 ≥8,通过。**

### 规模化后的新风险(本次专项检查)

- **16 篇评测页共用档案骨架** —— 判定为**刻意设计而非模板化**:档案格式统一才能横向对照,
  差异化落在分析角度(年付风险/月付优势/宣称空缺/同档镜像)。已在 CONTENT-MAP 记录理由;
- **10 篇场景页都含图表** —— 图表按需选择(价格图/宣称矩阵/拓扑图三选一或二),
  且每页图表标题与解读文字不同,不构成堆砌;
- **8 篇故障页都以分诊表开场** —— 这是该内容类型的功能需求(先纠正错误的排查方向),
  分诊维度各不相同。

## 去品牌识别测试(SITE-DNA §8 清单)

- [x] 首屏无 Hero 大图/渐变/三按钮;
- [x] 列表为索引行,非圆角卡片网格;
- [x] 全站仅墨绿主色 + 朱砂警示色(朱砂只出现在风险组件);
- [x] 标题/首段/FAQ 全部本站新写(本次为全新重建,无历史文案复用);
- [x] CTA 全部为「继续阅读」式文字链。

## 已知偏差与后续整改项

1. **Mobile UX 8 分**:CSS 层面已按移动优先处理,但未做真机 Lighthouse/多设备实测——
   部署到 Cloudflare Pages 后补测,目标 Performance/Accessibility/Best Practices ≥ 90;
2. **Components 8 分**:评测类组件(CompareTable 首列吸附、EntryDef、StepList 大字编号)
   在第二阶段品牌评测上线时补齐并复审;
3. 每完成一批扩展内容,重跑本审计的 Article Structure 与 Copywriting 两项
   (相似度自查见 CONTENT-MAP 扩展纪律)。
