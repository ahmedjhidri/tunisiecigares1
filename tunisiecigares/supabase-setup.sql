-- =====================================================
-- Supabase Setup Script for Cigar Lounge Tunisia
-- =====================================================
-- Run this script in Supabase SQL Editor to set up
-- the orders table and all required policies
-- =====================================================

-- Step 1: Create the orders table
CREATE TABLE IF NOT EXISTS orders (
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

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_ref ON orders(order_ref);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);

-- Step 3: Add validation constraints
ALTER TABLE orders 
DROP CONSTRAINT IF EXISTS check_age_18_plus;

ALTER TABLE orders 
ADD CONSTRAINT check_age_18_plus 
CHECK (age >= 18);

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous insert" ON orders;
DROP POLICY IF EXISTS "Allow anon select" ON orders;
DROP POLICY IF EXISTS "Allow service role select" ON orders;

-- Step 6: Create RLS Policies

-- Policy 1: Allow anonymous users to INSERT orders (customers placing orders)
CREATE POLICY "Allow anonymous insert"
ON orders
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy 2: Allow anonymous users to SELECT their own orders
-- Note: This allows admin panel to work with anon key
-- For better security, use service role key for admin in production
CREATE POLICY "Allow anon select"
ON orders
FOR SELECT
TO anon
USING (true);

-- Policy 3: Allow service role to do everything (for admin/backend)
-- This policy allows service role (backend) to access all orders
CREATE POLICY "Allow service role all"
ON orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Step 7: Verify the setup
-- Run these queries to verify everything is set up correctly:

-- Check table exists and has correct structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- Check RLS is enabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename = 'orders';

-- Check policies are created
SELECT 
  policyname,
  roles,
  cmd,
  permissive
FROM pg_policies
WHERE tablename = 'orders';

-- =====================================================
-- TEST QUERIES (Optional - Remove after testing)
-- =====================================================

-- Test insert (run this to test if everything works)
-- INSERT INTO orders (
--   first_name,
--   last_name,
--   email,
--   phone,
--   address,
--   age,
--   order_ref,
--   product_name,
--   product_price,
--   quantity,
--   total,
--   order_items,
--   order_type,
--   status
-- ) VALUES (
--   'Test',
--   'User',
--   'test@example.com',
--   '+216 12 345 678',
--   '123 Test Street, Tunis, Tunisia',
--   25,
--   'CLT-TEST-' || extract(epoch from now())::text,
--   'Test Cigar',
--   50.00,
--   1,
--   50.00,
--   '[{"product_id": "test-1", "product_name": "Test Cigar", "price": 50, "quantity": 1, "subtotal": 50}]'::jsonb,
--   'single',
--   'pending'
-- );

-- Verify test data (if you ran the test insert above)
-- SELECT * FROM orders WHERE order_ref LIKE 'CLT-TEST-%';

-- Clean up test data (run this after testing)
-- DELETE FROM orders WHERE order_ref LIKE 'CLT-TEST-%';

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Get your Supabase URL and anon key from Settings → API
-- 2. Add them to your .env file
-- 3. Test placing an order from your app
-- 4. Verify orders appear in Supabase Table Editor
-- =====================================================

