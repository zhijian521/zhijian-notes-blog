import { notFound } from 'next/navigation';

import PostEditorForm from '@/app/admin/_components/post-editor-form';
import { getPostById } from '@/lib/posts';

interface AdminPostDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

/*== 后台文章编辑页：按 ID 加载指定文章并使用编辑模式表单。 ==*/
export default async function AdminPostDetailPage({ params }: AdminPostDetailPageProps) {
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
