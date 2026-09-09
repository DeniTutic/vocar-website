import * as THREE from "three";

export type SnackKind = "popcorn" | "flip" | "keks" | "stick" | "peanut";

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

/** One knobby lobe — three of these clustered together (see popcornLobeOffsets) read as a popped kernel. */
function popcornGeometry(seed: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(1, 1);
  return jitter(geo, 0.4, seed);
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

/** A pinched, elongated double-lobe — reads as an unshelled peanut. */
function peanutGeometry(seed: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const position = geo.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const waist = 0.5 + 0.5 * Math.abs(Math.tanh(x * 1.7));
    position.setY(i, position.getY(i) * waist);
    position.setZ(i, position.getZ(i) * waist);
    position.setX(i, x * 1.5);
  }
  geo.computeVertexNormals();
  return jitter(geo, 0.05, seed);
}

/** Three overlapping lobes, relative to a popcorn form's own origin — the cluster that makes one kernel. */
export function popcornLobeOffsets(seed: number): Array<[number, number, number]> {
  const rand = seededRand(seed + 500);
  const offsets: Array<[number, number, number]> = [];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + rand() * 0.7;
    const r = 0.4 + rand() * 0.14;
    offsets.push([Math.cos(a) * r, (rand() - 0.5) * 0.34, Math.sin(a) * r]);
  }
  return offsets;
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
    case "peanut":
      return peanutGeometry(seed);
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
  peanut: ["#cdae7a", "#b8945a"],
};

const KIND_CYCLE: SnackKind[] = ["popcorn", "flip", "keks", "stick", "peanut", "popcorn", "flip"];

function spinSpeed(rand: () => number): number {
  const magnitude = 0.55 + rand() * 1.1;
  return rand() < 0.5 ? -magnitude : magnitude;
}

export function createFloatingForms(count: number): FloatingForm[] {
  const forms: FloatingForm[] = [];
  for (let i = 0; i < count; i++) {
    const rand = seededRand(i * 91 + 7);
    const angle = (i / count) * Math.PI * 2;
    const radiusX = 3.4 + rand() * 2.6;
    const radiusY = 1.5 + rand() * 2.1;
    const y = (rand() - 0.5) * 3.8;
    const kind = KIND_CYCLE[i % KIND_CYCLE.length];
    const tones = SNACK_PALETTE[kind];
    forms.push({
      kind,
      position: [Math.cos(angle) * radiusX, y, Math.sin(angle) * radiusY - 1.2],
      baseY: y,
      scale: kind === "popcorn" ? 0.2 + rand() * 0.22 : 0.15 + rand() * 0.17,
      color: tones[i % tones.length],
      floatSpeed: 0.25 + rand() * 0.35,
      floatOffset: rand() * Math.PI * 2,
      rotSpeed: [spinSpeed(rand), spinSpeed(rand), spinSpeed(rand)],
      seed: i * 17 + 3,
    });
  }
  return forms;
}
