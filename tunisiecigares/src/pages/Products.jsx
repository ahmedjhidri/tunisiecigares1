// Redesigned Products Page - Clean layout matching reference
import { useMemo, useState, useEffect, useRef } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import { ProductGridSkeleton } from '../components/LoadingStates.jsx';
import FilterChips from '../components/FilterChips.jsx';
import SearchAutocomplete from '../components/SearchAutocomplete.jsx';
import CollapsibleFilters from '../components/CollapsibleFilters.jsx';
import ProductSort from '../components/ProductSort.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import products from '../data/products.js';

export default function Products() {
  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState('');
  const [format, setFormat] = useState('');
  const [brand, setBrand] = useState('');
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  const origins = useMemo(() => Array.from(new Set(products.map(p => p.origin).filter(Boolean))), []);
  const formats = useMemo(() => Array.from(new Set(products.map(p => p.format).filter(Boolean))), []);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand).filter(Boolean))), []);

  // Filter object for FilterChips component
  const filters = useMemo(() => {
    const result = {};
    if (query.trim()) result.query = query.trim();
    if (origin) result.origin = origin;
    if (format) result.format = format;
    if (brand) result.brand = brand;
    if (premiumOnly) result.premiumOnly = true;
    if (priceRange) result.priceRange = priceRange;
    return result;
  }, [query, origin, format, brand, premiumOnly, priceRange]);

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
      case 'brand':
        setBrand('');
        break;
      case 'premiumOnly':
        setPremiumOnly(false);
        break;
      case 'priceRange':
        setPriceRange('');
        break;
    }
  };

  const handleClearAll = () => {
    setQuery('');
    setOrigin('');
    setFormat('');
    setBrand('');
    setPremiumOnly(false);
    setPriceRange('');
  };

  // Filter products
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      const matchesQuery = !q || [p.name, p.name_fr, p.brand, p.origin, p.format, ...(p.tags || [])]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q));
      const matchesOrigin = !origin || p.origin === origin;
      const matchesFormat = !format || p.format === format;
      const matchesBrand = !brand || p.brand === brand;
      const matchesPremium = !premiumOnly || Boolean(p.premium);
      
      // Price range filter
      let matchesPrice = true;
      if (priceRange) {
        if (priceRange === 'under-30') matchesPrice = p.price_TND < 30;
        else if (priceRange === '30-50') matchesPrice = p.price_TND >= 30 && p.price_TND <= 50;
        else if (priceRange === '50-70') matchesPrice = p.price_TND >= 50 && p.price_TND <= 70;
        else if (priceRange === 'over-70') matchesPrice = p.price_TND > 70;
      }
      
      return matchesQuery && matchesOrigin && matchesFormat && matchesBrand && matchesPremium && matchesPrice;
    });
  }, [query, origin, format, brand, premiumOnly, priceRange]);

  // Sort products
  const sorted = useMemo(() => {
    const sortedProducts = [...filtered];
    
    switch (sortBy) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price_TND - b.price_TND);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price_TND - a.price_TND);
      case 'name-asc':
        return sortedProducts.sort((a, b) => {
          const nameA = (a.name_fr || a.name).toLowerCase();
          const nameB = (b.name_fr || b.name).toLowerCase();
          return nameA.localeCompare(nameB);
        });
      case 'name-desc':
        return sortedProducts.sort((a, b) => {
          const nameA = (a.name_fr || a.name).toLowerCase();
          const nameB = (b.name_fr || b.name).toLowerCase();
          return nameB.localeCompare(nameA);
        });
      case 'brand-asc':
        return sortedProducts.sort((a, b) => {
          const brandA = (a.brand || '').toLowerCase();
          const brandB = (b.brand || '').toLowerCase();
          return brandA.localeCompare(brandB);
        });
      case 'brand-desc':
        return sortedProducts.sort((a, b) => {
          const brandA = (a.brand || '').toLowerCase();
          const brandB = (b.brand || '').toLowerCase();
          return brandB.localeCompare(brandA);
        });
      default:
        return sortedProducts;
    }
  }, [filtered, sortBy]);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const searchInputRef = useRef(null);
  const [showAutocomplete, setShowAutocomplete] = useState(true);

  const handleSearchSelect = (product) => {
    setQuery(product.name);
    setShowAutocomplete(false);
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Accueil', path: '/' },
          { label: 'Nos Cigares', path: '/products' }
        ]}
      />
      <div className="container-page py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
        <h1 className="title-gold text-3xl md:text-4xl mb-2">Nos Cigares</h1>
        <p className="text-white/70 text-sm md:text-base">
          Découvrez notre sélection de cigares premium
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
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
            placeholder="Rechercher par nom, marque, origine..."
            className="w-full px-4 py-3 rounded-lg bg-cocoa/30 border border-cocoa/60 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base text-sm md:text-base"
            aria-label="Rechercher des produits"
            aria-autocomplete="list"
            aria-expanded={showAutocomplete && query.length >= 2}
          />
          {showAutocomplete && query.length >= 2 && (
            <SearchAutocomplete
              query={query}
              onSelect={handleSearchSelect}
              className="absolute top-full left-0 right-0 z-50 mt-1"
            />
          )}
        </div>
      </div>

      {/* Filters and Sort - Desktop */}
      <div className="hidden lg:flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          {/* Brand Filter */}
          <select
            value={brand}
            onChange={e => setBrand(e.target.value)}
            className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
            aria-label="Filtrer par marque"
          >
            <option value="">Toutes les marques</option>
            {brands.map(b => (<option key={b} value={b}>{b}</option>))}
          </select>

          {/* Origin Filter */}
          <select
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
            aria-label="Filtrer par origine"
          >
            <option value="">Toutes les origines</option>
            {origins.map(o => (<option key={o} value={o}>{o}</option>))}
          </select>

          {/* Format Filter */}
          <select
            value={format}
            onChange={e => setFormat(e.target.value)}
            className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
            aria-label="Filtrer par format"
          >
            <option value="">Tous les formats</option>
            {formats.map(f => (<option key={f} value={f}>{f}</option>))}
          </select>

          {/* Price Range Filter */}
          <select
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
            aria-label="Filtrer par prix"
          >
            <option value="">Tous les prix</option>
            <option value="under-30">Moins de 30 TND</option>
            <option value="30-50">30 - 50 TND</option>
            <option value="50-70">50 - 70 TND</option>
            <option value="over-70">Plus de 70 TND</option>
          </select>

          {/* Premium Filter */}
          <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 hover:border-gold/50 transition-base">
            <input 
              type="checkbox" 
              checked={premiumOnly} 
              onChange={e => setPremiumOnly(e.target.checked)}
              className="w-4 h-4"
            />
            Premium
          </label>
        </div>

        {/* Sort */}
        <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {/* Mobile Collapsible Filters */}
      <div className="lg:hidden mb-4 space-y-3">
        <CollapsibleFilters title="Filtres" defaultOpen={false}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Marque</label>
              <select
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="w-full px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
              >
                <option value="">Toutes les marques</option>
                {brands.map(b => (<option key={b} value={b}>{b}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Origine</label>
              <select
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
              >
                <option value="">Toutes les origines</option>
                {origins.map(o => (<option key={o} value={o}>{o}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Format</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value)}
                className="w-full px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
              >
                <option value="">Tous les formats</option>
                {formats.map(f => (<option key={f} value={f}>{f}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Prix</label>
              <select
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
              >
                <option value="">Tous les prix</option>
                <option value="under-30">Moins de 30 TND</option>
                <option value="30-50">30 - 50 TND</option>
                <option value="50-70">50 - 70 TND</option>
                <option value="over-70">Plus de 70 TND</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
              <input type="checkbox" checked={premiumOnly} onChange={e => setPremiumOnly(e.target.checked)} />
              Premium uniquement
            </label>
          </div>
        </CollapsibleFilters>

        {/* Mobile Sort */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">
            {sorted.length} produit{sorted.length > 1 ? 's' : ''}
          </span>
          <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {/* Filter Chips */}
      <FilterChips
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />

      {/* Products Grid */}
      <div className="mt-6">
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <>
            <ProductGrid products={sorted} />
            {sorted.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg mb-2">Aucun produit trouvé</p>
                <p className="text-white/40 text-sm">Essayez de modifier vos filtres</p>
              </div>
            )}
            {sorted.length > 0 && (
              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm">
                  Affichage de {sorted.length} produit{sorted.length > 1 ? 's' : ''} sur {products.length}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      </div>
    </>
  );
}
