// Mini Cart Preview - Shows cart items on hover over cart icon
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function MiniCartPreview({ isVisible, onClose }) {
  const { cart, getTotal } = useCart();

  if (!isVisible || cart.length === 0) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-80 bg-ebony border border-gold/30 rounded-lg shadow-2xl z-50 animate-fade-in"
      onMouseLeave={onClose}
    >
      <div className="p-4 border-b border-cocoa/60">
        <h3 className="text-gold font-semibold text-sm">Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {cart.slice(0, 3).map(item => (
          <div key={item.id} className="p-3 border-b border-cocoa/30 flex gap-3 hover:bg-cocoa/20 transition-base">
            <img
              src={item.images?.[0] || 'https://via.placeholder.com/60'}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
              <p className="text-gold text-xs mt-1">{item.quantity}x {item.price_TND} TND</p>
            </div>
          </div>
        ))}
        {cart.length > 3 && (
          <div className="p-3 text-center text-white/60 text-sm">
            +{cart.length - 3} more items
          </div>
        )}
      </div>
      <div className="p-4 border-t border-cocoa/60 bg-cocoa/10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/80 font-medium">Total:</span>
          <span className="text-gold font-bold">{getTotal().toFixed(2)} TND</span>
        </div>
        <Link
          to="/cart"
          onClick={onClose}
          className="btn-primary w-full text-center block text-sm py-2"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
