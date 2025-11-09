# Supabase Backend Setup Guide

## ✅ Good News: No Backend Changes Required!

All the new features we implemented are **client-side only** and don't require any Supabase backend changes:

- ✅ **Lazy Loading** - Uses Intersection Observer (browser API)
- ✅ **Collapsible Filters** - Pure UI component
- ✅ **Recently Viewed** - Uses localStorage (browser storage)
- ✅ **Product Recommendations** - Client-side algorithm using existing product data
- ✅ **Search Autocomplete** - Client-side search using existing product data

## 📋 Current Supabase Setup

Your app currently uses **one Supabase table**: `orders`

### Required Table: `orders`

This table stores customer orders. Make sure it has the following structure:

#### Table Schema

```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Customer Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  age INTEGER NOT NULL,
  
  -- Order Information
  order_ref TEXT UNIQUE NOT NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC(10, 2),
  quantity INTEGER NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  notes TEXT,
  
  -- Order Details (JSONB for flexibility)
  order_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  order_type TEXT NOT NULL DEFAULT 'single', -- 'single' or 'cart'
  status TEXT NOT NULL DEFAULT 'pending' -- 'pending', 'confirmed', 'delivered'
);

-- Create index for faster queries
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_ref ON orders(order_ref);
CREATE INDEX idx_orders_email ON orders(email);
```

#### Row Level Security (RLS) Policies

You need to enable RLS and create policies to allow:
1. **Anonymous users** to INSERT orders (for customers to place orders)
2. **Service role** to SELECT all orders (for admin panel)

```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert orders
CREATE POLICY "Allow anonymous insert"
ON orders
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow service role to read all orders (for admin)
-- Note: Admin panel uses service role key, not anon key
-- If you're using anon key for admin, you'll need:
CREATE POLICY "Allow service role select"
ON orders
FOR SELECT
TO service_role
USING (true);

-- Alternative: If admin uses anon key, create a policy with password check
-- This is less secure but works for simple setups
CREATE POLICY "Allow anon select with password"
ON orders
FOR SELECT
TO anon
USING (true); -- In production, add proper authentication
```

## 🚀 Step-by-Step Setup Instructions

### Step 1: Access Supabase Dashboard

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in to your account
3. Select your project (or create a new one)

### Step 2: Create the `orders` Table

1. Go to **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the table schema SQL from above
4. Click **Run** to execute
5. Verify the table was created by going to **Table Editor**

### Step 3: Set Up Row Level Security (RLS)

1. Go to **Table Editor** → Select `orders` table
2. Click on **Policies** tab
3. Click **New Policy**
4. Create the policies as shown above

**OR** use the SQL Editor:

1. Go to **SQL Editor**
2. Copy and paste the RLS policies SQL from above
3. Click **Run**

### Step 4: Verify Table Structure

1. Go to **Table Editor** → Select `orders` table
2. Verify all columns exist:
   - `id` (uuid, primary key)
   - `created_at` (timestamptz)
   - `first_name` (text)
   - `last_name` (text)
   - `email` (text)
   - `phone` (text)
   - `address` (text)
   - `age` (int4)
   - `order_ref` (text, unique)
   - `product_name` (text)
   - `product_price` (numeric)
   - `quantity` (int4)
   - `total` (numeric)
   - `notes` (text)
   - `order_items` (jsonb)
   - `order_type` (text)
   - `status` (text)

### Step 5: Get Your Supabase Credentials

1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### Step 6: Add Credentials to Environment Variables

1. In your project root, create/update `.env` file:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. For GitHub Pages deployment, add these as **GitHub Secrets**:
   - Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

### Step 7: Test the Connection

1. Start your dev server: `npm run dev`
2. Open browser console
3. You should see: `✅ Supabase connected - Orders count: X`
4. Try placing a test order to verify it works

## 🔍 Verifying Your Current Setup

### Check if Table Exists

Run this in Supabase SQL Editor:

```sql
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;
```

### Check RLS Policies

```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'orders';
```

### Test Insert (from SQL Editor)

```sql
INSERT INTO orders (
  first_name,
  last_name,
  email,
  phone,
  address,
  age,
  order_ref,
  product_name,
  product_price,
  quantity,
  total,
  order_items,
  order_type,
  status
) VALUES (
  'Test',
  'User',
  'test@example.com',
  '+216 12 345 678',
  '123 Test Street, Tunis',
  25,
  'CLT-TEST-1234',
  'Test Product',
  50.00,
  1,
  50.00,
  '[{"product_id": "test", "product_name": "Test Product", "price": 50, "quantity": 1, "subtotal": 50}]'::jsonb,
  'single',
  'pending'
);

-- Verify it was inserted
SELECT * FROM orders WHERE order_ref = 'CLT-TEST-1234';

-- Clean up test data
DELETE FROM orders WHERE order_ref = 'CLT-TEST-1234';
```

## 🔒 Security Best Practices

### For Production:

1. **Use Service Role Key for Admin** (more secure):
   - Store service role key in backend/server
   - Create API endpoint for admin orders
   - Never expose service role key in frontend

2. **Add Authentication**:
   - Use Supabase Auth for admin login
   - Replace localStorage password with proper auth

3. **Add Rate Limiting**:
   - Prevent spam orders
   - Use Supabase Edge Functions

4. **Add Validation**:
   - Use database constraints
   - Add check constraints for age (>= 18)
   - Add email validation

### Enhanced Security SQL:

```sql
-- Add check constraint for age
ALTER TABLE orders 
ADD CONSTRAINT check_age_18_plus 
CHECK (age >= 18);

-- Add email validation (basic)
ALTER TABLE orders 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add phone validation
ALTER TABLE orders 
ADD CONSTRAINT check_phone_format 
CHECK (phone ~* '^\+?[0-9\s-]+$');
```

## 🐛 Troubleshooting

### Error: "relation orders does not exist"
- **Solution**: Table hasn't been created. Follow Step 2.

### Error: "new row violates row-level security policy"
- **Solution**: RLS policies not set up correctly. Follow Step 3.

### Error: "permission denied for table orders"
- **Solution**: Check RLS policies and anon key permissions.

### Orders not saving
- **Check**: Browser console for errors
- **Check**: Supabase logs (Dashboard → Logs → API)
- **Check**: RLS policies allow INSERT for anon role

### Admin panel can't see orders
- **Check**: RLS policies allow SELECT
- **Check**: Using correct Supabase key (anon key)

## 📊 Optional: Add Indexes for Better Performance

```sql
-- Index for status filtering (admin panel)
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Index for date range queries (admin panel)
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Index for order reference lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_ref ON orders(order_ref);

-- Index for email lookups (if needed)
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
```

## ✅ Checklist

- [ ] `orders` table created with all required columns
- [ ] RLS enabled on `orders` table
- [ ] Policy allows anonymous INSERT
- [ ] Policy allows SELECT (for admin)
- [ ] Indexes created for performance
- [ ] Environment variables set (.env file)
- [ ] GitHub Secrets set (for deployment)
- [ ] Test order placed successfully
- [ ] Admin panel can view orders

## 🎉 You're Done!

Once the `orders` table is set up correctly, all features will work without any backend changes. The new UX features (lazy loading, recommendations, etc.) are purely client-side and don't interact with Supabase at all.

---

**Need Help?** Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)

