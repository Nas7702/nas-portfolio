# Overview

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Creative page theme (scoped)

The Create/Creative section uses a page-scoped dark-grey + neon-green theme. It is applied by wrapping the page root with the `theme-creative` class or `[data-theme="creative"]` attribute. The theme is implemented with CSS variables defined in `src/app/globals.css` so the rest of the site remains unchanged.

- Scope wrapper: add `className="theme-creative"` on the page root container
- Variables available under the scope:
  - `--bg`, `--panel`, `--muted`, `--subtle`, `--grid`, `--text`, `--text-dim`, `--accent`, `--accent-dim`, `--accent-ghost`, `--ring`
- Utility classes (from `@layer utilities` in `globals.css`):
  - Backgrounds: `bg-bg`, `bg-panel`, `bg-muted`, `bg-grid`
  - Text: `text-text`, `text-dim`, `text-accent`
  - Borders/Rings: `border-subtle`, `ring-accent`, `ring-offset-bg`
  - Accent fills/glow: `bg-accent`, `bg-accent-ghost`, `shadow-accent-soft`

Example:

```tsx
<div className="theme-creative bg-bg text-text">
  <button className="rounded-lg px-4 py-2 bg-accent text-[#0B0C0E] focus:outline-none focus:ring-2 ring-accent ring-offset-bg">
    CTA
  </button>
  <section className="bg-panel border border-subtle" />
  <p className="text-dim">Secondary copy</p>
  <div className="bg-grid" />
</div>
```

Only apply this scope to the Creative route; Technical, About, and Contact keep their existing styles.
