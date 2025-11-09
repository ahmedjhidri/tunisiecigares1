// Image Zoom Component - Zoom on hover for product images
// Note: Lazy loading is handled at the ImageZoom level, but zoom requires immediate image load
import { useState, useRef, useEffect } from 'react';

export default function ImageZoom({ src, alt, className = '', lazy = false }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isInView, setIsInView] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !containerRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '50px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      {!isLoaded && (
        <div className="absolute inset-0 skeleton animate-pulse bg-cocoa/30 z-0" />
      )}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-300 relative z-10 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          style={{
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
        />
      )}
      {isZoomed && isLoaded && (
        <div className="absolute inset-0 pointer-events-none border-2 border-gold/50 z-20" />
      )}
    </div>
  );
}
