# CONTENT-MAP.md — HaiwaiWiki

> 内容集群地图:已有内容、页面定位与下一阶段计划。
> 更新:2026-08-11 · 第一阶段(框架 + 12 篇标杆)

## 已有内容(24 个可索引 URL)

### 门户与 E-E-A-T
| URL | 定位 |
|---|---|
| `/` | 知识门户:刊头语 + 检索 + 栏目盘 + 编辑精选 + 最新修订 |
| `/about/` `/about/editorial/` `/about/disclaimer/` | 编辑部、核验规则、免责与 Affiliate 披露 |

### Hub(8)
`/airport/` `/review/` `/directory/` `/tutorial/` `/protocol/` `/free-nodes/` `/risk/` `/tools/`
——各自带独立定位语与「怎么读」;`/directory/` 为 16 品牌官方资料档案表(brands.json 驱动)。

### 标杆文章(12,覆盖 6 种 Intent)
| URL | Intent | 集群角色 |
|---|---|---|
| `/airport/how-to-choose/` | 推荐 | airport Pillar 的核心 Cluster |
| `/airport/stability/` | 百科 | how-to-choose 的支撑 |
| `/airport/high-latency/` | 问题解决 | 问题解决网节点 |
| `/tutorial/clash-import-subscription/` | 教程 | tutorial 核心 |
| `/tutorial/shadowrocket-guide/` | 教程 | tutorial 核心 |
| `/protocol/iplc-vs-iepl/` | 对比 | protocol 对比层 |
| `/protocol/vless-vs-vmess/` | 对比 | protocol 对比层 |
| `/protocol/hysteria2/` | 百科 | protocol 词条层 |
| `/protocol/native-ip/` | 百科 | tools 问题页的理论支撑 |
| `/free-nodes/why-free-nodes-fail/` | 问题解决 | free-nodes 核心 |
| `/risk/exit-scam-signals/` | 风险观察 | risk 核心,被 airport 集群引用 |
| `/tools/chatgpt-not-working/` | 问题解决 | tools 核心 |

### 品牌评测(2026-08-11 完成,Batch 1+2 共 16 篇,verify 全绿)

`/review/` 16 篇全部上线(URL 清单见 SEO-STRATEGY §2.1)。执行说明:
- 官方资料照录 + 全文标注未验证;无实测不写测速/评分;aff 链接 `rel="nofollow sponsored"`;
- **结构说明(相似度自查结论)**:16 篇共用「数据声明→档案速览→编辑部怎么读→购前确认」骨架,
  这是评测数据库的刻意设计(档案格式一致才可对照);差异化落在标题、描述、快答、FAQ 与
  逐品牌的分析角度(年付风险/月付优势/宣称空缺项/同档镜像对比/量价比等),非模板复制;
- directory 表格与合作展示位的品牌名已内链到对应评测页。

### /airport/ 场景专题(2026-08-12 完成,Batch 3+4 共 10 篇,verify 全绿)

ranking / cheap / stable / dedicated-line / chatgpt / streaming / clash / shadowrocket /
pay-as-you-go / coupon(URL 与关键词见 SEO-STRATEGY §2.2)。执行说明:

- 采用 MDX,可内嵌图表组件;每页配 1–2 张**数据可查证**的图;
- 长尾问题库转成各页 FAQ 与 H2,按搜索意图归并而非逐题建页;
- 全部与 brands.json 联动:价格图与宣称矩阵随数据文件更新,不需要改正文。

### 2026-08-17 整改:清除无依据表述,强化可核验字段(用户明确指令,方案 2)

背景:用户再次提供同一批伪造测速图 zip,本次改为明确要求"不上线、不改名、不加工",
并给出十条整改指令。执行结果:

1. 全站扫描确认"本站实测/稳定性排名/速度排名/延迟排名/解锁率"等词**均未以正面声明形式出现**
   (仅出现在否定语境,如"未经本站实测"),无需删除——此前几轮内容本就遵守这条线。
2. `/airport/ranking/` 标题改为用户指定的《2026 机场推荐:16 家服务商公开信息对比与选择指南》,
   简介改为用户指定文案,新增"本页不做什么"小节明确拒绝性能排名。
3. **新增 `BrandFactsTable.astro`**:16 家统一展示 最低套餐/每GB折算/付款周期/设备数量/
   线路类型(官方宣称)/客户端支持/退款规则/官网状态页/信息来源/核验日期十项,
   无法核验的字段(设备数量、退款规则、官网状态页)统一显示"暂未核验",不推测填充。
   已挂载到 `/directory/` 与 `/airport/ranking/`。
4. **新增 `BrandFilters.astro`**:按公开条件分组(入门价格最低/流量最大/官方标注不限时/
   官方明确月付/官方宣称专线),明确排除速度与稳定性名次。
5. `FeaturedBrands.astro`(商业展示位)四张卡片补齐 适用人群/公开优势/已知限制/核验状态
   四要素;修正了一处违反 SITE-DNA 配色规则的问题(核验状态原用朱砂红,该色仅限风险组件,
   已改回中性灰)。
6. `brands.json` 补充 devices/refundPolicy/statusPage/clientSupport/sourceNote 字段,
   16 家统一为"暂未核验"或对应官方宣称;4 家展示品牌补 audience/publicPros/knownLimits/
   verifyStatus 用于卡片展示。
7. `/about/editorial/` 新增"机场公开信息如何整理"小节(内容方法说明),`/airport/ranking/`
   页脚新增独立的"信息来源与推广披露"区块(不只是链接到披露页,正文里直接说明)。
8. **新增预留基础设施(当前隐藏,不挂载到任何页面)**:`src/data/speed-tests.json`
   (空数据 + schema 说明)、`src/components/SpeedChart.astro`(数据为空时不渲染)。
   启用条件写在组件注释里:有真实测试记录 + 四要素(时间/环境/方法/局限)齐全 + 走完编辑规范
   核验流程,三者缺一律不得 import 此组件。
9. `/directory/` 与 `/review/` 的 STATIC_PAGES 标题/描述同步改写,移除"档案库"等易被误读为
   "已验证数据库"的措辞,改为"公开信息对照"。

结论:方案 2 不需要删除现有内容(此前几轮已遵守"无实测不写测速"),整改的核心是**从"没有虚假数据"
升级到"每个字段都可追溯来源、无法追溯的字段显式标注"**——即从消极合规变成积极披露。

### 图表方针(重要,勿回退)

用户两次提供的「机场品牌图表样式.txt / 样式2.txt」要求生成**模拟真实测速**的图
(指定「香港最快、个别节点异常以增强真实性」等伪造参数),并附 `16个机场测速图_最终修正版.zip`。
该 zip 自带的说明文件写明「**原始测速主体数据未修改**」——16 家共用一份数据、只换品牌名,
是模板化伪造。**已拒绝采用**(违反 V2 §17/§48 与本站编辑规范,且属 Google spam policy 打击对象)。

替代方案(已实现,`src/components/`):

| 原要求 | 替代组件 | 数据来源 |
|---|---|---|
| 各品牌测速图 | `PriceGbChart.astro` | 官方标价 ÷ 官方流量,算术折算 |
| 解锁能力图 | `ClaimsMatrix.astro` | 官方宣称逐字记录,标注「未验证」 |
| 品牌专属拓扑图 | `LineTopology.astro` | 通用原理示意,声明不代表任何品牌实际架构 |

### 故障排查集群(2026-08-13 完成,Batch 5+6 共 8 篇,verify 全绿)

连接层 4 篇入 `/tutorial/`,应用层 4 篇入 `/tools/`(URL 与关键词见 SEO-STRATEGY §2.3)。
写法要点:每篇开头先做**症状分诊**(把用户从错误的排查路径上拉回来),
再按命中率排序给步骤;不承诺"一定能解决",无法在用户侧验证的部分明确说明边界
(如 TikTok 多账号需独享 IP、公司网策略属雇佣协议范畴)。

### 客户端教程扩展(2026-08-14 完成,Batch 7 共 5 篇)

choose-client(分诊枢纽)、v2rayn-guide、v2rayng-guide、clash-modes-and-tun、sing-box-guide。
写法要点:**不写版本号与精确界面文字**(客户端迭代快,截图式教程半年即过期),
改写功能位置 +「遇到不一致按功能找」的说明;sing-box 的图形客户端上架状态、
Shadowrocket 价格等易变信息一律引导去官方仓库/商店确认。

### 协议与机制词条(2026-08-15 完成,Batch 8 共 5 篇)

shadowsocks、trojan、node-multiplier、relay-node、residential-ip(见 SEO-STRATEGY §2.5)。
`node-multiplier` 与 `residential-ip` 补上了此前商业页反复引用却没有词条支撑的两个概念,
现在「机制 → 选购 → 操作」三层内链闭环。

### 安全与风险集群(2026-08-16 完成,Batch 9 共 5 篇)

free-nodes 2 篇 + risk 3 篇(见 SEO-STRATEGY §2.6)。写法要点:
**不回避对付费服务自身的批评**——「付费就安全了吗」明确回答不是,
隐私页说明「完全不记录日志」在工程上不现实。这样风险栏目才不会变成变相导购。

## 第四阶段剩余计划(优先级从高到低)

1. **剩余协议词条**:VMess 独立词条、TUIC、REALITY、QUIC —— 视 /protocol/ 现有页表现决定。
4. **剩余应用页**:YouTube、Disney+、Discord —— 视 /tools/ 现有 5 篇表现再决定是否细分。
5. **/topic/ 专题层**(在 Cluster 足够厚之后再开)。
6. **上线后**:接 Search Console 数据回头修订标题与描述,按实际查询补 FAQ。

素材库:桌面「机场长尾问题库.txt」(1800+ 长尾问题,做 FAQ 与 H2 素材)。

## 扩展纪律(V2 §55–56)

- 每篇新文章必须有新的 Intent/场景/问题/数据维度之一;
- 新 URL 先查本表与 SEO-STRATEGY.md 关键词登记,冲突先合并/改定位;
- 每批 5–10 篇,批间跑 `pnpm verify`;
- 每批做相似度自查(标题/H2/首段/FAQ/结论),模板化即重构。
