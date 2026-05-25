'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { APP_ROUTES, PUBLIC_NAV_ITEMS, SITE_METADATA } from '@/lib/site';
import { cn } from '@/lib/utils';

interface PublicChromeProps {
    children: React.ReactNode;
}

/*== 前台公共壳层：统一提供顶部导航和页脚，并根据当前路由实时更新导航高亮。 ==*/
export default function PublicChrome({ children }: PublicChromeProps) {
    const pathname = usePathname();
    const isHomePage = pathname === APP_ROUTES.home;

    return (
        <div className='flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]'>
            <header
                className={cn(
                    'z-50 w-full border-b border-[var(--border)]',
                    isHomePage ? 'absolute left-0 top-0 bg-transparent' : 'sticky top-0 bg-[rgba(251,249,249,0.9)] backdrop-blur-md',
                )}
            >
                <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-12'>
                    <div className='flex items-center gap-6'>
                        <Link className='flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-[var(--primary)]' href={APP_ROUTES.home}>
                            <Image alt='Zhijian' className='h-8 w-8 rounded-sm object-contain' height={32} src='/images/admin-login-logo.png' width={32} />
                            <span>{SITE_METADATA.name}</span>
                        </Link>

                        <nav aria-label='站点主导航' className='hidden items-center gap-10 md:flex'>
                            {PUBLIC_NAV_ITEMS.map((item) => {
                                const isActive = item.match === 'exact' ? pathname === item.href : pathname.startsWith(item.href);

                                return (
                                    <Link
                                        className={cn(
                                            'text-sm font-medium transition-colors duration-200',
                                            isActive
                                                ? 'border-b-2 border-[var(--primary)] pb-[18px] text-[var(--primary)] opacity-80'
                                                : 'text-[var(--muted-foreground)] hover:text-[var(--primary)]',
                                        )}
                                        href={item.href}
                                        key={item.label}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button
                            aria-label='搜索'
                            className={
                                'hidden h-10 w-10 items-center justify-center rounded-full ' +
                                'text-[var(--muted-foreground)] transition-colors ' +
                                'hover:bg-[var(--accent)] hover:text-[var(--primary)] md:flex'
                            }
                            type='button'
                        >
                            <Search className='h-5 w-5' />
                        </button>
                        <Button asChild className='rounded-sm px-4 py-2 text-sm font-medium'>
                            <Link href={APP_ROUTES.admin}>订阅</Link>
                        </Button>
                        <button
                            aria-label='打开导航菜单'
                            className={
                                'flex h-10 w-10 items-center justify-center rounded-full ' +
                                'text-[var(--muted-foreground)] transition-colors ' +
                                'hover:bg-[var(--accent)] md:hidden'
                            }
                            type='button'
                        >
                            <Menu className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </header>

            <div className='flex-1'>{children}</div>

            <footer className='border-t border-[var(--border)] bg-[var(--background)]'>
                <div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm md:flex-row md:px-12'>
                    <div className='font-medium text-[var(--foreground)]'>© 2024 {SITE_METADATA.name}. All rights reserved.</div>
                    <div className='flex gap-6 text-[var(--muted-foreground)]'>
                        <Link href={APP_ROUTES.home}>隐私政策</Link>
                        <Link href={APP_ROUTES.blog}>服务条款</Link>
                        <Link href={APP_ROUTES.admin}>订阅</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
