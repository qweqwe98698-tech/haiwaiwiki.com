---
title: Trojan 协议是什么?把代理流量伪装成 HTTPS
description: Trojan 词条:它不发明新的加密,而是直接跑在标准 TLS 上,让代理流量看起来像访问一个普通 HTTPS 网站。本文讲清这个思路的原理、代价与常见误解。
pubDate: 2026-08-15
primaryKeyword: Trojan 协议
secondaryKeywords:
  - Trojan 是什么
  - Trojan 和 Shadowsocks 区别
  - Trojan-Go
searchIntent: Informational
contentType: 百科
term: Trojan
termEn: Trojan
quickAnswer: Trojan 的核心思路是不做自己的加密,而是直接运行在标准 TLS 之上,使代理流量在网络上看起来与访问普通 HTTPS 网站一致。密码校验失败时,服务端会把请求当作普通网页请求处理,避免暴露。它的稳定性依赖服务端的域名与证书配置是否规范,而这一点用户无法验证。
relatedSlugs:
  - protocol/shadowsocks
  - protocol/vless-vs-vmess
  - protocol/hysteria2
pillar: protocol
reviewStatus: 编辑整理
lastVerified: 2026-08
faq:
  - q: Trojan 和 Shadowsocks 哪个更好?
    a: 思路不同。Shadowsocks 追求简单低开销,流量特征是一段纯加密数据;Trojan 追求隐蔽,把流量藏进正常的 HTTPS 里。识别严格的网络环境下 Trojan 通常更稳,轻量场景下 SS 更省资源。
  - q: Trojan 需要域名和证书吗?
    a: 服务端需要。它依赖真实的 TLS 证书才能让流量看起来正常,这也是它与自签名方案的关键差别。作为用户你不需要准备这些,但服务端配置是否规范会直接影响稳定性。
  - q: Trojan-Go 和 Trojan 是什么关系?
    a: Trojan-Go 是用 Go 语言实现的分支,增加了多路复用等特性。协议层面兼容,客户端通常都支持。你在机场看到的节点标注哪个都不影响使用。
  - q: 为什么密码错了不会报错?
    a: 这是设计的一部分。校验失败时服务端会把连接当作普通网页请求处理,返回正常网页内容,而不是返回错误——这样探测者无法通过错误响应确认这是一个代理服务端。
  - q: Trojan 会被识别吗?
    a: 没有绝对隐蔽的方案。Trojan 的流量特征接近正常 HTTPS,但服务端配置不当(证书不匹配、域名可疑、回落设置错误)仍可能暴露。这部分完全在服务方,用户侧无法验证。
---

**Trojan** 的设计思路可以用一句话概括:**不发明新的加密,直接借用现成的 HTTPS。**

## 它和前一代协议的根本差别

[Shadowsocks](/protocol/shadowsocks/) 这类协议的流量是「一段加密数据」——
不像任何常见协议,在识别严格的环境里反而显眼。

Trojan 换了个思路:**跑在标准 TLS 之上**。在网络中间人看来,
你只是在访问一个使用 HTTPS 的普通网站——因为从握手到数据传输,它确实就是标准 TLS。

## 密码错误时会发生什么

这是 Trojan 设计里最巧妙的一点。客户端连接后发送一个密码用于校验:

- **校验通过** → 服务端按代理请求处理;
- **校验失败** → 服务端把这个连接**当作普通网页请求**,返回正常网页内容。

也就是说,拿探测流量去试的人,得到的响应和访问一个普通网站没有区别,
无法据此判断这是不是代理服务端。这个行为通常叫「回落」。

## 代价与依赖

Trojan 的隐蔽性建立在**服务端配置规范**这个前提上:

- 需要**真实域名与有效 TLS 证书**——证书不匹配会让流量显得可疑;
- 回落目标要设置得合理——回落到一个空白页或明显异常的站点会露馅;
- 域名本身的历史与信誉也有影响。

这些全在服务方手里,**用户无法验证**。所以选择时能做的判断,
还是回到服务本身是否可靠——见[如何判断机场稳不稳定](/airport/stability/)。

## 与其他协议的定位

| 协议 | 思路 | 主要优势 |
| --- | --- | --- |
| [Shadowsocks](/protocol/shadowsocks/) | 简单加密 | 轻量、低开销 |
| Trojan | 伪装成 HTTPS | 隐蔽性好 |
| [VLESS + TLS 系](/protocol/vless-vs-vmess/) | 轻量协议 + 外层 TLS | 开销更低、生态活跃 |
| [Hysteria2](/protocol/hysteria2/) | UDP + 抗丢包 | 烂线路上跑得快 |

**VLESS 与 Trojan 在实践中经常被拿来比较**:两者都依赖 TLS 保证安全与隐蔽,
差别更多在生态与实现细节上,而不是能力层级。当前新部署里 VLESS 系更常见,
但这不代表 Trojan 有问题——你的机场提供哪个、哪个稳,就用哪个。

## 常见误区

- **「Trojan 是木马」**——只是名字借用,与恶意软件无关;
- **「用了 Trojan 就不会被封」**——没有绝对隐蔽的方案,
  服务端配置不当照样暴露,而且入口 IP 本身也可能被处理;
- **「Trojan 更快」**——TLS 握手带来的开销与其他协议差别很小,
  速度取决于线路,见 [IPLC 与 IEPL](/protocol/iplc-vs-iepl/)。
