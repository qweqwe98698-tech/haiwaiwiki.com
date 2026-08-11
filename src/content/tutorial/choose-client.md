---
title: 代理客户端怎么选?按平台和订阅格式两步定
description: 客户端选择不是比功能多少,而是两个约束的交集:你的操作系统支持哪些、你的机场给什么格式订阅。本文按平台给出可行选项,并说明内核与前端的关系。
pubDate: 2026-08-14
primaryKeyword: 代理客户端怎么选
secondaryKeywords:
  - 机场客户端推荐
  - Clash 和 v2rayN 区别
  - 代理软件哪个好
  - 客户端内核是什么
searchIntent: Comparison
contentType: 对比
platform:
  - 全平台
difficulty: 入门
quickAnswer: 两步就能定:先看平台——Windows 与 macOS 用 Clash 系或 v2rayN,iOS 基本只能用 App Store 的付费客户端,安卓选择最多;再看订阅格式——机场给 Clash 格式就用 Clash 系,只给通用格式就用 v2rayN/v2rayNG 一类。功能多少不是重点,能稳定导入订阅、平台匹配才是。
relatedSlugs:
  - tutorial/clash-import-subscription
  - tutorial/v2rayn-guide
  - tutorial/sing-box-guide
pillar: tutorial
reviewStatus: 编辑整理
lastVerified: 2026-08
faq:
  - q: 客户端和内核是什么关系?
    a: 内核负责实际的协议处理和转发,客户端(前端)提供界面、订阅管理和开关。同一个内核可以配不同前端,同一个前端也常能切换内核。你在界面上做的操作,最终都由内核执行。
  - q: Clash 和 v2rayN 哪个更好?
    a: 没有绝对答案,取决于订阅格式和使用习惯。Clash 系图形化更完整、规则生态成熟;v2rayN 协议覆盖广、偏工程化。机场只给 Clash 格式订阅时,用 Clash 系省事;反之亦然。
  - q: 换客户端需要重新买机场吗?
    a: 不需要。订阅是账号凭证,与客户端无关。换客户端只要把同一条订阅链接导入新软件即可,注意套餐的同时在线设备数限制。
  - q: 免费客户端安全吗?
    a: 关键不在收费与否,而在来源。代理客户端能看到你的全部流量,务必从项目官方仓库或正规应用商店获取。第三方站点重新打包的版本风险不可控。
  - q: 一定要用机场自研的客户端吗?
    a: 不一定,但有些机场只提供自研客户端、不给标准订阅链接,那就只能用它。购买前确认能否拿到标准订阅,是本站建议的一票项——被锁在单一客户端里会影响换设备和迁移。
  - q: 同一个订阅能在几台设备上用?
    a: 技术上不限,但套餐通常有同时在线设备数上限,而这一项多数机场没有公开写明。多设备使用前先问客服,否则表现可能是某台设备莫名连不上。
---

选客户端最容易走的弯路,是去比较功能列表。实际上决定权在**两个外部约束**手里:
你的操作系统,和你的机场给什么格式的订阅。

## 先理解:客户端 = 前端 + 内核

- **内核**负责协议解析与转发(Mihomo、Xray、sing-box 等);
- **前端**提供界面、订阅管理、开关和规则编辑。

同一个内核可以配不同前端,不少前端还能切换内核。所以「哪个客户端更快」
这个问题基本没有意义——**速度由节点和线路决定,不由界面决定**。

## 第一步:按平台筛

| 平台 | 可行选择 | 说明 |
| --- | --- | --- |
| Windows | Clash 系图形客户端、[v2rayN](/tutorial/v2rayn-guide/) | 两条路都成熟 |
| macOS | Clash 系图形客户端 | 与 Windows 体验接近 |
| iOS / iPadOS | App Store 的付费客户端(如 Shadowrocket) | 需**非国区 Apple ID**,门槛在这一步 |
| Android | [v2rayNG](/tutorial/v2rayng-guide/)、Clash 系、sing-box 系 | 选择最多,可分应用代理 |
| Linux / 软路由 | 命令行内核 + 配置文件 | 通常用 [sing-box](/tutorial/sing-box-guide/) 或 Mihomo |

**iOS 是约束最强的平台**:客户端要付费购买且需要非国区账号,
所以 iPhone 用户建议先确认这一步再买机场——顺序反了容易白花钱,
详见 [Shadowrocket 机场推荐](/airport/shadowrocket/)。

## 第二步:按订阅格式筛

平台确定后,看机场能给你什么:

- **给 Clash 格式** → 用 Clash 系客户端最省事,规则、策略组开箱即用;
- **只给通用格式(Base64)** → v2rayN、v2rayNG 一类更直接;
- **只给自研客户端、不给订阅链接** → 你的选择被锁死了。

第三种情况值得单独提醒:本站收录的 16 家品牌,官方资料普遍写
「支持订阅导入(需联系在线客服)」,也就是链接要人工索取。
**购买前问清能否拿到标准格式订阅**,是[选机场的一票项](/airport/clash/)——
被锁在单一客户端里,换设备、多平台混用、迁移都会受影响。

## 常见组合

| 你的情况 | 建议 |
| --- | --- |
| Windows 新手,机场给 Clash 格式 | Clash 系图形客户端,照[导入教程](/tutorial/clash-import-subscription/)走 |
| Windows,节点协议杂 | [v2rayN](/tutorial/v2rayn-guide/),可切内核 |
| iPhone | Shadowrocket 一类,先解决 [Apple ID 门槛](/tutorial/shadowrocket-guide/) |
| 安卓,想只让部分 App 走代理 | [v2rayNG](/tutorial/v2rayng-guide/) 的分应用代理 |
| 用 Hysteria2/TUIC 节点 | 支持 [sing-box 内核](/tutorial/sing-box-guide/)的客户端 |
| 软路由 / 无界面环境 | 命令行内核 + 配置文件 |

## 三条通用建议

1. **从官方来源获取**。客户端能看到你的全部流量,来源可靠比省事重要,
   第三方重新打包的版本不要用;
2. **先跑通再折腾**。用最简配置连上网之后,再研究规则、TUN、分应用代理这些进阶功能
   (概念见 [Clash 的模式与 TUN](/tutorial/clash-modes-and-tun/));
3. **换客户端不用换机场**。订阅是账号凭证,与软件无关,导入新客户端即可,
   注意同时在线设备数限制。

装好之后连不上的排查:[节点全部超时](/tutorial/node-timeout/)、
[能测速但打不开网页](/tutorial/connected-but-no-internet/)。
