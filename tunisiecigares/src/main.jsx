import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; // ← AJOUTE
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider> {/* ← ENVELOPPE */}
        <App />
      </CartProvider>
    </HashRouter>
  </React.StrictMode>
);
