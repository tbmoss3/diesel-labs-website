import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/portal/Sidebar';
import PortalHeader from './PortalHeader';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 overflow-auto -mt-16">
      <Sidebar />
      <div className="ml-64">
        <PortalHeader user={session.user} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
