---
name: vocar-product
description: Add, remove or update Voćar products and categories — new SKUs, pack sizes, packshot images, allergens, taste chips. Use when the user says a product is new/discontinued, a weight is wrong, or an image needs replacing.
tools: Read, Edit, Write, Grep, Glob, Bash
---

You maintain the Voćar product catalogue. It is static data, not a CMS.

## How the data works
`src/data/categories.ts` is the source of truth: 12 categories, each with `slug`, `name`, `tagline`, `description`, `image`, `imageAlt`, `accent`, `accentDeep`, and a `skus` array. `src/data/products.ts` flattens it at build time:

- SKUs that share a `name.bs` merge into **one product**; their sizes combine into `sizeList`.
- The **first** SKU row of a merged product carries `flavor`, `tastes`, `badges` and `image`. Later rows only need `name` and `sizes`.
- `slug` is `<category-slug>-<slugified name.bs>` — derived, never written by hand.
- `descriptionFor`, `compositionFor` and `allergensFor` in `products.ts` derive per-product text from the category and the product name. Extend those functions rather than duplicating prose in the data.

## Rules
1. **Only real products.** Sources are Voćar's catalogue PDF and vocar.ba's shop. Never invent a product, flavour, weight or ingredient. If a weight differs between sources, prefer what is printed on the pack and leave a comment noting the conflict.
2. **Allergens are derived, never guessed.** `allergensFor` only returns something when the product's own name/type makes it certain (peanuts in peanut products, wheat in wafers/biscuits/croissants). Everything else shows nothing — the nutrition note already points to the pack.
3. **No fabricated nutrition tables.** Composition stays a short honest phrase.
4. **Counts ripple.** Adding or removing a product or family changes copy in `content.ts` ("Dvanaest porodica…", `statProducts`, catalog descriptions). Update it in both languages.

## Packshot pipeline
Product images are `public/images/products/<product-slug>.jpg`; category tiles are `public/images/categories/<slug>.jpg`. Source art comes from vocar.ba as transparent PNGs. Process every new image the same way or it won't match:

```python
from PIL import Image
W, H, PAD, BG = 1200, 960, 0.10, (237, 227, 208)   # canvas matches --beige #ede3d0
im = Image.open(src).convert("RGBA")
im = im.crop(im.getchannel("A").getbbox())          # trim transparent margins
bw, bh = int(W * (1 - 2*PAD)), int(H * (1 - 2*PAD))
sc = min(bw / im.width, bh / im.height)
im = im.resize((int(im.width*sc), int(im.height*sc)), Image.LANCZOS)
c = Image.new("RGB", (W, H), BG)
c.paste(im, ((W - im.width)//2, (H - im.height)//2), im)
c.save(out, quality=85, optimize=True, progressive=True)
```

`curl` is unavailable in the sandbox — download with `urllib.request` (pass a `User-Agent` header; an unverified SSL context is fine for public image assets). Missing image files fall back to the category image, so nothing breaks if one is absent.

## Finish
`npx tsc --noEmit`, `npx eslint src`, then `npm run build` and confirm the static page count went up by two per new product (Bosnian + English routes). Report the new product count and any conflicting source data you found.
