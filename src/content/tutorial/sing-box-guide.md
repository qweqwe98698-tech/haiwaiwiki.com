---
title: sing-box 是什么?内核、配置结构与上手路径
description: sing-box 既是代理内核也是可独立使用的工具,配置为 JSON 结构。本文讲清它与 Clash 系的定位差别、inbounds 与 outbounds 的含义,以及普通用户更省事的上手方式。
pubDate: 2026-08-14
primaryKeyword: sing-box 配置教程
secondaryKeywords:
  - sing-box 是什么
  - sing-box 怎么用
  - sing-box 订阅
  - sing-box 内核
searchIntent: Tutorial
contentType: 教程
platform:
  - 全平台
software: sing-box
difficulty: 进阶
quickAnswer: sing-box 是一个多协议代理内核,配置用 JSON 描述,核心是 inbounds(流量从哪进)、outbounds(从哪出)、route(怎么分流)三块。它对 Hysteria2、TUIC 等较新协议支持好。普通用户不必手写配置——多数图形客户端可以直接用 sing-box 作为内核,或用机场提供的 sing-box 格式订阅导入。
relatedSlugs:
  - tutorial/choose-client
  - protocol/hysteria2
  - tutorial/clash-modes-and-tun
pillar: tutorial
reviewStatus: 编辑整理
lastVerified: 2026-08
faq:
  - q: sing-box 和 Clash 是竞争关系吗?
    a: 定位不完全一样。两者都是代理内核,但 Clash 生态以 YAML 配置和成熟的图形前端见长,sing-box 用 JSON 配置、协议支持更新更快。很多客户端两个内核都支持,可以切换。
  - q: 普通用户需要手写 sing-box 配置吗?
    a: 不需要。手写 JSON 适合有特定需求的进阶用户。日常使用建议选一个支持 sing-box 内核的图形客户端,或者用机场提供的 sing-box 格式订阅,让客户端生成配置。
  - q: 机场没有 sing-box 格式订阅怎么办?
    a: 先问客服是否能提供。多数客户端也能读通用格式或 Clash 格式并在内部转换。实在没有的话,换用支持你手上订阅格式的客户端更省事,不必为内核迁就服务。
  - q: 配置里的 inbounds 和 outbounds 分别是什么?
    a: inbounds 定义流量怎么进入 sing-box(本地监听的端口、TUN 网卡等),outbounds 定义流量从哪里出去(各个节点、直连、拒绝)。route 段负责决定某条流量该用哪个 outbound。
  - q: sing-box 支持 Hysteria2 和 TUIC 吗?
    a: 支持,这也是不少人选它的原因。使用这类基于 UDP 的协议时要注意所在网络对 UDP 的限制,表现为时快时慢,原理见本站的 Hysteria2 词条。
  - q: 官方图形客户端有哪些?
    a: 项目为几个平台提供了图形版本,具体名称、上架状态与是否收费随时间变化,请以项目官方仓库和对应应用商店的当前信息为准,本站不引用可能过期的清单。
---

sing-box 在中文社区里的说法常常混乱:有人当它是客户端,有人当它是内核。
准确地说——**它是一个多协议代理内核,也可以作为命令行工具独立运行**,
同时有图形前端可用。

## 它和 Clash 系的定位差别

| 维度 | Clash 系(含 Mihomo 内核) | sing-box |
| --- | --- | --- |
| 配置格式 | YAML | JSON |
| 图形前端生态 | 成熟,选择多 | 有官方前端,生态较新 |
| 新协议支持 | 跟进较快 | 跟进很快(Hysteria2、TUIC 等) |
| 机场订阅支持 | 普遍提供 Clash 格式 | 提供 sing-box 格式的较少 |

**不是替代关系**。很多图形客户端同时支持两个内核,可以按你的节点协议切换。
所以选内核之前,先看你的机场给的是什么格式的订阅——
这一点在 [Clash 机场推荐](/airport/clash/)里讲过:订阅格式往往比内核偏好更能决定你的选择。

## 配置结构:三块就够理解

sing-box 的 JSON 配置有很多字段,但主干只有三块:

- **inbounds**——流量**从哪进来**。比如本地监听的 SOCKS/HTTP 端口,
  或者 TUN 虚拟网卡(TUN 的原理见 [Clash 的模式与 TUN](/tutorial/clash-modes-and-tun/),
  两者概念相同);
- **outbounds**——流量**从哪出去**。每个节点是一个 outbound,
  另外还有 `direct`(直连)与 `block`(拒绝)这类特殊出口;
- **route**——**怎么分流**。规则决定某条流量匹配到哪个 outbound。

理解了这三块,再看任何一份 sing-box 配置都不会迷路:
剩下的字段大多是 DNS、日志、实验性功能等配套项。

## 普通用户的上手路径

**不建议从手写 JSON 开始**。更省事的两条路:

1. **用支持 sing-box 内核的图形客户端**——在客户端里把内核切到 sing-box,
   订阅照常导入,配置由客户端生成。[v2rayN](/tutorial/v2rayn-guide/) 就支持切换内核;
2. **用机场提供的 sing-box 格式订阅**——有的机场会提供,导入即可。
   没有的话先问客服,多数客户端也能读通用格式后在内部转换。

手写配置适合这些情况:自建服务端、需要复杂的分流逻辑、
或者在软路由等没有图形界面的环境里部署。

## 什么时候值得为它折腾

- **你的节点用 Hysteria2 或 TUIC**——sing-box 对这类协议支持好;
  但要注意 UDP 协议在部分网络下会被限速,见 [Hysteria2 词条](/protocol/hysteria2/);
- **你需要在多平台保持一致的配置**——JSON 配置可以跨平台复用;
- **你在做自建或进阶分流**。

反过来,如果你只是想让浏览器能上网、机场给的是 Clash 格式订阅,
那么继续用 Clash 系客户端就好,换内核不会带来体感差别。

## 关于版本与客户端信息

sing-box 的功能、配置字段与官方图形客户端的上架情况都在持续变化。
本站不列具体版本号和商店状态——这类信息过期得很快。
需要确认时,以**项目官方仓库**和对应应用商店的当前页面为准。

不确定自己该用哪个客户端,先看[代理客户端怎么选](/tutorial/choose-client/)。
