# Gary Penrod & Associates website

A responsive, dependency-free static website for Gary Penrod & Associates, Inc. (GPA), an M&A advisory and consulting firm focused on the building services contractor industry.

## Project structure

- `index.html` — homepage
- `services/` — sell-side, buy-side, valuation, exit planning, and consulting services
- `about/` — Gary Penrod background and credentials
- `philosophy/` — advisory principles and confidentiality approach
- `opportunities/` — confidential opportunity process and current status
- `testimonials/` — legacy public client comments, modernized into a testimonial grid
- `insights/` — modernized legacy article and preserved archive topics
- `contact/` — direct phone and email contact
- `assets/` — shared stylesheet, minimal navigation script, and SVG mark
- `GPA*.html` — legacy URL shims that forward old indexed pages to their modern equivalents
- `sitemap.xml`, `robots.txt`, `404.html` — search and hosting support files

## Run locally

No build step or package installation is required. Serve the project root with any static web server. For example:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

Opening files directly with `file://` is not recommended because the site uses root-relative links.

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
- Hilton Head Island, South Carolina is retained as the public business location. A street address is omitted because the brief did not confirm one.
- No unverified deal counts, client names, awards, current opportunities, or current transaction values were added.
- Claims about Gary Penrod's operator background, GPA's 1988 founding, publishing and speaking history, and former BSCAI leadership are based on the legacy pages.

## Required content follow-up

- Replace the opportunity status card only after GPA confirms which active assignments may be public and approves every displayed detail.
- Reconfirm permission for the legacy public testimonials and attribution before launch. Their wording has been lightly shortened for the new card layout without changing the meaning.
- Add legacy newsletter PDFs and article files only after the original documents are supplied and checked. Archive titles and dates are preserved without publishing broken links.
- Confirm the primary phone number and whether a complete mailing address should appear.
- Consider adding a social sharing image after brand artwork is approved. The site does not depend on one.
- Confirm whether legacy biographies for Michelle Sullivan Bettez, Michael Nix, and Christi Rohmer remain current before republishing them.

## Before / after

The previous site used dated static layouts, had a failing HTTPS configuration, and spread key information across older HTML pages. This rebuild introduces a cohesive premium design, responsive navigation, semantic page structure, keyboard focus states, readable typography, clearer conversion paths, unique metadata, structured data, a sitemap, and preserved legacy URLs. Copy has been reorganized around owner and buyer decisions while retaining the original firm history, services, philosophy, and industry-specific positioning.
