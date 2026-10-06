# Rise In — Website Redesign Prototype

A high-fidelity, clickable **frontend prototype** of a redesigned [risein.com](https://www.risein.com/).
It is a visual, content and UX blueprint for the product/tech team. It is **not** the production site: there is no backend, auth, CMS, real search or real submissions, and all data is static.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static build in dist/ (any static host, works under a sub-path)
npm run preview    # serve the build locally
```

Press **⌘K / Ctrl K** (or `/`) anywhere to search. The **Prototype notes** button (bottom left) explains the intent, design decisions and content sources behind each page.

## Click paths

| Journey | Route |
|---|---|
| Home → Opportunities → Opportunity detail | `/` → `/opportunities` → `/opportunities/monad-metropolis-hackathon` |
| Home → Programs → Program detail | `/` → `/programs` → `/programs/rust-bootcamp` |
| Home → For Ecosystems → Case study | `/` → `/ecosystems` → `/case-studies/stellar` |
| Home → Community | `/` → `/community` (`#ambassadors`) |
| Home → Insights → Article | `/` → `/blog` → `/blog/first-stacks-hacker-house-in-india` |

The prototype uses a `HashRouter` (`/#/opportunities`) so it runs on any static host with no configuration. Production should use clean URLs.

## Proposed information architecture

```
Discover        All opportunities · Hackathons · Bounties · Grants · Jobs · Events
Learn           All programs · Courses · Bootcamps · Guides
Community       Community & ambassadors · Ambassador program · Builder stories · Insights
Insights        (editorial hub)
For Ecosystems  Partner with Rise In · Developer programs · Host a hackathon · Case studies
```

- **"Build" is merged into Discover and Learn.** On today's site, "build" content is hackathons/challenges and bootcamps/programs, so a separate menu would duplicate entries.
- **For Ecosystems sits on the right, visually distinct.** It is the B2B path, separate from the developer menus.
- **Ecosystem landing pages become filtered views of one board.** Pages like `/monad`, `/stellar` and `/midnight` map to `/opportunities?eco=monad`, and the header adapts ("Build on Monad.").
- **Filters live in the URL,** so menu items deep-link straight into filtered views.

## What's in the prototype

| Area | Highlights |
|---|---|
| Global | Mega-menu nav with featured cards. Full-screen mobile menu with a builder/ecosystem split. ⌘K search across opportunities, programs, articles, ecosystems and pages. Footer. |
| Home | Hero built on the existing tagline. Developer/ecosystem split. Animated verified metrics. "Everything you need to rise" bento. Featured opportunities with a live countdown. Programs. Proof section with case-study metrics and a partner quote. Ecosystem CTA. |
| Opportunities | Search, type tabs with counts, mode/status/ecosystem filters, sort, grid/list toggle, animated filtering, empty state, and a mobile bottom-sheet filter drawer. |
| Opportunity detail | Fact cards, scroll-spy section tabs, tracks, rewards table, timeline stepper, FAQ accordion, sticky apply rail (desktop) / sticky bar (mobile), and a prototype apply flow. |
| Programs / detail | Learning path, filters, and a full program template: who it's for, curriculum accordion, timeline, mentors, outcomes, FAQ. |
| For Ecosystems | Interactive Reach → Activate → Educate → Build → Fund → Retain lifecycle. Six program models with proof points. Host-a-hackathon platform and pricing. Case studies. Partner form (prototype). |
| Case study | Reusable metric-first template (challenge → approach → milestones → quote → sources). Stellar, Aptos India and Stacks Goa. |
| Community | What members do, ambassador tracks, perks, regions, growth tiers, stories. |
| Insights / article | Featured story, category tabs, reading-width article with progress bar, related posts. |

## Design system

Built from the **Rise In Brand Book & Guidelines**:

- **Colours** (`tailwind.config.js`): violet `#8427FD`, magenta `#CC45FF`, lime `#B4FF24`, teal `#41DABE`, periwinkle `#9D99FF`, blue `#5672FF`. Backgrounds `#F5F7FF` / `#F9F5FF` / `#F1FFE6`. Text `#020202` / `#4A3A52` / `#6D617A`. The brand gradients are included.
- **Type:** the brand title font is **Grifter** (licensed). The prototype uses **Archivo Expanded** (open source, bundled) as a stand-in; swap in Grifter for production. Body text is **Inter**.
- **Brand elements** (`src/components/Brand.tsx`): four-point star, X grid, dot grid, the cover-page gradient tile **Mosaic**, blobs, hand-drawn squiggles and spirals, and generative **CoverArt** that stands in for event photography.
- **Logo** (`src/components/Logo.tsx`): redrawn from the brand book in full-colour and mono variants. Replace it with the official SVG for production.
- **Motion:** fast fades and reveals, staggered cards, count-ups, layout-animated filters and a live countdown. All of it respects `prefers-reduced-motion`.

## Content accuracy

The current site is the source of truth. **No statistics, partnerships, rewards, dates, names or testimonials were invented.**

- `www.risein.com` could not be crawled directly from the build environment (its network policy blocked the domain). Content was gathered from **search-indexed risein.com pages** (homepage, `/earn`, `/partner-with-us`, `/host-your-hackathon`, `/courses`, `/programs/*`, `/stellar-ambassadors`, `/reach-web3-developers-india`, `/blog/*` and ecosystem pages). **Re-verify every figure against the live site before launch.**
- Every metric keeps its source next to it in `src/data/site.ts`, and every opportunity, program, article and case study carries a `source` URL.
- Anything that could not be verified is rendered as a dashed **`[PLACEHOLDER]`**: dates, some rewards, job listings, mentor profiles, the third ambassador track, tier names, article bodies, the official logo wall and social links.
- The organiser dashboard on `/ecosystems#host` is explicitly labelled **"Sample data · illustrative"**.

## Code map

```
src/
  data/          static content (types, metrics, opportunities, programs, articles, case studies)
  components/    Brand elements, Logo, Nav, Search (⌘K), Footer, Cards, Detail blocks, UI primitives, PrototypeNotes
  pages/         Home, Opportunities, OpportunityDetail, Programs, ProgramDetail, Ecosystems, CaseStudy, Community, Blog, Article, NotFound
  lib/nav.ts     information architecture (single source for nav, mobile menu and footer)
```

Stack: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, lucide-react.
