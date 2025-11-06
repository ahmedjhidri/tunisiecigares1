import { useMemo, useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import { ProductGridSkeleton } from '../components/LoadingStates.jsx';
import products from '../data/products.js';

export default function Products() {
  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState('');
  const [format, setFormat] = useState('');
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const origins = useMemo(() => Array.from(new Set(products.map(p => p.origin).filter(Boolean))), []);
  const formats = useMemo(() => Array.from(new Set(products.map(p => p.format).filter(Boolean))), []);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      const matchesQuery = !q || [p.name, p.origin, p.format, ...(p.tags || [])]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q));
      const matchesOrigin = !origin || p.origin === origin;
      const matchesFormat = !format || p.format === format;
      const matchesPremium = !premiumOnly || Boolean(p.premium);
      return matchesQuery && matchesOrigin && matchesFormat && matchesPremium;
    });
  }, [query, origin, format, premiumOnly]);

  return (
    <div className="container-page py-12">
      <h1 className="title-gold text-3xl">Catalog</h1>
      <p className="text-white/80 mt-2">Explore our selection of premium cigars.</p>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, origin, format, tags..."
          className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white md:col-span-2"
          aria-label="Search products"
        />
        <select
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white"
          aria-label="Filter by origin"
        >
          <option value="">All origins</option>
          {origins.map(o => (<option key={o} value={o}>{o}</option>))}
        </select>
        <div className="flex items-center gap-2">
          <select
            value={format}
            onChange={e => setFormat(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white"
            aria-label="Filter by format"
          >
            <option value="">All formats</option>
            {formats.map(f => (<option key={f} value={f}>{f}</option>))}
          </select>
          <label className="flex items-center gap-2 text-white/80 text-sm">
            <input type="checkbox" checked={premiumOnly} onChange={e => setPremiumOnly(e.target.checked)} />
            Premium
          </label>
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <>
            <ProductGrid products={filtered} />
            {filtered.length === 0 && (
              <p className="text-white/60 mt-6">No products match your filters.</p>
            )}
            {filtered.length > 0 && (
              <p className="text-white/60 mt-4 text-sm">
                Showing {filtered.length} of {products.length} products
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}


