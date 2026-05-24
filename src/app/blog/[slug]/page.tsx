import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatPostDateTime, getPostBySlug, getPublishedPosts, splitPostContent } from '@/lib/posts';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 详情页使用静态参数，已发布文章可以直接生成静态路径。
export async function generateStaticParams() {
  const posts = await getPublishedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = splitPostContent(post.content);

  return (
    <main className='pb-16 pt-8 md:pt-10'>
      <div className='paper-shell max-w-5xl space-y-5'>
        <Link className='ink-link w-fit' href='/blog'>
          <ArrowLeft className='h-4 w-4' />
          返回博客列表
        </Link>

        <Card className='grain-card rounded-[36px] border-border/70 bg-white/75'>
          <CardContent className='p-7 md:p-10'>
            <div className='flex flex-wrap items-center gap-3'>
              <Badge className='ink-badge'>文章详情</Badge>
              <span className='text-sm text-[var(--ink-soft)]'>发布时间：{formatPostDateTime(post.publishedAt)}</span>
              <span className='text-sm text-[var(--ink-soft)]'>最近更新：{formatPostDateTime(post.updatedAt)}</span>
            </div>

            <div className='mt-8 border-l-4 border-primary/30 pl-6'>
              <h1 className='ink-title max-w-4xl text-4xl leading-tight md:text-6xl'>{post.title}</h1>
              <p className='ink-copy mt-6 max-w-3xl text-base md:text-lg'>{post.summary}</p>
            </div>

            <article className='mt-10 space-y-6 text-[15px] leading-[2.05] text-[var(--ink)] md:text-[17px]'>
              {/* 正文仍以纯文本段落为主，避免在没有富文本清洗前直接渲染 HTML。 */}
              {paragraphs.map((paragraph) => (
                <p className='font-serif text-justify' key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </article>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
