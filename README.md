# Andromera Website — Maintenance & Operational Guide

Welcome to the codebase for **Andromera** (https://andromera.com/). This website is built using pure HTML5, vanilla CSS, and minimal JavaScript — with zero framework, zero build step, and zero external dependencies.

---

## 1. How to Change Text or Copy
All page text lives in `index.html`.

1. Open `index.html` in any code editor (VS Code, TextEdit, etc.).
2. Use `Cmd + F` (Mac) or `Ctrl + F` (Windows) to search for the sentence or headline you want to update.
3. Edit the text between the HTML tags.
4. Save the file.
5. Push to GitHub (`git commit` and `git push`), and Cloudflare will deploy the changes live automatically within 10–15 seconds.

---

## 2. Where Colors & Fonts Are Defined (How to Edit Safely)
All color palette choices and design tokens live in **`assets/css/brand-tokens.css`**.

### Changing Colors
- `--ink` (`#0D1B2A`): Background color for primary sections.
- `--indigo` (`#1B2A4A`): Background color for cards, Callout boxes, and Method section.
- `--paper` (`#F5F0EB`): Primary text color.
- `--glow` (`#00D4AA`): Teal interaction color. **Teal owns 100% of interactive states** (buttons, links, hover rings, active indicators).
- `--warn` (`#F0B429`): Form validation amber color.

> ⚠️ **The Violet Rule**: `--violet`, `--violet-light`, and `--violet-deep` are reserved strictly for ambient background glow gradients (planet blooms). **Never** use violet for text, buttons, borders, icons, or links.

### Fonts
Fonts are self-hosted in `assets/fonts/` as subsetted `.woff2` files:
- `CormorantGaramond-SemiBold.woff2` (Display Headlines)
- `DMMono-Regular.woff2` (Body, Labels, Code, Numbers)
- `DMMono-Medium.woff2` (Navigation, Buttons, Badges)

Font definitions live at the top of `assets/css/site.css`. Do not load Google Fonts or CDN fonts.

---

## 3. How to Add a Service Row
To add a ninth service row in section `#services` (`index.html`), copy and paste this exact markup inside `<div class="services__list">`:

```html
<!-- 09 -->
<details class="service-row fade-up" id="services-09">
  <summary class="service-row__summary">
    <span class="service-row__number">09</span>
    <div class="service-row__header-group">
      <h3 class="service-row__name">Service Name Here</h3>
      <span class="service-row__promise">One-line promise statement goes here.</span>
    </div>
    <span class="service-row__toggle" aria-hidden="true">+</span>
  </summary>
  <div class="service-row__body">
    <ul class="service-row__capabilities">
      <li class="service-row__capability">First capability item</li>
      <li class="service-row__capability">Second capability item</li>
      <li class="service-row__capability">Third capability item</li>
    </ul>
  </div>
</details>
```

Also add the link to the Footer services column:
```html
<a href="#services-09" class="footer__link">Service Name</a>
```

---

## 4. Deployment, Rollback, & Health Checking

### Deployment
Deployment is 100% automatic via Git:
```bash
git add .
git commit -m "Describe your changes"
git push origin main
```
Cloudflare Workers receives the commit and deploys it live in 10–15 seconds.

### Checking Deployment Success
Run `curl -I https://andromera.com/` in your terminal. You should see `HTTP/2 200` and response security headers.

### Rolling Back
If a mistake is published, revert the commit in Git:
```bash
git revert HEAD
git push origin main
```

---

## 5. Governed Rules (Non-Negotiable)

1. **No Prices or Rates**: Never publish prices, currency symbols (`$`, `EGP`, `£`), retainer minimums, hourly rates, or "starting from" language.
2. **No Commercial AI Vendor Names**: Never publish AI vendor, model, or tool names. Capability language only (*"AI-native growth engine"*, *"aligned AI"*).
3. **No Fabricated Proof**: Never publish manufactured client counts, logos, fake reviews, star ratings, or result percentages.
4. **Teal vs. Violet**: Violet is atmosphere only. Teal owns 100% of interaction.

---

## 6. Performance Budget
- **Initial Load Page Weight**: ≤ 180 KB
- **Uncompressed JS Size**: ≤ 16 KB
- **Lighthouse Mobile Target**: ≥ 95 across all 4 categories (Performance, Accessibility, Best Practices, SEO).

To run a Lighthouse test:
```bash
npx -y lighthouse https://andromera.com/ --form-factor=mobile
```
