# 🚀 Local Testing Guide

## Quick Start (3 Steps)

### Step 1: Install Dependencies (if not already installed)
```bash
cd tunisiecigares
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
The terminal will show:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Open your browser and go to:** `http://localhost:5173/`

---

## 📋 Detailed Instructions

### 1. Check Your Setup

**Verify you're in the right directory:**
```bash
cd /Users/jhidri/Documents/tunisiecigares1/tunisiecigares
pwd
```

**Check if dependencies are installed:**
```bash
ls node_modules
```
If you see folders, dependencies are installed. If not, run `npm install`.

### 2. Check Environment Variables

**Verify .env file exists:**
```bash
ls -la .env
```

**Check .env file has required variables:**
```bash
cat .env
```

You should see:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your-public-key
VITE_ADMIN_PASSWORD=your-password
```

### 3. Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.4.10  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 4. Open in Browser

1. **Copy the URL:** `http://localhost:5173/`
2. **Open your browser** (Chrome, Firefox, Safari, etc.)
3. **Paste the URL** in the address bar
4. **Press Enter**

You should see your website! 🎉

---

## 🌐 What You'll See

### Home Page (`http://localhost:5173/`)
- Hero section
- Featured products
- Recently viewed products (if any)
- About section

### Products Page (`http://localhost:5173/#/products`)
- Product catalog
- Search with autocomplete
- Filters (collapsible on mobile)
- Filter chips
- Product cards with lazy loading

### Product Detail Page (`http://localhost:5173/#/product/cohiba-robusto`)
- Product images with zoom
- Product details
- Add to cart button
- Floating add to cart (on mobile)
- Recommendations
- Recently viewed

### Cart Page (`http://localhost:5173/#/cart`)
- Cart items
- Quantity controls
- Order summary
- Checkout button

### Admin Orders (`http://localhost:5173/#/admin/orders`)
- Order list
- Filter by status
- Search orders
- View order details
- Mark as delivered

---

## 🧪 Testing Features

### Test Lazy Loading
1. Go to Products page
2. Scroll down slowly
3. Watch images load as they enter viewport
4. See skeleton loaders before images appear

### Test Search Autocomplete
1. Go to Products page
2. Type in search box (e.g., "Cohiba")
3. See autocomplete suggestions appear
4. Use arrow keys to navigate
5. Press Enter to select

### Test Filters
1. Go to Products page
2. Select "Cuba" from Origin filter
3. See filter chip appear
4. Click chip to remove filter
5. On mobile, filters are collapsible

### Test Product Quick View
1. Go to Products page
2. Hover over a product card
3. Click "Quick View" button
4. See product preview modal
5. Add to cart from quick view

### Test Image Zoom
1. Go to any product page
2. Hover over product image
3. See image zoom in
4. Move mouse to zoom different areas

### Test Cart
1. Add products to cart
2. Go to cart page
3. Update quantities
4. Remove items
5. Proceed to checkout

### Test Order Form
1. Add product to cart
2. Click "Commander" (Checkout)
3. Fill in form
4. See real-time validation
5. Phone number auto-formats
6. Submit order
7. See success message

### Test Recently Viewed
1. View a few products
2. Go to home page
3. See "Recently Viewed" section
4. Click on a product to view it again

### Test Recommendations
1. View a product
2. Scroll down
3. See "You Might Also Like" section
4. Products are similar to current product

---

## 🐛 Troubleshooting

### Port 5173 Already in Use

**Error:** `Port 5173 is in use, trying another one...`

**Solution:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found

**Error:** `Cannot find module '...'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Working

**Error:** Supabase/EmailJS not configured

**Solution:**
1. Check `.env` file exists
2. Verify variables are set correctly
3. Restart dev server after changing .env
4. Make sure variable names start with `VITE_`

### Browser Shows Blank Page

**Solution:**
1. Check browser console for errors (F12)
2. Verify all dependencies installed
3. Check if dev server is running
4. Try hard refresh (Cmd/Ctrl + Shift + R)
5. Clear browser cache

### Routes Not Working

**Note:** The app uses HashRouter (for GitHub Pages)
- Routes use `#` in URL: `http://localhost:5173/#/products`
- This is normal and expected

---

## 🔥 Hot Reload

The dev server has **hot module replacement (HMR)**:
- ✅ Edit any file
- ✅ Save the file
- ✅ Browser auto-refreshes
- ✅ No need to restart server

**Try it:**
1. Open `src/data/products.js`
2. Change a product name
3. Save the file
4. See browser update instantly!

---

## 📱 Test on Mobile (Local Network)

### Option 1: Use Your Phone on Same WiFi

1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Or
   ipconfig getifaddr en0
   ```

2. Start dev server with host:
   ```bash
   npm run dev -- --host
   ```

3. On your phone, open:
   ```
   http://YOUR_IP:5173
   ```
   Example: `http://192.168.1.100:5173`

### Option 2: Use Browser DevTools

1. Open Chrome DevTools (F12)
2. Click device toggle (Cmd/Ctrl + Shift + M)
3. Select a mobile device
4. Test mobile features

---

## 🎯 Testing Checklist

- [ ] Home page loads
- [ ] Products page shows all products
- [ ] Product detail page works
- [ ] Search autocomplete works
- [ ] Filters work (desktop and mobile)
- [ ] Add to cart works
- [ ] Cart page shows items
- [ ] Order form validates correctly
- [ ] Phone number formatting works
- [ ] Order submission works (if Supabase configured)
- [ ] Image lazy loading works
- [ ] Image zoom works
- [ ] Quick view works
- [ ] Recommendations show
- [ ] Recently viewed tracks products
- [ ] Admin panel works (if password set)
- [ ] Mobile responsive design works

---

## 🚀 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Check for errors
npm run build
```

---

## 💡 Tips

1. **Keep terminal open** - Don't close the terminal running `npm run dev`
2. **Check console** - Open browser DevTools (F12) to see errors
3. **Test all features** - Go through the checklist above
4. **Test on mobile** - Use browser DevTools or your phone
5. **Check network tab** - See if API calls are working

---

## 🎉 You're Ready!

Once the dev server is running and you see the website in your browser, you can:
- ✅ Test all features
- ✅ Make changes and see them instantly
- ✅ Test on mobile devices
- ✅ Debug issues
- ✅ Verify everything works before deploying

**Happy Testing!** 🚀

