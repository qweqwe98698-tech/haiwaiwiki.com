# INTERNAL-LINK-MAP.md — HaiwaiWiki

> 核心内链关系。双向 = 互链。frontmatter `relatedSlugs` 由构建强制校验(指向不存在的条目会 build fail)。
> 更新:2026-08-11

## Pillar 回链网

```
/airport/ (机场推荐 Pillar)
  ⇄ how-to-choose ⇄ stability ⇄ high-latency
  how-to-choose → directory, review(hub 内链)
  how-to-choose ⇄ risk/exit-scam-signals(跨栏目支撑)
  how-to-choose → protocol/iplc-vs-iepl, protocol/native-ip

/protocol/ (代理知识 Pillar)
  iplc-vs-iepl ⇄ vless-vs-vmess ⇄ hysteria2
  native-ip ⇄ tools/chatgpt-not-working(跨栏目:概念→应用)
  iplc-vs-iepl → airport/stability(线路→稳定性)

/tutorial/
  clash-import-subscription ⇄ shadowrocket-guide
  两篇教程 → airport/how-to-choose(前置)、tools/chatgpt-not-working(后续)

问题解决网(跨栏目环):
  high-latency ⇄ chatgpt-not-working
  chatgpt-not-working → clash-import-subscription(排错回指)
  why-free-nodes-fail → how-to-choose, exit-scam-signals, native-ip

/risk/exit-scam-signals(被引最多的信任节点)
  ← how-to-choose, stability, why-free-nodes-fail, directory 场景
  → how-to-choose, stability, why-free-nodes-fail
```

## 规则

1. 每篇文章正文 2–5 个自然内链 + frontmatter relatedSlugs 2–3 条(渲染为「继续阅读」);
2. 优先链:所属 Pillar → 同 Cluster → 用户下一步;禁止 Footer 堆砌关键词链接;
3. 未建成页面禁止预留链接(audit 的 broken-link 检查兜底);
4. 商业路径单向流动:知识页 → /airport/ 场景页 → /directory/ → /review/ → 官网(nofollow sponsored),
   知识页不直接放官网外链。

## /review/ 集群(2026-08-11 上线)

```
/directory/ 表格与合作展示位品牌名 → /review/{id}/(16 条,已接入)
/review/{id}/ → /directory/(对照)、/airport/how-to-choose/(决策)
             → 按品牌宣称选配:iplc-vs-iepl(专线)、chatgpt-not-working / native-ip(AI)、
               stability / high-latency(试用观察)、exit-scam-signals(年付/新品牌风险)
商业闭环:知识页 → /airport/ → /directory/ → /review/{id}/ → 官网(nofollow sponsored)
```

## /airport/ 场景集群(2026-08-12 上线)

```
/airport/ranking/(场景分流枢纽,表格链向全部 9 个场景页)
  ⇄ cheap ⇄ stable ⇄ dedicated-line ⇄ chatgpt
  streaming → native-ip, chatgpt, dedicated-line
  clash ⇄ shadowrocket;两页均 → tutorial 对应教程
  pay-as-you-go → cheap, exit-scam-signals(不限时=信用风险)
  coupon → 16 个 /review/{id}/(表格逐行)+ cheap
全部场景页 → /directory/(横向对照)+ /airport/how-to-choose/(决策框架)
/directory/ → 10 个场景页(新增「按需求进入场景页」区块)
```

商业闭环现为:知识页 → 场景页 → /directory/ ⇄ /review/{id}/ → 官网(nofollow sponsored)。

## 故障排查网(2026-08-13 上线,跨栏目环状结构)

```
连接层(/tutorial/)          应用层(/tools/)
node-timeout ⇄ subscription-failed      netflix-not-working → streaming, native-ip
     ⇅                ⇅                 telegram-not-connecting → connected-but-no-internet
connected-but-no-internet ⇄ network-environment-issues
     ⇅                                  claude-not-working ⇄ chatgpt-not-working → airport/chatgpt
airport/high-latency(慢) ←→ node-timeout(断) ←→ connected-but-no-internet(代理未生效)
                                        tiktok-not-working → native-ip, netflix-not-working
```

三层分诊原则(每篇开头都做):**慢 → high-latency;全断 → node-timeout;
测速绿但用不了 → connected-but-no-internet;单应用不行 → /tools/ 对应页。**
故障页向上转介到场景页(选购)与协议词条(原理),形成 排障 → 理解 → 换服务 的路径。

## 客户端集群(2026-08-14)

```
choose-client(分诊枢纽:按平台 + 订阅格式)
  → clash-import-subscription ⇄ clash-modes-and-tun
  → v2rayn-guide ⇄ v2rayng-guide
  → sing-box-guide → hysteria2(协议支持理由)
  → shadowrocket-guide
全部教程页 → 故障页(node-timeout / connected-but-no-internet)
全部教程页 ← /airport/clash/、/airport/shadowrocket/(选购页转介到操作页)
```

## 协议词条网(2026-08-15 补完)

```
shadowsocks ⇄ trojan ⇄ vless-vs-vmess ⇄ hysteria2   (协议层,横向互链)
relay-node → iplc-vs-iepl(结构 vs 链路)、native-ip(落地决定解锁)
node-multiplier → relay-node、native-ip(成本来源)
                ← airport/cheap、airport/pay-as-you-go(商业页引用机制词条)
residential-ip ⇄ native-ip(两个独立维度)→ tools/tiktok-not-working(实际场景)
```

三层链路已成环:**机制词条(为什么)→ 选购场景页(选什么)→ 教程与故障页(怎么用/怎么修)**。

## 安全与风险集群(2026-08-16)

```
free-nodes/why-free-nodes-fail ⇄ vs-paid-airport ⇄ safety
                                        ↓
                        risk/privacy-and-logs(付费同样要面对的隐私问题)
risk/exit-scam-signals(事前)⇄ scam-recovery(事后)
subscription-leak → privacy-and-logs、node-multiplier(流量异常的两种解释)
全部风险页 → airport/how-to-choose(下一步怎么选)
```

信任链设计:**免费的问题 → 付费也有的问题 → 怎么评估服务方 → 怎么止损**,
四段都不回避对付费服务自身的批评,避免整个栏目沦为「所以快去买」。

## 待办

- 第二阶段每新增一个 Cluster,在本文件补一段回链图。
