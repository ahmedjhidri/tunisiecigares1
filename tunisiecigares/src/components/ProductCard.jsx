import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import OrderModal from './OrderModal.jsx';
import ProductQuickView from './ProductQuickView.jsx';
import ImageZoom from './ImageZoom.jsx';
import { trackEvent } from '../lib/analytics';

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();

  const {
    id,
    name,
    price_TND,
    stock = 0,
    origin,
    format,
    short_desc,
    images = [],
    premium,
  } = product;

  const img = images[0] || 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1200&auto=format&fit=crop';

  return (
    <>
      <div className="card group h-full flex flex-col">
        <div className="relative overflow-hidden h-52">
          <ImageZoom src={img} alt={`${name} product image`} className="h-full w-full" />
          {premium && (
            <span className="absolute top-3 left-3 z-10 rounded bg-gold/90 text-ebony text-xs font-semibold px-2 py-1 shadow">Premium</span>
          )}
          {stock > 0 && stock <= 3 && (
            <span className="absolute top-3 right-3 z-10 rounded bg-orange-500/90 text-white text-xs font-semibold px-2 py-1 shadow animate-pulse">
              ⚠️ Only {stock} left!
            </span>
          )}
          {stock <= 0 && (
            <span className="absolute top-3 right-3 z-10 rounded bg-red-600/90 text-white text-xs font-semibold px-2 py-1 shadow">Out of stock</span>
          )}
          {/* Quick View Button - Appears on Hover */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsQuickViewOpen(true);
            }}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20"
            aria-label={`Quick view ${name}`}
          >
            <span className="bg-gold text-ebony px-4 py-2 rounded font-semibold text-sm">Quick View</span>
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-display text-lg text-gold">{name}</h3>
          <p className="text-white/70 text-sm mt-1">{origin} • {format}</p>
          <p className="text-white mt-2 text-sm flex-1">{short_desc}</p>
          <div className="mt-3 font-semibold text-gold">{price_TND} TND</div>
          <div className="mt-1 text-white/60 text-xs">Stock: {Math.max(0, stock)}</div>
          <div className="mt-4 flex items-center gap-2">
            {/* Touch-friendly buttons with min-height for mobile */}
            <button
              onClick={() => { 
                if (stock > 0) { 
                  addToCart(product); 
                  trackEvent('add_to_cart', 'ecommerce', product.name); 
                } 
              }}
              className={`btn-secondary flex-1 min-h-[44px] flex items-center justify-center gap-2 ${stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={`Ajouter ${name} au panier`}
              disabled={stock <= 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Panier
            </button>
            <Link 
              to={`/product/${id}`} 
              className="btn-primary flex-1 min-h-[44px] flex items-center justify-center" 
              aria-label={`Voir détails de ${name}`}
            >
              Détails
            </Link>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={name}
        productPrice={price_TND}
      />
      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
