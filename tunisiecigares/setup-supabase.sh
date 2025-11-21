#!/bin/bash

echo "🔧 Supabase Configuration Setup"
echo "================================"
echo ""
echo "This script will help you configure your Supabase credentials."
echo ""
echo "📋 To find your Supabase credentials:"
echo "   1. Go to https://app.supabase.com"
echo "   2. Select your project"
echo "   3. Go to Settings → API"
echo "   4. Copy the 'Project URL' and 'anon public' key"
echo ""
echo ""

# Check if .env already exists and has values
if [ -f .env ]; then
  if grep -q "VITE_SUPABASE_URL=https://" .env && ! grep -q "VITE_SUPABASE_URL=$" .env; then
    echo "⚠️  .env file already exists with Supabase URL configured."
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo "Keeping existing configuration."
      exit 0
    fi
  fi
fi

# Get Supabase URL
echo "Enter your Supabase Project URL:"
echo "(Example: https://abcdefghijklmnop.supabase.co)"
read -p "VITE_SUPABASE_URL: " SUPABASE_URL

# Validate URL format
if [[ ! $SUPABASE_URL =~ ^https://.*\.supabase\.co$ ]]; then
  echo "⚠️  Warning: URL doesn't match expected format (https://xxx.supabase.co)"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Get Supabase Anon Key
echo ""
echo "Enter your Supabase anon/public key:"
echo "(This is a long string starting with 'eyJ...')"
read -p "VITE_SUPABASE_ANON_KEY: " SUPABASE_KEY

# Validate key format (should start with eyJ for JWT)
if [[ ! $SUPABASE_KEY =~ ^eyJ ]]; then
  echo "⚠️  Warning: Key doesn't look like a valid JWT token (should start with 'eyJ')"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Update .env file
echo ""
echo "📝 Updating .env file..."

# Create or update .env
if [ ! -f .env ]; then
  cat > .env << EOF
# Supabase Configuration
VITE_SUPABASE_URL=$SUPABASE_URL
VITE_SUPABASE_ANON_KEY=$SUPABASE_KEY

# EmailJS Configuration (Optional)
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
EOF
else
  # Update existing .env
  if grep -q "^VITE_SUPABASE_URL=" .env; then
    sed -i.bak "s|^VITE_SUPABASE_URL=.*|VITE_SUPABASE_URL=$SUPABASE_URL|" .env
  else
    echo "VITE_SUPABASE_URL=$SUPABASE_URL" >> .env
  fi
  
  if grep -q "^VITE_SUPABASE_ANON_KEY=" .env; then
    sed -i.bak "s|^VITE_SUPABASE_ANON_KEY=.*|VITE_SUPABASE_ANON_KEY=$SUPABASE_KEY|" .env
  else
    echo "VITE_SUPABASE_ANON_KEY=$SUPABASE_KEY" >> .env
  fi
  
  # Clean up backup file
  rm -f .env.bak
fi

echo "✅ Configuration saved to .env file"
echo ""
echo "📋 Next steps:"
echo "   1. Make sure your Supabase database has the 'orders' table"
echo "   2. Run the SQL from SETUP_SQL.sql in your Supabase SQL Editor"
echo "   3. Restart your dev server (npm run dev)"
echo ""
echo "🔍 To verify your setup, check the browser console for:"
echo "   '✅ Supabase client created'"
echo ""

