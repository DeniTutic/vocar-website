"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createPopcornGeometry,
  createKernels,
  stepKernel,
  settleKernelInstantly,
  type Kernel,
} from "@/lib/popcornKernel";

const KERNEL_COUNT = 190;
const CREAM = new THREE.Color("#f4e8c8");
const CARAMEL = new THREE.Color("#c9873c");

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Deferred to an effect on purpose: matchMedia isn't available during
    // SSR, so the initial render always assumes motion is allowed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function PopcornField({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => createPopcornGeometry(11), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const kernels = useMemo<Kernel[]>(() => {
    const list = createKernels(KERNEL_COUNT);
    if (reducedMotion) {
      list.forEach((k) => settleKernelInstantly(k));
    }
    return list;
  }, [reducedMotion]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    kernels.forEach((k, i) => {
      mesh.setColorAt(i, k.colorVariant === 1 ? CARAMEL : CREAM);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [kernels]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Clamped to guard against a single pathological jump (e.g. the tab
    // regaining focus after being backgrounded), not ordinary frame pacing.
    const dt = Math.min(delta, 0.08);
    for (let i = 0; i < kernels.length; i++) {
      const k = kernels[i];
      if (!reducedMotion) stepKernel(k, dt);
      dummy.position.copy(k.position);
      dummy.rotation.set(k.rotation.x, k.rotation.y, k.rotation.z);
      dummy.scale.setScalar(k.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, KERNEL_COUNT]}>
      <meshStandardMaterial roughness={0.94} metalness={0} />
    </instancedMesh>
  );
}

export function PopcornHero() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.1, 5.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} color="#fff2da" />
        <directionalLight position={[3, 4, 5]} intensity={1.15} color="#fff0d6" />
        <directionalLight position={[-4, -1.5, 2]} intensity={0.35} color="#ffcf8f" />
        <PopcornField reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
