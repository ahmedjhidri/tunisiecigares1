// Floating Add to Cart Button - Sticky button on mobile for product pages
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingCart } from 'lucide-react';

export default function FloatingAddToCart({ product }) {
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart, getItemCount } = useCart();

  useEffect(() => {
    // Show on mobile when scrolling down on product page
    const handleScroll = () => {
      if (window.innerWidth < 768) { // Mobile only
        setIsVisible(window.scrollY > 300);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || !product || product.stock <= 0) return null;

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden z-40 animate-slide-up">
      <button
        onClick={handleClick}
        className="w-full bg-gold text-ebony px-6 py-4 rounded-lg shadow-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gold/90 transition-base"
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart - {product.price_TND} TND</span>
      </button>
    </div>
  );
}
