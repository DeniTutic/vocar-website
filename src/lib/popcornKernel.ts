import * as THREE from "three";

/**
 * One low-poly icosahedron, displaced along its own vertex normals with a
 * seeded pseudo-random jitter so every instance can reuse the same buffer
 * geometry while still reading as an irregular "popped" kernel silhouette.
 */
export function createPopcornGeometry(seed = 1): THREE.BufferGeometry {
  const geometry = new THREE.IcosahedronGeometry(0.16, 1);
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < position.count; i++) {
    const nx = normal.getX(i);
    const ny = normal.getY(i);
    const nz = normal.getZ(i);
    const bump = 0.05 + rand() * 0.17;
    position.setXYZ(
      i,
      position.getX(i) + nx * bump,
      position.getY(i) + ny * bump,
      position.getZ(i) + nz * bump
    );
  }
  geometry.computeVertexNormals();
  return geometry;
}

export interface Kernel {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  angularVelocity: THREE.Vector3;
  scale: number;
  settled: boolean;
  colorVariant: number;
}

const GRAVITY = 5.4;
const DRAG = 0.4;
export const FLOOR_Y = -1.55;
const BOUNCE = 0.3;
const FRICTION = 0.5;
const ANGULAR_DAMP = 0.86;

export function createKernels(count: number): Kernel[] {
  const kernels: Kernel[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spread = 0.6 + Math.random() * 1.1;
    const speed = 3.2 + Math.random() * 4.8;
    kernels.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 2.4,
        FLOOR_Y - 0.6 - Math.random() * 0.4,
        (Math.random() - 0.5) * 1.6
      ),
      velocity: new THREE.Vector3(
        Math.cos(angle) * speed * spread,
        (1.1 + Math.random() * 1.1) * (speed * 0.4),
        Math.sin(angle) * speed * spread * 0.6
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      angularVelocity: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ),
      scale: 0.65 + Math.random() * 0.75,
      settled: false,
      colorVariant: Math.random() < 0.18 ? 1 : 0,
    });
  }
  return kernels;
}

export function stepKernel(k: Kernel, dt: number) {
  if (!k.settled) {
    k.velocity.y -= GRAVITY * dt;
    k.velocity.multiplyScalar(1 - DRAG * dt);
    k.position.addScaledVector(k.velocity, dt);

    if (k.position.y <= FLOOR_Y && k.velocity.y < 0) {
      k.position.y = FLOOR_Y;
      k.velocity.y *= -BOUNCE;
      k.velocity.x *= FRICTION;
      k.velocity.z *= FRICTION;
      k.angularVelocity.multiplyScalar(0.6);
      if (Math.abs(k.velocity.y) < 0.25 && k.velocity.length() < 0.5) {
        k.settled = true;
      }
    }

    k.rotation.x += k.angularVelocity.x * dt;
    k.rotation.y += k.angularVelocity.y * dt;
    k.rotation.z += k.angularVelocity.z * dt;
  } else {
    k.angularVelocity.multiplyScalar(ANGULAR_DAMP);
    k.rotation.x += k.angularVelocity.x * dt + 0.015 * dt;
    k.rotation.y += k.angularVelocity.y * dt + 0.025 * dt;
  }
}

/**
 * Used when prefers-reduced-motion is set: parks every kernel directly in
 * an approximation of its resting composition, no physics loop involved.
 */
export function settleKernelInstantly(k: Kernel) {
  const travel = 0.25 + Math.random() * 0.2;
  k.position.x += k.velocity.x * travel;
  k.position.z += k.velocity.z * travel;
  k.position.y = FLOOR_Y + Math.random() * 0.45;
  k.velocity.set(0, 0, 0);
  k.angularVelocity.set(0, 0, 0);
  k.settled = true;
}
