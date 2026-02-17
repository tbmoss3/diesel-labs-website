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
      <group>
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.18, 0.18, 1.0, 8)]} />
          <lineBasicMaterial color={EMERALD} transparent opacity={0.4} />
        </lineSegments>

        <group ref={pistonRef}>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.16, 0.16, 0.2, 8)]} />
            <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.8} />
          </lineSegments>
        </group>

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
      <lineSegments>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.12, 0.12, 2.8, 8)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.6} />
      </lineSegments>

      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[0, -1.0 + i * 0.65, 0]} rotation={[i * Math.PI / 2, 0, 0]}>
          <lineSegments position={[0.18, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.12, 0.12)]} />
            <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.6} />
          </lineSegments>
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
  const vAngle = Math.PI / 4;

  return (
    <group>
      <lineSegments position={[0, -0.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.2, 1.8)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.3} />
      </lineSegments>

      <group rotation={[0, 0, vAngle]}>
        <lineSegments position={[0.5, 0.6, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.4, 0.25, 1.6)]} />
          <lineBasicMaterial color={EMERALD} transparent opacity={0.4} />
        </lineSegments>
      </group>

      <group rotation={[0, 0, -vAngle]}>
        <lineSegments position={[-0.5, 0.6, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.4, 0.25, 1.6)]} />
          <lineBasicMaterial color={EMERALD} transparent opacity={0.4} />
        </lineSegments>
      </group>

      <lineSegments position={[0, -1.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.0, 0.4, 1.4)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.25} />
      </lineSegments>

      <lineSegments position={[0, 0.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.3, 1.4)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.35} />
      </lineSegments>

      <lineSegments position={[0, 0.9, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.2, 0.25, 0.4, 8)]} />
        <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// Complete scene with rotating engine
function EngineScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow continuous 360 degree rotation (one full rotation every ~25 seconds)
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
  });

  const leftBankPhases = [0, Math.PI, Math.PI * 0.5, Math.PI * 1.5];
  const rightBankPhases = [Math.PI * 0.25, Math.PI * 1.25, Math.PI * 0.75, Math.PI * 1.75];
  const vAngle = Math.PI / 4;
  const cylinderSpacing = 0.38;

  return (
    <Float speed={0.6} rotationIntensity={0.02} floatIntensity={0.1}>
      <group ref={groupRef} rotation={[0.15, 0, 0]} scale={1.0}>
        <V8EngineBlock />
        
        {leftBankPhases.map((phase, i) => (
          <V8Piston
            key={`left-${i}`}
            position={[0.45, 0.3, -0.55 + i * cylinderSpacing]}
            rotation={[0, 0, vAngle]}
            phaseOffset={phase}
          />
        ))}

        {rightBankPhases.map((phase, i) => (
          <V8Piston
            key={`right-${i}`}
            position={[-0.45, 0.3, -0.55 + i * cylinderSpacing]}
            rotation={[0, 0, -vAngle]}
            phaseOffset={phase}
          />
        ))}

        <V8Crankshaft />

        {/* Glow particles */}
        <GlowParticles />
      </group>
    </Float>
  );
}

// Subtle glow particles
function GlowParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(40 * 3);
    
    for (let i = 0; i < 40; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color={EMERALD_GLOW}
        size={0.02}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Main exported component
export default function EngineWithBots() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Use lg breakpoint for this layout
    };
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isReducedMotion) {
    return null;
  }

  // On mobile, show nothing (the original background engine will show)
  if (isMobile) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <EngineScene />
      </Canvas>
    </div>
  );
}
