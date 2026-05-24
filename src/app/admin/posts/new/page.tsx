import AdminLoginCard from '@/app/admin/_components/admin-login-card';
import PostEditorForm from '@/app/admin/_components/post-editor-form';
import { isAdminAuthenticated } from '@/lib/auth';

export default async function AdminNewPostPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLoginCard />;
  }

  return <PostEditorForm mode='create' />;
}
