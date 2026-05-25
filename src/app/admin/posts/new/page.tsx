import PostEditorForm from '@/app/admin/_components/post-editor-form';

/*== 后台新建文章页：展示创建模式下的文章编辑器。 ==*/
export default async function AdminNewPostPage() {
    return <PostEditorForm mode='create' />;
}
