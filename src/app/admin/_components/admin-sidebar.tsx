'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Plus, UserCircle2 } from 'lucide-react';
import { useTransition } from 'react';

import { ADMIN_NAV_ITEMS, API_ROUTES, APP_ROUTES, SITE_METADATA } from '@/lib/site';
import { cn } from '@/lib/utils';
import styles from './admin-sidebar.module.css';

/*== 后台侧边栏：承载品牌、快捷入口、导航与账户操作，并基于当前路由实时更新高亮状态。 ==*/
export default function AdminSidebar() {
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function handleLogout() {
        startTransition(async () => {
            await fetch(API_ROUTES.adminLogout, {
                method: 'POST',
            });

            window.location.href = APP_ROUTES.adminLogin;
        });
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <Image alt='Zhijian Admin' className={styles.logo} height={52} priority src='/images/logo.png' width={52} />
                <div className={styles.brandText}>
                    <h2 className={styles.brandTitle}>{SITE_METADATA.adminName}</h2>
                    <p className={styles.brandSubtitle}>Content Management</p>
                </div>
            </div>

            <Link className={styles.createButton} href={APP_ROUTES.adminPostCreate}>
                <Plus className='h-4 w-4' />
                <span>撰写文章</span>
            </Link>

            <nav aria-label='后台主导航' className={styles.nav}>
                {ADMIN_NAV_ITEMS.map((item) => {
                    const isActive = item.match === 'exact' ? pathname === item.href : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            className={cn(styles.navItem, isActive && styles.navActive)}
                            href={item.href}
                            key={item.label}
                        >
                            <Icon className='h-4 w-4' />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button className={cn(styles.footerButton, styles.navItem)} type='button'>
                    <UserCircle2 className='h-4 w-4' />
                    <span>个人资料</span>
                </button>
                <button
                    className={cn(styles.footerButton, styles.navItem, styles.footerDanger)}
                    disabled={isPending}
                    onClick={handleLogout}
                    type='button'
                >
                    <LogOut className='h-4 w-4' />
                    <span>{isPending ? '退出中...' : '退出登录'}</span>
                </button>
            </div>
        </aside>
    );
}
