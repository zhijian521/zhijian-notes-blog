import AdminLoginCard from '@/app/admin/_components/admin-login-card';
import PostManagementClient from '@/app/admin/_components/post-management-client';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAllPosts } from '@/lib/posts';

export default async function AdminPostsPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLoginCard />;
  }

  const posts = await getAllPosts();

  return <PostManagementClient initialPosts={posts} />;
}
