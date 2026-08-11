import { SITE } from '../data/site';

export interface Crumb {
  name: string;
  url: string; // 站内相对路径,如 /protocol/
}

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${SITE.name}｜${SITE.nameZh}`,
    url: SITE.url,
    email: SITE.email,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE.name}｜${SITE.nameZh}`,
    url: SITE.url,
    inLanguage: 'zh-Hans',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** about 系页面:AboutPage / ContactPage */
export function pageJsonLd(type: 'AboutPage' | 'ContactPage' | 'WebPage', opts: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: opts.name,
    description: opts.description,
    url: `${SITE.url}${opts.url}`,
    inLanguage: 'zh-Hans',
    isPartOf: { '@type': 'WebSite', name: `${SITE.name}｜${SITE.nameZh}`, url: SITE.url },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.url}`,
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    inLanguage: 'zh-Hans',
    mainEntityOfPage: `${SITE.url}${opts.url}`,
    datePublished: opts.pubDate.toISOString(),
    // 未单独标注修订时间时,以发布时间兜底,保证 dateModified 始终存在
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    image: `${SITE.url}/og-default.png`,
    author: { '@type': 'Organization', name: opts.author, url: `${SITE.url}/about/` },
    publisher: {
      '@type': 'Organization',
      name: `${SITE.name}｜${SITE.nameZh}`,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/og-default.png` },
    },
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: `${SITE.url}${it.url}`,
    })),
  };
}
