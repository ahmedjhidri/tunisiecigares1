// src/components/FilterBar.jsx
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, strengthLevels, priceRanges } from '../data/products';

export default function FilterBar({ onFilterChange, onSearchChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    strength: '',
    priceRange: '',
    inStock: false,
    premium: false,
  });

  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const clearFilters = () => {
    const cleared = {
      category: '',
      strength: '',
      priceRange: '',
      inStock: false,
      premium: false,
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const hasActiveFilters = Object.values(filters).some(v => v);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Search cigars..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base"
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 btn-secondary"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
          <span className="bg-gold text-ebony text-xs px-2 py-0.5 rounded-full">
            Active
          </span>
        )}
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Filter Products</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gold hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full px-3 py-2 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white focus:outline-none focus:border-gold"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Strength */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Strength
              </label>
              <select
                value={filters.strength}
                onChange={(e) => updateFilter('strength', e.target.value)}
                className="w-full px-3 py-2 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white focus:outline-none focus:border-gold"
              >
                <option value="">All Strengths</option>
                {strengthLevels.map(level => (
                  <option key={level} value={level.toLowerCase()}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => updateFilter('priceRange', e.target.value)}
                className="w-full px-3 py-2 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white focus:outline-none focus:border-gold"
              >
                <option value="">All Prices</option>
                {priceRanges.map(range => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Filters */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Quick Filters
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => updateFilter('inStock', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.premium}
                    onChange={(e) => updateFilter('premium', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Premium Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

