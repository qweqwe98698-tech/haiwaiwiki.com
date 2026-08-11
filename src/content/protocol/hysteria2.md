---
title: Hysteria2 是什么?基于 QUIC 的抗丢包代理协议
description: Hysteria2 词条:它建立在 QUIC(UDP)之上,用激进的拥塞控制在高丢包链路上维持速度,流量特征伪装成 HTTP/3。本文讲清原理、适用与不适用的场景,以及它的代价。
pubDate: 2026-08-11
primaryKeyword: Hysteria2
secondaryKeywords:
  - Hysteria2 是什么
  - hy2 协议
  - Hysteria2 机场
searchIntent: Informational
contentType: 百科
term: Hysteria2
termEn: Hysteria2 (hy2)
quickAnswer: Hysteria2 是基于 QUIC(UDP)的代理协议,特点是用为高丢包环境调校的拥塞控制策略,在垃圾线路上也尽量把带宽跑满,并把流量伪装成 HTTP/3。适合公网直连、跨境丢包高的场景;代价是对 UDP 限制敏感——运营商对 UDP 限速或封锁时体验会明显下降。
relatedSlugs:
  - protocol/vless-vs-vmess
  - protocol/iplc-vs-iepl
pillar: protocol
reviewStatus: 编辑整理
lastVerified: 2026-08
faq:
  - q: Hysteria2 比 VLESS 快吗?
    a: 取决于链路。高丢包的公网链路上,Hysteria2 的拥塞控制优势明显;低丢包的专线上,两者差距很小,VLESS 一类 TCP 协议反而更不易被 QoS。没有普适的「更快」。
  - q: 为什么我的 Hysteria2 节点时快时慢?
    a: 最常见的解释是运营商对 UDP 流量的动态限制(QoS)。UDP 大流量在部分地区和时段会被降低优先级,这正是 Hysteria2 这类 UDP 协议的结构性弱点。
  - q: 哪些客户端支持 Hysteria2?
    a: 主流的多协议客户端(sing-box 内核系、Clash Meta/mihomo 内核系、Shadowrocket 等)均已支持。具体以你所用客户端的当前版本说明为准。
---

**Hysteria2**(常缩写 hy2)是一个建立在 **QUIC** 之上的代理协议。
一句话定位:它是为「烂线路」设计的——在高丢包、高延迟的跨境公网链路上,
尽可能把可用带宽榨出来。

## 原理:它和 TCP 系协议的根本不同

传统 TCP(以及跑在 TCP 上的 VMess/VLESS 等)遇到丢包会保守退让——
标准拥塞控制把丢包解读为「路堵了」,主动降速。但跨境链路的丢包很多并非拥塞造成,
保守退让的结果就是速度雪崩。

Hysteria2 的做法:

- **底层换成 QUIC(UDP)**:连接建立快,天然支持多路复用,没有 TCP 队头阻塞;
- **拥塞控制为高丢包环境调校**:不把每次丢包都当作拥堵信号,在丢包环境下维持发送速率,
  这是它「抗丢包」名声的来源;
- **流量伪装成 HTTP/3**:QUIC 本身是 HTTP/3 的底层,Hysteria2 的流量特征刻意贴近正常
  HTTP/3 访问,降低被识别的概率;
- **可选带宽声明**:用户可声明上下行带宽,协议据此调整发送策略。

## 适用场景

- 公网直连、跨境丢包明显的线路——这是它的主场;
- 晚高峰丢包率升高时段,相对 TCP 系协议的体验衰减更平缓;
- 需要低连接建立延迟的场景(QUIC 0-RTT 特性)。

## 不适用与代价

1. **UDP 被限制的环境是硬伤**。部分运营商对 UDP 大流量做 QoS 降级甚至阻断,
   表现为时快时慢或彻底不通——此时 TCP 系协议反而更稳;
2. **激进拥塞控制的伦理面**:在真正拥塞的链路上不退让,挤占的是同链路其他用户的带宽,
   这也是它在部分场景被诟病的原因;
3. **专线上优势不明显。**[IPLC/IEPL 专线](/protocol/iplc-vs-iepl/)本身丢包极低,
   Hysteria2 的核心优势没有用武之地。

## 常见误区

- **「hy2 = 最快协议」**——只有在高丢包链路上成立,场景错了结论就错;
- **「支持 hy2 的机场更好」**——协议列表长短不等于服务质量,线路与运维才是主变量;
- **「UDP 协议更隐蔽」**——恰恰相反,UDP 大流量在部分网络更容易被针对性限制。

想了解 TCP 系主流协议的现状,继续读 [VLESS 和 VMess 有什么区别](/protocol/vless-vs-vmess/)。
