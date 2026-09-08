# Voćar — website redesign concept

A concept redesign of [vocar.ba](https://www.vocar.ba) for Voćar d.o.o. Brčko, a snack and food
producer in Gornji Rahić, Bosnia and Herzegovina. The current site is a near-empty WooCommerce
shop; this is a from-scratch marketing site built around the company's real 14-page product
catalogue.

**This is a concept, not the live site.** All product names, sizes and categories are transcribed
from Voćar's own catalogue PDF. Certifications and history are deliberately left as an honest
placeholder — nothing about ISO/HACCP/halal status or company founding is claimed, since none of
that was confirmed in the source material.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **React Three Fiber** (`three` + `@react-three/fiber` + `@react-three/drei`) for the animated
  popcorn-burst hero on the home page
- **No database.** The catalogue (11 categories, ~45 SKUs) lives in
  [`src/data/categories.ts`](src/data/categories.ts) as typed, bilingual static data — it changes
  rarely enough that a database would be pure overhead. A headless CMS would be the natural
  upgrade path if non-developers ever need to edit it directly.
- Custom lightweight i18n (`src/context/LanguageContext.tsx`) — Bosnian/English toggle, no
  external i18n library needed at this content size.

## Pages

- `/` — hero with a physics-driven popcorn burst (Three.js), brand intro, category shelf
- `/products` — all 11 categories, each tinted with an accent color lifted from its real packaging
- `/about` — brand story, sourced only from verified facts
- `/certificates` — honest "quality & standards" placeholder gallery for real certification
  documents, once supplied
- `/contact` — real address, phone, fax, email, and an embedded map

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Content sourcing

Category photos in `public/images/categories/` and `public/images/cover.jpg` are cropped from
Voćar's own product catalogue PDF (rendered with `pdftoppm`, cropped/resized with `sips`). Product
names, sizes and the company's contact details are transcribed from the same catalogue and from
the current vocar.ba site.
