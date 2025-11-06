// src/components/PromoBanner.jsx
import { X, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    // Check if user has dismissed banner today
    const dismissed = localStorage.getItem('promo-dismissed');
    const today = new Date().toDateString();
    
    if (dismissed === today) {
      setIsVisible(false);
      return;
    }

    // Fetch active promotion (mock data - replace with API call)
    setPromo({
      code: 'WELCOME15',
      message: '15% OFF your first order',
      expires: '2024-12-31',
      color: 'gold'
    });
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem('promo-dismissed', new Date().toDateString());
  };

  if (!isVisible || !promo) return null;

  return (
    <div className="bg-gradient-to-r from-gold/20 to-amber/5 border-b border-gold/30">
      <div className="container-page py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-gold" />
            <p className="text-white/90">
              <span className="font-bold text-gold">{promo.code}</span> - {promo.message}
              <span className="text-white/60 text-sm ml-2">
                Valid until {new Date(promo.expires).toLocaleDateString()}
              </span>
            </p>
          </div>
          <button
            onClick={dismiss}
            className="p-1 hover:bg-white/10 rounded transition-base text-white"
            aria-label="Dismiss banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

