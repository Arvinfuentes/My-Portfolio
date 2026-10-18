# Arvin Fuentes | Manga Portfolio

A personal portfolio styled as a black-and-white manga book. Each section is a "page" you turn with the nav bar, arrow keys, or a swipe. Built with React, Vite and Framer Motion, and served by unprivileged Nginx in Docker.

## Features

- **Animated intro:** comic panels fly in on every load, with a Skip button. It is shorter on phones and nearly instant with reduced motion.
- **Landing page:** letter-by-letter name animation, call-to-action buttons (See my work, Message me, Download CV), count-up stats, and a core-stack row with tool logos.
- **Page navigation:** Cover, Experience, Skills, Certs & Education, Projects, Contact. Each page has its own URL hash (for example `/#projects`), so links and the Back button work.
- **Projects:** hover a card on desktop, or tap "Tap to preview" on mobile, to reveal a screenshot. Cards link to the live sites where available.
- **Skills:** tool logos (from simple-icons) with pop-in and hover animations.
- **Contact:** one big "Message me" button that opens an email, plus Download CV, LinkedIn, and Copy email.
- **Accessibility:** skip link, `aria-live` page announcements, keyboard navigation, focus styles, `prefers-reduced-motion` support, and a `noscript` message.
- **Production setup:** strict CSP and security headers, gzip, long-lived caching for hashed assets, a health check, and CI.

## Tech stack

React 18, Vite 5, Framer Motion 11, plain CSS, ESLint and Prettier, Docker (multi-stage build), Nginx (unprivileged), GitHub Actions.

## Project structure

```
src/
  App.jsx            Pages, intro, navigation, project cards
  data.js            ALL site content (edit this first)
  icons.js           Tool logo paths (24x24, simple-icons, CC0)
  styles.css         All styling and animation
  assets/projects/   Project screenshots (see below)
public/
  Arvin-Fuentes-CV.pdf   The file behind "Download CV"
  favicon.svg, robots.txt
index.html           Title, meta tags, social preview tags, Person schema
Dockerfile, nginx.conf, security-headers.conf
docker-compose.yaml        For Dokploy
docker-compose.local.yml   For local production testing
.github/workflows/ci.yml   Lint, format check, build, Docker build
```

## Editing content

Almost everything lives in `src/data.js`:

| Export               | What it controls                                                                |
| -------------------- | ------------------------------------------------------------------------------- |
| `me`                 | Name, role, tagline, status, location, email, links, CV path, core-stack chips  |
| `stats`              | The three count-up numbers on the landing page                                  |
| `jobs`               | Experience entries (an item with `href` becomes a link)                         |
| `skills`             | Skills page groups. Names that match a key in `src/icons.js` get a logo         |
| `education`, `certs` | Certs & Education page                                                          |
| `projects`           | Project cards: `slug`, `title`, `desc`, `tags`, optional `href`, `cta`, `badge` |

To add a tool logo, add its 24x24 path to `src/icons.js` under the exact skill name. Tools without a logo show a short text mark.

## Adding project screenshots

Drop an image in `src/assets/projects/` named after the project's `slug`. It is picked up automatically, and the card then shows it on hover (desktop) or tap (mobile). Projects without an image show a halftone panel with the title instead.

| Project                      | File name                      |
| ---------------------------- | ------------------------------ |
| Bottle It Back               | `bottle-it-back`               |
| Automated Parking Management | `automated-parking-management` |
| AOY 2026 Website             | `aoy-2026-website`             |
| 4A's Philippines Website     | `4as-website`                  |
| Nissan Electrification 2026  | `nissan-electrification-2026`  |
| Products of Peace            | `products-of-peace`            |
| TBWA\SMP Website             | `tbwa-smp-website`             |
| ERP System                   | `erp-system`                   |
| Inventory Management System  | `inventory-management-system`  |

Use `.jpg`, `.png` or `.webp` (about 1200x700). Blur anything confidential. For a new project, add an entry to `projects` with a unique `slug`.

## Updating the CV

Replace `public/Arvin-Fuentes-CV.pdf` with your latest PDF, keeping the same file name. Before publishing, check it for typos and make sure it contains no private details you do not want public.

## Develop

Requires Node 20 or newer (`.nvmrc` is included).

```sh
nvm use && npm ci
npm run dev        # http://localhost:5173
npm run lint
npm run format:check
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

## Run the production image locally

```sh
docker compose -f docker-compose.local.yml up --build   # http://localhost:8080
```

## Deploy on Hostinger with Dokploy (Compose)

1. Push this folder to a Git repo.
2. Dokploy: Create Project > Create Service > Compose. Provider: Git, pick repo and branch, Compose Path `./docker-compose.yaml`.
3. Domains tab: Service `web`, Port `8080`, your domain, HTTPS on (Let's Encrypt).
4. Point your domain's A record to the VPS IP, then Deploy.

Prefer a plain Application? Choose Build Type: Dockerfile, container port 8080. If the domain does not route, check that the service is on `dokploy-network`.

## Security notes

`security-headers.conf` sets a strict Content-Security-Policy: scripts and images must come from the site itself, and only Google Fonts is allowed externally. If you add an analytics script, remote images, or embeds, update the CSP there or the browser will block them.

## Before going live checklist

- [ ] Add project screenshots to `src/assets/projects/`
- [ ] Confirm the Bottle It Back badge wording matches the exact award level
- [ ] Replace the CV and check it for typos
- [ ] Add a GitHub link to `me.links` in `src/data.js`
- [ ] Set your real domain in `index.html` (add `og:url`, `og:image`) once it is live