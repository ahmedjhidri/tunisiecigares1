# Stock Management Guide

## 📊 Current Situation

### ❌ Stock CANNOT be modified from database (Current Setup)

**Why?**
- Products are stored in `src/data/products.js` (code file)
- Stock is hardcoded in the JavaScript file
- To change stock, you must edit the code file and redeploy

**Current Stock Location:**
```javascript
// src/data/products.js
{
  id: 'cohiba-robusto',
  name: 'Cohiba Robusto',
  stock: 5, // ← Stock is here, in the code
  in_stock: true,
  // ...
}
```

**To Update Stock (Current Method):**
1. Edit `src/data/products.js`
2. Change the `stock` value
3. Commit and push changes
4. Wait for deployment

---

## ✅ How to Enable Database Stock Management

### Option 1: Keep Current Setup (Recommended for Small Catalogs)

**Pros:**
- ✅ Simple
- ✅ Fast (no database calls)
- ✅ Works perfectly for small catalogs

**Cons:**
- ❌ Must edit code to change stock
- ❌ Requires redeployment

**When to Use:**
- Small catalog (< 20 products)
- Stock doesn't change frequently
- No admin panel needed

---

### Option 2: Move Products to Database (For Stock Management)

**Pros:**
- ✅ Update stock from Supabase dashboard
- ✅ No code changes needed
- ✅ Real-time stock updates
- ✅ Can build admin panel later

**Cons:**
- ❌ More complex setup
- ❌ Requires code changes
- ❌ Slower (database queries)

**When to Use:**
- Large catalog (20+ products)
- Stock changes frequently
- Want to manage stock from database
- Planning admin panel

---

## 🚀 Quick Setup: Database Stock Management

### Step 1: Run Products Table SQL

1. Go to Supabase Dashboard → SQL Editor
2. Open `PRODUCTS_TABLE_SETUP.sql`
3. Copy and paste the entire file
4. Click "Run"

### Step 2: Insert Your Products

The SQL file includes example inserts. You need to:
1. Copy all products from `src/data/products.js`
2. Convert them to SQL INSERT statements
3. Run them in Supabase SQL Editor

### Step 3: Update Your Code

You'll need to update your React code to fetch products from the database instead of the code file.

**Files to Update:**
- `src/pages/Products.jsx` - Fetch from Supabase
- `src/pages/Product.jsx` - Fetch from Supabase
- `src/components/ProductCard.jsx` - Use database stock
- Remove or update `src/data/products.js`

### Step 4: Update Stock from Database

Once products are in the database, you can update stock:

```sql
-- Update stock for one product
UPDATE products SET stock = 10 WHERE id = 'cohiba-robusto';

-- Update stock for multiple products
UPDATE products SET stock = 5 WHERE id IN ('cohiba-robusto', 'montecristo-no-2');

-- Set product as out of stock
UPDATE products SET stock = 0 WHERE id = 'cohiba-robusto';

-- Increase stock
UPDATE products SET stock = stock + 10 WHERE id = 'cohiba-robusto';

-- Decrease stock (when order is placed)
UPDATE products SET stock = stock - 1 WHERE id = 'cohiba-robusto';
```

---

## 📝 Quick Reference: Update Stock

### From Supabase Dashboard (If Using Database):

1. Go to **Table Editor** → `products` table
2. Find your product
3. Click on the `stock` cell
4. Enter new stock value
5. Click **Save**

### From SQL Editor (If Using Database):

```sql
-- View current stock
SELECT id, name, stock, in_stock FROM products;

-- Update stock
UPDATE products SET stock = 10 WHERE id = 'cohiba-robusto';

-- View low stock products (≤3)
SELECT id, name, stock FROM products WHERE stock > 0 AND stock <= 3;
```

### From Code File (Current Setup):

1. Open `src/data/products.js`
2. Find the product
3. Change `stock: 5` to `stock: 10`
4. Save and commit
5. Push to GitHub (auto-deploys)

---

## 🔄 Automatic Stock Updates (Database Only)

If you use the database setup, stock automatically updates `in_stock`:

- When `stock > 0` → `in_stock = true`
- When `stock = 0` → `in_stock = false`

This is handled by a database trigger (included in `PRODUCTS_TABLE_SETUP.sql`).

---

## 💡 Recommendation

**For your current setup (8 products):**
- ✅ **Keep products in code** (`src/data/products.js`)
- ✅ **Keep stock in code**
- ✅ **Edit code file when stock changes**
- ✅ **Simple and fast**

**Only move to database if:**
- You have 20+ products
- Stock changes daily
- You want admin panel
- You need real-time stock tracking

---

## 📋 Summary

| Method | Stock Location | How to Update | Complexity |
|--------|---------------|---------------|------------|
| **Current (Code)** | `src/data/products.js` | Edit code file | ⭐ Simple |
| **Database** | Supabase `products` table | SQL or Dashboard | ⭐⭐ Medium |

**Current Setup:** Stock is in code → Edit code to change stock
**Database Setup:** Stock is in database → Update from Supabase dashboard

Choose what works best for your needs! 🎯

