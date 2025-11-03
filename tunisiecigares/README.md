# Cigar Lounge Tunisia

Elegant, premium, mobile-first catalog for a cigar boutique. Built with Vite + React + Tailwind CSS.

## Scripts

- `npm install`
- `npm run dev` (http://localhost:5173)
- `npm run build`
- `npm run preview`

## Tech

- React 18 + Vite
- Tailwind CSS (JIT enabled)
- React Router v6

## Structure

- `src/components` — Header, Footer, Hero, ProductCard, ProductGrid, ProductDetail, Modal, MessengerButton, Toast
- `src/pages` — Home (`/`), Products (`/products`), Product (`/product/:id`), Contact (`/contact`)
- `src/data/products.js` — sample catalog (8 items)
- `src/styles/globals.css` — Tailwind layers, fonts, global tokens

## Messenger link

All Messenger actions open in a new tab. Update the ID here:

- `src/components/MessengerButton.jsx` (constant `MESSENGER_URL`)
- `src/components/ProductCard.jsx` (order button)
- `src/components/ProductDetail.jsx` (order button)
- `src/pages/Contact.jsx` (CTA link)

Set your Page ID or a username URL, e.g. `https://m.me/yourpageid`.

## Images

Currently using Unsplash placeholders. Replace with real product images by editing `images` arrays in `src/data/products.js`.

## Accessibility

- High-contrast palette: ebony (#0B0B0B), cocoa (#3B2F2F), gold (#C9A14A), white
- Focus-visible outlines and ARIA labels on interactive elements

## Deployment

### Vercel

- `vercel.json` is included for SPA routing.
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

- Build: `npm run build`
- Publish directory: `dist`
- Redirects: Add `_redirects` with `/* /index.html 200` (optional; not included by default)

## Customization

- Fonts: `index.html` loads Playfair Display (titles) and Inter/Open Sans (body). Adjust in `tailwind.config.js` under `fontFamily`.
- Colors: `tailwind.config.js` (`ebony`, `cocoa`, `gold`).

## Notes

- No online payment — orders are via Messenger only.
- Footer disclaimer: “Sales reserved for adults — enjoy responsibly.”


