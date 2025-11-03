export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Dialog'}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative card w-full max-w-2xl border border-cocoa/60">
        <div className="flex items-center justify-between px-4 py-3 border-b border-cocoa/60">
          <h3 className="font-display text-gold text-lg">{title}</h3>
          <button aria-label="Close" className="text-white/80 hover:text-gold transition-base" onClick={onClose}>✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}


