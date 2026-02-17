'use client';

import dynamic from 'next/dynamic';

// Dynamic import with no SSR to avoid Three.js server-side issues
const WireframeEngine = dynamic(() => import('./WireframeEngine'), {
  ssr: false,
  loading: () => null, // No loading state needed for background element
});

export default function EngineBackground() {
  return <WireframeEngine />;
}
