export const SITE = {
  name: 'HaiwaiWiki',
  nameZh: '海外Wiki',
  url: 'https://haiwaiwiki.com',
  tagline: '把机场与海外网络工具的知识,整理成可查证、可对照、可持续修订的中文词条。',
  email: 'contact@haiwaiwiki.com',
} as const;

export interface Section {
  num: string;
  name: string;
  url: string;
  collection?: string;
  brief: string;
  inNav: boolean;
}

/** 栏目索引(编号即站内索引号,见 SITE-DNA §5) */
export const SECTIONS: Section[] = [
  { num: '01', name: '机场推荐', url: '/airport/', collection: 'airport', brief: '怎么选机场:决策框架、场景推荐与选择标准', inNav: true },
  { num: '02', name: '机场档案', url: '/directory/', brief: '机场品牌档案库:按价格、线路、特点对照', inNav: true },
  { num: '03', name: '客户端教程', url: '/tutorial/', collection: 'tutorial', brief: 'Clash、Shadowrocket、v2rayN 等客户端的使用方法', inNav: true },
  { num: '04', name: '代理知识', url: '/protocol/', collection: 'protocol', brief: '协议、线路与 IP 的技术词条:一次讲清一个概念', inNav: true },
  { num: '05', name: '免费节点', url: '/free-nodes/', collection: 'free-nodes', brief: '免费节点的原理、限制与风险,以及和机场的区别', inNav: false },
  { num: '06', name: '风险预警', url: '/risk/', collection: 'risk', brief: '跑路信号、避坑方法与风险观察记录', inNav: true },
  { num: '07', name: '网络工具', url: '/tools/', collection: 'tools', brief: 'ChatGPT、Netflix、Telegram 等应用的访问问题排查', inNav: true },
];

/** 集合名 → URL 前缀(与 INFORMATION-ARCHITECTURE.md §4 同步) */
export const COLLECTION_BASE: Record<string, string> = {
  airport: '/airport/',
  tutorial: '/tutorial/',
  protocol: '/protocol/',
  'free-nodes': '/free-nodes/',
  risk: '/risk/',
  tools: '/tools/',
};

export function entryUrl(collection: string, id: string): string {
  const base = COLLECTION_BASE[collection];
  if (!base) throw new Error(`未登记的集合:${collection}`);
  return `${base}${id}/`;
}

/** 静态页 SEO 元数据(集中管理,seo-audit 脚本共用此文件) */
export const STATIC_PAGES: Record<
  string,
  { title: string; description: string; primaryKeyword?: string }
> = {
  '/': {
    title: 'HaiwaiWiki 海外Wiki — 机场与海外网络工具中文知识库',
    description:
      '以词条方式整理机场选择、代理客户端教程、协议知识与风险预警的中文知识库。区分事实与推测,注明来源与核验时间,不伪造测速数据。',
    primaryKeyword: '海外网络工具',
  },
  '/airport/': {
    title: '机场推荐:怎么选一个适合自己的机场 — HaiwaiWiki',
    description:
      '机场推荐栏目:不排名次,先给决策框架。从需求、预算、线路类型到风险信号,帮你建立自己的机场选择标准,再对照档案库与评测做决定。',
    primaryKeyword: '机场推荐',
  },
  '/directory/': {
    title: '机场档案:16 家服务商公开信息对照 — HaiwaiWiki',
    description:
      '机场档案库:整理 16 家品牌官网或公开页面能核验的信息——起步价格、套餐流量、付款周期、官方宣称的线路类型。不做速度或稳定性排名,无法核验的字段统一标注暂未核验。',
    primaryKeyword: '机场导航',
  },
  '/tutorial/': {
    title: '客户端教程:Clash、Shadowrocket、v2rayN 使用方法 — HaiwaiWiki',
    description:
      '机场使用教程中心:覆盖 Clash、Shadowrocket、v2rayN 等客户端在 Windows、macOS、iOS、Android 上的订阅导入、规则配置与故障排查。',
    primaryKeyword: '机场使用教程',
  },
  '/protocol/': {
    title: '代理协议与线路词条 — HaiwaiWiki 技术百科',
    description:
      '代理协议知识库:Shadowsocks、VLESS、Hysteria2 等协议,IPLC、IEPL 等线路,原生 IP 等概念。每个词条一次讲清一个问题,附使用场景与常见误区。',
    primaryKeyword: '代理协议',
  },
  '/free-nodes/': {
    title: '免费节点:原理、限制与风险 — HaiwaiWiki',
    description:
      '免费节点知识中心:免费节点从哪来、为什么容易失效、有什么安全风险,以及它和付费机场订阅的真实区别。不提供节点分发。',
    primaryKeyword: '免费节点',
  },
  '/risk/': {
    title: '风险预警:机场跑路信号与避坑记录 — HaiwaiWiki',
    description:
      '风险预警中心:整理机场跑路前兆、服务异常信号与避坑方法。区分事实、观察与推测,持续更新观察记录,帮你在付钱之前识别风险。',
    primaryKeyword: '机场跑路',
  },
  '/tools/': {
    title: '网络工具指南:ChatGPT、Netflix、Telegram 访问问题 — HaiwaiWiki',
    description:
      '海外应用访问问题排查:ChatGPT 无法访问、Netflix 不能播放、Telegram 连不上等常见故障的原因定位与解决路径,按症状逐步排查。',
    primaryKeyword: '海外App无法使用',
  },
  '/about/': {
    title: '关于 HaiwaiWiki — 编辑部与联系方式',
    description:
      'HaiwaiWiki 是一个以词条方式整理机场与海外网络知识的中文站点。这里说明我们是谁、内容怎么生产、如何联系编辑部。',
  },
  '/about/editorial/': {
    title: '编辑规范:内容如何生产与核验 — HaiwaiWiki',
    description:
      'HaiwaiWiki 编辑规范:数据来源分级(实测/官方资料/公开资料)、核验时间标注规则、更新机制,以及我们承诺不做的事。',
  },
  '/about/disclaimer/': {
    title: '免责声明与 Affiliate 披露 — HaiwaiWiki',
    description:
      'HaiwaiWiki 的内容性质说明、法律免责条款,以及推广链接(Affiliate)的存在方式与披露原则:佣金不影响评测结论与排序。',
  },
  '/about/privacy/': {
    title: '隐私政策 — HaiwaiWiki',
    description:
      'HaiwaiWiki 的隐私政策:本站无用户系统、不收集个人信息、不写入追踪 Cookie,站内检索在浏览器本地执行。同时说明托管商日志与推广链接的数据边界。',
  },
  '/sitemap/': {
    title: '网站地图 — HaiwaiWiki 全站条目索引',
    description:
      'HaiwaiWiki 全站可索引页面清单:八个栏目下的全部词条、教程、评测与风险内容,按栏目分组并标注最近更新时间。',
  },
  '/search/': {
    title: '站内搜索 — HaiwaiWiki',
    description: '搜索 HaiwaiWiki 全站词条:机场、协议、客户端教程与问题排查。',
  },
  '/404': {
    title: '页面不存在 — HaiwaiWiki',
    description: '你访问的页面不存在或已被移动。从栏目索引重新找到需要的内容。',
  },
};
