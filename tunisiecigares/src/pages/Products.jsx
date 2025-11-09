import { useMemo, useState, useEffect, useRef } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import { ProductGridSkeleton } from '../components/LoadingStates.jsx';
import FilterChips from '../components/FilterChips.jsx';
import SearchAutocomplete from '../components/SearchAutocomplete.jsx';
import CollapsibleFilters from '../components/CollapsibleFilters.jsx';
import products from '../data/products.js';

export default function Products() {
  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState('');
  const [format, setFormat] = useState('');
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const origins = useMemo(() => Array.from(new Set(products.map(p => p.origin).filter(Boolean))), []);
  const formats = useMemo(() => Array.from(new Set(products.map(p => p.format).filter(Boolean))), []);

  // Filter object for FilterChips component
  const filters = useMemo(() => {
    const result = {};
    if (query.trim()) result.query = query.trim();
    if (origin) result.origin = origin;
    if (format) result.format = format;
    if (premiumOnly) result.premiumOnly = true;
    return result;
  }, [query, origin, format, premiumOnly]);

  const handleRemoveFilter = (filterKey) => {
    switch (filterKey) {
      case 'query':
        setQuery('');
        break;
      case 'origin':
        setOrigin('');
        break;
      case 'format':
        setFormat('');
        break;
      case 'premiumOnly':
        setPremiumOnly(false);
        break;
    }
  };

  const handleClearAll = () => {
    setQuery('');
    setOrigin('');
    setFormat('');
    setPremiumOnly(false);
  };

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

  const searchInputRef = useRef(null);
  const [showAutocomplete, setShowAutocomplete] = useState(true);

  const handleSearchSelect = (product) => {
    setQuery(product.name);
    setShowAutocomplete(false);
    // Navigate to product page would be handled by the Link in SearchAutocomplete
  };

  return (
    <div className="container-page py-12">
      <h1 className="title-gold text-3xl">Catalog</h1>
      <p className="text-white/80 mt-2">Explore our selection of premium cigars.</p>

      {/* Search with Autocomplete */}
      <div className="mt-6 relative">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setShowAutocomplete(true);
            }}
            onFocus={() => setShowAutocomplete(true)}
            placeholder="Search by name, origin, format, tags..."
            className="w-full px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base"
            aria-label="Search products"
            aria-autocomplete="list"
            aria-expanded={showAutocomplete && query.length >= 2}
          />
          {showAutocomplete && query.length >= 2 && (
            <SearchAutocomplete
              query={query}
              onSelect={handleSearchSelect}
              className="absolute top-full left-0 right-0 z-50"
            />
          )}
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="mt-6 hidden md:grid md:grid-cols-3 gap-3">
        <select
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base"
          aria-label="Filter by origin"
        >
          <option value="">All origins</option>
          {origins.map(o => (<option key={o} value={o}>{o}</option>))}
        </select>
        <select
          value={format}
          onChange={e => setFormat(e.target.value)}
          className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base"
          aria-label="Filter by format"
        >
          <option value="">All formats</option>
          {formats.map(f => (<option key={f} value={f}>{f}</option>))}
        </select>
        <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60">
          <input type="checkbox" checked={premiumOnly} onChange={e => setPremiumOnly(e.target.checked)} />
          Premium Only
        </label>
      </div>

      {/* Mobile Collapsible Filters */}
      <div className="mt-4 md:hidden">
        <CollapsibleFilters title="Filters" defaultOpen={false}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Origin</label>
              <select
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base"
                aria-label="Filter by origin"
              >
                <option value="">All origins</option>
                {origins.map(o => (<option key={o} value={o}>{o}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Format</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value)}
                className="w-full px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base"
                aria-label="Filter by format"
              >
                <option value="">All formats</option>
                {formats.map(f => (<option key={f} value={f}>{f}</option>))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
              <input type="checkbox" checked={premiumOnly} onChange={e => setPremiumOnly(e.target.checked)} />
              Premium Only
            </label>
          </div>
        </CollapsibleFilters>
      </div>

      {/* Filter Chips */}
      <FilterChips
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />

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


