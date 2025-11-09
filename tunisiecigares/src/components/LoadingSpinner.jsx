// Loading Spinner Component - Reusable spinner for loading states
export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`${sizeClasses[size]} border-gold/30 border-t-gold rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

// Full page loading overlay
export function LoadingOverlay({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-ebony/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" />
        <p className="text-gold font-display text-lg">{message}</p>
      </div>
    </div>
  );
}

// Inline loading spinner with text
export function LoadingInline({ message = 'Loading...', size = 'md' }) {
  return (
    <div className="flex items-center gap-3 justify-center py-4">
      <LoadingSpinner size={size} />
      <span className="text-white/70 text-sm">{message}</span>
    </div>
  );
}
