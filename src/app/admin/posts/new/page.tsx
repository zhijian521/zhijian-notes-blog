import type { Metadata } from "next";
import PostEditorForm from '@/app/admin/_components/post-editor-form';

export const metadata: Metadata = {
    title: "新建文章 - Zhijian",
};

/*== 后台新建文章页：展示创建模式下的文章编辑器。 ==*/
export default async function AdminNewPostPage() {
    return <PostEditorForm mode='create' />;
}
