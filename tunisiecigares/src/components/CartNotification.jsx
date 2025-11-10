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

  const displayName = lastAdded.name_fr || lastAdded.name;

  return (
    <div className="fixed bottom-6 right-6 z-[60] animate-slide-up">
      <div className="bg-ebony/95 backdrop-blur-md border border-gold/30 rounded-lg shadow-xl flex items-center gap-3 p-4 min-w-[280px] max-w-[360px]">
        <img 
          src={(lastAdded.images && lastAdded.images[0]) || ''} 
          alt={displayName} 
          loading="lazy" 
          className="w-12 h-12 rounded object-cover bg-cocoa/50 border border-gold/20" 
        />
        <div className="flex-1">
          <p className="text-white/80 text-xs mb-1">✓ Ajouté au panier</p>
          <p className="text-gold font-semibold text-sm line-clamp-1">{displayName}</p>
        </div>
      </div>
    </div>
  );
}
