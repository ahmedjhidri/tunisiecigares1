// src/components/Logo.jsx
export default function Logo({ size = 'md', variant = 'full' }) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  };

  return (
    <div className={`flex items-center gap-3 ${sizes[size]}`}>
      {/* Cigar icon SVG */}
      <svg 
        className="h-full w-auto text-gold" 
        viewBox="0 0 48 48" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path 
          d="M10 24h28M10 24c0-2 1-4 3-5M38 24c0-2-1-4-3-5M13 19c1.5-1.5 3.5-2.5 6-2.5M35 19c-1.5-1.5-3.5-2.5-6-2.5M10 24c0 2 1 4 3 5M38 24c0 2-1 4-3 5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" fill="currentColor"/>
      </svg>
      
      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <span className="font-display text-gold font-bold leading-tight tracking-wide text-lg md:text-xl">
            CIGAR LOUNGE
          </span>
          <span className="font-accent text-cream text-xs tracking-widest">
            TUNISIA
          </span>
        </div>
      )}
    </div>
  );
}

