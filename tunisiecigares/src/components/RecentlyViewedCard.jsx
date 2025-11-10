// Small thumbnail card for Recently Viewed section
import { Link } from 'react-router-dom';

export default function RecentlyViewedCard({ product }) {
  const {
    id,
    name,
    name_fr,
    price_TND,
    images = [],
  } = product;

  const img = images[0] || 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=400&auto=format&fit=crop';
  const displayName = name_fr || name;

  return (
    <Link
      to={`/product/${id}`}
      className="block group"
    >
      <div className="flex flex-col bg-ebony/50 border border-cocoa/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 h-full">
        {/* Image Container - Fixed size, no white background */}
        <div className="relative w-full h-32 sm:h-36 bg-transparent flex items-center justify-center overflow-hidden">
          <img
            src={img}
            alt={displayName}
            className="w-full h-full object-contain max-w-full max-h-full p-2 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%',
              width: 'auto',
              height: 'auto'
            }}
          />
        </div>

        {/* Product Info - Compact */}
        <div className="p-3 flex-1 flex flex-col min-h-[80px]">
          <h3 className="font-semibold text-xs md:text-sm text-white mb-1 line-clamp-2">
            {displayName}
          </h3>
          <div className="text-base md:text-lg font-bold text-gold mt-auto">
            {price_TND.toFixed(2)} TND
          </div>
        </div>
      </div>
    </Link>
  );
}

