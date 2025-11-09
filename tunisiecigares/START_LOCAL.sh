#!/bin/bash

# Quick Start Script for Local Development
# This script starts the development server and opens the browser

echo "🚀 Starting Cigar Lounge Tunisia Development Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "   Create a .env file with your Supabase and EmailJS credentials"
    echo ""
fi

# Start development server
echo "🔥 Starting Vite development server..."
echo "   Server will be available at: http://localhost:5173"
echo "   Press Ctrl+C to stop the server"
echo ""

npm run dev

