import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx';
import App from './App.jsx';
import './styles/index.css';
import { Analytics } from '@vercel/analytics/react';

// Add error handling for React mounting
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  console.log('🚀 Starting React app...');
  
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <App />
                <Analytics />
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  
  console.log('✅ React app mounted successfully');
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error').style.display = 'block';
  document.getElementById('error').innerHTML = 
    '<h1>Error Loading Site</h1><p>' + error.message + '</p><p>Check browser console (F12) for details.</p>';
}
