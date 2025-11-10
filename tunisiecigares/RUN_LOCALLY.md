# 🚀 Run Website Locally - Visual Guide

## ✅ Your Dev Server is Already Running!

**🌐 Open your browser and go to:**
```
http://localhost:5173
```

---

## 📋 Step-by-Step Instructions

### Step 1: Open Terminal

If the dev server is not running, open terminal and run:

```bash
cd /Users/jhidri/Documents/tunisiecigares1/tunisiecigares
npm run dev
```

### Step 2: Open Browser

1. **Open your browser** (Chrome, Firefox, Safari, etc.)
2. **Type in address bar:** `http://localhost:5173`
3. **Press Enter**

### Step 3: You Should See

```
┌──────────────────────────────────────────┐
│  🏠 Cigar Lounge Tunisia                │
│  ─────────────────────────────────────── │
│                                          │
│  [Hero Image]                            │
│  Premium Cigar Boutique                  │
│                                          │
│  Our Cigars                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │Product│ │Product│ │Product│ │Product│  │
│  │ 45 TND│ │ 50 TND│ │ 48 TND│ │ 52 TND│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                          │
│  [Recently Viewed] (if any)             │
│  [About Section]                        │
└──────────────────────────────────────────┘
```

---

## 🧪 Test These Features

### 1. Browse Products
- Click **"Our Cigars"** in the menu
- See all products with images
- Hover over products to see zoom effect

### 2. Search
- Type **"Cohiba"** in the search box
- See autocomplete suggestions appear
- Use ↑↓ arrow keys to navigate
- Press **Enter** to select

### 3. View Product
- Click on any product
- See product images (hover to zoom)
- See product details
- Click **"Add to Cart"**
- See **"You Might Also Like"** section
- See **"Recently Viewed"** section

### 4. Add to Cart
- Add products to cart
- Click cart icon (shows item count)
- Hover over cart icon to see mini preview
- Go to cart page
- Update quantities
- Click **"Checkout"**

### 5. Test Order Form
- Fill in the order form
- See real-time validation (red borders on errors)
- Type phone number → auto-formats to `+216 XX XXX XXX`
- Submit order
- See success message with confetti

### 6. Test Filters
- Go to Products page
- Select **"Cuba"** from Origin filter
- See filter chip appear
- Click chip to remove filter
- On mobile: filters are collapsible

---

## 🎯 What to Test

### ✅ Visual Tests
- [ ] Home page loads
- [ ] Products display correctly
- [ ] Images load (lazy loading)
- [ ] Search works
- [ ] Filters work
- [ ] Cart works
- [ ] Order form works
- [ ] Mobile responsive

### ✅ Feature Tests
- [ ] Lazy loading (scroll to see images load)
- [ ] Search autocomplete (type to see suggestions)
- [ ] Image zoom (hover over images)
- [ ] Quick view (hover over product cards)
- [ ] Mini cart preview (hover over cart icon)
- [ ] Real-time validation (fill form to see errors)
- [ ] Phone mask (type phone to see formatting)
- [ ] Recommendations (view product to see suggestions)
- [ ] Recently viewed (view products to see history)

---

## 🐛 Troubleshooting

### If Website Doesn't Load

1. **Check if dev server is running:**
   ```bash
   # In terminal, you should see:
   ➜  Local:   http://localhost:5173/
   ```

2. **If not running, start it:**
   ```bash
   npm run dev
   ```

3. **Check browser console (F12):**
   - Look for errors
   - Check if assets are loading

### If Routes Don't Work

**Note:** Routes use `#` (HashRouter)
- ✅ `http://localhost:5173/#/products` - Works
- ✅ `http://localhost:5173/#/cart` - Works
- ✅ `http://localhost:5173/#/admin/orders` - Works

This is normal for GitHub Pages compatibility.

### If Images Don't Load

- Check internet connection (using Unsplash images)
- Images load as you scroll (lazy loading)
- Wait a moment for images to load

---

## 📱 Test on Mobile

### Option 1: Browser DevTools
1. Press **F12** (open DevTools)
2. Click **device toggle** (📱 icon)
3. Select **iPhone** or **Android**
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

## 🎉 Success!

If you can see the website and navigate around, you're all set! 

**The website is running locally and ready for testing.**

---

## 🔗 Quick Links to Test

- **Home:** `http://localhost:5173/`
- **Products:** `http://localhost:5173/#/products`
- **Product Detail:** `http://localhost:5173/#/product/cohiba-robusto`
- **Cart:** `http://localhost:5173/#/cart`
- **Admin:** `http://localhost:5173/#/admin/orders`

---

## 💡 Tips

1. **Keep terminal open** - Don't close the dev server
2. **Hot reload** - Changes appear instantly when you save files
3. **Check console** - Press F12 to see errors
4. **Test mobile** - Use DevTools device mode
5. **Test all features** - Go through the checklist

**Happy Testing!** 🚀

