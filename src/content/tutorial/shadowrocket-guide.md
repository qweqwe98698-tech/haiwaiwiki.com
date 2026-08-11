---
title: Shadowrocket 新手教程:安装、添加订阅与三种分流模式
description: iPhone 上用机场订阅的完整流程:为什么需要非国区 Apple ID、怎么添加与更新订阅、全局路由三种模式(配置/代理/直连)分别什么时候用,以及连不上时的快速排查。
pubDate: 2026-08-11
primaryKeyword: Shadowrocket 教程
secondaryKeywords:
  - Shadowrocket 怎么用
  - 小火箭教程
  - Shadowrocket 添加订阅
searchIntent: Tutorial
contentType: 教程
platform:
  - iOS
software: Shadowrocket
difficulty: 入门
quickAnswer: Shadowrocket 需要用非国区 Apple ID 在 App Store 付费购买。安装后点右上角加号,类型选 Subscribe,粘贴机场订阅链接保存;首次连接按提示允许添加 VPN 配置;日常使用把全局路由设为「配置」模式,让国内直连、国外走代理。
relatedSlugs:
  - tutorial/clash-import-subscription
  - protocol/vless-vs-vmess
pillar: tutorial
reviewStatus: 编辑整理
lastVerified: 2026-08
faq:
  - q: Shadowrocket 是免费的吗?
    a: 不是,它是 App Store 付费应用,需要用非国区账号购买一次,之后可在同账号的设备上重复下载。具体价格以商店当前页面为准,本站不引用可能过时的数字。
  - q: 没有非国区 Apple ID 怎么办?
    a: 可以自行注册一个其他地区的 Apple ID(注册流程与地区政策可能变化,以 Apple 官方页面为准)。不建议购买来路不明的共享账号——登录他人账号存在设备被远程锁定的真实风险。
  - q: 订阅里的节点怎么更新?
    a: 在首页长按订阅条目选「更新」,或在设置中开启打开时自动更新。机场大幅调整节点后,手动更新一次最稳妥。
---

Shadowrocket(俗称小火箭)是 iPhone/iPad 上最常用的机场客户端之一。
它的使用门槛主要在安装环节——中国大陆区 App Store 没有上架,必须用其他地区的
Apple ID 购买。本文假设你已有机场订阅;还没有的话,先读[机场怎么选](/airport/how-to-choose/)。

## 安装:非国区 Apple ID

1. 在 App Store 退出当前账号,登录非国区 Apple ID(美区最常见);
2. 搜索 Shadowrocket,付费购买并下载;
3. 下载完成后可以切回常用账号,应用会保留。

> 风险提示:网上流传的「共享 Apple ID」存在设备被开启丢失模式勒索的案例,
> 不要在自己的主力设备上登录来历不明的账号。自己注册一个免费账号更安全。

## 添加订阅

1. 在机场用户中心复制订阅链接(通用格式或 Shadowrocket 专用格式均可);
2. 打开 Shadowrocket,点右上角「**+**」;
3. 「类型」选择 **Subscribe**,把链接粘贴进 URL 栏,点「完成」;
4. 首页会出现订阅分组和节点列表。

部分机场只提供自研客户端、订阅链接需要联系客服索取——这类信息在
[品牌档案库](/directory/)的官方宣称列里通常有标注。

## 首次连接

选中一个节点,打开顶部的连接开关。iOS 会弹出「添加 VPN 配置」的系统确认,
输入锁屏密码或用 Face ID 允许——这是 iOS 对所有代理类应用的统一要求,只在首次出现。

## 三种分流模式:什么时候用哪个

Shadowrocket 的「全局路由」有三个常用选项,含义完全不同:

| 模式 | 行为 | 适用场景 |
| --- | --- | --- |
| 配置 | 按规则分流:国内直连、国外走代理 | **日常默认**,省流量且国内应用不受影响 |
| 代理 | 所有流量都走节点 | 排查分流规则问题时临时用 |
| 直连 | 所有流量都不走节点 | 临时停用而不想断开 VPN 时 |

日常保持「配置」模式即可。如果某个网站你确定该走代理却直连了(或反过来),
优先怀疑规则没匹配到,临时切「代理」模式验证,再回头调规则。

## 连不上的快速排查

1. **所有节点都失败**:回用户中心看套餐是否有效、流量是否用尽,更新一次订阅;
2. **个别节点失败**:正常波动,换节点;
3. **连上了但网页打不开**:切到「代理」模式排除分流问题;仍不行,换节点或看
   [延迟分层排查](/airport/high-latency/)的思路;
4. **能开网页但 ChatGPT 这类应用不行**:IP 质量问题,见
   [ChatGPT 无法访问怎么办](/tools/chatgpt-not-working/)。

桌面端的对应教程:[Clash 怎么导入机场订阅](/tutorial/clash-import-subscription/)。
