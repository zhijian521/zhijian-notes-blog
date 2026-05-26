import { NextResponse } from 'next/server';

import { getPublishedPosts } from '@/lib/posts';

/*== 前台公开接口：返回全部已发布文章，无需登录。 ==*/
export async function GET() {
    const posts = await getPublishedPosts();

    return NextResponse.json({
        data: posts,
        message: '获取成功。',
    });
}
