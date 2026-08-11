# SEO-STRATEGY.md — HaiwaiWiki

> 关键词地图与 SEO/GEO 策略。每个可索引 URL 必须在此登记且 primaryKeyword 全站唯一。
> 创建:2026-08-11 · v1(第一阶段:框架 + 12 篇标杆)

## 0. 全局规则

1. 每个 URL:1 个 primaryKeyword + 若干 secondaryKeywords + 明确 searchIntent。
2. **primaryKeyword 全站唯一**(seo-audit 脚本强制,重复即 build fail)。
3. 冲突处理顺序:合并页面 > 改 Intent > 改场景 > 改定位;禁止只改标题。
4. 首页 primaryKeyword = 「海外网络工具」;「机场推荐」归 `/airport/`(Pillar)。
5. GEO:重要问题页首屏给 QuickAnswer(40–100 字直答);词条页给 EntryDef 定义块;涉及数据必带核验时间。

## 1. 四层结构

- **L1 首页**:海外网络工具 / 机场知识库(品牌层)
- **L2 栏目**:机场推荐 / 机场评测 / 机场导航 / 客户端教程 / 代理协议 / 免费节点 / 风险预警 / 网络工具指南
- **L3 专题**(第二阶段):稳定机场推荐 / 便宜机场推荐 / IPLC机场 / AI机场 / Netflix机场 …
- **L4 长尾**(文章):Clash 怎么导入订阅 / IPLC 和 IEPL 区别 / 机场跑路前兆 / ChatGPT 无法访问 …

## 2. 关键词登记表(第一阶段全部 URL)

| Target URL | Primary Keyword | Secondary | Intent | Page Type | Pillar | Priority | Funnel | 主要内链指向 | Status |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 海外网络工具 | 海外网络知识库, 机场知识库 | Navigational/Brand | 门户 | — | P0 | Awareness | 全部 Hub | ✅ |
| `/airport/` | 机场推荐 | 机场代理推荐, 2026机场推荐, 机场选择 | Commercial | Pillar Hub | self | P0 | Consideration | how-to-choose, directory, review | ✅ |
| `/review/` | 机场评测 | 机场测评, 机场评测网站 | Commercial Investigation | Hub | airport | P0 | Decision | directory, airport | ✅ |
| `/directory/` | 机场导航 | 机场大全, 机场官网入口 | Discovery | 档案页 | airport | P0 | Consideration | review, airport | ✅ |
| `/tutorial/` | 机场使用教程 | 代理客户端教程, 机场订阅教程 | Tutorial | Hub | self | P0 | Onboarding | clash, shadowrocket | ✅ |
| `/protocol/` | 代理协议 | 机场协议, 代理协议大全 | Informational | Hub | self | P0 | Learning | 各词条 | ✅ |
| `/free-nodes/` | 免费节点 | 免费订阅, 免费机场 | Informational | Hub | self | P0 | Awareness | why-free-nodes-fail, airport | ✅ |
| `/risk/` | 机场跑路 | 机场风险, 机场避坑 | Risk/Informational | Hub | self | P0 | Trust | exit-scam-signals | ✅ |
| `/tools/` | 海外App无法使用 | ChatGPT无法访问, Netflix不能看 | Troubleshooting | Hub | self | P0 | Retention | chatgpt-not-working | ✅ |
| `/airport/how-to-choose/` | 机场怎么选 | 怎么选机场, 机场选择标准, 新手选机场 | Commercial(决策框架) | 推荐型文章 | airport | P0 | Consideration | /airport/, stability, directory | ✅ |
| `/airport/stability/` | 机场稳定性 | 稳定机场怎么判断, 机场稳定不稳定 | Informational(判断框架) | 百科型 | airport | P1 | Consideration | how-to-choose, high-latency | ✅ |
| `/airport/high-latency/` | 机场延迟高 | 机场节点延迟高怎么办, 代理延迟高 | Troubleshooting | 问题解决型 | airport | P1 | Retention | stability, protocol/iplc-vs-iepl | ✅ |
| `/tutorial/clash-import-subscription/` | Clash 导入订阅 | Clash怎么导入机场订阅, Clash添加订阅 | Tutorial | 教程型 | tutorial | P0 | Onboarding | /tutorial/, shadowrocket-guide | ✅ |
| `/tutorial/shadowrocket-guide/` | Shadowrocket 教程 | Shadowrocket怎么用, 小火箭教程 | Tutorial | 教程型 | tutorial | P0 | Onboarding | clash-import, /tutorial/ | ✅ |
| `/protocol/iplc-vs-iepl/` | IPLC 和 IEPL 区别 | IPLC IEPL 哪个好, 专线区别 | Comparison | 对比型 | protocol | P0 | Learning | hysteria2, /protocol/, stability | ✅ |
| `/protocol/vless-vs-vmess/` | VLESS 和 VMess 区别 | VLESS VMess 哪个好 | Comparison | 对比型 | protocol | P1 | Learning | /protocol/, hysteria2 | ✅ |
| `/protocol/hysteria2/` | Hysteria2 | Hysteria2是什么, hy2协议 | Informational | 百科型 | protocol | P1 | Learning | vless-vs-vmess, /protocol/ | ✅ |
| `/protocol/native-ip/` | 原生 IP | 原生IP是什么, 原生IP和中转 | Informational | 百科型 | protocol | P1 | Learning | /protocol/, tools hub | ✅ |
| `/free-nodes/why-free-nodes-fail/` | 免费节点失效 | 免费节点不能用, 免费节点为什么慢 | Informational/Troubleshooting | 问题解决型 | free-nodes | P1 | Awareness | /free-nodes/, /airport/ | ✅ |
| `/risk/exit-scam-signals/` | 机场跑路前兆 | 机场跑路信号, 机场要跑路的迹象 | Risk | 风险观察型 | risk | P0 | Trust | /risk/, how-to-choose | ✅ |
| `/tools/chatgpt-not-working/` | ChatGPT 无法访问 | ChatGPT打不开, ChatGPT连不上 | Troubleshooting | 问题解决型 | tools | P0 | Retention | native-ip, /tools/ | ✅ |
| `/about/` | (品牌词,不做关键词) | — | Brand | E-E-A-T | — | P2 | Trust | editorial, disclaimer | ✅ |
| `/about/editorial/` | — | — | Brand | E-E-A-T | — | P2 | Trust | about | ✅ |
| `/about/disclaimer/` | — | — | Brand | E-E-A-T | — | P2 | Trust | about | ✅ |

### 2.1 /review/ 品牌评测(2026-08-11 Batch 1+2,16 篇)

每篇:primaryKeyword = 品牌名,secondary = {品牌}机场/{品牌}评测/{品牌}优惠码,
Intent = Commercial Investigation,Pillar = review,内链指向 how-to-choose + directory + 按角度选配
(专线宣称→iplc-vs-iepl,AI 宣称→chatgpt-not-working/native-ip,风险→exit-scam-signals)。

| URL | pk | | URL | pk |
|---|---|---|---|---|
| `/review/gsy/` | 光速云 | | `/review/quanqiu/` | 全球云 |
| `/review/xingdaomeng/` | 星岛梦 | | `/review/guangnianti/` | 光年梯 |
| `/review/civetnet/` | 灵猫网络 | | `/review/yifan/` | 一翻云 |
| `/review/flycat/` | 飞猫云 | | `/review/ermao/` | 二猫云 |
| `/review/v2yun/` | 唯兔云 | | `/review/sogo/` | sogo云 |
| `/review/yuzou/` | 宇宙云 | | `/review/kosing/` | 可信云 |
| `/review/u1s1/` | U1S1 机场 | | `/review/sujie/` | 速界 |
| `/review/jilian/` | 极连云 | | `/review/kuaili/` | 快狸 |

### 2.2 /airport/ 场景专题(2026-08-12,Batch 3+4,10 篇)

对应「关键字优先级.txt」P1–P5 商业词。**URL 决策**:该文档建议的 `/cheap-airport/`、
`/airport-ranking/`、`/chatgpt-airport/` 等平行路由**未采用**——V2 母指令已定 `/airport/` 为
Pillar,平行目录会与其抢词。全部收在 `/airport/{场景}/` 下,一个体系闭环。

| URL | Primary Keyword | 覆盖的文档级别 |
|---|---|---|
| `/airport/ranking/` | 机场排行榜 | P1(含 2026 机场排行榜、机场天梯榜、机场排名)|
| `/airport/cheap/` | 便宜机场推荐 | P2(低价/高性价比/学生党/最便宜)|
| `/airport/stable/` | 稳定机场推荐 | P1(靠谱/老牌/晚高峰稳定)|
| `/airport/dedicated-line/` | 专线机场推荐 | P5(IEPL 机场推荐、IPLC 机场推荐、企业级专线)|
| `/airport/chatgpt/` | ChatGPT 机场推荐 | P4(AI 机场、ChatGPT 节点、原生 IP 节点)|
| `/airport/streaming/` | 流媒体解锁机场 | P4(Netflix/奈飞/Disney+ 机场推荐)|
| `/airport/clash/` | Clash 机场推荐 | P3(Clash 订阅/节点/Verge 机场推荐)|
| `/airport/shadowrocket/` | Shadowrocket 机场推荐 | P3(小火箭/iPhone/iOS/苹果机场推荐)|
| `/airport/pay-as-you-go/` | 按量计费机场 | P2(不限时/流量包/一次性套餐)|
| `/airport/coupon/` | 机场优惠码 | P2(折扣码/优惠活动/新用户优惠)|

关键词内耗规避:`稳定机场推荐`(Commercial,给候选与验证法)与 `机场稳定性`
(Informational,给判断框架)分属两页,Intent 不同;`ChatGPT 机场推荐`(选购)与
`ChatGPT 无法访问`(排障)同理。

**长尾问题库用法**:「机场长尾问题库.txt」的 P0–P5 问题按搜索意图归入对应页面的
FAQ(FAQPage schema)与 H2,不逐题建页——遵循该文档自己的「搜索意图相近的问题应集中在同一页」原则。

### 2.3 故障排查集群(2026-08-13,Batch 5+6,8 篇)

对应「关键字优先级.txt」P7(故障排查与问题型关键词)。**分层归属**:
连接层/客户端层故障归 `/tutorial/`(该栏目定位含「出错了怎么查」),
应用层故障归 `/tools/`(定位为海外应用访问问题)。

| URL | Primary Keyword | 覆盖的长尾问法 |
|---|---|---|
| `/tutorial/node-timeout/` | 机场节点全部超时 | 节点全红、TIMEOUT、突然不能用、连接失败 |
| `/tutorial/subscription-failed/` | 机场订阅更新失败 | 订阅链接打不开/失效/403/404/没有节点/导入失败 |
| `/tutorial/connected-but-no-internet/` | 能测速但打不开网页 | 连上没网、关掉客户端断网、TUN 断网、系统代理 |
| `/tutorial/network-environment-issues/` | 手机流量无法连接机场 | Wi-Fi 能用流量不行、公司网/校园网、只有一台设备不行 |
| `/tools/netflix-not-working/` | Netflix 无法播放 | 只能看自制剧、提示使用代理、片库不对、缓冲 |
| `/tools/telegram-not-connecting/` | Telegram 连接失败 | 只有全局能用、收不到验证码、下载慢 |
| `/tools/claude-not-working/` | Claude 无法访问 | Claude 打不开、Gemini 地区不可用、对话中断 |
| `/tools/tiktok-not-working/` | TikTok 无法使用 | 显示无网络、刷不出内容、需要原生 IP |

内耗规避:`机场延迟高`(慢)/ `机场节点全部超时`(全断)/ `能测速但打不开网页`(代理未生效)
三者症状不同、排查路径不同,互相转介不重复;`ChatGPT 无法访问`(已有)与
`Claude 无法访问`(新)分开,后者只写差异部分并转介前者。

### 2.4 客户端教程扩展(2026-08-14,Batch 7,5 篇)

对应 P3 客户端词 与 P10 教程词。

| URL | Primary Keyword | 覆盖 |
|---|---|---|
| `/tutorial/choose-client/` | 代理客户端怎么选 | 客户端对比、内核与前端关系、按平台选 |
| `/tutorial/v2rayn-guide/` | v2rayN 使用教程 | Windows、导入订阅、系统代理、路由模式、内核 |
| `/tutorial/v2rayng-guide/` | v2rayNG 使用教程 | Android、VPN 授权、分应用代理、后台被杀 |
| `/tutorial/clash-modes-and-tun/` | Clash TUN 模式 | 规则/全局/直连 + 系统代理/TUN、混合端口 |
| `/tutorial/sing-box-guide/` | sing-box 配置教程 | 内核定位、inbounds/outbounds/route、上手路径 |

内耗规避:`Clash 导入订阅`(操作流程)与 `Clash TUN 模式`(模式概念)分页;
`Clash 机场推荐`(选购)在 /airport/,与教程页 Intent 不同。

### 2.5 协议与机制词条(2026-08-15,Batch 8,5 篇)

对应 P5 技术词 与 P10 知识词。

| URL | Primary Keyword | 覆盖 |
|---|---|---|
| `/protocol/shadowsocks/` | Shadowsocks | SS 原理、AEAD 演进、现在还能不能用 |
| `/protocol/trojan/` | Trojan 协议 | TLS 伪装思路、回落机制、与 SS/VLESS 对比 |
| `/protocol/node-multiplier/` | 节点倍率 | 计费系数、标称流量 ≠ 实际容量、省流量做法 |
| `/protocol/relay-node/` | 中转节点 | 入口/落地/隧道分工、中转≠专线、落地决定解锁 |
| `/protocol/residential-ip/` | 住宅 IP | 与原生 IP 的两个独立维度、成本、谁真的需要 |

注:`节点倍率` 是计费机制而非协议,但属于「技术词条」范畴且与线路成本直接相关,
归入 /protocol/ 保持技术概念集中;它同时是 /airport/cheap/ 与 pay-as-you-go 的支撑页。

### 2.6 安全与风险集群(2026-08-16,Batch 9,5 篇)

对应 P8(安全、避坑与跑路风险词)。这类内容的作用是**建立可信度**,
写法上比其他栏目更严格:全部标注为编辑观察、不点名品牌、不把推测写成结论。

| URL | Primary Keyword | 覆盖 |
|---|---|---|
| `/free-nodes/vs-paid-airport/` | 免费节点和机场的区别 | 六维对照、免费仍合理的两个场景 |
| `/free-nodes/safety/` | 免费节点安全吗 | 能看到什么/看不到什么、客户端风险 |
| `/risk/subscription-leak/` | 机场订阅泄露 | 止损顺序、三种泄露途径、能否分享 |
| `/risk/privacy-and-logs/` | 机场会记录访问记录吗 | 能看到 ≠ 会记录、审计规则是什么 |
| `/risk/scam-recovery/` | 机场跑路怎么办 | 三步确认、事后处置、钓鱼站识别 |

内耗规避:`机场跑路前兆`(事前信号)与 `机场跑路怎么办`(事后处置)成对但不重叠;
`免费节点失效`(为什么不能用)、`免费节点和机场的区别`(该选什么)、
`免费节点安全吗`(风险边界)三篇 Intent 各异。

## 3. Topic Cluster(第一阶段)

```
机场推荐 (/airport/  Pillar)
 ├─ 机场怎么选 (/airport/how-to-choose/)
 │   ├─ 机场稳定性 (/airport/stability/)
 │   ├─ 机场跑路前兆 (/risk/exit-scam-signals/)   ← 跨栏目支撑
 │   └─ IPLC 和 IEPL 区别 (/protocol/iplc-vs-iepl/) ← 跨栏目支撑
 ├─ 机场导航 (/directory/)
 └─ 机场评测 (/review/)

代理协议 (/protocol/  Pillar)
 ├─ IPLC vs IEPL · VLESS vs VMess(对比层)
 └─ Hysteria2 · 原生 IP(词条层)

客户端教程 (/tutorial/  Pillar)
 ├─ Clash 导入订阅
 └─ Shadowrocket 教程

问题解决网(跨栏目):机场延迟高 ↔ ChatGPT 无法访问 ↔ 免费节点失效 ↔ 机场稳定性
```

回链规则:Supporting → Cluster → Pillar 双向;跨栏目支撑文章必须回链其所属 Pillar 与被支撑 Pillar 各一次。

## 4. 第二阶段词库(已登记,未建页,禁止提前内链)

稳定机场推荐 / 便宜机场推荐 / 高性价比机场 / IPLC机场推荐 / AI机场推荐 / ChatGPT机场 /
Netflix机场 / 流媒体机场 / v2rayN 教程 / sing-box 教程 / Clash Verge 教程 / VMess / Trojan /
Shadowsocks / TUIC / IEPL / 住宅IP / 中转节点 / 机场节点全挂 / 订阅泄露 / Netflix不能播放 /
Telegram连接失败 / Claude无法访问 / Gemini地区不可用 / 16 个品牌评测页(/review/{brand}/)

## 5. Schema 使用矩阵

| 页面 | Schema |
|---|---|
| 全站 | Organization + WebSite(仅首页输出)|
| 文章 | Article + BreadcrumbList(+ FAQPage 当且仅当有真实 FAQ)|
| 教程(真步骤) | + HowTo |
| Hub | BreadcrumbList(+ ItemList 列出子条目)|
| about 系 | BreadcrumbList |

禁止:每页全量堆 Schema;无 FAQ 内容页输出 FAQPage。
