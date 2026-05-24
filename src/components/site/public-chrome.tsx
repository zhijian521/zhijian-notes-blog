import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PublicChromeProps {
  children: React.ReactNode;
  currentPath: string;
}

const PUBLIC_NAV_ITEMS = [
  { href: '/blog', label: '文章' },
  { href: '#', label: '画廊' },
  { href: '#', label: '归档' },
  { href: '#', label: '关于' },
];

export default function PublicChrome({ children, currentPath }: PublicChromeProps) {
  return (
    <div className='flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]'>
      <header className='sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[rgba(251,249,249,0.9)] backdrop-blur-md'>
        <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-12'>
          <div className='flex items-center gap-6'>
            <Link className='font-serif text-2xl font-bold tracking-tight text-[var(--primary)]' href='/'>
              Zhijian
            </Link>

            <nav aria-label='站点主导航' className='hidden items-center gap-10 md:flex'>
              {PUBLIC_NAV_ITEMS.map((item) => {
                const active = item.href === '/blog' ? currentPath === '/' || currentPath.startsWith('/blog') : false;

                return (
                  <Link
                    className={cn(
                      'text-sm font-medium transition-colors duration-200',
                      active
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
            <button className='hidden h-10 w-10 items-center justify-center rounded-full text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--primary)] md:flex'>
              <Search className='h-5 w-5' />
            </button>
            <Button className='rounded-sm px-4 py-2 text-sm font-medium' type='button'>
              订阅
            </Button>
            <button className='flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] md:hidden'>
              <Menu className='h-5 w-5' />
            </button>
          </div>
        </div>
      </header>

      <div className='flex-1'>{children}</div>

      <footer className='mt-16 border-t border-[var(--border)] bg-[var(--background)]'>
        <div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm md:flex-row md:px-12'>
          <div className='font-medium text-[var(--foreground)]'>Zhijian</div>
          <div className='flex gap-6 text-[var(--muted-foreground)]'>
            <Link href='#'>隐私政策</Link>
            <Link href='#'>服务条款</Link>
            <Link href='#'>订阅</Link>
          </div>
          <div className='text-[var(--muted-foreground)]'>© 2024 Zhijian. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
