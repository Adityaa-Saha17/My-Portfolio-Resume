# Adityaa Saha — portfolio

React + TypeScript + Vite, styled with Tailwind CSS v4. Animated pieces come from [React Bits](https://reactbits.dev) (copied into `src/components/reactbits/`), plus three.js, Motion and GSAP.

## Run it (macOS)

Needs Node.js 22 (or 20.19+). `brew install node` if you don't have it.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

## Edit the content

Everything the site says lives in **`src/data/content.ts`**: intro, internship, projects, education, skills and links. In bullet text, `**bold**` renders as emphasis and `` `code` `` renders in the mono face.

`Resume.pdf` stays at the repo root next to `resume.tex`. Recompile the PDF as usual and the site picks it up: it's served in dev and copied into every build.

The badge images (`src/assets/badge-*.webp`) and the social preview (`public/og.jpg`) are pre-rendered. If your photo or headline changes, those need regenerating.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `master`.

One-time setup: on GitHub, open the repo's **Settings → Pages** and set **Source** to **GitHub Actions**.

The site is then served at `https://adityaa-saha17.github.io/My-Portfolio/`. If you add a custom domain, update the `og:image` and `og:url` tags in `index.html` to match.

## Layout

```
src/
  data/content.ts            all copy and links
  components/sections/       Hero, About, Experience, Projects, Stack, Education, Contact
  components/visuals/        hand-made diagrams (DNS, LB, TCP, LSM, RISC-V pipeline, sparse matrix)
  components/reactbits/      React Bits components (MIT + Commons Clause, see LICENSE.md there)
  lib/                       smooth scroll, media queries, helpers
legacy/index.html            the previous hand-written single-page site
```

## Notes

- Heavy WebGL effects (Galaxy, Lanyard, Hyperspeed) only render while on screen and respect "Reduce motion".
- `<StrictMode>` is intentionally off: its dev-only double mount makes some WebGL components drop their context.
