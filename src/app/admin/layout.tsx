import { headers } from 'next/headers';

import AdminShell from '@/app/admin/_components/admin-shell';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const headersList = await headers();
  const currentPath = headersList.get('x-current-path') || '/admin';

  return <AdminShell currentPath={currentPath}>{children}</AdminShell>;
}
