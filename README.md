# Nas.Create

Commercial videography and photography website for Nas.Create, a UK-based creative production business. The site serves as a client-facing portfolio and booking hub, with a filterable work gallery, client testimonials, a service breakdown, and direct booking via Calendly and WhatsApp.

**Live:** [nascreate.com](https://nascreate.com)

---

## Table of Contents

- [What the Site Is](#what-the-site-is)
- [Pages & Routes](#pages--routes)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [CI/CD](#cicd)
- [Deployment](#deployment)
- [Notes](#notes)
- [Licence](#licence)
- [Contact](#contact)

---

## What the Site Is

This is the website for **Nas.Create**, a freelance creative production business based in Yorkshire, UK. It is not a software/developer portfolio. The focus is entirely on commercial video and photography work.

The site is built to do three things:

1. **Show the work** — filterable video and photo gallery with a full-screen lightbox
2. **Build trust** — client testimonials, a clear services breakdown, and a transparent booking process
3. **Convert visitors** — Calendly booking embed and WhatsApp contact wired up on every key page

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage with ink wash shader hero and a bento grid linking to Work, About, Services, and Contact |
| `/create` | Main portfolio page: filterable video/photo gallery, testimonials, album lightbox, booking CTAs |
| `/services` | Covers Videography, Photography, Event Coverage, and Post-Production with a 4-step booking process |
| `/about` | Personal timeline (2020 to now) and working principles |
| `/contact` | Calendly embed, WhatsApp, email, and Instagram. Accepts `?service=videography#calendly` URL params |
| `/tech` | Redirects to `/create`. The software/data science section has been removed |

### Navigation

The floating dock (desktop) and navbar (mobile) link to: **Home**, **Work** (`/create`), **About**, **Contact**. The `/services` page is accessible from the homepage bento grid and from service cards on `/create`.

### Portfolio content on `/create`

**Videos**

| Title | Client | Tags |
|---|---|---|
| The JMC | The JMC | Brand Film, Cinematic, Promo |
| Kyle Allen Physique Coaching | Kyle Allen Coaching | Fitness, Promo, Story Reel |
| Sheffield Varsity Basketball | University of Sheffield | Sport, Cinematic, Highlight |
| Sheffield Varsity Powerlifting | University of Sheffield | Sport, Cinematic, Highlight |
| Stance Fitness Promo | Nas.Create | Brand Film, Cinematic, Colour Grading |
| Vizual Mods Promo | Vizual Mods | Automotive, Promo, Motion |

**Photo albums**

- Fitness & Physiques
- Automotive
- Sheffield Powerlifting Varsity 2025

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 (strict mode) |
| **UI** | React 19 |
| **Styling** | Tailwind CSS 4 with `@tailwindcss/postcss` |
| **Animation** | Framer Motion 12 |
| **3D / WebGL** | Three.js 0.177, React Three Fiber 9, @react-three/drei 10 |
| **3D utilities** | `maath` (`random.inSphere`) for particle distribution |
| **Icons** | Lucide React, `tech-stack-icons` |
| **Analytics** | Vercel Analytics |
| **Deployment** | Vercel |
| **Media CDN** | Cloudflare R2 (video files and thumbnails) |
| **Asset storage** | Git LFS (all `.jpg`, `.jpeg`, `.png`) |

---

## Project Structure

```
nas-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions: lint, build, type-check
├── public/
│   ├── images/                 # Static portfolio images (Git LFS tracked)
│   └── logos/                  # Light and dark mode wordmarks
├── src/
│   ├── app/
│   │   ├── components/         # All shared React components
│   │   │   ├── Hero.tsx                      # Homepage hero (loads shader scene)
│   │   │   ├── HeroInkShaderScene.tsx        # Custom ink wash GLSL shader
│   │   │   ├── BentoGrid.tsx                 # Homepage bento grid (Work, About, Contact, Services)
│   │   │   ├── LightboxGallery.tsx           # Full-screen image/video viewer with filmstrip
│   │   │   ├── Testimonials.tsx              # Auto-rotating client testimonials (6s interval)
│   │   │   ├── CreativeBokehShaderScene.tsx  # Bokeh GLSL shader used on /create hero
│   │   │   ├── CreativeCTA.tsx               # Reusable Calendly/WhatsApp CTA block
│   │   │   ├── FloatingDock.tsx              # Desktop nav dock with magnification
│   │   │   ├── Navbar.tsx                    # Mobile navigation
│   │   │   ├── ScrollReveal.tsx              # Scroll-triggered reveal wrapper
│   │   │   ├── AnimationWrapper.tsx          # Page transition wrapper
│   │   │   ├── ThemeProvider.tsx             # Dark mode and route-scoped theming
│   │   │   ├── CustomCursor.tsx              # Custom cursor (desktop only)
│   │   │   ├── PageTransition.tsx            # Per-page transition component
│   │   │   ├── LoadingSkeleton.tsx           # Skeleton states for dynamic imports
│   │   │   ├── Logo.tsx                      # Site logo
│   │   │   ├── AnalyticsLink.tsx             # Link wrapper with CTA event tracking
│   │   │   └── DebugFpsCounter.tsx           # Dev FPS overlay
│   │   ├── about/              # /about: timeline and principles
│   │   ├── contact/            # /contact: Calendly embed and contact cards
│   │   ├── create/             # /create: main portfolio page
│   │   ├── services/           # /services: services and booking process
│   │   ├── tech/               # /tech: redirects to /create
│   │   ├── globals.css         # Global styles, CSS custom properties, Tailwind theme
│   │   ├── layout.tsx          # Root layout (ThemeProvider, nav, cursor, Analytics)
│   │   └── page.tsx            # Homepage
│   ├── data/
│   │   └── projects.ts         # Legacy file. Project interface is unused by the live site
│   ├── hooks/
│   │   ├── usePerformanceMode.ts       # Device tier detection (low / medium / high)
│   │   ├── useFPS.ts                   # Real-time FPS monitoring
│   │   ├── useSceneVisibility.ts       # IntersectionObserver, pauses 3D when off-screen
│   │   ├── useDemandDrivenAnimation.ts # Pauses RAF loops when tab is hidden or not visible
│   │   └── useAdaptiveShaderQuality.ts # Drops shader resolution when FPS falls
│   └── lib/
│       ├── utils.ts            # cn() helper (clsx + tailwind-merge)
│       ├── analytics.ts        # trackCta() wrapper around Vercel Analytics
│       └── performance.ts      # Device capability detection
├── .gitattributes              # Git LFS tracking rules (jpg, jpeg, png)
├── next.config.mjs             # Next.js config: image formats, R2 remote pattern, analyser
├── postcss.config.mjs          # PostCSS with Tailwind CSS 4
└── tsconfig.json               # TypeScript strict mode, path alias @/*
```

---

## Architecture

### Layout hierarchy

`RootLayout` (`src/app/layout.tsx`) wraps every page:

```
RootLayout
└── ThemeProvider         (dark mode; forces dark on /create)
    └── AnimationWrapper  (page transitions)
        ├── Navbar        (mobile)
        ├── FloatingDock  (desktop, with magnification effect)
        ├── CustomCursor  (desktop only)
        └── {page content}
        └── Vercel Analytics
```

### 3D graphics

Both shader scenes are dynamically imported with `ssr: false` since Three.js requires a browser context.

- **`HeroInkShaderScene`**: ink wash effect on the homepage hero. Particle count and quality scale with device tier via `usePerformanceMode`.
- **`CreativeBokehShaderScene`**: bokeh depth-of-field effect behind the `/create` hero, with mouse-parallax and scroll-parallax applied via a `useHeroParallax` hook defined inline on the page.

`useAdaptiveShaderQuality` monitors FPS via `useFPS` and reduces shader resolution when frame rate drops. `useSceneVisibility` uses `IntersectionObserver` to suspend WebGL rendering when a scene scrolls out of view. `useDemandDrivenAnimation` pauses RAF loops when the browser tab is hidden.

### Theming

The `/create` route forces `dark` mode via `ThemeProvider` and applies its own colour palette through scoped CSS custom properties in `globals.css` (`.theme-creative`), keeping it visually separate from the rest of the site.

### Booking flow

`/contact` accepts a `?service=<slug>#calendly` URL parameter. Links from `/services` and CTA buttons pass the selected service through, which pre-selects it in the contact page's service chips and threads it into the Calendly embed URL as a UTM parameter.

### Image and media pipeline

- **Local images** in `public/images/` are served via `next/image` with AVIF/WebP fallback and a 1-year cache via `minimumCacheTTL`.
- **Video files and thumbnails** are hosted on Cloudflare R2 and rendered with plain `<img>` tags (not `next/image`) to bypass Vercel's optimisation pipeline for remote assets.
- **Git LFS** tracks all `.jpg`, `.jpeg`, `.png` files to keep clone size manageable.

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- **Git LFS** (required to pull portfolio images)

```bash
# macOS
brew install git-lfs
git lfs install
```

### 1. Clone

```bash
git clone https://github.com/Nas7702/nas-portfolio.git
cd nas-portfolio
```

Git LFS pulls image files automatically on clone if LFS is installed.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack hot reload. No `.env` file is needed. There are no required environment variables for local development.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server with Turbopack (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check (`tsc --noEmit`) |
| `npm run analyze` | Webpack bundle visualiser (`ANALYZE=true`) |

---

## Environment Variables

No environment variables are required. The only build-time flag is:

| Variable | Description | Default |
|---|---|---|
| `ANALYZE` | Enable Webpack bundle analyser | `false` |

```bash
ANALYZE=true npm run build
```

---

## CI/CD

GitHub Actions runs on every push to `main` or `develop`, and on pull requests targeting `main`.

**Pipeline** (`.github/workflows/ci.yml`):

1. Checkout and Node.js 20 setup with npm cache
2. `npm ci`
3. `npm run lint`
4. `npm run build`
5. `npm run type-check`

Vercel deploys automatically. `main` goes to production; any other branch gets a preview URL.

---

## Deployment

Hosted on **Vercel** via Git integration.

### Initial setup (one-time)

1. Import the repository at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. No environment variables needed
4. Deploy

### Ongoing deployments

| Event | Result |
|---|---|
| Push to `main` | Production deployment |
| Push to any branch | Preview deployment |
| Pull request opened | Preview deployment linked in PR |

---

## Notes

**`src/data/projects.ts` is legacy.** The file and `Project` interface still exist but the data inside (software and data science projects) is no longer used anywhere on the site. The `/tech` route redirects to `/create`.

**Scoped theming.** The `/create` route forces dark mode and uses its own `.theme-creative` CSS scope with distinct custom properties, keeping it visually separate from the rest of the site.

**Image protection.** Portfolio images have multi-layer protections: right-click disabled, drag prevention, keyboard shortcut blocking. Applied inside `LightboxGallery` and across the creative section.

**Adding portfolio work.** All video and photo items are defined in `src/app/create/page.tsx` as the `portfolioItems` array. Add a new entry there following the `PortfolioItem` type. Place local images in `public/images/`; video files and thumbnails go on Cloudflare R2.

**Adding testimonials.** Testimonials are hardcoded in `src/app/components/Testimonials.tsx`. Follow the `Testimonial` type. The carousel auto-rotates every 6 seconds.

**Git LFS.** New images commit normally and LFS handles tracking automatically. Verify tracked files with `git lfs ls-files`.

---

## Licence

Open source for reference. You're welcome to study the code, but please don't copy the design or brand for your own site.

---

## Contact

- **Site:** [nascreate.com](https://nascreate.com)
- **WhatsApp:** +44 7475 437833
- **Email:** nascreate0@gmail.com
- **Instagram:** [@nas.create](https://instagram.com/nas.create)
