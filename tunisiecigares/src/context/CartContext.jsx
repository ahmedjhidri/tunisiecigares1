// tunisiecigares/src/context/CartContext.jsx
// Ce fichier gère l'état global du panier avec localStorage

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [lastAdded, setLastAdded] = useState(null);

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

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, ajouter le nouveau produit
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Track last added product
    setLastAdded(product);
    
    // Afficher une notification
    showNotification(`${product.name} ajouté au panier !`);
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
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        notification,
        lastAdded,
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
