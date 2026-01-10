# Nas Portfolio

Personal portfolio website showcasing my work across software engineering, data science, and creative production.

**Live:** [nascreate.com](https://nascreate.com)

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4
- **Animation:** Framer Motion
- **3D:** Three.js, React Three Fiber, Drei
- **Deployment:** Vercel

---

## Project Structure

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── create/           # Creative portfolio (photography/video)
│   ├── tech/             # Technical portfolio (software/data)
│   └── layout.tsx        # Root layout
├── data/
│   └── projects.ts       # Project content
└── lib/
    └── utils.ts          # Helper functions
```

---

## Running Locally

```bash
npm install
npm run dev
```

Opens at [localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |

---

## Notes

**Scoped theming** — The creative section uses its own colour scheme via CSS custom properties, keeping it isolated from the main site styles.

**Image protection** — Portfolio images have basic protections (disabled right-click, drag prevention) to deter casual downloading.

**Git LFS** — Large image files are stored with Git LFS to keep the repo size manageable.

---

## Licence

Open source for reference. Feel free to learn from the code, but please don't copy the design wholesale for your own portfolio.

---

## Contact

- Site: [nascreate.com](https://nascreate.com)
- Email: nascreate0@gmail.com
- Instagram: [@nas.create](https://instagram.com/nas.create)
