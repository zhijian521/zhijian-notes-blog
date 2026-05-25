import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import AdminShell from '@/app/admin/_components/admin-shell';
import { isAdminAuthenticated } from '@/lib/auth';
import { APP_ROUTES } from '@/lib/site';

interface AdminLayoutProps {
    children: React.ReactNode;
}

/*== 后台布局：从请求头读取当前路径，包裹 AdminShell 统一后台导航。 ==*/
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

    return <AdminShell currentPath={currentPath}>{children}</AdminShell>;
}
