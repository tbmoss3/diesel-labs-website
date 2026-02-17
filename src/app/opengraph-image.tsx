import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Diesel Labs - Build. Maintain. Monitor.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Logo/Name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 16,
              letterSpacing: '-0.05em',
            }}
          >
            Diesel Labs
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: 40,
              color: '#10b981',
              fontWeight: 300,
              letterSpacing: '0.05em',
            }}
          >
            Build. Maintain. Monitor.
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: '#a1a1aa',
              marginTop: 32,
              maxWidth: 700,
            }}
          >
            AI solutions for businesses that want results
          </div>
        </div>
        
        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: '#10b981',
              borderRadius: '50%',
            }}
          />
          <span style={{ color: '#71717a', fontSize: 18 }}>diesel.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
