import { NextResponse } from 'next/server';

import { getPublishedPosts } from '@/lib/posts';

export async function GET() {
  const posts = await getPublishedPosts();

  return NextResponse.json({
    data: posts,
  });
}
