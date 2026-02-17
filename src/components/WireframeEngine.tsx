'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const EMERALD = '#10B981';
const EMERALD_GLOW = '#34D399';

// V8 Piston component with animation
function V8Piston({ 
  position, 
  rotation,
  phaseOffset,
}: { 
  position: [number, number, number];
  rotation: [number, number, number];
  phaseOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pistonRef = useRef<THREE.Group>(null);
  const rodRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (pistonRef.current && rodRef.current) {
      const time = clock.getElapsedTime();
      const stroke = 0.35;
      const offset = Math.sin(time * 2.5 + phaseOffset) * stroke;
      
      pistonRef.current.position.y = offset;
      
      const angle = Math.asin(offset / 0.7) * 0.25;
      rodRef.current.rotation.z = angle;
      rodRef.current.position.y = offset - 0.45;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={groupRef}>
        {/* Cylinder walls */}
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.18, 0.18, 1.0, 8)]} />
          <lineBasicMaterial color={EMERALD} transparent opacity={0.4} />
        </lineSegments>

        {/* Piston head */}
        <group ref={pistonRef}>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.16, 0.16, 0.2, 8)]} />
            <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.8} />
          </lineSegments>
        </group>

        {/* Connecting rod */}
        <mesh ref={rodRef} position={[0, -0.45, 0]}>
          <boxGeometry args={[0.05, 0.7, 0.05]} />
          <meshBasicMaterial color={EMERALD} wireframe transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// V8 Crankshaft component
function V8Crankshaft() {
  const crankRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crankRef.current) {
      crankRef.current.rotation.x = clock.getElapsedTime() * 2.5;
    }
  });

  return (
    <group ref={crankRef} position={[0, -1.0, 0]} rotation={[0, 0, Math.PI / 2]}>
      {/* Main shaft */}
      <lineSegments>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.12, 0.12, 2.8, 8)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.6} />
      </lineSegments>

      {/* 8 Crank throws for V8 - cross-plane crankshaft */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[0, -1.0 + i * 0.65, 0]} rotation={[i * Math.PI / 2, 0, 0]}>
          {/* Left throw */}
          <lineSegments position={[0.18, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.12, 0.12)]} />
            <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.6} />
          </lineSegments>
          {/* Right throw */}
          <lineSegments position={[-0.18, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.12, 0.12)]} />
            <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.6} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

// V8 Engine block
function V8EngineBlock() {
  const vAngle = Math.PI / 4; // 45 degrees each side = 90 degree V

  return (
    <group>
      {/* Main block - wider and shorter for V8 */}
      <lineSegments position={[0, -0.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.2, 1.8)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.3} />
      </lineSegments>

      {/* Left valve cover */}
      <group rotation={[0, 0, vAngle]}>
        <lineSegments position={[0.5, 0.6, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.4, 0.25, 1.6)]} />
          <lineBasicMaterial color={EMERALD} transparent opacity={0.4} />
        </lineSegments>
      </group>

      {/* Right valve cover */}
      <group rotation={[0, 0, -vAngle]}>
        <lineSegments position={[-0.5, 0.6, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.4, 0.25, 1.6)]} />
          <lineBasicMaterial color={EMERALD} transparent opacity={0.4} />
        </lineSegments>
      </group>

      {/* Oil pan */}
      <lineSegments position={[0, -1.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.0, 0.4, 1.4)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.25} />
      </lineSegments>

      {/* Intake manifold (valley cover) */}
      <lineSegments position={[0, 0.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.3, 1.4)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.35} />
      </lineSegments>

      {/* Throttle body / air intake */}
      <lineSegments position={[0, 0.9, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.2, 0.25, 0.4, 8)]} />
        <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.3} />
      </lineSegments>

      {/* Headers / exhaust manifolds - left side */}
      <group rotation={[0, 0, Math.PI / 4]}>
        {[-0.5, -0.17, 0.17, 0.5].map((z, i) => (
          <lineSegments key={`left-${i}`} position={[0.9, 0.2, z]}>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.06, 0.06, 0.4, 6)]} />
            <lineBasicMaterial color={EMERALD} transparent opacity={0.3} />
          </lineSegments>
        ))}
      </group>

      {/* Headers / exhaust manifolds - right side */}
      <group rotation={[0, 0, -Math.PI / 4]}>
        {[-0.5, -0.17, 0.17, 0.5].map((z, i) => (
          <lineSegments key={`right-${i}`} position={[-0.9, 0.2, z]}>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.06, 0.06, 0.4, 6)]} />
            <lineBasicMaterial color={EMERALD} transparent opacity={0.3} />
          </lineSegments>
        ))}
      </group>
    </group>
  );
}

// Complete V8 diesel engine assembly
function V8DieselEngine() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation for visual interest
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.4 + Math.PI / 5;
    }
  });

  // V8 firing order: 1-8-4-3-6-5-7-2 (common cross-plane V8)
  // Simplified phase offsets for visual effect
  const leftBankPhases = [0, Math.PI, Math.PI * 0.5, Math.PI * 1.5];
  const rightBankPhases = [Math.PI * 0.25, Math.PI * 1.25, Math.PI * 0.75, Math.PI * 1.75];

  const vAngle = Math.PI / 4; // 45 degrees = 90 degree V total
  const cylinderSpacing = 0.38;

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={groupRef} rotation={[0.15, Math.PI / 5, 0.05]} scale={1.1}>
        <V8EngineBlock />
        
        {/* Left bank - 4 pistons */}
        {leftBankPhases.map((phase, i) => (
          <V8Piston
            key={`left-${i}`}
            position={[0.45, 0.3, -0.55 + i * cylinderSpacing]}
            rotation={[0, 0, vAngle]}
            phaseOffset={phase}
          />
        ))}

        {/* Right bank - 4 pistons */}
        {rightBankPhases.map((phase, i) => (
          <V8Piston
            key={`right-${i}`}
            position={[-0.45, 0.3, -0.55 + i * cylinderSpacing]}
            rotation={[0, 0, -vAngle]}
            phaseOffset={phase}
          />
        ))}

        <V8Crankshaft />

        {/* Ambient glow particles */}
        <GlowParticles />
      </group>
    </Float>
  );
}

// Subtle glow particles around the engine
function GlowParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(60 * 3);
    
    for (let i = 0; i < 60; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color={EMERALD_GLOW}
        size={0.025}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// Main exported component
export default function WireframeEngine() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render on mobile for performance, or if reduced motion is preferred
  if (isMobile || isReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <V8DieselEngine />
      </Canvas>
    </div>
  );
}
