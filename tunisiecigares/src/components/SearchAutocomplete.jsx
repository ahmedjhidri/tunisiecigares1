// Search Autocomplete Component - Provides search suggestions as user types
import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.js';
import { LazyImage } from './LoadingStates.jsx';

export default function SearchAutocomplete({ query, onSelect, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const suggestions = useMemo(() => {
    if (!query || query.trim().length < 2) return [];

    const q = query.trim().toLowerCase();
    const matches = products
      .filter(p => {
        const searchText = `${p.name} ${p.origin} ${p.format} ${p.brand || ''} ${(p.tags || []).join(' ')}`.toLowerCase();
        return searchText.includes(q);
      })
      .slice(0, 5); // Limit to 5 suggestions

    return matches;
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Show autocomplete when there are suggestions and query is long enough
  useEffect(() => {
    setIsOpen(suggestions.length > 0 && query.trim().length >= 2);
    setHighlightedIndex(-1);
  }, [suggestions, query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
            handleSelect(suggestions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, suggestions, highlightedIndex]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex];
      if (item) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (product) => {
    if (onSelect) {
      onSelect(product);
    }
    setIsOpen(false);
  };

  if (!isOpen || suggestions.length === 0) return null;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="absolute top-full left-0 right-0 mt-1 bg-ebony border border-gold/30 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto animate-fade-in">
        <div ref={listRef} className="py-2">
          {suggestions.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={() => handleSelect(product)}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-cocoa/30 transition-base ${
                index === highlightedIndex ? 'bg-cocoa/40' : ''
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=100&auto=format&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{product.name}</div>
                <div className="text-white/60 text-sm">{product.origin} • {product.format}</div>
                <div className="text-gold text-sm font-semibold">{product.price_TND} TND</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-cocoa/60 text-white/60 text-xs">
          Use ↑↓ to navigate, Enter to select, Esc to close
        </div>
      </div>
    </div>
  );
}
