import type { Metadata } from 'next';

import AppFrame from '@/components/site/app-frame';
import { SITE_METADATA } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
};

interface RootLayoutProps {
    children: React.ReactNode;
}

/*== 项目根布局：交由客户端壳层根据当前路由分发前台与后台视觉结构。 ==*/
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang='zh-CN'>
            <body data-app='public'>
                <AppFrame>{children}</AppFrame>
            </body>
        </html>
    );
}
