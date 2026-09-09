import * as THREE from "three";

export type SnackKind = "popcorn" | "flip" | "keks" | "stick";

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function jitter(geometry: THREE.BufferGeometry, amount: number, seed: number): THREE.BufferGeometry {
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const rand = seededRand(seed);
  for (let i = 0; i < position.count; i++) {
    const nx = normal.getX(i);
    const ny = normal.getY(i);
    const nz = normal.getZ(i);
    const bump = (rand() - 0.5) * amount;
    position.setXYZ(i, position.getX(i) + nx * bump, position.getY(i) + ny * bump, position.getZ(i) + nz * bump);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** A knobby, irregular puff — reads as a popped popcorn kernel. */
function popcornGeometry(seed: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(1, 1);
  return jitter(geo, 0.42, seed);
}

/** A puffed ring — reads as a corn "flips" loop. */
function flipGeometry(seed: number): THREE.BufferGeometry {
  const geo = new THREE.TorusGeometry(0.72, 0.4, 10, 20);
  return jitter(geo, 0.1, seed);
}

/** A flattened disc — reads as a round biscuit/wafer ("keks"). */
function keksGeometry(seed: number): THREE.BufferGeometry {
  const geo = new THREE.CylinderGeometry(1, 1, 0.34, 14, 1);
  return jitter(geo, 0.05, seed);
}

/** A rounded-cap rod — reads as a corn stick / pretzel stick. */
function stickGeometry(seed: number): THREE.BufferGeometry {
  const geo = new THREE.CapsuleGeometry(0.34, 1.3, 4, 10);
  return jitter(geo, 0.06, seed);
}

export function createSnackGeometry(kind: SnackKind, seed: number): THREE.BufferGeometry {
  switch (kind) {
    case "popcorn":
      return popcornGeometry(seed);
    case "flip":
      return flipGeometry(seed);
    case "keks":
      return keksGeometry(seed);
    case "stick":
      return stickGeometry(seed);
  }
}

export interface FloatingForm {
  kind: SnackKind;
  position: [number, number, number];
  baseY: number;
  scale: number;
  color: string;
  floatSpeed: number;
  floatOffset: number;
  rotSpeed: [number, number, number];
  seed: number;
}

/** Real Voćar packaging tones: butter-cream popcorn, corn-gold flips, toasted wafer, roasted peanut. */
const SNACK_PALETTE: Record<SnackKind, string[]> = {
  popcorn: ["#f4e8c8", "#ecd9a0"],
  flip: ["#e0a544", "#d9822e"],
  keks: ["#c9954a", "#a9723a"],
  stick: ["#d9b98a", "#c49a5f"],
};

const KIND_CYCLE: SnackKind[] = ["popcorn", "flip", "keks", "stick"];

export function createFloatingForms(count: number): FloatingForm[] {
  const forms: FloatingForm[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radiusX = 3.6 + Math.random() * 1.8;
    const radiusY = 1.6 + Math.random() * 1.6;
    const y = (Math.random() - 0.5) * 3.2;
    const kind = KIND_CYCLE[i % KIND_CYCLE.length];
    const tones = SNACK_PALETTE[kind];
    forms.push({
      kind,
      position: [Math.cos(angle) * radiusX, y, Math.sin(angle) * radiusY - 1],
      baseY: y,
      scale: kind === "popcorn" ? 0.22 + Math.random() * 0.24 : 0.16 + Math.random() * 0.18,
      color: tones[i % tones.length],
      floatSpeed: 0.25 + Math.random() * 0.35,
      floatOffset: Math.random() * Math.PI * 2,
      rotSpeed: [(Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3],
      seed: i * 17 + 3,
    });
  }
  return forms;
}
