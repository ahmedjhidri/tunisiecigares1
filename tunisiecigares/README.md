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

### Vercel (Recommended)

Vercel is the recommended deployment platform for this project. It provides automatic HTTPS, CDN, and seamless deployments.

#### Quick Deploy with Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the project directory**:
   ```bash
   cd tunisiecigares
   vercel
   ```
   Follow the prompts to link your project.

4. **Add Environment Variables**:
   - Go to your project dashboard on [Vercel](https://vercel.com)
   - Navigate to **Settings** → **Environment Variables**
   - Add the following variables:
     - `VITE_SUPABASE_URL` - Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
     - `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
     - `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID
     - `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key
     - `VITE_EMAILJS_ADMIN_TEMPLATE_ID` (optional) - Admin template ID
     - `VITE_ADMIN_EMAIL` (optional) - Admin email address
     - `VITE_ADMIN_PASSWORD` (optional) - Admin password

5. **Connect GitHub Repository** (for automatic deployments):
   - In your Vercel project dashboard, go to **Settings** → **Git**
   - Connect your GitHub repository
   - Every push to `main` will automatically trigger a deployment

#### Benefits of Vercel

- ✅ No base path required (clean URLs like `your-site.vercel.app`)
- ✅ Automatic HTTPS and CDN
- ✅ Custom domain support (add your domain in project settings)
- ✅ Automatic deployments on git push
- ✅ Global edge network for better performance
- ✅ Preview deployments for pull requests

#### Configuration

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing: All routes redirect to `index.html`

### GitHub Pages (Legacy)

<details>
<summary>Click to expand GitHub Pages deployment instructions</summary>

GitHub Pages deployment is still supported but requires a base path. For better deployment experience, consider using Vercel instead.

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
```

### Optional Variables

```bash
# Analytics (optional)
# VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Site URL (for SEO and email links)
# VITE_SITE_URL=https://your-site.vercel.app
```

### Setup Instructions

1. Copy `.env.example` to `.env` (if it exists)
2. Fill in all required variables with your actual values
3. **Never commit `.env` to git** - it's already in `.gitignore`
4. For production deployments:
   - **Vercel**: Add environment variables in Vercel dashboard (Settings → Environment Variables)
   - **GitHub Pages**: Add these as GitHub Secrets in your repository settings

### Security Notes

- The `.env` file is automatically ignored by git (see `.gitignore`)
- Never share your `.env` file or commit it to version control
- For production deployments, use environment variables or secrets management

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
- All email errors are logged to console in development mode

#### Required GitHub Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID  
- `VITE_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
- `VITE_BASE_PATH`: Set to `/tunisiecigares1/` for GitHub Pages

#### Manual Deployment

```bash
npm run build

# Deploy the dist/ folder to GitHub Pages
# Or use GitHub Actions (automated on push to main)
```

</details>

### Netlify

- Build: `npm run build`
- Publish directory: `dist`
- Redirects: Add `_redirects` with `/* /index.html 200` (optional; not included by default)

### EmailJS Template Configuration

Your EmailJS template should use these variables:

- `{{to_email}}` - Customer email address
- `{{customer_name}}` - Customer full name
- `{{order_ref}}` - Order reference number
- `{{customer_phone}}` - Customer phone number
- `{{customer_address}}` - Delivery address
- `{{order_details}}` - Formatted order items (text)
- `{{total}}` - Order total with currency
- `{{subject}}` - Email subject line

**Example EmailJS Template:**

```
Subject: {{subject}}

Hello {{customer_name}},

Your order {{order_ref}} has been confirmed!

Order Details:
{{order_details}}

Total: {{total}}

Delivery Address:
{{customer_address}}

Phone: {{customer_phone}}

We will contact you via Messenger to confirm delivery details.

Thank you for your order!
Cigar Lounge Tunisia
```

## Troubleshooting

### Email not sending

- Verify EmailJS credentials in `.env`
- Check EmailJS dashboard for template configuration
- Ensure template uses correct variable names: `{{to_email}}`, `{{customer_name}}`, etc.
- Check browser console for errors
- Verify EmailJS service is active and has quota remaining
- Test template in EmailJS dashboard with sample data

### Orders not saving

- Verify Supabase credentials in `.env`
- Check Supabase table structure matches schema
- Ensure RLS (Row Level Security) policies allow inserts
- Check Supabase dashboard for error logs
- Verify network connection

### Age verification keeps appearing

- Normal behavior - uses sessionStorage (expires on browser close)
- For testing, check sessionStorage in DevTools (Application → Session Storage)
- Close all browser tabs to reset session

### Images not loading

- Using Unsplash placeholder URLs - replace with real images
- Update `src/data/products.js` images arrays
- Ensure image URLs are accessible (CORS enabled if needed)
- Check browser console for 404 errors

### Build fails

- Ensure all environment variables are set
- Check for syntax errors in code
- Run `npm install` to ensure dependencies are installed
- Clear `node_modules` and reinstall if needed

### Mobile menu not working

- Check browser console for JavaScript errors
- Ensure React Router is properly configured
- For Vercel: Use BrowserRouter (default)
- For GitHub Pages: Use HashRouter (required for base path)

## Notes

- No online payment — orders are via Messenger only.
- Footer disclaimer: "Sales reserved for adults — enjoy responsibly."
- Age verification uses sessionStorage (expires when browser closes) for security
- Cart persists in localStorage for 7 days (can be configured)


