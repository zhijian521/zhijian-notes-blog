import { Shield, Wrench } from 'lucide-react';

import AdminPageHeader from '@/app/admin/_components/admin-page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/*== 后台设置页：展示登录权限说明和项目约定，便于维护者快速了解系统边界。 ==*/
export default async function AdminSettingsPage() {
    return (
        <>
            <AdminPageHeader
                description='这里集中说明后台登录方式、系统约定和后续扩展方向，保持后台的功能边界和实现方式清晰可维护。'
                eyebrow='Settings'
                tag='System Notes'
                title='系统设置'
            />

            <div className='grid gap-6 xl:grid-cols-2'>
                <Card className='admin-panel border-slate-200 bg-white/92 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 text-slate-950'>
                            <Shield className='h-5 w-5 text-slate-700' />
                            登录与权限
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4 text-sm leading-7 text-slate-600'>
                        <p>后台当前使用基于 Cookie 的轻量登录态，管理员账号密码来自 `.env.local` 中的环境变量。</p>
                        <p>页面访问与接口调用共用同一套鉴权逻辑，未登录时不会暴露后台数据。</p>
                        <Badge variant='secondary'>ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET</Badge>
                    </CardContent>
                </Card>

                <Card className='admin-panel border-slate-200 bg-white/92 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 text-slate-950'>
                            <Wrench className='h-5 w-5 text-slate-700' />
                            项目约定
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4 text-sm leading-7 text-slate-600'>
                        <p>前台博客与后台管理台视觉风格故意分离，前台偏内容表达，后台偏操作效率。</p>
                        <p>后续如果增加备忘录管理、导航管理或媒体管理，可以继续在 `/admin` 下新增独立菜单与页面。</p>
                        <p>数据库初始化脚本维护在 `sql/init.sql`，新增字段时建议同步更新文档和后台表单。</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
