// tunisiecigares/src/components/OrderModal.jsx
import { useState } from 'react';
import { sendOrderEmail, isEmailEnabled } from '../lib/email';
import { useCart } from '../context/CartContext.jsx';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function OrderModal({ isOpen, onClose, productName, productPrice, isCartOrder = false }) {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    quantity: 1,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Vérification de l'âge
    if (parseInt(formData.age) < 18) {
      setError('❌ Vous devez avoir au moins 18 ans pour commander.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase n\'est pas configuré. Veuillez configurer vos variables d\'environnement.');
      }

      let orderData;

      if (isCartOrder && cart.length > 0) {
        // FULL CART ORDER - Save all items with details
        const items = cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          price: item.price_TND,
          quantity: item.quantity,
          subtotal: item.price_TND * item.quantity
        }));

        const total = cart.reduce((sum, item) => sum + (item.price_TND * item.quantity), 0);
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Calculate average price per item for database compatibility
        const averagePrice = total / totalQuantity;

        orderData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          age: parseInt(formData.age),
          product_name: `Commande de ${cart.length} produit(s)`, // Summary
          product_price: averagePrice, // ← CHANGED: Average price instead of null
          quantity: totalQuantity, // Total items
          total: total,
          notes: formData.notes || null,
          order_items: JSON.stringify(items), // ← KEY: Save full cart as JSON
          order_type: 'cart'
        };
      } else {
        // SINGLE PRODUCT ORDER
        const total = productPrice * formData.quantity;

        orderData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          age: parseInt(formData.age),
          product_name: productName,
          product_price: productPrice,
          quantity: parseInt(formData.quantity),
          total: total,
          notes: formData.notes || null,
          order_items: JSON.stringify([{
            product_name: productName,
            price: productPrice,
            quantity: parseInt(formData.quantity),
            subtotal: total
          }]),
          order_type: 'single'
        };
      }

      // Insert into Supabase
      const { data, error: supabaseError } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (supabaseError) throw supabaseError;

      console.log('Commande créée:', data);

      // Fire and forget: send confirmation email if configured
      try {
        if (isEmailEnabled()) {
          await sendOrderEmail({
            toEmail: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            address: formData.address,
            items: JSON.parse(orderData.order_items),
            total: orderData.total
          });
        }
      } catch (emailErr) {
        console.warn('Email confirmation failed (non-blocking):', emailErr?.message || emailErr);
      }
      
      // Clear cart if it was a cart order
      if (isCartOrder) {
        clearCart();
      }

      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          age: '',
          quantity: 1,
          notes: ''
        });
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      setError(err.message || 'Une erreur est survenue. Veuillez contacter via Messenger.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Calculate display values
  const displayTotal = isCartOrder 
    ? cart.reduce((sum, item) => sum + (item.price_TND * item.quantity), 0)
    : productPrice * formData.quantity;

  const displayProductName = isCartOrder 
    ? `Commande de ${cart.length} produit${cart.length > 1 ? 's' : ''}`
    : productName;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-ebony border border-gold/30 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-ebony border-b border-gold/30 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="title-gold text-2xl">Commander</h2>
            <p className="text-white/60 text-sm mt-1">{displayProductName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-gold transition-base text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gold/10"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-gold mb-2">Commande envoyée !</h3>
              <p className="text-white/70">Nous vous contactons très bientôt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {!isSupabaseConfigured() && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ Base de données non configurée. Veuillez nous contacter via Messenger.
                  </p>
                </div>
              )}

              {/* Show cart items if cart order */}
              {isCartOrder && cart.length > 0 && (
                <div className="bg-cocoa/20 border border-gold/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gold mb-3">Détails de la commande :</h4>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-white/80">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-gold font-medium">
                          {(item.price_TND * item.quantity).toFixed(2)} TND
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base"
                  placeholder="jean.dupont@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Numéro de téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base"
                  placeholder="+216 XX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Adresse de livraison <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base resize-none"
                  placeholder="Rue, Ville, Code postal"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Âge <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base"
                    placeholder="18+"
                  />
                  <p className="text-xs text-white/50 mt-1">Vous devez avoir 18 ans ou plus</p>
                </div>
                {!isCartOrder && (
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Quantité <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Notes additionnelles (optionnel)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 bg-cocoa/30 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold transition-base resize-none"
                  placeholder="Instructions spéciales..."
                />
              </div>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-medium">Total :</span>
                  <span className="text-2xl font-bold text-gold">
                    {displayTotal.toFixed(2)} TND
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-cocoa/60 text-white rounded-lg hover:bg-cocoa/30 transition-base font-medium"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isSupabaseConfigured()}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Confirmer la commande'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
