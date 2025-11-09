import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <HelmetProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <App />
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </HelmetProvider>
    </HashRouter>
  </React.StrictMode>
);
