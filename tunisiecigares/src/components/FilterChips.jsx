// Filter Chips - Display active filters as removable chips
export default function FilterChips({ filters, onRemoveFilter, onClearAll }) {
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => value !== null && value !== '' && value !== false && value !== undefined);

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-white/60 text-sm">Active filters:</span>
      {activeFilters.map(([key, value]) => (
        <button
          key={key}
          onClick={() => onRemoveFilter(key)}
          className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold border border-gold/40 rounded-full text-sm hover:bg-gold/30 transition-base group"
          aria-label={`Remove ${key} filter`}
        >
          <span>
            {key === 'query' && `Search: "${value}"`}
            {key === 'origin' && `Origin: ${value}`}
            {key === 'format' && `Format: ${value}`}
            {key === 'premiumOnly' && value && 'Premium Only'}
          </span>
          <span className="text-gold/60 group-hover:text-gold">×</span>
        </button>
      ))}
      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-white/60 text-sm hover:text-gold underline transition-base"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
