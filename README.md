# Voćar - Website

The official website of [Voćar d.o.o. Brčko](https://vocar.ba), a snack and food producer from
Gornji Rahić, Bosnia and Herzegovina: flips, popcorn, wafers, prunes, peanuts, peanut butter,
pellet chips and cereals, sold across the region and exported abroad (the list of export markets
lives in `src/data/markets.ts`).

- **Live:** [vocar.ba](https://vocar.ba)
- **Languages:** Bosnian (default) and English (`/en`)
- **Hosting:** Vercel, deployed automatically from `main`

## What's on the site

- **Homepage:** hero, product families, featured products, brand story with the drone video of
  the plant, quality (HACCP, IFS Food), where to buy, testimonials, and the contact section with
  a map and the inquiry form
- **Products** (`/proizvodi`, `/en/products`): 8 categories and 33 products, each with its own
  page: pack sizes, ingredients, allergens and nutrition values as Voćar supplied them
- **Private label** (`/robne-marke`, `/en/private-label`): manufacturing, packaging and
  development services for other brands
- **Legal:** privacy policy and terms of use in both languages
- **Catalogue:** the PDF catalogue is downloadable from the site

## Stack

- **Next.js 16** (App Router, static pages) with **TypeScript** and **Tailwind CSS v4**
- **Framer Motion** for scroll reveals and animation, **Lucide React** for icons
- **Nodemailer** for the contact form, sending through Voćar's own mail server
- **Vercel Web Analytics**, cookie-free
- **No database.** Products and site copy live in TypeScript files under `src/data/`

## Project structure

```
src/
  app/
    (bs)/            Bosnian pages (default language, served at /)
    (en)/en/         English pages (served at /en)
    api/contact/     Contact and quote form endpoint
    sitemap.ts       sitemap.xml for both languages
    robots.ts
  components/        UI sections and page views
  data/
    categories.ts    Product categories and products
    markets.ts       Export markets shown on the site
    productInfo.ts   Ingredients, allergens and nutrition per product
    content.ts       All site copy, every string in Bosnian and English
  lib/               Locale, metadata, routes and helpers
public/
  images/            Product, category and page photos
  files/             Catalogue PDF
  videos/            Drone footage of the plant
```

Most content edits happen in `src/data/`. Every text there has a `bs` and an `en` version, so
both languages stay in sync.

## SEO and security

- Per-page titles, descriptions, Open Graph images and `hreflang` links between the two languages
- Organization and Product JSON-LD, a generated `sitemap.xml` and `robots.txt`
- Permanent redirects for product URLs that changed when the range was reorganised
- Security headers on every response: Content Security Policy, `X-Frame-Options`,
  `nosniff`, a strict referrer policy and a locked-down permissions policy

## Content sources

Product names, pack sizes, ingredients, allergens and nutrition values come from Voćar: their
catalogue, their packaging and their written corrections. Values are copied exactly as supplied.
Photos are Voćar's own packshots, catalogue images and drone footage.
