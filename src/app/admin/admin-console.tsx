'use client';

import { FileText, LogOut, PencilLine, Plus, Search } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

type PostStatus = 'draft' | 'published';

interface Post {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string | null;
}

interface AdminConsoleProps {
  initialPosts: Post[];
  isAuthenticated: boolean;
}

interface EditorFormState {
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: PostStatus;
  publishedAt: string;
}

const EMPTY_FORM: EditorFormState = {
  title: '',
  slug: '',
  summary: '',
  content: '',
  status: 'draft',
  publishedAt: '',
};

export default function AdminConsole({ initialPosts, isAuthenticated }: AdminConsoleProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(initialPosts[0]?.id ?? null);
  const [editorForm, setEditorForm] = useState<EditorFormState>(createFormState(initialPosts[0]));
  const [loginForm, setLoginForm] = useState({
    username: 'admin',
    password: '',
  });
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // 左侧切换文章时，右侧编辑表单需要同步刷新为选中文章的内容。
    const selectedPost = posts.find((post) => post.id === selectedPostId) ?? null;
    setEditorForm(createFormState(selectedPost));
  }, [posts, selectedPostId]);

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message || '登录失败，请检查账号和密码。');
        return;
      }

      window.location.reload();
    });
  }

  function handleLogout() {
    setMessage(null);

    startTransition(async () => {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });

      window.location.reload();
    });
  }

  function handleEditorSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPostId) {
      setMessage('请先选择一篇文章。');
      return;
    }

    setMessage(null);

    startTransition(async () => {
      // 编辑操作走增量更新接口，避免整个后台页重新请求。
      const response = await fetch(`/api/admin/posts/${selectedPostId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editorForm,
          publishedAt: editorForm.publishedAt || null,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message || '保存失败，请稍后重试。');
        return;
      }

      const updatedPost = payload.data as Post;

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id !== updatedPost.id) {
            return post;
          }

          return updatedPost;
        }),
      );
      setSelectedPostId(updatedPost.id);
      setMessage('文章已保存。');
    });
  }

  function handleCreatePost() {
    setMessage(null);

    startTransition(async () => {
      // 新建时先生成草稿，再把焦点切到新文章的编辑面板。
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message || '新建文章失败，请稍后重试。');
        return;
      }

      const createdPost = payload.data as Post;

      setPosts((currentPosts) => [createdPost, ...currentPosts]);
      setSelectedPostId(createdPost.id);
      setMessage('已创建新的草稿文章。');
    });
  }

  const filteredPosts = posts.filter((post) => {
    const value = keyword.trim().toLowerCase();

    if (!value) {
      return true;
    }

    return [post.title, post.slug, post.summary].some((field) => field.toLowerCase().includes(value));
  });

  const selectedPost = posts.find((post) => post.id === selectedPostId) ?? null;

  if (!isAuthenticated) {
    return (
      <div className='mx-auto max-w-md'>
        <Card className='border-slate-200 bg-white/95 shadow-[0_20px_48px_rgba(15,23,42,0.08)]'>
          <CardHeader className='space-y-3'>
            <Badge className='w-fit' variant='secondary'>
              后台登录
            </Badge>
            <CardTitle className='text-2xl text-slate-950'>登录管理系统</CardTitle>
            <CardDescription className='leading-7'>
              使用 `.env.local` 中配置的管理员账号和密码登录。登录成功后即可进入文章管理与编辑面板。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className='space-y-5' onSubmit={handleLoginSubmit}>
              <div className='space-y-2'>
                <Label htmlFor='username'>管理员账号</Label>
                <Input
                  autoComplete='username'
                  id='username'
                  onChange={(event) => {
                    setLoginForm((current) => ({
                      ...current,
                      username: event.target.value,
                    }));
                  }}
                  placeholder='请输入管理员账号'
                  value={loginForm.username}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>管理员密码</Label>
                <Input
                  autoComplete='current-password'
                  id='password'
                  onChange={(event) => {
                    setLoginForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }));
                  }}
                  placeholder='请输入管理员密码'
                  type='password'
                  value={loginForm.password}
                />
              </div>
              <Button className='w-full' disabled={isPending} type='submit'>
                {isPending ? '登录中...' : '登录后台'}
              </Button>
              {message ? <p className='text-sm text-slate-500'>{message}</p> : null}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(560px,1.08fr)]'>
      <div className='space-y-6'>
        <Card className='border-slate-200 bg-white/90 shadow-sm'>
          <CardHeader className='space-y-4'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl text-slate-950'>文章列表</CardTitle>
                <CardDescription className='mt-2'>在这里快速筛选、定位和切换文章。</CardDescription>
              </div>
              <div className='flex gap-2'>
                <Button disabled={isPending} onClick={handleCreatePost} size='sm' type='button'>
                  <Plus className='h-4 w-4' />
                  新建文章
                </Button>
                <Button onClick={handleLogout} size='sm' type='button' variant='outline'>
                  <LogOut className='h-4 w-4' />
                  退出
                </Button>
              </div>
            </div>

            <div className='relative'>
              <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <Input
                className='pl-9'
                onChange={(event) => {
                  setKeyword(event.target.value);
                }}
                placeholder='搜索标题、Slug 或摘要'
                value={keyword}
              />
            </div>
          </CardHeader>
          <CardContent className='pt-0'>
            {/* 表格负责快速定位文章，真正的编辑在右侧完成，避免信息过载。 */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>文章</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>更新时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => {
                  const isActive = post.id === selectedPostId;

                  return (
                    <TableRow
                      className={isActive ? 'bg-slate-50' : undefined}
                      key={post.id}
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setMessage(null);
                      }}
                    >
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
                      <TableCell className='text-sm text-slate-500'>{formatPostDateTime(post.updatedAt)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className='border-slate-200 bg-slate-950 text-white shadow-sm'>
          <CardContent className='flex items-start gap-4 p-6'>
            <div className='rounded-2xl bg-white/10 p-3'>
              <FileText className='h-5 w-5' />
            </div>
            <div className='space-y-2'>
              <p className='text-sm font-medium'>管理提示</p>
              <p className='text-sm leading-7 text-slate-300'>
                新建文章会默认创建为草稿。编辑后可以直接切换发布状态，并补充发布时间、摘要和正文内容。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='border-slate-200 bg-white/92 shadow-sm'>
        <CardHeader className='space-y-3'>
          <div className='flex items-center gap-3'>
            <div className='rounded-xl bg-slate-100 p-2 text-slate-700'>
              <PencilLine className='h-5 w-5' />
            </div>
            <div>
              <CardTitle className='text-2xl text-slate-950'>
                {selectedPost ? `编辑：${selectedPost.title}` : '请选择文章'}
              </CardTitle>
              <CardDescription className='mt-1'>保存后将直接更新到 MySQL 数据库。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* 编辑区保持单页单表单结构，便于后续继续扩展封面图、标签等字段。 */}
          <form className='space-y-5' onSubmit={handleEditorSubmit}>
            <div className='grid gap-5 md:grid-cols-2'>
              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='title'>文章标题</Label>
                <Input
                  id='title'
                  onChange={(event) => {
                    setEditorForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }));
                  }}
                  value={editorForm.title}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='slug'>Slug</Label>
                <Input
                  id='slug'
                  onChange={(event) => {
                    setEditorForm((current) => ({
                      ...current,
                      slug: event.target.value,
                    }));
                  }}
                  value={editorForm.slug}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='status'>发布状态</Label>
                <select
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  id='status'
                  onChange={(event) => {
                    setEditorForm((current) => ({
                      ...current,
                      status: event.target.value as PostStatus,
                    }));
                  }}
                  value={editorForm.status}
                >
                  <option value='draft'>草稿</option>
                  <option value='published'>已发布</option>
                </select>
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='summary'>文章摘要</Label>
                <Textarea
                  className='min-h-28'
                  id='summary'
                  onChange={(event) => {
                    setEditorForm((current) => ({
                      ...current,
                      summary: event.target.value,
                    }));
                  }}
                  value={editorForm.summary}
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='publishedAt'>发布时间</Label>
                <Input
                  id='publishedAt'
                  onChange={(event) => {
                    setEditorForm((current) => ({
                      ...current,
                      publishedAt: event.target.value,
                    }));
                  }}
                  type='datetime-local'
                  value={editorForm.publishedAt}
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='content'>正文内容</Label>
                <Textarea
                  className='min-h-[360px]'
                  id='content'
                  onChange={(event) => {
                    setEditorForm((current) => ({
                      ...current,
                      content: event.target.value,
                    }));
                  }}
                  value={editorForm.content}
                />
              </div>
            </div>

            <div className='flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4'>
              <p className='text-sm text-slate-500'>{message || '修改后点击右侧按钮保存。'}</p>
              <Button disabled={isPending || !selectedPostId} type='submit'>
                {isPending ? '保存中...' : '保存修改'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// 将文章实体转换为表单初始值，集中处理空值与时间格式兼容。
function createFormState(post: Post | null | undefined): EditorFormState {
  if (!post) {
    return EMPTY_FORM;
  }

  return {
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    content: post.content,
    status: post.status,
    publishedAt: toDateTimeLocalValue(post.publishedAt),
  };
}

function toDateTimeLocalValue(value: string | null): string {
  if (!value) {
    return '';
  }

  return value.replace(' ', 'T').slice(0, 16);
}

// 后台列表与编辑区统一复用这个格式化逻辑，避免多处散落时间展示实现。
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
