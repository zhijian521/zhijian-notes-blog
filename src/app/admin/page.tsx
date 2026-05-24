import AdminConsole from '@/app/admin/admin-console';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAllPosts } from '@/lib/posts';

export default async function AdminPage() {
  // 后台页先在服务端判断登录态，避免未登录时先渲染完整管理数据。
  const authenticated = await isAdminAuthenticated();
  const posts = authenticated ? await getAllPosts() : [];

  return (
    <main className='admin-grid-bg min-h-[calc(100vh-180px)] bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] py-8'>
      <div className='paper-shell max-w-[1400px]'>
        <div className='mb-6 rounded-[28px] border border-slate-200 bg-white/90 px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-slate-500'>Admin Console</p>
          <div className='mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
            <div className='space-y-3'>
              <h1 className='text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl'>博客后台管理</h1>
              <p className='max-w-2xl text-sm leading-7 text-slate-600 md:text-base'>
                后台整体切成简约管理系统风格，重点放在文章列表、快速定位、状态管理和编辑体验。视觉上保持干净、清楚、适合长期使用。
              </p>
            </div>
            <div className='grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600 md:grid-cols-3 md:gap-5'>
              <div>
                <p className='text-xs uppercase tracking-[0.22em] text-slate-400'>Status</p>
                <p className='mt-2 font-medium text-slate-900'>{authenticated ? '已登录' : '待登录'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-[0.22em] text-slate-400'>Posts</p>
                <p className='mt-2 font-medium text-slate-900'>{posts.length} 篇</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-[0.22em] text-slate-400'>Mode</p>
                <p className='mt-2 font-medium text-slate-900'>shadcn/ui</p>
              </div>
            </div>
          </div>
        </div>

        <AdminConsole initialPosts={posts} isAuthenticated={authenticated} />
      </div>
    </main>
  );
}
