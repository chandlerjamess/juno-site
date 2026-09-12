# Juno Solutions — Marketing Site

Static marketing site for Juno Solutions, an after-hours lead capture and
appointment setting service for new-home builders.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. No CMS, no
database, no backend — every route is prerendered as static HTML.

## Setup

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:3000. To use a different port:

```bash
npm run dev -- -p 3100
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint |

## Deploying to Vercel

The site is a stock Next.js app with no environment variables and no runtime
dependencies, so it deploys as-is.

1. Push this directory to a Git repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Accept the detected defaults (framework: Next.js, build: `npm run build`).
4. Deploy.

To deploy from your machine instead:

```bash
npx vercel --prod
```

Before going live, set the production domain in `metadataBase` in
`src/app/layout.tsx` — it currently points at `https://junosolutions.co` and is
what resolves Open Graph URLs.

## Structure

```
src/
  app/
    layout.tsx          Root layout, fonts, metadata, skip link
    page.tsx            Landing page — composes the sections below
    globals.css         Design tokens, base styles, load-in animation
    contact/page.tsx    Contact page
    privacy/page.tsx    Placeholder privacy notice
    terms/page.tsx      Placeholder terms
  components/
    Nav.tsx             Sticky nav, transparent until scrolled
    Footer.tsx
    ContactForm.tsx     Client-side validation only (see below)
    LegalPage.tsx       Shared shell for /privacy and /terms
    sections/           One component per landing-page section
    ui/                 Container, Section, Button, Reveal
```

Page composition lives in `src/app/page.tsx`; each section is a standalone
component under `src/components/sections/` and can be reordered or removed
without touching the others.

## Design

Black, white, and grey only — no accent color. Contrast and type carry the
hierarchy. Tokens are defined in the `@theme inline` block in
`src/app/globals.css` (Tailwind v4 has no `tailwind.config.ts`):

| Token | Value | Used for |
| --- | --- | --- |
| `ink` | `#0A0A0A` | Primary text, dark bands |
| `grey-50` | `#FAFAFA` | Alternating section backgrounds |
| `grey-100` | `#F5F5F5` | Subtle fills |
| `grey-200` | `#E5E5E5` | 1px borders and rules |
| `grey-400` | `#A3A3A3` | Secondary text **on dark only** |
| `grey-500` | `#737373` | Eyebrow labels, meta text |
| `grey-600` | `#525252` | Body copy on white |

Contrast note: `grey-400` does not meet WCAG AA on a white background. Use it
only on `ink` surfaces. `grey-500` and `grey-600` both pass on white.

### Motion

Two mechanisms, deliberately kept separate:

- **Above the fold** uses the CSS-only `.reveal-on-load` class. It animates as
  soon as the stylesheet parses rather than waiting for hydration, so the hero
  never flashes blank and the LCP element is not gated on JavaScript.
- **Below the fold** uses `<Reveal>`, which fades and slides content in once on
  first scroll into view via `IntersectionObserver`.

Both collapse to no animation under `prefers-reduced-motion`. With JavaScript
disabled, a `<noscript>` rule in the root layout forces all `<Reveal>` content
visible.

## Contact form

`src/components/ContactForm.tsx` validates on the client and **does not submit
anywhere**. The submit handler is stubbed with a `TODO` and simply shows the
success state; entered values are discarded.

To make it live, replace that stub with a call to whatever destination you
want — a form endpoint, a CRM webhook, or a Next.js route handler. Note that
adding a route handler means the site is no longer fully static.

## Placeholder content to replace before launch

- `/privacy` and `/terms` are plain-language placeholders, not reviewed legal
  copy.
- `sales@junosolutions.co` appears in the nav, footer, contact page, and both
  legal pages.
- `metadataBase` in `src/app/layout.tsx`.
