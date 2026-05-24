import type { Metadata } from 'next';
import { headers } from 'next/headers';

import PublicChrome from '@/components/site/public-chrome';
import './globals.css';

export const metadata: Metadata = {
  title: '知简 | Minimalist Chinese Blog Platform',
  description: '一个基于 Next.js 与 MySQL 的个人内容网站，前台采用新版 Stitch 中国风博客视觉，后台采用独立 shadcn 管理台。',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headersList = await headers();
  const currentPath = headersList.get('x-current-path') || '/';
  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <html lang='zh-CN'>
      <body data-app={isAdminRoute ? 'admin' : 'public'}>
        {isAdminRoute ? children : <PublicChrome currentPath={currentPath}>{children}</PublicChrome>}
      </body>
    </html>
  );
}
