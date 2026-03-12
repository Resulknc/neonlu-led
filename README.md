# Neonlu LED

Modern neon signage website built with React, TailwindCSS, and Framer Motion.

## Tech Stack

- **React 19** — UI framework
- **Vite 5** — build tool & dev server
- **TailwindCSS v4** — utility-first styling
- **Framer Motion v12** — animations
- **React Router v7** — client-side routing

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, product preview, CTA |
| `/urunler` | Product catalogue (12 products) |
| `/urun/:slug` | Product detail page with SEO sections |
| `/iletisim` | Contact form |
| `/hakkimizda` | About page |

## Getting Started

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

Build output goes to `dist/`.

## Deployment

- **Vercel** — `vercel.json` configures SPA rewrites
- **Netlify** — `public/_redirects` configures SPA routing

Both are pre-configured; connect the repo to your platform and it deploys automatically.
