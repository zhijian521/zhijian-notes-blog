import Link from 'next/link';
import { ArrowRight, Feather, NotebookPen, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPostDate, getPublishedPosts } from '@/lib/posts';

export default async function HomePage() {
  // 首页只拿已发布文章，用于构造“主文章 + 次级文章”的内容节奏。
  const posts = await getPublishedPosts();
  const featuredPost = posts[0] ?? null;
  const secondaryPosts = posts.slice(1, 4);

  return (
    <main className='pb-16 pt-8 md:pt-10'>
      <div className='paper-shell space-y-8 md:space-y-12'>
        <section className='grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]'>
          <Card className='grain-card overflow-hidden rounded-[36px] border-primary/10 bg-white/75'>
            <CardContent className='p-7 md:p-10'>
              {/* 首屏承担站点气质表达，所以保留较强的叙事型视觉。 */}
              <Badge className='ink-badge border-0 bg-transparent px-0 py-0 tracking-[0.3em] text-primary shadow-none hover:bg-transparent'>
                浅墨博客
              </Badge>
              <div className='mt-6 max-w-3xl space-y-6'>
                <h1 className='ink-title text-5xl leading-[0.95] md:text-7xl'>把文字种在纸面感里，让个人网站先有自己的气息。</h1>
                <p className='ink-copy max-w-2xl text-base md:text-lg'>
                  前台不再只是一个普通列表，而是一块偏纸本阅读、留白充足、带一点东方气质的内容页面。
                  先把博客做成值得停留的地方，后面再自然接上备忘录、项目页与导航首页。
                </p>
              </div>

              <div className='mt-8 flex flex-wrap gap-3'>
                <Button asChild className='rounded-full px-6'>
                  <Link href='/blog'>
                    浏览博客
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </Button>
                <Button asChild className='rounded-full border-primary/20 bg-white/70 text-[var(--ink)] hover:bg-white' variant='outline'>
                  <Link href='/admin'>进入后台</Link>
                </Button>
              </div>

              <div className='mt-10 grid gap-4 border-t border-border/70 pt-6 md:grid-cols-3'>
                <FeatureStat icon={Feather} label='阅读气质' value='宣纸感版式' />
                <FeatureStat icon={NotebookPen} label='内容结构' value='首页 / 列表 / 详情' />
                <FeatureStat icon={Sparkles} label='扩展方向' value='备忘录 / 导航 / 项目' />
              </div>
            </CardContent>
          </Card>

          <Card className='grain-card rounded-[32px] border-[rgba(109,139,120,0.18)] bg-[rgba(255,252,246,0.86)]'>
            <CardContent className='flex h-full flex-col p-7 md:p-8'>
              <div className='flex items-center justify-between'>
                <Badge className='ink-badge bg-[rgba(109,139,120,0.1)] text-[var(--jade)]'>站点笔记</Badge>
                <span className='text-xs uppercase tracking-[0.26em] text-[var(--ink-soft)]'>Volume 01</span>
              </div>

              <div className='mt-8 space-y-4'>
                <p className='font-serif text-2xl leading-snug text-[var(--ink)]'>前台以“浅色中国风”承载内容，后台则保持干净、清楚、好维护。</p>
                <p className='ink-copy text-sm'>
                  这一版视觉方向更像当代东方刊物：暖白底、墨色字、朱砂强调、玉色辅助，整体不花哨，但有明显识别度。
                </p>
              </div>

              <div className='mt-8 grid gap-3'>
                {['轻内容管理', '统一数据库接口', '可直接部署的 Next 全栈结构', '后续模块平滑生长'].map((item) => (
                  <div
                    className='rounded-2xl border border-white/80 bg-white/60 px-4 py-3 text-sm text-[var(--ink-soft)] shadow-[0_10px_24px_rgba(69,54,37,0.06)]'
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className='grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]'>
          <Card className='rounded-[32px] border-border/70 bg-[rgba(255,255,255,0.7)]'>
            <CardContent className='p-7 md:p-8'>
              {/* 左侧先突出主推文章，右侧再展开次级阅读入口。 */}
              <div className='flex items-center justify-between'>
                <Badge className='ink-badge'>当前收录</Badge>
                <span className='text-sm text-[var(--ink-soft)]'>{posts.length} 篇文章</span>
              </div>
              <div className='mt-6 space-y-5'>
                <h2 className='ink-title text-3xl md:text-4xl'>
                  {featuredPost ? `先从「${featuredPost.title}」开始读` : '新的文章会从这里开始出现'}
                </h2>
                <p className='ink-copy text-sm md:text-base'>
                  首页不是机械堆卡片，而是先给出主叙事，再带出文章入口。这样网站的气质和内容方向会更完整。
                </p>
                <div className='rounded-[24px] border border-primary/10 bg-[linear-gradient(135deg,rgba(182,72,43,0.06),rgba(255,255,255,0.45))] p-5'>
                  <p className='text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]'>Featured Essay</p>
                  {featuredPost ? (
                    <div className='mt-3 space-y-3'>
                      <p className='font-serif text-2xl text-[var(--ink)]'>{featuredPost.title}</p>
                      <p className='ink-copy text-sm'>{featuredPost.summary}</p>
                      <div className='flex items-center justify-between gap-4'>
                        <span className='text-sm text-[var(--ink-soft)]'>{formatPostDate(featuredPost.publishedAt)}</span>
                        <Link className='ink-link' href={`/blog/${featuredPost.slug}`}>
                          阅读全文
                          <ArrowRight className='h-4 w-4' />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p className='mt-3 text-sm text-[var(--ink-soft)]'>当前还没有已发布文章。</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='grid gap-5'>
            {secondaryPosts.map((post, index) => (
              <Card className='rounded-[28px] border-border/70 bg-white/72 transition-transform duration-300 hover:-translate-y-1' key={post.id}>
                <CardContent className='p-6 md:p-7'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='space-y-3'>
                      <span className='text-xs uppercase tracking-[0.22em] text-[var(--ink-soft)]'>卷 {index + 2}</span>
                      <h3 className='font-serif text-2xl text-[var(--ink)]'>{post.title}</h3>
                      <p className='ink-copy text-sm'>{post.summary}</p>
                    </div>
                    <div className='rounded-full border border-border/80 bg-white/75 px-3 py-1 text-xs text-[var(--ink-soft)]'>
                      {formatPostDate(post.publishedAt)}
                    </div>
                  </div>

                  <div className='mt-5 flex justify-end'>
                    <Link className='ink-link' href={`/blog/${post.slug}`}>
                      查看详情
                      <ArrowRight className='h-4 w-4' />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

interface FeatureStatProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

// 首页底部三列信息卡，用来快速传达站点定位与后续扩展方向。
function FeatureStat({ icon: Icon, label, value }: FeatureStatProps) {
  return (
    <div className='rounded-[24px] border border-white/70 bg-white/55 p-4 shadow-[0_10px_26px_rgba(71,55,37,0.06)]'>
      <Icon className='h-5 w-5 text-primary' />
      <p className='mt-4 text-xs uppercase tracking-[0.22em] text-[var(--ink-soft)]'>{label}</p>
      <p className='mt-2 font-serif text-xl text-[var(--ink)]'>{value}</p>
    </div>
  );
}
