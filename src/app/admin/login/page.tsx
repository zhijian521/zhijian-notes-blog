import { redirect } from 'next/navigation';

import AdminLoginCard from '@/app/admin/_components/admin-login-card';
import { isAdminAuthenticated } from '@/lib/auth';
import { APP_ROUTES } from '@/lib/site';

/*== 后台登录页 ==*/
export default async function AdminLoginPage() {
    const authenticated = await isAdminAuthenticated();

    if (authenticated) {
        redirect(APP_ROUTES.admin);
    }

    return <AdminLoginCard />;
}
