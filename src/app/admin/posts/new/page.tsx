import AdminLoginCard from '@/app/admin/_components/admin-login-card';
import PostEditorForm from '@/app/admin/_components/post-editor-form';
import { isAdminAuthenticated } from '@/lib/auth';

/*== 后台新建文章页：展示创建模式下的文章编辑器。 ==*/
export default async function AdminNewPostPage() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        return <AdminLoginCard />;
    }

    return <PostEditorForm mode='create' />;
}
