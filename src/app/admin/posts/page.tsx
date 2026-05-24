import AdminLoginCard from '@/app/admin/_components/admin-login-card';
import PostManagementClient from '@/app/admin/_components/post-management-client';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAllPosts } from '@/lib/posts';

/*== 后台文章管理页：展示全部文章列表，支持搜索和状态筛选，未登录时显示登录卡片。 ==*/
export default async function AdminPostsPage() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        return <AdminLoginCard />;
    }

    const posts = await getAllPosts();

    return <PostManagementClient initialPosts={posts} />;
}
