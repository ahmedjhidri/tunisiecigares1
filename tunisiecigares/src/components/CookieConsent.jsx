// src/components/CookieConsent.jsx
import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-ebony/95 backdrop-blur-lg border-t border-gold/30 shadow-2xl">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Cookie className="w-8 h-8 text-gold flex-shrink-0" />
          
          <div className="flex-1 text-center md:text-left">
            <p className="text-white font-semibold mb-1">We value your privacy</p>
            <p className="text-white/70 text-sm">
              We use cookies to enhance your experience and analyze site traffic.
              <a href="#/privacy" className="text-gold hover:underline ml-1">
                Learn more
              </a>
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={acceptEssential}
              className="btn-secondary text-sm px-4 py-2"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="btn-primary text-sm px-4 py-2"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

