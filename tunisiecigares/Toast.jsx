import { useEffect, useState } from 'react';

export function showToast(message = 'Action completed') {
  const event = new CustomEvent('app:toast', { detail: { message } });
  window.dispatchEvent(event);
}

export default function Toast() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const handler = (e) => {
      setMsg(e.detail.message || '');
      setTimeout(() => setMsg(''), 2500);
    };
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed inset-x-0 top-4 mx-auto w-fit max-w-[90%] rounded-md bg-cocoa/90 px-4 py-3 text-sm text-white shadow-lg border border-cocoa/60">
      {msg}
    </div>
  );
}


