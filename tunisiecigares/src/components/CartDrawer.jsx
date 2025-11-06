// src/components/CartDrawer.jsx
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-ebony border-l border-cocoa z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cocoa/60">
          <h2 className="title-gold text-2xl">Your Cart</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-cocoa/30 rounded-lg transition-base text-white"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gold/30 mb-4" />
              <p className="text-white/60">Your cart is empty</p>
              <Link
                to="/products"
                onClick={onClose}
                className="btn-primary mt-4 inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="card p-4 flex gap-4">
                <img
                  src={item.images?.[0] || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-1 truncate">{item.name}</h3>
                  <p className="text-gold text-sm font-medium">{item.price_TND} TND</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gold/20 rounded transition-base text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gold/20 rounded transition-base text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto p-1 hover:bg-red-500/20 rounded transition-base text-red-400"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-cocoa/60 p-4 space-y-3">
            <div className="flex justify-between items-center text-lg font-semibold text-white">
              <span>Total:</span>
              <span className="text-gold">{getTotal().toFixed(2)} TND</span>
            </div>
            <Link
              to="/cart"
              onClick={onClose}
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="btn-secondary w-full"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

