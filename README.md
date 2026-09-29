# Structura — Architecture Studio Website

A pixel-close recreation of the Structura landing page design, built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Fully component-based, with light/dark theme support and smooth scroll animations throughout.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## What's included

- **Dark / light theme toggle** — persisted to `localStorage`, no flash-of-wrong-theme on load (site defaults to dark to match the reference design).
- **Smooth scroll** — CSS `scroll-behavior: smooth` plus Framer Motion `whileInView` reveal animations on every section, respecting `prefers-reduced-motion`.
- **Reusable components** — buttons, cards, section headings, and the fade-in wrapper are all shared, data-driven components (see `src/data/site.ts`).
- **Roboto** loaded via `next/font/google` as the site-wide sans-serif family.
- **Hotlinked imagery** — three free-to-use Unsplash photos (credited below) stand in for the original 3D renders in the reference design.

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout: fonts, metadata, theme init script
│   ├── page.tsx           # Assembles all sections into the home page
│   └── globals.css        # Tailwind layers + base theme styles
├── components/
│   ├── layout/             # Navbar, Footer, Container
│   ├── ui/                 # Button, ThemeToggle, SectionHeading
│   ├── sections/            # Hero, About, Services, Projects, ContactCta, cards
│   └── motion/              # FadeIn scroll-reveal wrapper
├── providers/
│   └── ThemeProvider.tsx   # Theme context (light/dark) + localStorage
└── data/
    └── site.ts              # Nav links, services, projects, stats content
```

## Swapping in your own images

All imagery is centralized in `src/data/site.ts` (`HERO_IMAGE`, `PROJECTS[].image`). Replace those URLs with your own 3D renders or drop files into `public/` and point to `/your-file.jpg` instead — no other files need to change.

## Image credits (Unsplash License — free to use)

- Hero visual: photo by Zulfugar Karimov
- Featured project card: photo by Huy Nguyen
- Portfolio card: photo by Andy Luo
