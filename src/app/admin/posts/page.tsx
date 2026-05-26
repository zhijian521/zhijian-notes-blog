import type { Metadata } from "next";
import PostManagementClient from '@/app/admin/_components/post-management-client';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
    title: "文章管理 - Zhijian",
};

/*== 后台文章管理页：展示全部文章列表，支持搜索和状态筛选。 ==*/
export default async function AdminPostsPage() {
    const posts = await getAllPosts();

    return <PostManagementClient initialPosts={posts} />;
}
