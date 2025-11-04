// tunisiecigares/src/components/CartNotification.jsx
import { useCart } from '../context/CartContext.jsx';

export default function CartNotification() {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-slide-in-right">
      <div className="bg-gold/90 text-ebony px-4 py-3 rounded-lg shadow-lg border border-gold">
        <p className="font-medium">{notification}</p>
      </div>
    </div>
  );
}
