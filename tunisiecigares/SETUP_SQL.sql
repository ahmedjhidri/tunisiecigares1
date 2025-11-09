-- =====================================================
-- SUPABASE SETUP SQL - Copy and Paste This Entire File
-- =====================================================
-- Instructions:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Click "New Query"
-- 3. Copy and paste ALL the code below
-- 4. Click "Run" (or press Cmd/Ctrl + Enter)
-- 5. Verify table was created in Table Editor
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
  order_type TEXT NOT NULL DEFAULT 'single',
  status TEXT NOT NULL DEFAULT 'pending'
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
DROP POLICY IF EXISTS "Allow service role all" ON orders;

-- Step 6: Create RLS Policies

-- Policy 1: Allow anonymous users to INSERT orders (customers placing orders)
CREATE POLICY "Allow anonymous insert"
ON orders
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy 2: Allow anonymous users to SELECT orders (for admin panel)
CREATE POLICY "Allow anon select"
ON orders
FOR SELECT
TO anon
USING (true);

-- Policy 3: Allow service role to do everything (for admin/backend)
CREATE POLICY "Allow service role all"
ON orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- VERIFICATION QUERIES (Optional - Run to verify setup)
-- =====================================================

-- Check if table exists and has correct structure
-- SELECT 
--   column_name,
--   data_type,
--   is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'orders'
-- ORDER BY ordinal_position;

-- Check RLS is enabled
-- SELECT 
--   tablename,
--   rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public' 
-- AND tablename = 'orders';

-- Check policies are created
-- SELECT 
--   policyname,
--   roles,
--   cmd
-- FROM pg_policies
-- WHERE tablename = 'orders';

-- =====================================================
-- SETUP COMPLETE! ✅
-- =====================================================
-- Next steps:
-- 1. Get your Supabase URL and anon key from Settings → API
-- 2. Add them to your .env file:
--    VITE_SUPABASE_URL=https://your-project.supabase.co
--    VITE_SUPABASE_ANON_KEY=your-anon-key-here
-- 3. Test placing an order from your app
-- 4. Verify orders appear in Supabase Table Editor
-- =====================================================

