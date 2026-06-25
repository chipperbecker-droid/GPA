# Gary Penrod & Associates website

A responsive, dependency-free static website for Gary Penrod & Associates, Inc. (GPA), an M&A advisory and consulting firm focused on the building services contractor industry.

## Project structure

- `index.html` — homepage
- `services/` — sell-side, buy-side, valuation, exit planning, and consulting services
- `about/` — firm background and credentials
- `gary-penrod/` — dedicated Gary Penrod profile with photo and bio
- `team/` — associates page with photos and biographies
- `philosophy/` — advisory principles and confidentiality approach
- `opportunities/` — confidential opportunity process and current public status
- `testimonials/` — public client comments in a testimonial grid
- `insights/` — long-form commentary plus working links to nine articles and ten newsletters
- `contact/` — direct phone, email, address, and directions contact
- `assets/` — shared stylesheet, minimal navigation script, logo, headshots, and original PDF resources
- `CONTENT_AUDIT.md` — page-by-page preservation decisions and final comparison checklist
- `GPA*.html` — legacy URL shims that forward old indexed pages to their modern equivalents
- `sitemap.xml`, `robots.txt`, `404.html` — search and hosting support files

## Run locally

No build step or package installation is required. Serve the project root with any static web server. For example:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

The pages now use portable relative asset and navigation paths, so `index.html` can also be opened directly for a quick visual preview. A local server is still recommended because it matches production routing more closely.

## Deploy

Upload the entire repository root to any static host, including GitHub Pages, Netlify, Vercel, Cloudflare Pages, or shared hosting. The public host should:

1. Point the domain to this directory.
2. Issue a valid TLS certificate for both the root domain and `www` hostname.
3. Keep the legacy `GPA*.html` files in place, or replace them with server-level `301` redirects to the same destinations.
4. Submit `https://www.garypenrodandassociates.com/sitemap.xml` in the relevant search-console account after launch.

## Content audit and assumptions

- The legacy public site was reviewed through search-index copies and direct read-only archival requests because its live TLS certificate was invalid during the rebuild.
- The phone number follows the supplied brief and the legacy opportunities page: `843-681-6588`. The older contact page showed different mobile and office numbers, so the preferred public number should still be confirmed before launch.
- The email address follows the supplied brief and indexed site: `gary@garypenrod.com`.
- The public address is listed as `200 Main St #201F, Hilton Head Island, SC 29926`.
- No unverified deal counts, client names, awards, current opportunities, or current transaction values were added.
- Claims about Gary Penrod's operator background, GPA's 1988 founding, publishing and speaking history, and former BSCAI leadership are based on the legacy pages.

## Required content follow-up

- Replace the opportunity status card only after GPA confirms which active assignments may be public and approves every displayed detail.
- Reconfirm permission for the legacy public testimonials and attribution before launch. Their wording has been lightly shortened for the new card layout without changing the meaning.
- Reconfirm whether all legacy article and newsletter files should remain public long term. All nineteen original files are currently preserved and linked.
- Confirm the primary phone number before launch if any older office/mobile numbers should also be shown.
- Confirm whether the published biographies for Michelle Sullivan Bettez, Michael Nix, and Christi Rohmer remain current; their substantive public experience is preserved without time-sensitive employment claims.

## Before / after

The previous site used dated static layouts, had a failing HTTPS configuration, and spread key information across older HTML pages and PDF archives. This rebuild introduces a cohesive premium design, responsive navigation, semantic page structure, keyboard focus states, readable typography, clearer conversion paths, unique metadata, structured data, a sitemap, and legacy URL redirects. Detailed service explanations, credentials, philosophy, public testimonials, nineteen original resources, Gary Penrod's long-form sale commentary, and the supplied team biographies are retained in a more readable structure. The historical 2021 opportunity archive has been removed from the public website.
