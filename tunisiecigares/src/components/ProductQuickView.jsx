// Product Quick View Modal - Fast preview without full page navigation
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { X, ShoppingCart } from 'lucide-react';

export default function ProductQuickView({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop',
  ];

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-ebony border border-gold/30 rounded-xl shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-cocoa/50 hover:bg-cocoa/70 text-white transition-base"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div>
            <div className="overflow-hidden rounded-lg border border-cocoa/60 mb-4 bg-transparent flex items-center justify-center">
              <img 
                src={images[activeImage]} 
                alt={product.name}
                className="w-full h-64 md:h-80 object-contain bg-transparent"
                loading="lazy"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`overflow-hidden rounded border-2 transition-base bg-transparent ${
                      activeImage === idx ? 'border-gold' : 'border-cocoa/60 hover:border-gold/50'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-16 object-contain bg-transparent p-1" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="title-gold text-2xl mb-2">{product.name}</h2>
                <p className="text-white/70 text-sm">{product.origin} • {product.format}</p>
              </div>
              {product.premium && (
                <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-semibold rounded border border-gold/40">
                  Premium
                </span>
              )}
            </div>

            <div className="text-2xl font-bold text-gold mb-4">
              {product.price_TND} TND
            </div>

            <div className="mb-4">
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-300' : 'text-red-300'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-white/80 text-sm mb-6 line-clamp-3">{product.short_desc || product.long_desc}</p>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`btn-secondary flex-1 flex items-center justify-center gap-2 ${
                  product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="btn-primary flex-1 text-center"
              >
                View Details
              </Link>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-white/60">Origin:</span>
                <span className="text-white ml-2">{product.origin}</span>
              </div>
              <div>
                <span className="text-white/60">Format:</span>
                <span className="text-white ml-2">{product.format}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
