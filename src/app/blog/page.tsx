import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatPostDate, getPublishedPosts } from '@/lib/posts';

export default async function BlogListPage() {
  // 列表页只展示对外可见内容，避免草稿在前台泄露。
  const posts = await getPublishedPosts();

  return (
    <main className='pb-16 pt-8 md:pt-10'>
      <div className='paper-shell space-y-8'>
        <section className='paper-panel grain-card overflow-hidden rounded-[36px] px-7 py-8 md:px-10 md:py-10'>
          <Badge className='ink-badge'>博客总览</Badge>
          <div className='mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]'>
            <div className='space-y-5'>
              <h1 className='ink-title max-w-3xl text-5xl leading-[0.97] md:text-6xl'>把想法写成一卷一卷的内容，慢慢积成自己的站点纹理。</h1>
              <p className='ink-copy max-w-2xl text-base md:text-lg'>
                这里承接所有已发布文章。整体不做纯功能性列表，而是保持一点刊物感，让每篇文章都像有自己的篇章位置。
              </p>
            </div>
            <div className='rounded-[28px] border border-white/80 bg-white/55 p-6 shadow-[0_18px_45px_rgba(66,50,34,0.08)]'>
              <p className='text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]'>Archive Note</p>
              <p className='mt-4 font-serif text-2xl text-[var(--ink)]'>当前共收录 {posts.length} 篇内容，后续可以继续补分类、标签、专题与搜索。</p>
              <p className='mt-4 text-sm text-[var(--ink-soft)]'>现在先把阅读体验和文章更新节奏做扎实，再逐步扩展内容组织方式。</p>
            </div>
          </div>
        </section>

        <section className='grid gap-5'>
          {posts.map((post, index) => (
            <Card className='rounded-[30px] border-border/70 bg-white/72' key={post.id}>
              {/* 列表以“卷”的节奏组织，强化刊物式内容感。 */}
              <CardContent className='grid gap-6 p-6 md:grid-cols-[120px_minmax(0,1fr)] md:gap-8 md:p-8'>
                <div className='space-y-3 text-sm text-[var(--ink-soft)]'>
                  <p className='text-xs uppercase tracking-[0.24em]'>卷 {String(index + 1).padStart(2, '0')}</p>
                  <p>{formatPostDate(post.publishedAt)}</p>
                  <Badge className='w-fit rounded-full bg-[rgba(109,139,120,0.12)] text-[var(--jade)]' variant='secondary'>
                    已发布
                  </Badge>
                </div>

                <div className='space-y-4'>
                  <h2 className='font-serif text-3xl text-[var(--ink)]'>{post.title}</h2>
                  <p className='ink-copy max-w-3xl text-sm md:text-base'>{post.summary}</p>
                  <div className='flex justify-end'>
                    <Link className='ink-link' href={`/blog/${post.slug}`}>
                      查看文章
                      <ArrowRight className='h-4 w-4' />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
