// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { Home, Package, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <p className="text-9xl font-display text-gold mb-4">404</p>
          <h1 className="text-4xl font-display text-white mb-4">
            Lost in the Smoke
          </h1>
          <p className="text-white/70 text-lg">
            The page you're looking for has gone up in smoke. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link to="/products" className="btn-secondary flex items-center gap-2">
            <Package className="w-5 h-5" />
            Browse Cigars
          </Link>
        </div>

        <div className="mt-12 card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Looking for something specific?
          </h2>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search our collection..."
              className="w-full pl-10 pr-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = `#/products?search=${e.target.value}`;
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

