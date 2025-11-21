// Cart Confirmation Modal - Similar to lecigare.ch design
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CartConfirmationModal({ isOpen, onClose, product }) {
  const navigate = useNavigate();
  const { cart, confirmAddToCart, updateQuantity, getTotal } = useCart();
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // Initialize quantity from pending quantity or existing cart item
  useEffect(() => {
    if (product && isOpen) {
      // Check if this is a pending addition (has pendingQuantity)
      if (product.pendingQuantity) {
        setQuantity(product.pendingQuantity);
      } else {
        // Otherwise check if already in cart
        const cartItem = cart.find(item => item.id === product.id);
        setQuantity(cartItem ? cartItem.quantity : 1);
      }
    }
  }, [product, cart, isOpen]);

  // Handle Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle click outside
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  const displayName = product.name_fr || product.name;
  const productImage = product.images?.[0] || 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=400&auto=format&fit=crop';
  const unitPrice = product.price_TND;
  const totalPrice = unitPrice * quantity;

  // Get cart total (including this product)
  const cartTotal = getTotal();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    
    // If product is already in cart, update it immediately
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      updateQuantity(product.id, newQuantity);
    }
    // Otherwise, just update local state (will be added on confirm)
  };

  const handleContinueShopping = () => {
    // If product is pending (not yet in cart), don't add it - user cancelled
    const cartItem = cart.find(item => item.id === product.id);
    if (!cartItem && product.pendingQuantity) {
      // User cancelled - don't add to cart, just close
      onClose();
      return;
    }
    
    // If already in cart, just close (quantity was already updated if changed)
    onClose();
  };

  const handleProceedToCheckout = () => {
    // If product is pending (not yet in cart), add it first
    const cartItem = cart.find(item => item.id === product.id);
    if (!cartItem && product.pendingQuantity) {
      // Remove pendingQuantity from product object before adding
      const productToAdd = { ...product };
      delete productToAdd.pendingQuantity;
      confirmAddToCart(productToAdd, quantity);
    }
    
    onClose();
    navigate('/cart');
  };

  // Handle confirm button (add to cart)
  const handleConfirm = () => {
    // Remove pendingQuantity from product object before adding
    const productToAdd = { ...product };
    delete productToAdd.pendingQuantity;
    
    confirmAddToCart(productToAdd, quantity);
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      {/* Semi-transparent gray background overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative bg-ebony border border-cocoa/60 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-cocoa/50 hover:bg-cocoa/70 text-white/80 hover:text-white transition-base"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-cocoa/60 bg-ebony/95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-gold" />
            </div>
            <h2 id="cart-modal-title" className="text-xl font-bold text-white">
              Article ajouté au panier
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="flex gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden bg-transparent p-3 border-2 border-cocoa/30 shadow-lg flex items-center justify-center">
                <img
                  src={productImage}
                  alt={displayName}
                  className="w-full h-full object-contain max-w-full max-h-full"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-white mb-1 line-clamp-2">
                {displayName}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {product.brand} • {product.origin}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/80 text-sm font-medium">Quantité:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:bg-gold/10 hover:text-gold transition-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-cocoa/60 disabled:hover:bg-cocoa/20 disabled:hover:text-white/80"
                    aria-label="Réduire la quantité"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center text-white font-bold text-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={product.stock > 0 && quantity >= product.stock}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-cocoa/60 bg-cocoa/20 text-white/80 hover:border-gold hover:bg-gold/10 hover:text-gold transition-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-cocoa/60 disabled:hover:bg-cocoa/20 disabled:hover:text-white/80"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stock > 0 && quantity >= product.stock && (
                  <span className="text-orange-400 text-xs">Stock limité: {product.stock}</span>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-cocoa/60">
                <div className="flex justify-between items-center text-white/70 text-sm">
                  <span>Prix unitaire:</span>
                  <span className="font-medium">{unitPrice.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between items-center text-white/70 text-sm">
                  <span>Quantité:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-gold/30">
                  <span className="text-white font-bold text-lg">Total:</span>
                  <span className="text-2xl font-bold text-gold">
                    {totalPrice.toFixed(2)} TND
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="mt-6 pt-6 border-t border-cocoa/60">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Total du panier:</span>
                <span className="text-xl font-bold text-gold">
                  {cartTotal.toFixed(2)} TND
                </span>
              </div>
              <p className="text-white/50 text-xs mt-2">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} article(s) dans le panier
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer - Buttons */}
        <div className="p-6 border-t border-cocoa/60 bg-ebony/95 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleContinueShopping}
            className="flex-1 px-6 py-3.5 rounded-lg bg-cocoa/30 border-2 border-cocoa/60 text-white font-semibold hover:bg-cocoa/50 hover:border-cocoa/80 active:scale-95 transition-all duration-200"
          >
            {cart.find(item => item.id === product.id) ? 'Fermer' : 'Annuler'}
          </button>
          {!cart.find(item => item.id === product.id) && (
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3.5 rounded-lg bg-gold/80 border-2 border-gold text-ebony font-bold hover:bg-gold hover:shadow-lg hover:shadow-gold/30 active:scale-95 transition-all duration-200"
            >
              Confirmer l'ajout
            </button>
          )}
          {cart.find(item => item.id === product.id) && (
            <button
              onClick={handleProceedToCheckout}
              className="flex-1 px-6 py-3.5 rounded-lg bg-gold text-ebony font-bold hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/30 active:scale-95 transition-all duration-200"
            >
              Procéder au paiement
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

