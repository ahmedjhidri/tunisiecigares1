import { useState } from 'react';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi (remplacez par votre API Formspree ou backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Réinitialiser après 2 secondes
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
    }, 1000);

    // Pour utiliser Formspree, décommentez ceci :
    /*
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          product: productName,
          price: productPrice,
          total: productPrice * formData.quantity
        }),
      });

      if (response.ok) {
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
    } catch (error) {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
    */
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
        {/* Header */}
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

        {/* Body */}
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
              {/* Prénom & Nom */}
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

              {/* Email */}
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

              {/* Téléphone */}
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

              {/* Adresse */}
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

              {/* Âge & Quantité */}
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
              </div>

              {/* Notes additionnelles */}
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

              {/* Total */}
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-medium">Total :</span>
                  <span className="text-2xl font-bold text-gold">
                    {(productPrice * formData.quantity).toFixed(2)} TND
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-cocoa/60 text-white rounded-lg hover:bg-cocoa/30 transition-base font-medium"
                >
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
