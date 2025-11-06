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

## Environment Variables

Create a `.env` file in the `tunisiecigares/` directory with the following variables:

### Required Variables

```bash
# Supabase Configuration
# Get these from your Supabase project settings: https://app.supabase.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# EmailJS Configuration
# Get these from your EmailJS account: https://www.emailjs.com
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your-public-key-here

# Admin Panel Password
# Set a secure password for accessing the admin orders page
VITE_ADMIN_PASSWORD=your-secure-password-here
```

### Optional Variables

```bash
# Admin Email (for order notifications)
# When set, admin will receive email notifications for new orders
VITE_ADMIN_EMAIL=admin@example.com

# Analytics (optional)
# VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Site URL (for SEO and email links)
# VITE_SITE_URL=https://yourusername.github.io/tunisiecigares1
```

### Setup Instructions

1. Copy `.env.example` to `.env` (if it exists)
2. Fill in all required variables with your actual values
3. **Never commit `.env` to git** - it's already in `.gitignore`
4. For GitHub Pages deployment, add these as GitHub Secrets in your repository settings

### Security Notes

- The `.env` file is automatically ignored by git (see `.gitignore`)
- Never share your `.env` file or commit it to version control
- For production deployments, use environment variables or secrets management
- The admin password should be strong and unique

## Email Configuration

The app uses EmailJS for sending order confirmation emails. To set up:

1. Create an account at [EmailJS](https://www.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `to_email` or `to` - recipient email
   - `subject` - email subject
   - `html_message` - HTML email content
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

### Email Error Handling

- Email failures are non-blocking - orders are still saved to Supabase
- If email fails, users see a success message but are notified that email wasn't sent
- Admin notifications are sent separately and failures don't affect order processing
- All email errors are logged to console in development mode

## Notes

- No online payment — orders are via Messenger only.
- Footer disclaimer: "Sales reserved for adults — enjoy responsibly."
- Age verification uses sessionStorage (expires when browser closes) for security


