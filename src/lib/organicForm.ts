import * as THREE from "three";

/**
 * A low-poly sphere displaced along its own vertex normals with a seeded
 * jitter, so it reads as an organic, hand-shaped form (a stylized seed,
 * fruit, or leaf) rather than a perfect geometric primitive. No texture
 * involved anywhere — every visual is pure geometry + color + light.
 */
export function createOrganicGeometry(radius: number, seed: number): THREE.BufferGeometry {
  const geometry = new THREE.IcosahedronGeometry(radius, 3);
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
    const bump = (rand() - 0.5) * radius * 0.22;
    position.setXYZ(i, position.getX(i) + nx * bump, position.getY(i) + ny * bump, position.getZ(i) + nz * bump);
  }
  geometry.computeVertexNormals();
  return geometry;
}

export interface FloatingForm {
  position: [number, number, number];
  baseY: number;
  scale: number;
  color: string;
  floatSpeed: number;
  floatOffset: number;
  rotSpeed: [number, number];
  seed: number;
}

const FRUIT_TONES = ["#8c2f39", "#c98a3b", "#6b3a50", "#3f5c3f", "#e3ac5a", "#a4442f"];

export function createFloatingForms(count: number): FloatingForm[] {
  const forms: FloatingForm[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radiusX = 3.6 + Math.random() * 1.8;
    const radiusY = 1.6 + Math.random() * 1.6;
    const y = (Math.random() - 0.5) * 3.2;
    forms.push({
      position: [Math.cos(angle) * radiusX, y, Math.sin(angle) * radiusY - 1],
      baseY: y,
      scale: 0.18 + Math.random() * 0.26,
      color: FRUIT_TONES[i % FRUIT_TONES.length],
      floatSpeed: 0.25 + Math.random() * 0.35,
      floatOffset: Math.random() * Math.PI * 2,
      rotSpeed: [(Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2],
      seed: i * 17 + 3,
    });
  }
  return forms;
}
