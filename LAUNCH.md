# Andromera Pre-Launch Checklist

**Site Status**: Production Ready  
**Target Domain**: `https://andromera.com/`  
**Worker Preview**: `https://andromera-web.ahmedalseify33.workers.dev/`

---

## 1. Content & Brand Integrity Code Audit

- [x] **Prices & Currency**: 0 prices, currency symbols (`$`, `EGP`), or "starting from" language in codebase.
- [x] **AI Vendors & Models**: 0 tool, model, or vendor names in source. Capability language only.
- [x] **ORM Removal**: 0 instances of ORM or Online Reputation Management.
- [x] **Social Proof Integrity**: 0 manufactured client logos, testimonials, star ratings, or percentage claims.
- [x] **Team Anonymity**: 0 team member names, photos, ages, or personal biographies.
- [x] **Placeholder Cleanliness**: 0 `lorem`, `TODO`, `FIXME`, or leftover scratch comments in source.
- [ ] **Contact Email**: Pending official address receipt. `<!-- COPY NEEDED: contact email -->` placeholder intact across 3 locations.

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
- [x] **Indexability Safety Net**: `_worker.js` enforces `X-Robots-Tag: noindex, nofollow` HTTP header on all non-production hostnames.

---

## 3. Experience & Accessibility Audit

- [x] **Keyboard Pass**: 100% of interactive controls (nav, disclosures, timeline, constellation buttons, audit form) focusable with visible teal focus rings.
- [x] **Reduced Motion**: Under `prefers-reduced-motion: reduce`, animations, word reveals, and timeline progress fill disable cleanly.
- [x] **No-JS Degradation**: Page remains fully readable; audit form falls back to direct WhatsApp link.
- [x] **Responsive Viewports**: Tested at 360px, 768px, 1000px, 1280px, and 1920px.
- [x] **Cross-Browser Verification**: Verified in Chrome, Safari, and Firefox.

---

## 4. Account-Level Pre-Launch Tasks (Cloudflare Dashboard)

- [ ] **Custom Domain Binding**:
  - In Cloudflare Dashboard → Workers & Pages → `andromera-web` → Settings → Triggers → Add Custom Domain:
    - Add `andromera.com`
    - Add `www.andromera.com`
- [ ] **Cloudflare Web Analytics Token**:
  - In Cloudflare Dashboard → Web Analytics → Add Site → Copy Token.
  - In `index.html` line ~977, replace `CLOUDFLARE_BEACON_TOKEN` with your token string.
- [ ] **DNS & Canonicalization**:
  - Verify `www.andromera.com` redirects to `andromera.com` in Cloudflare Redirect Rules.
