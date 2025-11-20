// Redesigned Product Card - Clean layout matching reference design
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { LazyImage } from './LoadingStates.jsx';
import QuickViewModal from './QuickViewModal.jsx';
import { ShoppingCart, Eye } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const {
    id,
    name,
    name_fr,
    brand,
    price_TND,
    stock = 0,
    origin,
    format,
    images = [],
    premium,
    unit_info = 'À l\'unité',
    box_size = 'Unité',
  } = product;

  const img = images[0] || 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1200&auto=format&fit=crop';
  const displayName = name_fr || name;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (stock > 0) {
      addToCart(product);
      trackEvent('add_to_cart', 'ecommerce', product.name);
    }
  };

  return (
    <Link
      to={`/product/${id}`}
      className="block group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full flex flex-col bg-ebony/80 border border-cocoa/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1">
        {/* Image Container - Transparent background, no white */}
        <div className="relative bg-transparent p-4 aspect-square flex items-center justify-center overflow-hidden">
          <LazyImage
            src={img}
            alt={displayName}
            className="w-full h-full object-contain max-h-64 transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Stock Badges */}
          {premium && (
            <span className="absolute top-2 left-2 bg-gold text-ebony text-xs font-bold px-2 py-1 rounded shadow-lg z-10">
              Premium
            </span>
          )}
          {stock > 0 && stock <= 3 && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10 animate-pulse">
              Stock: {stock}
            </span>
          )}
          {stock <= 0 && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10">
              Rupture
            </span>
          )}

          {/* Quick Actions on Hover */}
          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-300 z-20 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`px-4 py-2 bg-gold text-ebony font-semibold rounded hover:bg-gold/90 transition-base flex items-center gap-2 ${
                stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label={`Ajouter ${displayName} au panier`}
            >
              <ShoppingCart className="w-4 h-4" />
              Ajouter
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickView(true);
                trackEvent('quick_view', 'ecommerce', product.name);
              }}
              className="px-4 py-2 bg-white/20 text-white font-semibold rounded hover:bg-white/30 transition-base flex items-center gap-2 backdrop-blur-sm"
              aria-label={`Aperçu rapide de ${displayName}`}
            >
              <Eye className="w-4 h-4" />
              Aperçu
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col bg-ebony/50">
          {/* Product Name - Bold */}
          <h3 className="font-bold text-lg text-white mb-1 line-clamp-2 min-h-[3rem]">
            {displayName}
          </h3>

          {/* Brand and Origin */}
          <p className="text-white/60 text-sm mb-2">
            {brand} • {origin}
          </p>

          {/* Box Size / Unit Info */}
          <p className="text-white/50 text-xs mb-3">
            {unit_info} • {format}
          </p>

          {/* Price - Clear and Visible */}
          <div className="mt-auto">
            <div className="text-2xl font-bold text-gold mb-3">
              {price_TND.toFixed(2)} TND
            </div>

            {/* Add to Cart Button - Always Visible */}
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`w-full py-2.5 px-4 rounded font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                stock <= 0
                  ? 'bg-cocoa/50 text-white/50 cursor-not-allowed'
                  : 'bg-gold text-ebony hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/30 active:scale-95'
              }`}
              aria-label={`Ajouter ${displayName} au panier`}
            >
              <ShoppingCart className="w-4 h-4" />
              {stock <= 0 ? 'Rupture de stock' : 'Ajouter au panier'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </Link>
  );
}
