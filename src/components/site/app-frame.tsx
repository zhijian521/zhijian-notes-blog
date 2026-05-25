'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import PublicChrome from '@/components/site/public-chrome';

interface AppFrameProps {
    children: React.ReactNode;
}

/*== 根壳层分发器：根据当前路由在前台 PublicChrome 与后台页面之间实时切换，避免客户端跳转后壳层滞后。 ==*/
export default function AppFrame({ children }: AppFrameProps) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');
    const isAdminLoginRoute = pathname === '/admin/login';
    const appName = isAdminLoginRoute ? 'admin-login' : isAdminRoute ? 'admin' : 'public';

    useEffect(() => {
        document.body.dataset.app = appName;
    }, [appName]);

    if (isAdminRoute) {
        return children;
    }

    return <PublicChrome>{children}</PublicChrome>;
}
