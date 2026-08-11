import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqItem = z.object({ q: z.string(), a: z.string() });

const baseSchema = z.object({
  title: z.string().max(60),
  description: z.string().min(40).max(160),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('海外Wiki 编辑部'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  // SEO / GEO
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  searchIntent: z.enum([
    'Informational',
    'Tutorial',
    'Troubleshooting',
    'Comparison',
    'Commercial',
    'Commercial Investigation',
    'Risk',
    'Navigational',
  ]),
  contentType: z.enum(['百科', '教程', '问题解决', '对比', '推荐', '评测', '风险观察']),
  quickAnswer: z.string().min(30).max(220).optional(),
  // 内链:格式 "collection/slug",构建时校验存在性
  relatedSlugs: z.array(z.string()).default([]),
  pillar: z.string().optional(),
  // 真实性
  reviewStatus: z.enum(['已核验', '编辑整理', '待核验']).default('编辑整理'),
  lastVerified: z.string().regex(/^\d{4}-\d{2}$/, '格式:YYYY-MM').optional(),
  faq: z.array(faqItem).default([]),
});

// 注意:schema 参数必须用泛型而不是默认参数推断,
// 否则 TS 会把所有集合的类型固定成 baseSchema(扩展字段全部丢失)。
function makeCollection<S extends z.ZodTypeAny>(dir: string, schema: S) {
  return defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${dir}` }),
    schema,
  });
}

const airport = makeCollection('airport', baseSchema);
const freeNodes = makeCollection('free-nodes', baseSchema);
const toolsCol = makeCollection('tools', baseSchema);

const review = makeCollection(
  'review',
  baseSchema.extend({
    brand: z.string(),
    officialUrl: z.string().url().optional(),
    affiliateUrl: z.string().url().optional(),
    affCode: z.string().optional(),
    priceFrom: z.string().optional(), // 如 "¥15/月(官方标价)"
    networkType: z.array(z.string()).default([]),
    platforms: z.array(z.string()).default([]),
    dataSource: z.enum(['实测', '官方资料', '公开资料']).default('官方资料'),
    testedAt: z.string().regex(/^\d{4}-\d{2}$/).optional(),
    featured: z.boolean().default(false),
  })
);

const tutorial = makeCollection(
  'tutorial',
  baseSchema.extend({
    platform: z.array(z.enum(['Windows', 'macOS', 'iOS', 'Android', 'Linux', '全平台'])).default([]),
    software: z.string().optional(),
    softwareVersion: z.string().optional(),
    difficulty: z.enum(['入门', '进阶']).default('入门'),
  })
);

const protocol = makeCollection(
  'protocol',
  baseSchema.extend({
    protocol: z.string().optional(),
    transportType: z.string().optional(),
    encryption: z.string().optional(),
    useCases: z.array(z.string()).default([]),
    // EntryDef 词条定义块
    term: z.string().optional(),
    termEn: z.string().optional(),
  })
);

const risk = makeCollection(
  'risk',
  baseSchema.extend({
    riskLevel: z.enum(['提示', '注意', '高危']).default('提示'),
    status: z.enum(['持续观察', '已结束', '长期有效']).default('长期有效'),
    sourceType: z.enum(['公开信息', '用户反馈', '编辑观察']).default('编辑观察'),
    lastChecked: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  })
);

export const collections = {
  airport,
  review,
  tutorial,
  protocol,
  'free-nodes': freeNodes,
  risk,
  tools: toolsCol,
};
