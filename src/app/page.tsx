export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-3xl">
        {/* Logo / Brand */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            Diesel Labs
          </h1>
        </div>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-zinc-400 font-light mb-12 tracking-wide">
          Building the future of intelligent automation
        </p>
        
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-full backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-300 text-sm font-medium tracking-wide uppercase">
            Coming Soon
          </span>
        </div>
        
        {/* Subtle footer */}
        <p className="mt-16 text-zinc-600 text-sm">
          Something powerful is in the works.
        </p>
      </div>
    </main>
  );
}
