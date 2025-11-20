// Share Buttons Component - Partage Facebook, WhatsApp, etc.
import { Facebook, MessageCircle, Link2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '../lib/analytics';

export default function ShareButtons({ product, className = '' }) {
  const [copied, setCopied] = useState(false);
  
  const productUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname.includes('#') ? '#' : ''}/product/${product.id}`
    : '';
  
  const productName = product.name_fr || product.name;
  const shareText = `Découvrez ${productName} - ${product.price_TND} TND sur Cigar Lounge Tunisia`;
  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    trackEvent('share', 'social', 'facebook', { product: product.name });
  };
  
  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`;
    window.open(url, '_blank');
    trackEvent('share', 'social', 'whatsapp', { product: product.name });
  };
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      trackEvent('share', 'copy_link', 'success', { product: product.name });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-white/60 text-sm mr-2">Partager:</span>
      
      <button
        onClick={shareToFacebook}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-base"
        aria-label="Partager sur Facebook"
        title="Partager sur Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>
      
      <button
        onClick={shareToWhatsApp}
        className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-base"
        aria-label="Partager sur WhatsApp"
        title="Partager sur WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </button>
      
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-cocoa/50 hover:bg-cocoa/70 text-white transition-base"
        aria-label="Copier le lien"
        title="Copier le lien"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

