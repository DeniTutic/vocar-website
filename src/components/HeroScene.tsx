"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createFloatingForms, createSnackGeometry, type FloatingForm } from "@/lib/snackForms";
import { useReducedMotion } from "@/lib/useReducedMotion";

const COUNT = 13;

function FloatingField({ reducedMotion }: { reducedMotion: boolean }) {
  const forms = useMemo<FloatingForm[]>(() => createFloatingForms(COUNT), []);
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      for (let i = 0; i < forms.length; i++) {
        const mesh = meshRefs.current[i];
        if (!mesh) continue;
        const f = forms[i];
        mesh.position.y = f.baseY + Math.sin(t * f.floatSpeed + f.floatOffset) * 0.22;
        mesh.rotation.x = t * f.rotSpeed[0];
        mesh.rotation.y = t * f.rotSpeed[1];
        mesh.rotation.z = t * f.rotSpeed[2];
      }
    }

    if (groupRef.current) {
      const targetY = reducedMotion ? 0 : pointer.current.x * 0.18;
      const targetX = reducedMotion ? 0 : pointer.current.y * -0.09;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {forms.map((f, i) => (
        <mesh
          key={i}
          position={f.position}
          scale={f.scale}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
        >
          <primitive object={createSnackGeometry(f.kind, f.seed)} attach="geometry" />
          <meshStandardMaterial color={f.color} roughness={0.6} metalness={0.02} transparent opacity={0.88} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.75} color="#f7f3ea" />
        <directionalLight position={[4, 5, 6]} intensity={1.1} color="#fff4e0" />
        <directionalLight position={[-5, -2, 3]} intensity={0.35} color="#c98a3b" />
        <FloatingField reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
