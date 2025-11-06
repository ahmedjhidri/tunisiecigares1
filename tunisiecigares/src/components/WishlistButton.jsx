// src/components/WishlistButton.jsx
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton({ product }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const toggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg transition-all ${
        inWishlist
          ? 'bg-gold/20 text-gold'
          : 'bg-cocoa/30 text-white/60 hover:bg-cocoa/50'
      }`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
    </button>
  );
}

