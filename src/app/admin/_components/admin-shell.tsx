import Link from 'next/link';
import { BookOpen, FolderTree, LayoutDashboard, LogOut, Settings, UserCircle2 } from 'lucide-react';

import { cn } from '@/lib/utils';

interface AdminShellProps {
  children: React.ReactNode;
  currentPath: string;
}

const MAIN_NAV_ITEMS = [
  {
    href: '/admin',
    icon: LayoutDashboard,
    label: '仪表盘',
  },
  {
    href: '/admin/posts',
    icon: BookOpen,
    label: '文章',
  },
  {
    href: '/admin/settings',
    icon: FolderTree,
    label: '分类',
  },
  {
    href: '/admin/settings',
    icon: Settings,
    label: '设置',
  },
];

export default function AdminShell({ children, currentPath }: AdminShellProps) {
  return (
    <main className='relative min-h-screen'>
      <aside className='admin-stitch-sidebar fixed left-0 top-0 flex flex-col px-4 py-6'>
        <div className='mb-6 flex items-center gap-3 px-2'>
          <div className='h-10 w-10 overflow-hidden rounded-full border border-[var(--border)] bg-white shadow-sm'>
            <div className='flex h-full w-full items-center justify-center text-[11px] font-semibold text-[var(--primary)]'>知</div>
          </div>
          <div>
            <h2 className='text-sm font-bold text-[var(--primary)]'>Zhijian Admin</h2>
            <p className='text-xs text-[var(--muted-foreground)]'>Content Management</p>
          </div>
        </div>

        <div className='mb-6 px-2'>
          <button
            className='flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95'
            type='button'
          >
            <span className='text-base leading-none'>+</span>
            撰写新文章
          </button>
        </div>

        <nav aria-label='后台主导航' className='flex-1 space-y-1'>
          {MAIN_NAV_ITEMS.map((item) => {
            const active =
              item.href === '/admin'
                ? currentPath === '/admin'
                : item.label === '分类'
                  ? false
                  : currentPath.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200',
                  active ? 'admin-stitch-nav-active' : 'admin-stitch-nav-item',
                )}
                href={item.href}
                key={`${item.href}-${item.label}`}
              >
                <Icon className='h-4 w-4' />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className='mt-auto space-y-1 border-t border-[var(--border)] pt-3'>
          <button
            className='admin-stitch-nav-item flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition'
            type='button'
          >
            <UserCircle2 className='h-4 w-4' />
            <span>个人资料</span>
          </button>
          <button
            className='admin-stitch-nav-item flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition hover:text-[var(--destructive)]'
            type='button'
          >
            <LogOut className='h-4 w-4' />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      <section className='admin-stitch-main'>{children}</section>
    </main>
  );
}
