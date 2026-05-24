import { headers } from 'next/headers';

import AdminShell from '@/app/admin/_components/admin-shell';

interface AdminLayoutProps {
    children: React.ReactNode;
}

/*== 后台布局：从请求头读取当前路径，包裹 AdminShell 统一后台导航。 ==*/
export default async function AdminLayout({ children }: AdminLayoutProps) {
    const headersList = await headers();
    const currentPath = headersList.get('x-current-path') || '/admin';

    return <AdminShell currentPath={currentPath}>{children}</AdminShell>;
}
