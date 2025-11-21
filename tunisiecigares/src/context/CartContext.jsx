// tunisiecigares/src/context/CartContext.jsx
// Ce fichier gère l'état global du panier avec localStorage

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [lastAdded, setLastAdded] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('tunisie_cigares_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Erreur lors du chargement du panier:', e);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('tunisie_cigares_cart', JSON.stringify(cart));
  }, [cart]);

  // Show confirmation modal before adding to cart
  const showAddToCartConfirmation = (product, quantity = 1) => {
    // Ne pas afficher si le produit n'est pas en stock
    if (product.stock <= 0) {
      showNotification('Ce produit n\'est pas disponible');
      return;
    }
    
    // Track product to be added (pending confirmation)
    setLastAdded({ ...product, pendingQuantity: quantity });
    
    // Show cart confirmation modal
    setShowCartModal(true);
  };

  // Actually add product to cart (called after user confirms)
  const confirmAddToCart = (product, quantity = 1) => {
    // Ne pas ajouter si le produit n'est pas en stock
    if (product.stock <= 0) {
      showNotification('Ce produit n\'est pas disponible');
      return;
    }
    
    // S'assurer que la quantité est valide (min 1, max stock disponible)
    const validQuantity = Math.max(1, Math.min(quantity, product.stock));
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité (mais ne pas dépasser le stock)
        const newQuantity = existingItem.quantity + validQuantity;
        const finalQuantity = Math.min(newQuantity, product.stock);
        
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: finalQuantity }
            : item
        );
      } else {
        // Sinon, ajouter le nouveau produit avec la quantité spécifiée
        return [...prevCart, { ...product, quantity: validQuantity }];
      }
    });

    // Track last added product
    setLastAdded(product);
    
    // Afficher une notification (use French name if available)
    const displayName = product.name_fr || product.name;
    showNotification(`${displayName} ajouté au panier !`);
  };

  // Legacy function for backward compatibility - now shows confirmation first
  const addToCart = (product, quantity = 1) => {
    showAddToCartConfirmation(product, quantity);
  };

  // Retirer un produit du panier
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showNotification('Produit retiré du panier');
  };

  // Modifier la quantité d'un produit
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    showNotification('Panier vidé');
  };

  // Calculer le total
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price_TND * item.quantity), 0);
  };

  // Obtenir le nombre total d'articles
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Afficher une notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        showAddToCartConfirmation,
        confirmAddToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        notification,
        lastAdded,
        showCartModal,
        setShowCartModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte du panier
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
}
