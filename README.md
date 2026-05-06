# subtleoptions-site

Client-side **single-page app** (Vite + history API) for the solar-system / cyber-HUD experience. Pages are **rendered in the browser** from `src/routes.js`; only the **deployed artifacts** in `dist/` are static files (typical for GitHub Pages + a custom domain).

## Commands

```bash
npm install      # once
npm run dev      # local dev server with SPA fallback
npm run build    # emits dist/ — publish this folder to GitHub Pages
npm run preview  # serve dist/ locally
```

## GitHub Pages

- Publish the contents of **`dist/`** (or point Actions to build and upload `dist`).
- **`public/404.html`** stashes the requested path in `sessionStorage` and reloads `/` so deep links like `/contact` recover after GitHub Pages would otherwise 404.
- Legacy bookmarks to **`about.html`**, **`contact.html`**, etc. use tiny stubs in **`public/`** that forward into the SPA.
- **`public/CNAME`** is copied into `dist/` for `www.subtleoptions.com`.

## Stack notes

The **contact form** still POSTs across the browser to your existing Cloudflare Worker URL (same as before). Neptune (`/internal`) still hands off to the external Access subdomain with a programmatic redirect after the SPA paints.
