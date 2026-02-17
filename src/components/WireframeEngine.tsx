'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const EMERALD = '#10B981';
const EMERALD_GLOW = '#34D399';

// Piston component with animation
function Piston({ 
  position, 
  phaseOffset,
  cylinderHeight = 1.2,
  pistonHeight = 0.3
}: { 
  position: [number, number, number];
  phaseOffset: number;
  cylinderHeight?: number;
  pistonHeight?: number;
}) {
  const pistonRef = useRef<THREE.Group>(null);
  const rodRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (pistonRef.current && rodRef.current) {
      // Realistic piston motion using sine wave with phase offset
      const time = clock.getElapsedTime();
      const stroke = 0.4; // How far the piston travels
      const offset = Math.sin(time * 2 + phaseOffset) * stroke;
      
      pistonRef.current.position.y = offset;
      
      // Adjust connecting rod angle
      const rodLength = 0.8;
      const crankRadius = stroke;
      const angle = Math.asin(offset / rodLength) * 0.3;
      rodRef.current.rotation.z = angle;
      rodRef.current.position.y = offset - 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Cylinder walls */}
      <lineSegments>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.25, 0.25, cylinderHeight, 8)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.4} />
      </lineSegments>

      {/* Piston head */}
      <group ref={pistonRef}>
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.22, 0.22, pistonHeight, 8)]} />
          <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.8} />
        </lineSegments>
      </group>

      {/* Connecting rod */}
      <mesh ref={rodRef} position={[0, -0.5, 0]}>
        <boxGeometry args={[0.06, 0.8, 0.06]} />
        <meshBasicMaterial color={EMERALD} wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Crankshaft component
function Crankshaft({ length = 3 }: { length?: number }) {
  const crankRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crankRef.current) {
      crankRef.current.rotation.x = clock.getElapsedTime() * 2;
    }
  });

  return (
    <group ref={crankRef} position={[0, -1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
      {/* Main shaft */}
      <lineSegments>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.1, 0.1, length, 6)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.6} />
      </lineSegments>

      {/* Crank throws */}
      {[-1, -0.33, 0.33, 1].map((pos, i) => (
        <group key={i} position={[0, pos, 0]} rotation={[i * Math.PI / 2, 0, 0]}>
          <lineSegments position={[0.15, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.2, 0.15, 0.15)]} />
            <lineBasicMaterial color={EMERALD_GLOW} transparent opacity={0.5} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

// Engine block
function EngineBlock() {
  return (
    <group>
      {/* Main block */}
      <lineSegments position={[0, -0.3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.8, 1.5, 1.2)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.3} />
      </lineSegments>

      {/* Oil pan */}
      <lineSegments position={[0, -1.3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 0.4, 1.0)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.25} />
      </lineSegments>

      {/* Valve cover */}
      <lineSegments position={[0, 0.8, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 0.3, 1.0)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.35} />
      </lineSegments>

      {/* Intake manifold suggestion */}
      <lineSegments position={[0, 0.6, 0.7]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.2, 0.5, 0.3)]} />
        <lineBasicMaterial color={EMERALD} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// Complete diesel engine assembly
function DieselEngine() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation for visual interest
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.3 + Math.PI / 6;
    }
  });

  // Firing order for 4-cylinder: 1-3-4-2 (phase offsets)
  const firingOrder = [0, Math.PI, Math.PI * 1.5, Math.PI * 0.5];

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} rotation={[0.2, Math.PI / 6, 0]} scale={1.3}>
        <EngineBlock />
        
        {/* 4 Pistons in inline configuration */}
        {firingOrder.map((phase, i) => (
          <Piston
            key={i}
            position={[-0.6 + i * 0.4, 0.5, 0]}
            phaseOffset={phase}
          />
        ))}

        <Crankshaft length={2.5} />

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
    const positions = new Float32Array(50 * 3);
    
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color={EMERALD_GLOW}
        size={0.03}
        transparent
        opacity={0.4}
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
    <div className="absolute inset-0 pointer-events-none opacity-40" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <DieselEngine />
      </Canvas>
    </div>
  );
}
