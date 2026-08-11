# Andromera Pre-Launch Checklist

**Site Status**: Production Ready  
**Target Domain**: `https://andromera.com/`  
**Worker Preview**: `https://andromera-web.ahmedalseify33.workers.dev/` (workers.dev route disabled — returns 404)

---

## 1. Content & Brand Integrity Code Audit

- [x] **Prices & Currency**: 0 prices, currency symbols (`$`, `EGP`), or "starting from" language in codebase.
- [x] **AI Vendors & Models**: 0 tool, model, or vendor names in source. Capability language only.
- [x] **ORM Removal**: 0 instances of ORM or Online Reputation Management.
- [x] **Social Proof Integrity**: 0 manufactured client logos, testimonials, star ratings, or percentage claims.
- [x] **Team Anonymity**: 0 team member names, photos, ages, or personal biographies.
- [x] **Placeholder Cleanliness**: 0 `lorem`, `TODO`, `FIXME`, or leftover scratch comments in source.
- [x] **Contact Email**: Settled — no contact email on this site. All placeholders removed. Contact channels: WhatsApp, Instagram, Cairo.

---

## 2. Technical & Performance Audit

- [x] **Internal Navigation Anchors**: `#services`, `#services-01` through `#services-08`, `#method`, `#work`, `#about`, `#audit` verified.
- [x] **Asset Health**: 0 404 network errors; 0 console errors or warnings.
- [x] **SEO Files**: `sitemap.xml` and `robots.txt` present and pointing at `https://andromera.com/`.
- [x] **Structured Data**: JSON-LD `Organization` + `ProfessionalService` + `hasOfferCatalog` rich results valid.
- [x] **Social Sharing Metadata**: OpenGraph (`og:image`, `og:url`) and Twitter cards validated.
- [x] **Icons & Manifest**: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest` valid.
- [x] **Error Page**: `404.html` is brand-styled and links home.
- [x] **HTTP Security Headers**: `CSP`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and immutable cache headers configured.
- [x] **Indexability Safety Net**: workers.dev route disabled on `andromera-web` — the preview URL returns 404 instead of serving indexable content, so canonical tags on `andromera.com` are the only live copy.

---

## 3. Experience & Accessibility Audit

- [x] **Keyboard Pass**: 100% of interactive controls (nav, disclosures, timeline, constellation buttons, audit form) focusable with visible teal focus rings.
- [x] **Reduced Motion**: Under `prefers-reduced-motion: reduce`, animations, word reveals, and timeline progress fill disable cleanly.
- [x] **No-JS Degradation**: Page remains fully readable; audit form falls back to direct WhatsApp link.
- [x] **Responsive Viewports**: Tested at 360px, 768px, 1000px, 1280px, and 1920px.
- [x] **Cross-Browser Verification**: Verified in Chrome, Safari, and Firefox.

---

## 4. Account-Level Pre-Launch Tasks (Cloudflare Dashboard)

- [x] **Custom Domain Binding**: `andromera.com` and `www.andromera.com` attached as Custom Domains on the `andromera-web` Worker (2026-08-11). Both serve over Cloudflare-managed certs.
- [x] **Disable workers.dev Route (Indexability Safety Net)**: Disabled 2026-08-11 — `andromera-web.ahmedalseify33.workers.dev` returns 404 and no longer serves site content.
- [ ] **Cloudflare Web Analytics Token**:
  - Beacon script is **commented out** in `index.html` (near line 976). No placeholder token ships live.
  - To enable: In Cloudflare Dashboard → Web Analytics → Add Site → Copy Token → uncomment the beacon script in `index.html` and replace `YOUR_TOKEN_HERE`.
- [x] **DNS & Canonicalization**: `www.andromera.com` → `https://andromera.com` handled by a zone-level Redirect Rule (`http_request_dynamic_redirect` phase, rule "www to apex"), 301, query string preserved. Verified via curl 2026-08-11.

