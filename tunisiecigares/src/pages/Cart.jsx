// tunisiecigares/src/pages/Cart.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import OrderModal from '../components/OrderModal.jsx';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container-page py-12">
        <div className="text-center py-16">
          <svg 
            className="w-24 h-24 mx-auto text-gold/30 mb-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h2 className="title-gold text-3xl mb-3">Votre panier est vide</h2>
          <p className="text-white/70 mb-6">Découvrez notre sélection de cigares premium</p>
          <Link to="/products" className="btn-primary">
            Parcourir le catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-page py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="title-gold text-3xl">Panier</h1>
          <button
            onClick={clearCart}
            className="text-sm text-white/60 hover:text-red-400 transition-base"
          >
            Vider le panier
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4">
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=400&auto=format&fit=crop'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <Link 
                    to={`/product/${item.id}`}
                    className="font-display text-lg text-gold hover:brightness-110 transition-base"
                  >
                    {item.name}
                  </Link>
                  <p className="text-white/60 text-sm mt-1">
                    {item.origin} • {item.format}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-cocoa/60 text-white/80 hover:border-gold hover:text-gold transition-base"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-cocoa/60 text-white/80 hover:border-gold hover:text-gold transition-base"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition-base ml-auto"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gold font-semibold">
                    {(item.price_TND * item.quantity).toFixed(2)} TND
                  </div>
                  <div className="text-white/50 text-sm mt-1">
                    {item.price_TND} TND × {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h3 className="font-display text-xl text-gold mb-4">Résumé</h3>
              
              <div className="space-y-3 pb-4 border-b border-cocoa/60">
                <div className="flex justify-between text-white/70">
                  <span>Sous-total</span>
                  <span>{getTotal().toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Livraison</span>
                  <span>À déterminer</span>
                </div>
              </div>

              <div className="py-4 border-b border-cocoa/60">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-gold">
                    {getTotal().toFixed(2)} TND
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="btn-primary w-full"
                >
                  Commander
                </button>
                <Link
                  to="/products"
                  className="btn-secondary w-full text-center"
                >
                  Continuer les achats
                </Link>
              </div>

              <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                <p className="text-xs text-white/70 leading-relaxed">
                  ℹ️ La commande finale sera confirmée via Messenger avec les frais de livraison exacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pass isCartOrder flag to save full cart details */}
      <OrderModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        productName="Commande panier"
        productPrice={getTotal()}
        isCartOrder={true}
      />
    </>
  );
}
