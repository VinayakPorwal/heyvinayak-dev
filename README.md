# heyvinayak-dev

Portfolio site for **Vinayak Porwal**, freelance full-stack web developer, at [heyvinayak.dev](https://heyvinayak.dev).

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion. Deploys to Vercel without any setup.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node 20+.

## Editing content: `data.ts`

Everything the site says comes from **`data.ts`** in the project root. You never need to touch the components to change the copy.

| Export | What it controls |
| --- | --- |
| `site` | Site URL and the **Book a call** link (`bookCallLink`). If it's empty, the button opens an email instead. |
| `sections` | Feature flags that show or hide sections (see below) |
| `profile` | Name, headline, about text, location, photo, resume link |
| `contacts` | Email, socials, contact section title and subtitle |
| `budgets` | Options in the contact form's budget dropdown |
| `services` | The four service rows (icon, benefit, what you get, preview image) |
| `work` | Client case studies |
| `experience` | Job timeline |
| `process` | The four process steps and their photos |
| `projects` | Side projects (hidden by default) |
| `skills` | Tech stack groups |
| `testimonials` | Client quotes. The section stays hidden while this array is empty. |

### TODOs
Search `data.ts` for `TODO`. Any work `result` or experience `impact` that starts with `TODO` is **hidden on the site automatically**, so no placeholder text ever shows. Replace them with real outcomes when you have them.

### Images
- Client screenshots live in `public/work/` and are referenced from `work[].image`.
- Your portrait is `public/vinayak.jpg` (square, hero) and `public/vinayak-wide.jpg` (About).

## Toggling sections

In `data.ts`:

```ts
export const sections = { work: true, experience: true, projects: false, testimonials: false };
```

Set a flag to `true` or `false` to show or hide that section. The nav links update themselves. The Testimonials section also needs at least one entry in `testimonials`.

## Contact form

The form posts to `app/api/contact/route.ts`. That route validates the input and checks a honeypot field to catch spam.

- **No setup:** messages are only logged to the server console. That's fine for testing, but on Vercel you'd have to read them in the function logs.
- **Formspree (recommended):** create a form at [formspree.io](https://formspree.io), then add `FORMSPREE_ID=<your form id>` to your environment variables (Vercel → Project → Settings → Environment Variables).

## Project structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD Person schema, theme provider
  page.tsx              renders sections based on the flags in data.ts
  opengraph-image.tsx   generated social preview image
  sitemap.ts, robots.ts, icon.svg
  api/contact/route.ts  contact form endpoint
components/
  sections/             Navbar, Hero, Services, Work, Experience, Process,
                        ProofStrip, TechStack, Projects, About, Testimonials, Contact, Footer
  ui/                   Section, CaseStudyCard, BentoCard, BrowserFrame, UnderTheHood,
                        Marquee, Badge, Button, Spotlight, Reveal, ThemeToggle, Providers
lib/links.ts            nav links, socials, Book-a-call link, TODO helper
data.ts                 all content
```

`<UnderTheHood />` is the collapsed panel for developers. Work, experience and project items use it to show stack and technical highlights.

## Design notes

- Dark-first (`#0A0A0A`) with a light mode. One accent: electric lime `#C6F432`. Tokens live in `app/globals.css`.
- Geist for UI, Geist Mono for technical details, Instrument Serif italic for one accent word per headline. The hero's word is set by `profile.headlineAccent` in `data.ts`.
- Grain overlay, a soft radial glow behind the hero, rounded-2xl cards with 1px borders.
- Motion uses Framer Motion and Lenis smooth scroll, and all of it turns off under `prefers-reduced-motion`.
- Reusable UI lives in `components/ui/`: `Section`, `CaseStudyCard`, `BentoCard`, `BrowserFrame`, `UnderTheHood`, `Marquee`, `Badge`/`Pill`, `Button` (magnetic), `Spotlight`.

## Deploy

Push to GitHub, import the repo in Vercel, then add the `heyvinayak.dev` domain. No build settings are needed.
