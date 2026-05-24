import { notFound } from 'next/navigation';

import AdminLoginCard from '@/app/admin/_components/admin-login-card';
import PostEditorForm from '@/app/admin/_components/post-editor-form';
import { isAdminAuthenticated } from '@/lib/auth';
import { getPostById } from '@/lib/posts';

interface AdminPostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminPostDetailPage({ params }: AdminPostDetailPageProps) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLoginCard />;
  }

  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return <PostEditorForm mode='edit' post={post} />;
}
