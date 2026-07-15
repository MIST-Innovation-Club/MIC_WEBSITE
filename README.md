# MIST Innovation Club — Website

## Files
- `index.html` — Home
- `events.html` — Events (ongoing, past, workshops)
- `gallery.html` — Gallery (year tabs + per-event carousels)
- `people.html` — People (presidential panel + executive members)
- `style.css` — shared styles, responsive breakpoints at 1024px (tablet) and 700px (mobile)
- `script.js` — mobile nav toggle, hero slider, dynamic footer calendar (auto-updates to current month/day), year-tab filtering, gallery carousels

## Adding your real images
All photos currently show as styled placeholder boxes so the site is ready to preview immediately. Drop your real files into the `assets/` folder using these exact names and they'll appear automatically:

- `assets/mic-logo.png` — navbar logo
- `assets/ideate.png`, `assets/innovate.png`, `assets/inspire.png` — About Us icons
- `assets/box_1.png` … `assets/box_4.png` — Our Activities icons

For gallery photos, member headshots, event banners, and workshop thumbnails: search each page for `<div class="placeholder-img">...</div>` and replace with `<img src="assets/your-photo.jpg" alt="...">`.

## Notes
- Login button is a visual placeholder (no auth wired up).
- Year tabs on Gallery/People are functional — clicking switches visible content; only 2025 has full content, other years are stubbed ("coming soon") for you to fill in.
- Footer calendar auto-generates the current month and highlights today's date — no manual updates needed.
- Fully responsive: desktop, tablet (≤1024px), and mobile (≤700px), including a slide-in mobile nav menu.
