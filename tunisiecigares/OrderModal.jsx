import { useState } from 'react';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabaseUrl = 'https://abcdxyz.supabase.co'; // ton URL
const supabaseKey = 'ta_cle_anon'; // ta clé publique (anon)
const supabase = createClient(supabaseUrl, supabaseKey);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔥 Nouveau : envoi réel vers Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('orders') // ⚠️ nom de ta table (à adapter, par ex. "orders" ou "contact")
      .insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        age: formData.age,
        quantity: formData.quantity,
        notes: formData.notes,
        product_name: productName,
        product_price: productPrice,
      }]);

    if (error) {
      console.error(error);
      alert('Erreur lors de la commande : ' + error.message);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
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
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-ebony border border-gold/30 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-ebony border-b border-gold/30 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="title-gold text-2xl">Commander</h2>
            <p className="text-white/60 text-sm mt-1">{productName} - {productPrice} TND</p>
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
              {/* ... ton formulaire inchangé ... */}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
