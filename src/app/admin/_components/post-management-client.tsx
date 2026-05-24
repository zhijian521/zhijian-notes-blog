'use client';

import Link from 'next/link';
import { LogOut, Plus, Search } from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';

import AdminPageHeader from '@/app/admin/_components/admin-page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Post, PostStatus } from '@/lib/posts';

interface PostManagementClientProps {
  initialPosts: Post[];
}

export default function PostManagementClient({ initialPosts }: PostManagementClientProps) {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<'all' | PostStatus>('all');
  const [isPending, startTransition] = useTransition();

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesKeyword =
        !keyword.trim() ||
        [post.title, post.slug, post.summary].some((field) => field.toLowerCase().includes(keyword.trim().toLowerCase()));
      const matchesStatus = status === 'all' || post.status === status;

      return matchesKeyword && matchesStatus;
    });
  }, [initialPosts, keyword, status]);

  function handleLogout() {
    startTransition(async () => {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });

      window.location.href = '/admin';
    });
  }

  return (
    <>
      <AdminPageHeader
        action={
          <div className='flex flex-wrap gap-2'>
            <Button asChild className='rounded-xl'>
              <Link href='/admin/posts/new'>
                <Plus className='h-4 w-4' />
                新建文章
              </Link>
            </Button>
            <Button className='rounded-xl' disabled={isPending} onClick={handleLogout} type='button' variant='outline'>
              <LogOut className='h-4 w-4' />
              退出
            </Button>
          </div>
        }
        description='集中查看全部文章，支持关键字搜索、状态筛选和快速进入编辑页。表格风格与后台整体 shadcn 管理台保持一致。'
        eyebrow='Posts'
        tag={`${initialPosts.length} 篇文章`}
        title='文章管理'
      />

      <Card className='admin-panel border-slate-200 bg-white/92 shadow-sm'>
        <CardContent className='space-y-6 p-6'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='relative w-full lg:max-w-sm'>
              <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <Input
                className='admin-input pl-9'
                onChange={(event) => {
                  setKeyword(event.target.value);
                }}
                placeholder='搜索标题、Slug 或摘要'
                value={keyword}
              />
            </div>

            <Tabs defaultValue='all' onValueChange={(value) => setStatus(value as 'all' | PostStatus)} value={status}>
              <TabsList className='bg-slate-100'>
                <TabsTrigger value='all'>全部</TabsTrigger>
                <TabsTrigger value='published'>已发布</TabsTrigger>
                <TabsTrigger value='draft'>草稿</TabsTrigger>
              </TabsList>
              <TabsContent value={status}>
                <span className='hidden' />
              </TabsContent>
            </Tabs>
          </div>

          <ScrollArea className='max-h-[70vh]'>
            <Table className='admin-table'>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <TableHead>文章</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>发布时间</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className='text-right'>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className='space-y-1'>
                        <p className='font-medium text-slate-900'>{post.title}</p>
                        <p className='text-xs text-slate-500'>{post.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status === 'published' ? '已发布' : '草稿'}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-sm text-slate-500'>{formatPostDateTime(post.publishedAt)}</TableCell>
                    <TableCell className='text-sm text-slate-500'>{formatPostDateTime(post.updatedAt)}</TableCell>
                    <TableCell className='text-right'>
                      <Button asChild className='rounded-xl' size='sm' variant='outline'>
                        <Link href={`/admin/posts/${post.id}`}>进入编辑</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

function formatPostDateTime(value: string | null): string {
  if (!value) {
    return '未设置';
  }

  const normalized = value.replace(' ', 'T');
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
