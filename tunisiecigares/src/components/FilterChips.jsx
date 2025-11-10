// Filter Chips - Display active filters as removable chips
export default function FilterChips({ filters, onRemoveFilter, onClearAll }) {
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => value !== null && value !== '' && value !== false && value !== undefined);

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-white/60 text-sm">Filtres actifs:</span>
      {activeFilters.map(([key, value]) => (
        <button
          key={key}
          onClick={() => onRemoveFilter(key)}
          className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold border border-gold/40 rounded-full text-sm hover:bg-gold/30 transition-base group"
          aria-label={`Remove ${key} filter`}
        >
          <span>
            {key === 'query' && `Recherche: "${value}"`}
            {key === 'origin' && `Origine: ${value}`}
            {key === 'format' && `Format: ${value}`}
            {key === 'brand' && `Marque: ${value}`}
            {key === 'premiumOnly' && value && 'Premium uniquement'}
            {key === 'priceRange' && (
              value === 'under-30' ? 'Prix: < 30 TND' :
              value === '30-50' ? 'Prix: 30-50 TND' :
              value === '50-70' ? 'Prix: 50-70 TND' :
              value === 'over-70' ? 'Prix: > 70 TND' :
              `Prix: ${value}`
            )}
          </span>
          <span className="text-gold/60 group-hover:text-gold">×</span>
        </button>
      ))}
      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-white/60 text-sm hover:text-gold underline transition-base"
        >
          Tout effacer
        </button>
      )}
    </div>
  );
}
