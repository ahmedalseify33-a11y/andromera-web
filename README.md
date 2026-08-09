# Andromera — Marketing Website

AI-native growth partner for Egyptian fashion and personal-care brands.

## Stack

- Plain HTML5 + hand-written CSS + vanilla JS
- Zero build step
- Deploys to Cloudflare Pages as static files

## Local Development

```bash
# Serve locally
cd /path/to/andromera-web
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## Deployment

### Step 1: Push to GitHub

```bash
git remote add origin git@github.com:YOUR_USERNAME/andromera-web.git
git push -u origin main
```

### Step 2: Connect Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project
2. Connect your GitHub account and select the `andromera-web` repository
3. Configure build settings:
   - **Framework preset:** None
   - **Build command:** _(leave empty)_
   - **Build output directory:** `/`
4. Deploy

### Step 3: Custom Domain

#### Option A (Recommended): Move nameservers to Cloudflare

1. In Cloudflare Dashboard → Add Site → `andromera.com`
2. Cloudflare will provide two nameservers
3. Go to Hostinger → Domain Settings → change nameservers to the two Cloudflare provided
4. Wait for propagation (up to 24h, usually under 1h)
5. In Cloudflare Pages → Custom domains → Add `andromera.com` and `www.andromera.com`
6. Cloudflare handles SSL, CDN, analytics, and redirect rules automatically
7. The `_redirects` file canonicalises `www.andromera.com → andromera.com` (301)

**Benefits:** Full CDN, free SSL, analytics, redirect rules, native apex domain support (CNAME flattening), DDoS protection.

#### Option B: Keep Hostinger DNS

1. In Cloudflare Pages → Custom domains → Add `www.andromera.com`
2. Cloudflare will issue a CNAME target (e.g. `andromera-web.pages.dev`)
3. In Hostinger DNS → Add a CNAME record: `www` → the Cloudflare Pages CNAME target
4. For the apex `andromera.com`:
   - If Hostinger supports ALIAS/ANAME records, point the apex to the same target
   - Otherwise, set up a redirect from `andromera.com → www.andromera.com` in Hostinger
5. SSL: Cloudflare Pages provides its own certificate for the custom domain

**Drawback:** No CNAME flattening at apex, potential redirect chain, no Cloudflare analytics/WAF.

### Step 4: Verify

```bash
# Check HTTPS
curl -I https://andromera.com/

# Check www redirect
curl -I https://www.andromera.com/
```

## Project Structure

```
/
├── index.html              # Main page
├── 404.html                # Error page
├── robots.txt              # Crawl directives
├── sitemap.xml             # Sitemap
├── site.webmanifest        # PWA manifest
├── _headers                # Cloudflare security headers
├── _redirects              # Cloudflare redirect rules
├── AGENTS.md               # Design skill governance
├── README.md               # This file
└── assets/
    ├── css/
    │   ├── brand-tokens.css  # Design tokens (single source of truth)
    │   └── site.css          # All styles (@layer architecture)
    ├── js/
    │   └── site.js           # Nav, menu, reveals, WhatsApp float
    ├── fonts/                # Self-hosted woff2 (Latin subset)
    ├── img/                  # SVGs, PNGs, posters, OG image
    └── video/                # Reserved for Phase 4
```

## Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Foundation, tokens, nav, hero, footer | ✅ Complete |
| 2 | Services — 8 pillars | Planned |
| 3 | Method + engagement models | Planned |
| 4 | Team constellation + brand story + audit form | Planned |
| 5 | Case studies, analytics, final perf pass | Planned |
