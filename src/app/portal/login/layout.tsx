// Login page has its own layout without auth check
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 overflow-auto -mt-16">
      {children}
    </div>
  );
}
