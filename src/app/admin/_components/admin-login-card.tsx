'use client';

import { LockKeyhole } from 'lucide-react';
import { useState, useTransition } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/*== 后台登录卡片：独立于管理台的登录表单，包含左右分栏的品牌展示与表单区域。 ==*/
export default function AdminLoginCard() {
    const [loginForm, setLoginForm] = useState({
        username: 'admin',
        password: '',
    });
    const [message, setMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

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

    return (
        <div className='mx-auto max-w-2xl'>
            <Card className='admin-panel overflow-hidden border-slate-200 bg-white/95 shadow-[0_20px_48px_rgba(15,23,42,0.08)]'>
                <CardContent className='grid gap-0 p-0 md:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]'>
                    <div className='bg-[var(--admin-nav)] px-7 py-8 text-white md:px-8 md:py-10'>
                        <Badge className='border-white/10 bg-white/10 text-white' variant='secondary'>
                            Zhijian Admin
                        </Badge>
                        <div className='mt-6 space-y-4'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10'>
                                <LockKeyhole className='h-5 w-5' />
                            </div>
                            <h1 className='font-[var(--font-ui)] text-3xl font-semibold tracking-tight'>登录管理系统</h1>
                            <p className='text-sm leading-7 text-slate-300'>
                                后台采用独立管理台结构。登录后即可进入文章管理、文章编辑和系统设置页面。
                            </p>
                        </div>
                    </div>

                    <div className='p-7 md:p-8'>
                        <CardHeader className='space-y-3 px-0 pt-0'>
                            <CardTitle className='text-2xl text-slate-950'>管理员登录</CardTitle>
                            <CardDescription className='leading-7'>
                                使用 `.env.local` 中配置的管理员账号和密码登录。登录成功后将继续停留在当前后台功能页面。
                            </CardDescription>
                        </CardHeader>

                        <CardContent className='px-0 pb-0 pt-2'>
                            <form className='space-y-5' onSubmit={handleLoginSubmit}>
                                <div className='space-y-2'>
                                    <Label htmlFor='username'>管理员账号</Label>
                                    <Input
                                        autoComplete='username'
                                        className='admin-input'
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
                                        className='admin-input'
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

                                <Button className='w-full rounded-xl' disabled={isPending} type='submit'>
                                    {isPending ? '登录中...' : '登录后台'}
                                </Button>
                                {message ? <p className='text-sm text-slate-500'>{message}</p> : null}
                            </form>
                        </CardContent>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
