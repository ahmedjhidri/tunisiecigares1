# Quick Deploy to Vercel

Your project is ready to deploy! The build has been tested and works correctly.

## ⚠️ Important: Fix npm Permissions First

Before proceeding, you need to fix npm cache permissions. Run this command in your terminal:

```bash
sudo chown -R $(whoami) ~/.npm
```

You'll be prompted for your password. This is a one-time fix.

## 🚀 Deploy Now (Choose One Method)

### Method 1: Web Interface (Easiest - Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import Repository**: Select `tunisiecigares1`

4. **Configure**:
   - **Root Directory**: Click "Edit" and set to `tunisiecigares`
   - Framework and build settings should auto-detect correctly

5. **Add Environment Variables** (Click "Environment Variables"):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - (Optional) `VITE_EMAILJS_ADMIN_TEMPLATE_ID`
   - (Optional) `VITE_ADMIN_EMAIL`
   - (Optional) `VITE_ADMIN_PASSWORD`

6. **Click "Deploy"**

7. **Done!** Your site will be live in 1-2 minutes.

### Method 2: Command Line

After fixing npm permissions:

```bash
cd tunisiecigares
npx vercel login
npx vercel
```

Follow the prompts, then add environment variables:

```bash
npx vercel env add VITE_SUPABASE_URL
npx vercel env add VITE_SUPABASE_ANON_KEY
npx vercel env add VITE_EMAILJS_SERVICE_ID
npx vercel env add VITE_EMAILJS_TEMPLATE_ID
npx vercel env add VITE_EMAILJS_PUBLIC_KEY
```

Then deploy to production:

```bash
npx vercel --prod
```

## ✅ What's Already Done

- ✅ Vite config updated (no base path needed)
- ✅ Vercel config created (`vercel.json`)
- ✅ Router updated to BrowserRouter (clean URLs)
- ✅ Build tested and working
- ✅ Deployment scripts added to package.json

## 📋 Environment Variables Checklist

Make sure you have these values ready before deploying:

- [ ] Supabase URL
- [ ] Supabase Anon Key
- [ ] EmailJS Service ID
- [ ] EmailJS Template ID
- [ ] EmailJS Public Key

You can find these in:
- **Supabase**: Dashboard → Settings → API
- **EmailJS**: Dashboard → Services & Templates

## 🎉 After Deployment

Once deployed, you'll get a URL like: `https://your-project.vercel.app`

- Test all pages work
- Test adding items to cart
- Test placing an order (to verify email)
- Check mobile responsiveness

## 📚 Need More Help?

See `VERCEL_DEPLOYMENT.md` for detailed instructions and troubleshooting.

