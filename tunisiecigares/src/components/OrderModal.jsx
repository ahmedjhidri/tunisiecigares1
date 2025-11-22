// tunisiecigares/src/components/OrderModal.jsx
import { useEffect, useRef, useState } from 'react';
import { showSuccessOverlay } from './SuccessOverlay.jsx';
import { sendOrderEmail, isEmailEnabled, EmailError } from '../lib/email';
import { useCart } from '../context/CartContext.jsx';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { formatPhoneNumber, validatePhoneNumber } from '../utils/phoneMask.js';
import { validateOrderForm } from '../utils/validation.js';
import LoadingSpinner from './LoadingSpinner.jsx';

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
  const [countdown, setCountdown] = useState(3);
  const confettiRef = useRef(null);
  const [error, setError] = useState('');
  // Real-time validation states
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Real-time validation
  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          errors[name] = 'Ce champ est requis';
        } else if (value.trim().length < 2) {
          errors[name] = 'Minimum 2 caractères';
        } else {
          delete errors[name];
        }
        break;
      case 'email':
        if (!value.trim()) {
          errors[name] = 'Email requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[name] = 'Format email invalide';
        } else {
          delete errors[name];
        }
        break;
      case 'phone':
        if (!value.trim()) {
          errors[name] = 'Téléphone requis';
        } else if (!validatePhoneNumber(value)) {
          errors[name] = 'Format: +216 XX XXX XXX';
        } else {
          delete errors[name];
        }
        break;
      case 'address':
        if (!value.trim()) {
          errors[name] = 'Adresse requise';
        } else if (value.trim().length < 10) {
          errors[name] = 'Adresse trop courte';
        } else if (!/(\d|rue|avenue|av\.|street|city|ville)/i.test(value)) {
          errors[name] = 'Inclure numéro/rue et ville';
        } else {
          delete errors[name];
        }
        break;
      case 'age':
        const ageNum = parseInt(value);
        if (!value) {
          errors[name] = 'Âge requis';
        } else if (isNaN(ageNum) || ageNum < 18) {
          errors[name] = 'Vous devez avoir 18 ans ou plus';
        } else {
          delete errors[name];
        }
        break;
      case 'quantity':
        const qtyNum = parseInt(value);
        if (!value || isNaN(qtyNum) || qtyNum < 1) {
          errors[name] = 'Quantité minimale: 1';
        } else {
          delete errors[name];
        }
        break;
    }
    
    setFieldErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Apply phone mask
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    setError('');
    
    // Real-time validation for touched fields
    if (touchedFields[name]) {
      validateField(name, processedValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Mark all fields as touched and validate synchronously
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'age'];
    if (!isCartOrder) requiredFields.push('quantity');
    
    const newTouchedFields = { ...touchedFields };
    const newFieldErrors = {};
    
    // Validate all required fields
    requiredFields.forEach(field => {
      newTouchedFields[field] = true;
      const value = formData[field];
      
      // Run validation logic
      switch (field) {
        case 'firstName':
        case 'lastName':
          if (!value || !value.trim()) {
            newFieldErrors[field] = 'Ce champ est requis';
          } else if (value.trim().length < 2) {
            newFieldErrors[field] = 'Minimum 2 caractères';
          }
          break;
        case 'email':
          if (!value || !value.trim()) {
            newFieldErrors[field] = 'Email requis';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            newFieldErrors[field] = 'Format email invalide';
          }
          break;
        case 'phone':
          if (!value || !value.trim()) {
            newFieldErrors[field] = 'Téléphone requis';
          } else if (!validatePhoneNumber(value)) {
            newFieldErrors[field] = 'Format: +216 XX XXX XXX';
          }
          break;
        case 'address':
          if (!value || !value.trim()) {
            newFieldErrors[field] = 'Adresse requise';
          } else if (value.trim().length < 10) {
            newFieldErrors[field] = 'Adresse trop courte';
          } else if (!/(\d|rue|avenue|av\.|street|city|ville)/i.test(value)) {
            newFieldErrors[field] = 'Inclure numéro/rue et ville';
          }
          break;
        case 'age':
          const ageNum = parseInt(value);
          if (!value) {
            newFieldErrors[field] = 'Âge requis';
          } else if (isNaN(ageNum) || ageNum < 18) {
            newFieldErrors[field] = 'Vous devez avoir 18 ans ou plus';
          }
          break;
        case 'quantity':
          const qtyNum = parseInt(value);
          if (!value || isNaN(qtyNum) || qtyNum < 1) {
            newFieldErrors[field] = 'Quantité minimale: 1';
          }
          break;
      }
    });
    
    // Update state with validation results
    setTouchedFields(newTouchedFields);
    setFieldErrors(newFieldErrors);
    
    // If there are validation errors, stop submission
    if (Object.keys(newFieldErrors).length > 0) {
      setError('Veuillez corriger les erreurs dans le formulaire.');
      setIsSubmitting(false);
      return;
    }

    // Validate and sanitize all inputs using validation utilities
    const validation = validateOrderForm(formData);
    if (!validation.valid) {
      setError('Veuillez corriger les erreurs dans le formulaire.');
      setIsSubmitting(false);
      return;
    }

    // Use sanitized data
    const sanitized = validation.sanitized;

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase n\'est pas configuré. Veuillez configurer vos variables d\'environnement.');
      }

      let orderData;
      const orderRef = `CLT-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

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
          first_name: sanitized.firstName,      // ✅ Sanitized
          last_name: sanitized.lastName,         // ✅ Sanitized
          email: sanitized.email,                // ✅ Sanitized
          phone: sanitized.phone,                // ✅ Sanitized
          address: sanitized.address,            // ✅ Sanitized
          age: sanitized.age,                    // ✅ Validated
          product_name: `Commande de ${cart.length} produit(s)`, // Summary
          product_price: averagePrice,
          quantity: totalQuantity,
          total: total,
          notes: sanitized.notes || null,        // ✅ Sanitized
          order_items: items,
          order_type: 'cart',
          order_ref: orderRef,
          status: 'pending'
        };
      } else {
        // SINGLE PRODUCT ORDER
        const total = productPrice * sanitized.quantity;

        const item = {
          product_name: productName,
          price: productPrice,
          quantity: sanitized.quantity,          // ✅ Validated
          subtotal: total
        };

        orderData = {
          first_name: sanitized.firstName,       // ✅ Sanitized
          last_name: sanitized.lastName,         // ✅ Sanitized
          email: sanitized.email,                // ✅ Sanitized
          phone: sanitized.phone,                // ✅ Sanitized
          address: sanitized.address,            // ✅ Sanitized
          age: sanitized.age,                    // ✅ Validated
          product_name: productName,
          product_price: productPrice,
          quantity: sanitized.quantity,          // ✅ Validated
          total: total,
          notes: sanitized.notes || null,        // ✅ Sanitized
          order_items: [item],
          order_type: 'single',
          order_ref: orderRef,
          status: 'pending'
        };
      }

      // Insert into Supabase
      // Ensure order_items is properly formatted as JSONB
      const insertData = {
        ...orderData,
        order_items: Array.isArray(orderData.order_items) 
          ? orderData.order_items 
          : JSON.parse(JSON.stringify(orderData.order_items || []))
      };

      // Log the data being inserted for debugging
      console.log('[OrderModal] Inserting order data:', {
        orderRef: insertData.order_ref,
        email: insertData.email,
        age: insertData.age,
        ageType: typeof insertData.age,
        total: insertData.total,
        orderItems: insertData.order_items,
        orderItemsType: typeof insertData.order_items,
        orderType: insertData.order_type,
        fullData: insertData
      });

      // Insert into Supabase (without .select() to avoid RLS SELECT policy requirement)
      const { error: supabaseError } = await supabase
        .from('orders')
        .insert([insertData]);

      if (supabaseError) {
        console.error('[OrderModal] Supabase insert error:', {
          code: supabaseError.code,
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint
        });
        throw supabaseError;
      }

      console.log('✅ Commande créée avec succès:', {
        orderRef: insertData.order_ref,
        total: insertData.total,
        itemsCount: Array.isArray(insertData.order_items) ? insertData.order_items.length : 0
      });

      // Send confirmation email to customer
      try {
        console.log('[OrderModal] 📧 Preparing to send customer confirmation email...', {
          orderRef: orderData.order_ref,
          customerEmail: formData.email ? `${formData.email.substring(0, 3)}***@${formData.email.split('@')[1]}` : 'MISSING',
          itemsCount: orderData.order_items?.length || 0,
          total: orderData.total,
        });
        
        if (isEmailEnabled()) {
          console.log('[OrderModal] ✅ Email is enabled, sending confirmation...');
          console.log('[OrderModal] 📧 Calling sendOrderEmail() function...');
          
          try {
            const emailResult = await sendOrderEmail({
              toEmail: sanitized.email,
              firstName: sanitized.firstName,
              lastName: sanitized.lastName,
              phone: sanitized.phone,
              address: sanitized.address,
              items: orderData.order_items,
              total: orderData.total,
              orderRef: orderData.order_ref
            });
            
            console.log('[OrderModal] ✅ Customer confirmation email sent successfully:', emailResult);
            showSuccessOverlay("✅  Votre commande a été confirmée et l'email a été envoyé ! Merci pour votre confiance.");
          } catch (emailSendError) {
            console.error('[OrderModal] ❌ sendOrderEmail() threw an error:', emailSendError);
            throw emailSendError; // Re-throw to be caught by outer catch
          }
        } else {
          console.warn('[OrderModal] ⚠️ Email is not enabled - skipping email send');
          showSuccessOverlay("✅  Votre commande a été confirmée ! Merci pour votre confiance.");
        }
      } catch (emailErr) {
        // Handle email errors gracefully - don't block order success
        const errorMessage = emailErr instanceof EmailError 
          ? emailErr.message 
          : emailErr.message || 'Email sending failed, but your order was saved successfully.';
        
        console.error('[OrderModal] ❌ Email confirmation failed (non-blocking):', {
          error: emailErr,
          errorName: emailErr.name,
          errorMessage: emailErr.message,
          errorCode: emailErr.code,
          originalError: emailErr.originalError,
          stack: emailErr.stack,
        });
        
        // Still show success, but mention email issue
        showSuccessOverlay("✅  Votre commande a été confirmée ! (Note: Email de confirmation non envoyé)");
      }

      // Clear cart if it was a cart order
      if (isCartOrder) {
        clearCart();
      }

      setIsSuccess(true);
      setCountdown(3);
      // trigger confetti
      try {
        launchConfetti(confettiRef.current);
      } catch {}
      
      const interval = setInterval(() => setCountdown(c => c - 1), 1000);
      setTimeout(() => {
        clearInterval(interval);
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
      }, 3000);

    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      
      // Better error messages based on error type
      let errorMessage = 'Une erreur est survenue. Veuillez contacter via Messenger.';
      let canRetry = false;
      
      if (err.message?.toLowerCase().includes('network') || err.message?.toLowerCase().includes('fetch')) {
        errorMessage = '❌ Problème de connexion. Vérifiez votre internet et réessayez.';
        canRetry = true;
      } else if (err.message?.toLowerCase().includes('supabase') || err.message?.toLowerCase().includes('database')) {
        errorMessage = '❌ Erreur de base de données. Contactez-nous via Messenger ou réessayez.';
        canRetry = true;
      } else if (err.message?.toLowerCase().includes('email')) {
        errorMessage = '❌ Problème d\'envoi d\'email, mais votre commande a été enregistrée.';
        canRetry = false;
      } else if (err.message) {
        errorMessage = `❌ ${err.message}`;
        canRetry = true;
      }
      
      setError(errorMessage);
      
      // Store error state for retry button
      if (canRetry) {
        // Error will be shown with retry option in UI
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError('');
    handleSubmit({ preventDefault: () => {} }); // Retry submission
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
        <canvas ref={confettiRef} className="pointer-events-none absolute inset-0" height="400"></canvas>
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
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center animate-pop">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-gold mb-2">Commande confirmée ✅</h3>
              <p className="text-white/70">Merci pour votre commande. Une confirmation a été envoyée par email.</p>
              <p className="text-white/50 mt-4 text-sm">Fermeture dans {countdown}…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm mb-2">{error}</p>
                  {error.includes('connexion') || error.includes('base de données') || error.includes('réessayez') ? (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="btn-secondary text-sm mt-2"
                    >
                      🔄 Réessayer
                    </button>
                  ) : null}
                </div>
              )}

              {!isSupabaseConfigured() && (
                <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 text-2xl">⚠️</div>
                    <div className="flex-1">
                      <p className="text-red-300 text-sm font-bold mb-2">
                        Impossible de confirmer la commande
                      </p>
                      <p className="text-red-200 text-xs mb-2">
                        Supabase n'est pas configuré. Les commandes ne peuvent pas être enregistrées.
                      </p>
                      <div className="bg-black/30 rounded p-2 mt-2">
                        <p className="text-white/80 text-xs font-mono mb-1">Pour activer :</p>
                        <p className="text-white/60 text-xs">
                          1. Créez un fichier <code className="bg-black/50 px-1 rounded">.env</code> dans le dossier <code className="bg-black/50 px-1 rounded">tunisiecigares/</code>
                        </p>
                        <p className="text-white/60 text-xs">
                          2. Ajoutez : <code className="bg-black/50 px-1 rounded">VITE_SUPABASE_URL=...</code> et <code className="bg-black/50 px-1 rounded">VITE_SUPABASE_ANON_KEY=...</code>
                        </p>
                      </div>
                    </div>
                  </div>
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
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-cocoa/30 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-base ${
                      fieldErrors.firstName && touchedFields.firstName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-cocoa/60 focus:border-gold'
                    }`}
                    placeholder="Jean"
                    aria-invalid={fieldErrors.firstName && touchedFields.firstName}
                    aria-describedby={fieldErrors.firstName && touchedFields.firstName ? 'firstName-error' : undefined}
                  />
                  {fieldErrors.firstName && touchedFields.firstName && (
                    <p id="firstName-error" className="text-red-400 text-xs mt-1">{fieldErrors.firstName}</p>
                  )}
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
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-cocoa/30 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-base ${
                      fieldErrors.lastName && touchedFields.lastName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-cocoa/60 focus:border-gold'
                    }`}
                    placeholder="Dupont"
                    aria-invalid={fieldErrors.lastName && touchedFields.lastName}
                    aria-describedby={fieldErrors.lastName && touchedFields.lastName ? 'lastName-error' : undefined}
                  />
                  {fieldErrors.lastName && touchedFields.lastName && (
                    <p id="lastName-error" className="text-red-400 text-xs mt-1">{fieldErrors.lastName}</p>
                  )}
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
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 bg-cocoa/30 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-base ${
                    fieldErrors.email && touchedFields.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-cocoa/60 focus:border-gold'
                  }`}
                  placeholder="jean.dupont@example.com"
                  aria-invalid={fieldErrors.email && touchedFields.email}
                  aria-describedby={fieldErrors.email && touchedFields.email ? 'email-error' : undefined}
                />
                {fieldErrors.email && touchedFields.email && (
                  <p id="email-error" className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                )}
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
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 bg-cocoa/30 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-base ${
                    fieldErrors.phone && touchedFields.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-cocoa/60 focus:border-gold'
                  }`}
                  placeholder="+216 XX XXX XXX"
                  aria-invalid={fieldErrors.phone && touchedFields.phone}
                  aria-describedby={fieldErrors.phone && touchedFields.phone ? 'phone-error' : undefined}
                />
                {fieldErrors.phone && touchedFields.phone && (
                  <p id="phone-error" className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>
                )}
                <p className="text-xs text-white/50 mt-1">Format: +216 XX XXX XXX</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Adresse de livraison <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows="3"
                  className={`w-full px-4 py-3 bg-cocoa/30 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-base resize-none ${
                    fieldErrors.address && touchedFields.address
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-cocoa/60 focus:border-gold'
                  }`}
                  placeholder="Rue, Ville, Code postal"
                  aria-invalid={fieldErrors.address && touchedFields.address}
                  aria-describedby={fieldErrors.address && touchedFields.address ? 'address-error' : undefined}
                />
                {fieldErrors.address && touchedFields.address && (
                  <p id="address-error" className="text-red-400 text-xs mt-1">{fieldErrors.address}</p>
                )}
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
                    onBlur={handleBlur}
                    required
                    min="18"
                    className={`w-full px-4 py-3 bg-cocoa/30 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-base ${
                      fieldErrors.age && touchedFields.age
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-cocoa/60 focus:border-gold'
                    }`}
                    placeholder="18+"
                    aria-invalid={fieldErrors.age && touchedFields.age}
                    aria-describedby={fieldErrors.age && touchedFields.age ? 'age-error' : undefined}
                  />
                  {fieldErrors.age && touchedFields.age && (
                    <p id="age-error" className="text-red-400 text-xs mt-1">{fieldErrors.age}</p>
                  )}
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
                      onBlur={handleBlur}
                      required
                      min="1"
                      className={`w-full px-4 py-3 bg-cocoa/30 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-base ${
                        fieldErrors.quantity && touchedFields.quantity
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-cocoa/60 focus:border-gold'
                      }`}
                      aria-invalid={fieldErrors.quantity && touchedFields.quantity}
                      aria-describedby={fieldErrors.quantity && touchedFields.quantity ? 'quantity-error' : undefined}
                    />
                    {fieldErrors.quantity && touchedFields.quantity && (
                      <p id="quantity-error" className="text-red-400 text-xs mt-1">{fieldErrors.quantity}</p>
                    )}
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
                  disabled={isSubmitting || !isSupabaseConfigured() || Object.keys(fieldErrors).length > 0}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  title={!isSupabaseConfigured() ? 'Supabase non configuré - Impossible de confirmer la commande' : Object.keys(fieldErrors).length > 0 ? 'Veuillez corriger les erreurs du formulaire' : ''}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Envoi en cours...
                    </>
                  ) : !isSupabaseConfigured() ? (
                    'Configuration requise'
                  ) : Object.keys(fieldErrors).length > 0 ? (
                    'Corriger les erreurs'
                  ) : (
                    'Confirmer la commande'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple confetti launcher using canvas (no external deps)
function launchConfetti(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = canvas.offsetWidth;
  const H = canvas.height = canvas.offsetHeight;
  const particles = Array.from({ length: 120 }).map(() => ({
    x: Math.random() * W,
    y: -10,
    r: 2 + Math.random() * 3,
    c: ['#C9A14A', '#ffffff', '#8B5E3C'][Math.floor(Math.random() * 3)],
    v: 1 + Math.random() * 3,
    w: Math.random() * 2
  }));
  let frame = 0;
  const anim = () => {
    frame++;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.y += p.v;
      p.x += Math.sin((frame / 10) + p.w);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (frame < 180) requestAnimationFrame(anim);
  };
  anim();
}
