import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import AdminShell from '@/app/admin/_components/admin-shell';
import { isAdminAuthenticated } from '@/lib/auth';
import { APP_ROUTES } from '@/lib/site';

interface AdminLayoutProps {
    children: React.ReactNode;
}

/*== 后台布局：登录页跳过后台壳层，其余后台页面统一做鉴权与侧边导航包裹。 ==*/
export default async function AdminLayout({ children }: AdminLayoutProps) {
    const headersList = await headers();
    const currentPath = headersList.get('x-current-path') || '/admin';
    const isLoginRoute = currentPath === APP_ROUTES.adminLogin;

    if (isLoginRoute) {
        return children;
    }

    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        redirect(APP_ROUTES.adminLogin);
    }

    return <AdminShell>{children}</AdminShell>;
}
