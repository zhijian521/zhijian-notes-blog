import type { Metadata } from 'next';
import Link from 'next/link';

import './globals.css';

// 全站基础 SEO 信息，前台与后台共用同一套根布局。
export const metadata: Metadata = {
  title: '知简 | Next.js 全栈个人网站',
  description: '一个基于 Next.js 与 MySQL 的轻量个人网站，先做博客，再平滑扩展后台与其他内容模块。',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='zh-CN'>
      <body>
        <div className='relative min-h-screen overflow-x-hidden'>
          {/* 顶部导航保持轻量，前台和后台都从这里进入。 */}
          <header className='sticky top-0 z-30 px-4 pt-4 md:px-6'>
            <div className='paper-shell'>
              <div className='flex items-center justify-between rounded-full border border-white/60 bg-white/75 px-5 py-3 shadow-[0_12px_30px_rgba(64,46,30,0.08)] backdrop-blur'>
                <Link className='flex items-center gap-3' href='/'>
                  <span className='h-3 w-3 rounded-full bg-[var(--vermillion)] shadow-[16px_8px_0_rgba(109,139,120,0.7)]' />
                  <span className='font-serif text-xl font-semibold tracking-[0.2em] text-[var(--ink)]'>知简</span>
                </Link>
                <nav className='flex items-center gap-2 text-sm text-[var(--ink-soft)]'>
                  <Link className='rounded-full px-4 py-2 transition hover:bg-white hover:text-[var(--ink)]' href='/'>
                    首页
                  </Link>
                  <Link className='rounded-full px-4 py-2 transition hover:bg-white hover:text-[var(--ink)]' href='/blog'>
                    博客
                  </Link>
                  <Link className='rounded-full px-4 py-2 transition hover:bg-white hover:text-[var(--ink)]' href='/admin'>
                    后台
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {children}

          {/* 页脚承接站点定位，避免前台与后台出现完全割裂的产品感。 */}
          <footer className='px-4 pb-10 pt-8 md:px-6'>
            <div className='paper-shell'>
              <div className='paper-panel flex flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between'>
                <div>
                  <p className='font-serif text-lg text-[var(--ink)]'>知简小站</p>
                  <p className='mt-1 text-sm text-[var(--ink-soft)]'>先把内容写稳，再让网站从博客自然长出更多部分。</p>
                </div>
                <p className='text-sm text-[var(--ink-soft)]'>Next.js · MySQL · 自建后台 · 轻量可部署</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
