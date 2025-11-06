import { useEffect, useState } from 'react';

export function showSuccessOverlay(message) {
  const event = new CustomEvent('app:successOverlay', { detail: { message } });
  window.dispatchEvent(event);
}

export default function SuccessOverlay() {
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setMsg(e.detail.message || '');
      setOpen(true);
      const t = setTimeout(() => { setOpen(false); setMsg(''); }, 5000);
      return () => clearTimeout(t);
    };
    window.addEventListener('app:successOverlay', handler);
    return () => window.removeEventListener('app:successOverlay', handler);
  }, []);

  if (!open || !msg) return null;

  return (
    <div className={`fixed inset-0 z-[80] flex items-center justify-center ${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="absolute inset-0 bg-black/60" onClick={() => { setOpen(false); setMsg(''); }} />
      <div className={`relative mx-4 w-full max-w-md rounded-2xl bg-white text-ebony shadow-2xl border border-black/10 p-6 transform transition-all duration-300 ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <button
          onClick={() => { setOpen(false); setMsg(''); }}
          className="absolute top-3 right-3 text-black/50 hover:text-black text-xl leading-none"
          aria-label="Fermer"
        >
          ×
        </button>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/15 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-base leading-6">
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
}


