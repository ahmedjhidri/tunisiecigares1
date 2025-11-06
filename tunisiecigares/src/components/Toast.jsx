import { useEffect, useState } from 'react';

// Simple global event-based toast (no external lib)
export function showToast(message = 'Action completed') {
  const event = new CustomEvent('app:toast', { detail: { message } });
  window.dispatchEvent(event);
}

export default function Toast() {
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setMsg(e.detail.message || '');
      setOpen(true);
      const t = setTimeout(() => { setOpen(false); setMsg(''); }, 5000);
      return () => clearTimeout(t);
    };
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, []);

  if (!msg || !open) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      <div
        className={`min-w-[260px] max-w-[360px] rounded-lg bg-cocoa/90 text-white shadow-xl border border-cocoa/60 px-4 py-3 transform transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <div className="text-green-400 text-lg">✅</div>
          <div className="flex-1 text-sm leading-5">{msg}</div>
          <button onClick={() => { setOpen(false); setMsg(''); }} className="text-white/70 hover:text-white text-lg leading-none">×</button>
        </div>
      </div>
    </div>
  );
}


