// tunisiecigares/src/components/CartNotification.jsx
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function CartNotification() {
  const { lastAdded } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, [lastAdded]);

  if (!visible || !lastAdded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <div className="card flex items-center gap-3 p-3 animate-fade-in">
        <img src={(lastAdded.images && lastAdded.images[0]) || ''} alt="" loading="lazy" className="w-10 h-10 rounded object-cover bg-cocoa/50" />
        <div>
          <p className="text-white/80 text-sm">Ajouté au panier:</p>
          <p className="text-gold font-semibold text-sm">{lastAdded.name}</p>
        </div>
      </div>
    </div>
  );
}
