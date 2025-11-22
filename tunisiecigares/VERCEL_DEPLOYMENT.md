# Vercel Deployment Guide

This guide will help you deploy your website to Vercel.

## Prerequisites

Before deploying, make sure you have:
- All environment variables ready (see list below)
- A GitHub account (for automatic deployments)
- Access to your Supabase and EmailJS accounts

## Option 1: Deploy via Vercel Web Interface (Recommended - No CLI needed)

This is the easiest method and doesn't require fixing npm permissions.

### Step 1: Fix npm Cache Permissions (if needed)

If you encounter npm permission errors, run this in your terminal:

```bash
sudo chown -R $(whoami) ~/.npm
```

Or the specific command suggested:
```bash
sudo chown -R 501:20 "/Users/youssefmamlouk/.npm"
```

### Step 2: Deploy via Vercel Website

1. **Go to [vercel.com](https://vercel.com)** and sign up/login with your GitHub account

2. **Click "Add New Project"**

3. **Import your GitHub repository**:
   - Select your repository: `tunisiecigares1`
   - Vercel will auto-detect it's a Vite project

4. **Configure Project Settings**:
   - **Root Directory**: Set to `tunisiecigares` (click "Edit" next to Root Directory)
   - **Framework Preset**: Vite (should be auto-detected)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

5. **Add Environment Variables**:
   Click "Environment Variables" and add all of these:

   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_EMAILJS_SERVICE_ID=your-emailjs-service-id
   VITE_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
   VITE_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
   ```

   Optional variables:
   ```
   VITE_EMAILJS_ADMIN_TEMPLATE_ID=your-admin-template-id
   VITE_ADMIN_EMAIL=your-admin-email
   VITE_ADMIN_PASSWORD=your-admin-password
   ```

6. **Click "Deploy"**

7. **Wait for deployment** (usually 1-2 minutes)

8. **Your site will be live** at `https://your-project-name.vercel.app`

## Option 2: Deploy via Vercel CLI

If you prefer using the command line:

### Step 1: Fix npm Cache Permissions

```bash
sudo chown -R $(whoami) ~/.npm
```

### Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

Or use npx (no installation needed):
```bash
npx vercel
```

### Step 3: Login to Vercel

```bash
cd tunisiecigares
vercel login
```

This will open a browser window for authentication.

### Step 4: Deploy

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (select your account)
- Link to existing project? **No** (for first deployment)
- Project name? (press Enter for default or enter custom name)
- Directory? `./` (current directory)
- Override settings? **No**

### Step 5: Add Environment Variables

After first deployment, add environment variables:

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_EMAILJS_SERVICE_ID
vercel env add VITE_EMAILJS_TEMPLATE_ID
vercel env env add VITE_EMAILJS_PUBLIC_KEY
```

For each variable, enter the value when prompted.

### Step 6: Redeploy

After adding environment variables, redeploy:

```bash
vercel --prod
```

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show deployment status in GitHub

## Environment Variables Reference

### Required Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | EmailJS Dashboard → Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | EmailJS Dashboard → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | EmailJS Dashboard → Account → API Keys |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_ADMIN_TEMPLATE_ID` | Admin notification template ID |
| `VITE_ADMIN_EMAIL` | Admin email for notifications |
| `VITE_ADMIN_PASSWORD` | Admin password (if using admin panel) |

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your domain
4. Follow DNS configuration instructions
5. Vercel will automatically provision SSL certificate

## Troubleshooting

### Build Fails

- Check that all environment variables are set
- Verify build command is `npm run build`
- Check output directory is `dist`
- Review build logs in Vercel dashboard

### Environment Variables Not Working

- Make sure variables start with `VITE_` (required for Vite)
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

### Routing Issues

- Verify `vercel.json` is in the project root (`tunisiecigares/` directory)
- Check that rewrites are configured correctly
- Ensure using `BrowserRouter` (not `HashRouter`) in `main.jsx`

### Site Shows 404 on Refresh

- This should be fixed by `vercel.json` rewrites
- If issue persists, check that `vercel.json` has the correct rewrite rules

## Post-Deployment Checklist

- [ ] Site loads at Vercel URL
- [ ] All pages route correctly
- [ ] Environment variables are set
- [ ] Email functionality works (test order)
- [ ] Supabase connection works (test adding to cart)
- [ ] Images load correctly
- [ ] Mobile responsive design works
- [ ] GitHub integration enabled (automatic deployments)

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

