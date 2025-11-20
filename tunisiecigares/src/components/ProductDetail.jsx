// tunisiecigares/src/components/ProductDetail.jsx
import { useMemo, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import OrderModal from './OrderModal.jsx';
import ImageZoom from './ImageZoom.jsx';
import FloatingAddToCart from './FloatingAddToCart.jsx';
import ShareButtons from './ShareButtons.jsx';
import TrustBadges from './TrustBadges.jsx';
import { Plus, Minus } from 'lucide-react';

export default function ProductDetail({ product }) {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const images = useMemo(() => product.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop',
  ], [product]);

  // Réinitialiser la quantité à 1 quand le produit change
  useEffect(() => {
    setQuantity(1);
    setActive(0);
  }, [product.id]);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="overflow-hidden rounded-lg border border-cocoa/60 mb-4 h-96 bg-transparent flex items-center justify-center">
            <ImageZoom
              src={images[active]}
              alt={`${product.name} - view ${active + 1}`}
              className="w-full h-full"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`overflow-hidden rounded border-2 transition-base bg-transparent ${
                    active === idx ? 'border-gold' : 'border-cocoa/60 hover:border-gold/50'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    loading="lazy" 
                    decoding="async" 
                    className="w-full h-20 object-contain bg-transparent p-1" 
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
              <h1 className="title-gold text-3xl mb-2">{product.name}</h1>
              <p className="text-white/70">{product.origin} • {product.format}</p>
            </div>
            {product.premium && (
              <span className="rounded bg-gold/20 text-gold text-sm font-semibold px-3 py-1 border border-gold/40">
                Premium
              </span>
            )}
          </div>

          <div className="text-3xl font-bold text-gold mb-6">
            {product.price_TND} TND
          </div>

          <div className="mb-4">
            <span className="text-white/70 text-sm">Stock: </span>
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {Math.max(0, product.stock || 0)} {product.stock > 0 ? 'disponible' : 'épuisé'}
            </span>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-3">Quantité:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:bg-gold/10 hover:text-gold transition-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-cocoa/60 disabled:hover:bg-cocoa/20 disabled:hover:text-white/80"
                    aria-label="Réduire la quantité"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      const clampedValue = Math.max(1, Math.min(value, product.stock));
                      setQuantity(clampedValue);
                    }}
                    className="w-20 text-center text-white font-bold text-xl bg-cocoa/30 border border-cocoa/60 rounded-lg py-2 focus:outline-none focus:border-gold"
                  />
                  <button
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:bg-gold/10 hover:text-gold transition-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-cocoa/60 disabled:hover:bg-cocoa/20 disabled:hover:text-white/80"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-white/60 text-sm">
                  Max: {product.stock}
                </span>
              </div>
            </div>
          )}

          <div className="prose prose-invert mb-6">
            <p className="text-white/90 leading-relaxed">{product.long_desc}</p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 text-sm rounded-full bg-cocoa/40 text-white/80 border border-cocoa/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => addToCart(product, quantity)}
              className={`btn-secondary flex-1 flex items-center justify-center gap-2 ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={`Ajouter ${quantity} ${product.name} au panier`}
              disabled={product.stock <= 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Ajouter au panier {quantity > 1 ? `(${quantity})` : ''}
            </button>
            <button 
              className={`btn-primary flex-1 ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={() => setIsModalOpen(true)}
              aria-label={`Commander ${product.name}`}
              disabled={product.stock <= 0}
            >
              Commander maintenant
            </button>
          </div>

          {/* Share Buttons */}
          <div className="mt-6">
            <ShareButtons product={product} />
          </div>

          {/* Additional Info Card */}
          <div className="card p-4 mt-6">
            <h3 className="font-display text-gold text-lg mb-3">Informations</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Origine</span>
                <span className="text-white font-medium">{product.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Format</span>
                <span className="text-white font-medium">{product.format}</span>
              </div>
              {product.premium && (
                <div className="flex justify-between">
                  <span className="text-white/60">Catégorie</span>
                  <span className="text-gold font-medium">Premium</span>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6">
            <TrustBadges variant="inline" />
          </div>

          {/* Warning Message */}
          <div className="mt-6 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
            <p className="text-yellow-200 text-xs leading-relaxed">
              ⚠️ <strong>Avertissement :</strong> Réservé aux adultes de 18 ans et plus. Fumer nuit gravement à votre santé.
            </p>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        productPrice={product.price_TND}
      />
      <FloatingAddToCart product={product} />
    </>
  );
}
