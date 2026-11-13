# beHidden.com — Static Website

A clean, zero-dependency static concierge website for **beHidden.com**, offering personal and business intermediary services for private purchases, package receiving & reshipping, subscriptions, electronic goods, and custom tailored requests.

## Project Structure

- `index.html` — Main website featuring the `bH` logo mark, services overview, interactive *For Individuals / For Businesses* step-by-step guide, real-world examples, plain-English FAQ, and a straightforward request form.
- `styles.css` — Responsive styling pairing deep obsidian, dark crimson security accents, and warm stone sections.
- `script.js` — Vanilla JavaScript for the Personal/Business toggle, FAQ accordion, email copy button, and request form handler.
- `favicon.svg` — Bold `bH` monogram badge icon.

## Local Preview

Open `index.html` directly in any browser, or run a local static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deployment (`beHidden.com`)

Deploy the folder directly to Cloudflare Pages, Netlify, Vercel, GitHub Pages, or S3 + CloudFront and point your `behidden.com` DNS records to the host.
