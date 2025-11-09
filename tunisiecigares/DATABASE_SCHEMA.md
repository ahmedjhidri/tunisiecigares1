# Database Schema Documentation

## Current Setup (Simple)

### Tables: 1

#### `orders` table
Stores customer orders.

**Columns:**
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `first_name` (Text)
- `last_name` (Text)
- `email` (Text)
- `phone` (Text)
- `address` (Text)
- `age` (Integer)
- `order_ref` (Text, Unique)
- `product_name` (Text)
- `product_price` (Numeric)
- `quantity` (Integer)
- `total` (Numeric)
- `notes` (Text, Nullable)
- `order_items` (JSONB) - Array of items for cart orders
- `order_type` (Text) - 'single' or 'cart'
- `status` (Text) - 'pending', 'confirmed', 'delivered'

**Usage:**
- Customer places order → INSERT into `orders`
- Admin views orders → SELECT from `orders`
- Admin updates status → UPDATE `orders`

---

## Future Setup (If Needed)

If you want to manage products dynamically, you can add a `products` table.

### Tables: 2

#### `products` table (Optional)
Stores product catalog.

**Columns:**
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  price_TND NUMERIC(10, 2) NOT NULL,
  price_EUR NUMERIC(10, 2),
  stock INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  origin TEXT,
  format TEXT,
  length TEXT,
  ring_gauge TEXT,
  strength TEXT,
  smoking_time TEXT,
  short_desc TEXT,
  long_desc TEXT,
  tasting_notes JSONB DEFAULT '[]'::jsonb,
  pairing_suggestions JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  premium BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  new_arrival BOOLEAN DEFAULT false,
  rating NUMERIC(3, 2),
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**Benefits:**
- Admin can add/edit products without code changes
- Real-time stock management
- Dynamic product updates
- Better for large catalogs

**Drawbacks:**
- More complex setup
- Requires product admin panel
- Slower initial load (API calls)
- More database queries

---

## Summary

### Current Setup (Recommended for Small Catalogs)
✅ **1 table**: `orders`
✅ Products in code (`src/data/products.js`)
✅ Simple and fast
✅ No product management needed

### Future Setup (If Needed)
📊 **2 tables**: `orders` + `products`
📊 Products in database
📊 Dynamic product management
📊 Admin panel for products

---

## When to Add Products Table?

Add a `products` table if you need:
- [ ] More than 50 products
- [ ] Frequent product updates
- [ ] Admin panel to manage products
- [ ] Real-time stock tracking
- [ ] Product images in Supabase Storage
- [ ] Dynamic product categories
- [ ] Product reviews/ratings from database
- [ ] Product variants (sizes, colors, etc.)

Otherwise, keep products in code (current setup) - it's simpler and faster! ✅

