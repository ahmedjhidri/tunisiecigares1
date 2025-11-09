-- =====================================================
-- OPTIONAL: Products Table Setup (For Stock Management)
-- =====================================================
-- This is OPTIONAL - only use if you want to manage
-- products and stock from the database instead of code
-- =====================================================
-- Instructions:
-- 1. Run SETUP_SQL.sql first (for orders table)
-- 2. Then run this file if you want products in database
-- 3. You'll need to update your code to fetch from database
-- =====================================================

-- Step 1: Create the products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  price_TND NUMERIC(10, 2) NOT NULL,
  price_EUR NUMERIC(10, 2),
  stock INTEGER DEFAULT 0 NOT NULL,
  in_stock BOOLEAN DEFAULT true NOT NULL,
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

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_premium ON products(premium);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_origin ON products(origin);

-- Step 3: Add validation constraints
ALTER TABLE products 
DROP CONSTRAINT IF EXISTS check_stock_positive;

ALTER TABLE products 
ADD CONSTRAINT check_stock_positive 
CHECK (stock >= 0);

-- Auto-update in_stock based on stock
CREATE OR REPLACE FUNCTION update_in_stock()
RETURNS TRIGGER AS $$
BEGIN
  NEW.in_stock = (NEW.stock > 0);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update in_stock when stock changes
DROP TRIGGER IF EXISTS trigger_update_in_stock ON products;
CREATE TRIGGER trigger_update_in_stock
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_in_stock();

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS Policies

-- Policy 1: Allow anonymous users to SELECT products (view catalog)
CREATE POLICY "Allow anonymous select products"
ON products
FOR SELECT
TO anon
USING (true);

-- Policy 2: Allow service role to manage products (admin)
CREATE POLICY "Allow service role manage products"
ON products
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- INSERT YOUR PRODUCTS (Copy from src/data/products.js)
-- =====================================================
-- After creating the table, you need to insert your products
-- Example below (replace with your actual products):

INSERT INTO products (
  id, name, brand, price_TND, price_EUR, stock, origin, format,
  length, ring_gauge, strength, smoking_time, short_desc, long_desc,
  tasting_notes, pairing_suggestions, tags, images, premium, featured,
  rating, reviews_count
) VALUES
(
  'cohiba-robusto',
  'Cohiba Robusto',
  'Cohiba',
  45.00,
  14.00,
  5, -- ⬅️ STOCK - You can modify this!
  'Cuba',
  'Robusto',
  '124mm',
  '50',
  'Medium to Full',
  '45-60 minutes',
  'Iconic Cohiba with rich, creamy smoke and impeccable construction.',
  'The Cohiba Robusto is a benchmark of Cuban craftsmanship, offering a balanced profile of cedar, cocoa, and subtle spice.',
  '["Cedar", "Cocoa", "Leather", "Pepper", "Earth"]'::jsonb,
  '["Espresso", "Dark Rum", "Cognac"]'::jsonb,
  '["Premium", "Balanced", "Cuban"]'::jsonb,
  '["https://images.unsplash.com/photo-1541534401786-2077eed87a72"]'::jsonb,
  true,
  true,
  4.8,
  24
),
(
  'montecristo-no-2',
  'Montecristo No. 2',
  'Montecristo',
  55.00,
  17.00,
  8, -- ⬅️ STOCK - You can modify this!
  'Cuba',
  'Piramide',
  '156mm',
  '52',
  'Full',
  '60-75 minutes',
  'Legendary torpedo with bold cocoa, leather, and spice.',
  'Montecristo No. 2 stands among the most revered cigars.',
  '["Cocoa", "Leather", "Spice", "Cedar", "Coffee"]'::jsonb,
  '["Cognac", "Single Malt Whiskey", "Dark Chocolate"]'::jsonb,
  '["Iconic", "Torpedo", "Robust"]'::jsonb,
  '["https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7"]'::jsonb,
  true,
  true,
  4.9,
  42
)
ON CONFLICT (id) DO NOTHING; -- Don't insert if product already exists

-- =====================================================
-- HOW TO UPDATE STOCK FROM DATABASE
-- =====================================================

-- Update stock for a specific product:
-- UPDATE products SET stock = 10 WHERE id = 'cohiba-robusto';

-- Update stock for multiple products:
-- UPDATE products SET stock = 5 WHERE id IN ('cohiba-robusto', 'montecristo-no-2');

-- Decrease stock when order is placed (you'd do this in your code):
-- UPDATE products SET stock = stock - 1 WHERE id = 'cohiba-robusto';

-- Set product as out of stock:
-- UPDATE products SET stock = 0 WHERE id = 'cohiba-robusto';

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- View all products with stock:
-- SELECT id, name, stock, in_stock FROM products ORDER BY name;

-- View products with low stock (≤3):
-- SELECT id, name, stock FROM products WHERE stock > 0 AND stock <= 3;

-- View out of stock products:
-- SELECT id, name, stock FROM products WHERE stock = 0 OR in_stock = false;

-- =====================================================
-- IMPORTANT NOTES
-- =====================================================
-- ⚠️ If you use this products table:
-- 1. You need to update your code to fetch products from database
-- 2. Update src/pages/Products.jsx to use Supabase
-- 3. Update src/pages/Product.jsx to use Supabase
-- 4. Stock will auto-update in_stock field when stock changes
-- 5. You can manage stock directly from Supabase Table Editor
-- =====================================================

