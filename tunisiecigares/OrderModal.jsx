import { useState } from 'react';
import { supabase } from '../lib/supabase'; // ← Ajoute ça

export default function OrderModal({ isOpen, onClose, productName, productPrice }) {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSuccess(false);

    const totalPrice = productPrice * formData.quantity;

    const { error } = await supabase
      .from('orders')
      .insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        age: parseInt(formData.age),
        quantity: formData.quantity,
        notes: formData.notes,
        product_name: productName,
        product_price: productPrice,
        total_price: totalPrice
      }]);

    setIsSubmitting(false);

    if (error) {
      setError(error.message);
      console.error('Erreur Supabase:', error);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          address: '', age: '', quantity: 1, notes: ''
        });
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-ebony border border-gold/30 rounded-xl shadow-2xl" onClick={e => e.stopPropagation()}>
        
        <div className="sticky top-0 bg-ebony border-b border-gold/30 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="title-gold text-2xl">Commander</h2>
            <p className="text-white/60 text-sm mt-1">{productName} - {productPrice} TND</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-gold transition-base text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gold/10">
            X
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
              {/* Tous tes inputs inchangés */}
              {/* ... (prénom, nom, email, etc.) ... */}

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm">
                  Erreur : {error}
                </div>
              )}

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-medium">Total :</span>
                  <span className="text-2xl font-bold text-gold">
                    {(productPrice * formData.quantity).toFixed(2)} TND
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-cocoa/60 text-white rounded-lg hover:bg-cocoa/30 transition-base font-medium">
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
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
