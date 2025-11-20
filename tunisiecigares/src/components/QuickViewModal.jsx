// Quick View Modal - Aperçu rapide du produit sans quitter la page
import { useState } from 'react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { LazyImage } from './LoadingStates.jsx';
import { Link } from 'react-router-dom';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  if (!product || !isOpen) return null;
  
  const images = product.images || [];
  const mainImage = images[activeImage] || images[0] || '';
  const displayName = product.name_fr || product.name;
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };
  
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div
        className="relative bg-ebony border border-cocoa/60 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-cocoa/50 hover:bg-cocoa/70 rounded-full text-white transition-base"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Section */}
          <div>
            <div className="relative aspect-square bg-transparent rounded-lg border border-cocoa/60 mb-4 overflow-hidden">
              <LazyImage
                src={mainImage}
                alt={displayName}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded border-2 overflow-hidden transition-base ${
                      activeImage === idx
                        ? 'border-gold'
                        : 'border-cocoa/60 hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${displayName} - vue ${idx + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="title-gold text-2xl mb-2">{displayName}</h2>
                <p className="text-white/70 text-sm">
                  {product.brand} • {product.origin} • {product.format}
                </p>
              </div>
              {product.premium && (
                <span className="bg-gold/20 text-gold text-xs font-semibold px-2 py-1 rounded border border-gold/40">
                  Premium
                </span>
              )}
            </div>
            
            {/* Price */}
            <div className="text-3xl font-bold text-gold mb-4">
              {product.price_TND} TND
            </div>
            
            {/* Stock */}
            <div className="mb-4">
              <span className="text-white/70 text-sm">Stock: </span>
              <span className={`text-sm font-medium ${
                product.stock > 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {product.stock > 0 ? `${product.stock} disponible${product.stock > 1 ? 's' : ''}` : 'Épuisé'}
              </span>
            </div>
            
            {/* Short Description */}
            {product.short_desc && (
              <p className="text-white/80 text-sm mb-6 line-clamp-3">
                {product.short_desc}
              </p>
            )}
            
            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Quantité:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:bg-gold/10 hover:text-gold transition-base disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="text-white font-bold text-lg w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:bg-gold/10 hover:text-gold transition-base disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full py-3 px-4 rounded font-semibold transition-base flex items-center justify-center gap-2 ${
                  product.stock <= 0
                    ? 'bg-cocoa/50 text-white/50 cursor-not-allowed'
                    : 'bg-gold text-ebony hover:bg-gold/90'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock <= 0 ? 'Épuisé' : `Ajouter au panier (${quantity})`}
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex-1 py-3 px-4 rounded font-semibold transition-base flex items-center justify-center gap-2 border-2 ${
                    inWishlist
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:text-gold'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  {inWishlist ? 'Dans la wishlist' : 'Ajouter à la wishlist'}
                </button>
                
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded font-semibold transition-base flex items-center justify-center gap-2 border-2 border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:text-gold"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

