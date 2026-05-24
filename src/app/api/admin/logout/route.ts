import { NextResponse } from 'next/server';

import { ADMIN_SESSION_COOKIE_NAME, getAdminSessionCookieOptions } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({
    message: '已退出登录。',
  });

  response.cookies.set(ADMIN_SESSION_COOKIE_NAME, '', {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
