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
    redirect('/portal/login');
  }

  return (
    <div className="min-h-screen bg-zinc-950">
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
