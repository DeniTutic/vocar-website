"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createFloatingForms,
  createSnackGeometry,
  popcornLobeOffsets,
  type FloatingForm,
} from "@/lib/snackForms";
import { useReducedMotion } from "@/lib/useReducedMotion";

const COUNT = 24;

function FloatingField({ reducedMotion }: { reducedMotion: boolean }) {
  const forms = useMemo<FloatingForm[]>(() => createFloatingForms(COUNT), []);
  const groupRef = useRef<THREE.Group>(null);
  // Popcorn kinds render as a <group> of 3 lobes (real popcorn is knobby, not
  // one blob); everything else is a single mesh. Both are Object3D, so one
  // ref array and one animation loop drive position/rotation for either.
  const itemRefs = useRef<Array<THREE.Object3D | null>>([]);
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
        const item = itemRefs.current[i];
        if (!item) continue;
        const f = forms[i];
        item.position.y = f.baseY + Math.sin(t * f.floatSpeed + f.floatOffset) * 0.22;
        item.rotation.x = t * f.rotSpeed[0];
        item.rotation.y = t * f.rotSpeed[1];
        item.rotation.z = t * f.rotSpeed[2];
      }
    }

    if (groupRef.current) {
      // A slow, continuous auto-rotation keeps the whole field turning on
      // its own; the pointer only adds an offset on top of that baseline,
      // so it never depends on the cursor moving to feel alive.
      const autoSpin = reducedMotion ? 0 : t * 0.045;
      const targetY = autoSpin + (reducedMotion ? 0 : pointer.current.x * 0.12);
      const targetX = reducedMotion ? 0 : pointer.current.y * -0.06;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {forms.map((f, i) => {
        if (f.kind === "popcorn") {
          const lobes = popcornLobeOffsets(f.seed);
          return (
            <group
              key={i}
              position={f.position}
              scale={f.scale}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              {lobes.map((offset, li) => (
                <mesh key={li} position={offset} scale={0.72}>
                  <primitive object={createSnackGeometry("popcorn", f.seed + li * 31)} attach="geometry" />
                  <meshStandardMaterial color={f.color} roughness={0.6} metalness={0.02} transparent opacity={0.88} />
                </mesh>
              ))}
            </group>
          );
        }

        return (
          <mesh
            key={i}
            position={f.position}
            scale={f.scale}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <primitive object={createSnackGeometry(f.kind, f.seed)} attach="geometry" />
            <meshStandardMaterial color={f.color} roughness={0.6} metalness={0.02} transparent opacity={0.88} />
          </mesh>
        );
      })}
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
