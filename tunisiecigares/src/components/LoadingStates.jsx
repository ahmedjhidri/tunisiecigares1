// src/components/LoadingStates.jsx
import { useState, useEffect, useRef } from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="skeleton h-52 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-20 w-full" />
        <div className="skeleton h-10 w-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-ebony z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 border-4 border-gold/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gold font-display text-lg">Loading...</p>
      </div>
    </div>
  );
}

// Lazy loading wrapper with Intersection Observer
export function LazyImage({ src, alt, className, placeholder, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01, // Load when 1% is visible
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  const defaultPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%232a1f1f" width="400" height="300"/%3E%3C/svg%3E';

  return (
    <div ref={imgRef} className={`relative bg-transparent ${className}`} style={{ minHeight: '200px' }}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 skeleton animate-pulse bg-cocoa/30 z-0" />
      )}
      {isInView && (
        <>
          {hasError ? (
            <div className="absolute inset-0 bg-cocoa/50 flex items-center justify-center z-10">
              <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain transition-opacity duration-300 relative z-10 bg-transparent ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              {...props}
            />
          )}
        </>
      )}
    </div>
  );
}

