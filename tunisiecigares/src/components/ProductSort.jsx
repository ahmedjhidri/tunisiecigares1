// Product Sort Component - Sort by Prix, Nom, Marque
import { ArrowUpDown } from 'lucide-react';

export default function ProductSort({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'default', label: 'Par défaut' },
    { value: 'price-asc', label: 'Prix: Croissant' },
    { value: 'price-desc', label: 'Prix: Décroissant' },
    { value: 'name-asc', label: 'Nom: A-Z' },
    { value: 'name-desc', label: 'Nom: Z-A' },
    { value: 'brand-asc', label: 'Marque: A-Z' },
    { value: 'brand-desc', label: 'Marque: Z-A' },
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-white/60" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white focus:outline-none focus:border-gold transition-base text-sm"
        aria-label="Trier les produits"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

