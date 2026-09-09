# Voćar — website redesign concept

A from-scratch redesign of [vocar.ba](https://www.vocar.ba) for Voćar d.o.o. Brčko, a snack and
food producer in Gornji Rahić, Bosnia and Herzegovina. The current site is a near-empty
WooCommerce shop; this reimagines it as a premium, editorial food-brand experience — real
products, real photography, real contact details, honest placeholders where the real thing
(certificates) hasn't been supplied yet.

**This is a concept, not the live site.** Product names, sizes, categories and contact details are
transcribed from Voćar's own 14-page catalogue PDF and the current vocar.ba site. Certifications
and company history are deliberately left honest and unembellished — nothing about ISO/HACCP/halal
status or a founding date is claimed, since none of that was confirmed in the source material.
Composition text on product pages is grounded in the product's real name/type, never a fabricated
nutrition table — the page says explicitly that precise values are on the physical packaging.

## Stack

- **Next.js 16** (App Router, Server Components + streaming) + **TypeScript** + **Tailwind CSS v4**
- **React Three Fiber** (`three` + `@react-three/fiber` + `@react-three/drei`) for the organic,
  fruit-toned floating-forms hero scene — dynamically imported (`ssr:false`) so it never blocks
  the initial page load, and disabled/settled for `prefers-reduced-motion`
- **Framer Motion** for scroll reveals, the shrinking/blurring navbar, staged hero text, hover
  states, and the animated distribution-map lines
- **Lucide React** for icons
- **No database.** ~45 real SKUs across 11 categories live in
  [`src/data/categories.ts`](src/data/categories.ts) and are flattened into individual product
  pages by [`src/data/products.ts`](src/data/products.ts) — static content that changes rarely
  enough that a database would be pure overhead. A headless CMS is the natural upgrade path if
  non-developers ever need to edit it directly.
- Bilingual-shaped content (`src/data/content.ts`, every string has `bs`/`en`) with Bosnian
  rendered by default — the data model is ready for a language switch without a rewrite.

## Routes

- `/` — hero (Three.js organic forms), brand story with animated stats, horizontal product
  showcase, four cinematic flagship products, quality preview, production timeline, distribution
  map, catalogue download CTA
- `/proizvodi` — every category, every SKU, grouped and linked
- `/proizvodi/[slug]` — one page per real product (~35 static pages): image, description,
  packaging sizes, honest composition note, related products from the same category
- `/o-nama` — history, mission, values
- `/kvalitet` — quality commitments, an honest certificate-placeholder gallery, the production
  timeline
- `/katalog` — full category index plus a real download link to the source catalogue PDF
- `/kontakt` — address, phones, email, Slovenia office, embedded map, a validated contact form
  that opens a pre-filled `mailto:` (no backend wired up yet — see below)

Every route ships real `<title>`/description metadata, Open Graph/Twitter tags, an Organization
JSON-LD block, and there's a generated `sitemap.xml` / `robots.txt`.

## Known simplification

The contact form validates client-side and hands off to `mailto:sales@vocar.ba` with the message
pre-filled — there's no email-sending backend or API route yet. Wiring one up (Resend, SendGrid,
a simple API route) is the natural next step before this goes live.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Content sourcing

Category photos in `public/images/categories/` and `public/images/cover.jpg` are cropped from
Voćar's own product catalogue PDF (rendered with `pdftoppm`, cropped/resized with `sips`). The
same PDF is served as-is at `public/files/vocar-katalog.pdf` for the catalogue download. Product
names, sizes and the company's contact details are transcribed from the same catalogue and from
the current vocar.ba site.
