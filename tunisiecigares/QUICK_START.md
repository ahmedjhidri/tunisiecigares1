# 🚀 Quick Start - Run Website Locally

## ⚡ 3-Step Quick Start

### Step 1: Navigate to Project
```bash
cd tunisiecigares
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
The terminal will show a URL like:
```
➜  Local:   http://localhost:5173/
```

**Open your browser and go to:** `http://localhost:5173/`

---

## 🎯 What You'll See

Once you open `http://localhost:5173/`, you'll see:

1. **Home Page**
   - Hero section with elegant design
   - Featured products grid
   - Recently viewed products (after browsing)
   - About section

2. **Navigation**
   - Header with menu
   - Cart icon (shows item count)
   - Mobile-responsive menu

3. **Features You Can Test**
   - ✅ Product browsing
   - ✅ Search with autocomplete
   - ✅ Filters (collapsible on mobile)
   - ✅ Product detail pages
   - ✅ Add to cart
   - ✅ Image zoom on hover
   - ✅ Quick view modal
   - ✅ Recently viewed tracking
   - ✅ Product recommendations
   - ✅ Order form with validation

---

## 🧪 Test These Features

### 1. Browse Products
- Click "Our Cigars" in menu
- See all products with lazy-loaded images
- Hover over products to see zoom effect

### 2. Search
- Type in search box (e.g., "Cohiba")
- See autocomplete suggestions
- Use arrow keys to navigate
- Press Enter to select

### 3. Filters
- Select "Cuba" from Origin filter
- See filter chip appear
- Click chip to remove
- On mobile: filters are in accordion

### 4. Product Details
- Click on any product
- See product images (zoom on hover)
- View product information
- Add to cart
- See recommendations below
- See recently viewed section

### 5. Cart
- Add products to cart
- Click cart icon (shows item count)
- See mini cart preview on hover
- Go to cart page
- Update quantities
- Proceed to checkout

### 6. Order Form
- Fill in order form
- See real-time validation
- Phone number auto-formats: `+216 XX XXX XXX`
- Submit order (if Supabase configured)

### 7. Admin Panel
- Go to `http://localhost:5173/#/admin/orders`
- Enter admin password
- View all orders
- Filter by status
- Mark orders as delivered

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Reinstall dependencies
npm install
```

### Blank Page
1. Check browser console (F12) for errors
2. Verify `.env` file exists
3. Restart dev server

### Routes Not Working
- Routes use `#` (HashRouter): `http://localhost:5173/#/products`
- This is normal for GitHub Pages compatibility

---

## 📱 Test on Mobile

### Option 1: Browser DevTools
1. Open Chrome DevTools (F12)
2. Click device toggle (Cmd/Ctrl + Shift + M)
3. Select mobile device
4. Test mobile features

### Option 2: Your Phone
1. Find your computer's IP:
   ```bash
   # Mac
   ipconfig getifaddr en0
   ```
2. On your phone, open: `http://YOUR_IP:5173`
3. Make sure phone and computer are on same WiFi

---

## 🎉 You're All Set!

The website is now running locally. You can:
- ✅ Test all features
- ✅ Make changes and see them instantly (hot reload)
- ✅ Debug issues
- ✅ Test on mobile
- ✅ Verify everything works

**Happy Testing!** 🚀

