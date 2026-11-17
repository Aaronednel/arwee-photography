# ARWEE Photography & Films — Website

React + TypeScript + Vite + Tailwind CSS v4 + Motion + React Hook Form/Zod.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Updating content (no component edits needed)

| What | File |
|---|---|
| Brand, hero, about, **contact info & social links** | `src/data/siteConfig.ts` |
| Services | `src/data/services.ts` |
| Portfolio photos & videos | `src/data/portfolio.ts` |
| **Packages, prices, inclusions** | `src/data/packages.ts` (set `isPlaceholder: false` when real) |
| Testimonials | `src/data/testimonials.ts` (set `isSample: false` when real) |
| Why Choose Us | `src/data/whyChooseUs.ts` |

### Replacing images / videos
Drop files into `public/images/<folder>/` or `public/videos/<folder>/` and reference them with
`"/images/weddings/photo.jpg"` or `"/videos/highlights/clip.mp4"`. Current placeholders are remote stock photos
(see `src/data/images.ts`); a missing/broken image shows a neutral fallback and never breaks layout.
Videos: add an item with `type: 'video'`, `src` (thumbnail) and `videoSrc`. A hero video can be set via `hero.video`.
Logo file: set `brand.logoImage`. Favicon: `public/favicon.svg`. Social preview: `public/images/hero/og-image.jpg`.

## Inquiry backend

Code: `src/utils/inquiry.ts` (`submitInquiry`). The form only shows success after a real, successful request. With nothing configured it
tells the visitor the inquiry was **not** sent.

Copy `.env.example` → `.env` and set **one** of:

**Supabase** — run in the SQL editor:
```sql
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null, email text not null, phone text not null,
  event_type text not null, event_date date not null, location text not null,
  preferred_package text, message text, status text default 'new'
);
alter table public.inquiries enable row level security;
create policy "anyone can submit" on public.inquiries for insert to anon with check (true);
-- No select policy for anon: only you (authenticated admin) can read inquiries.
```
Then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. A future admin page can read rows with an authenticated policy.

**Generic endpoint** — `VITE_INQUIRY_ENDPOINT` receives a JSON POST (Formspree / Web3Forms / your API).

### Before going live
- Add server-side spam protection (Cloudflare Turnstile / rate limiting via an Edge Function). A honeypot field is already included.
- Never put service-role/secret keys in `VITE_*` variables.
- Set the canonical URL and `og:image` in `index.html`.
