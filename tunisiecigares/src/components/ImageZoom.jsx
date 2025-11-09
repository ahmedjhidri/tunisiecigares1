// Image Zoom Component - Zoom on hover for product images
import { useState, useRef, useEffect } from 'react';

export default function ImageZoom({ src, alt, className = '' }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

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
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
        }`}
        style={{
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        }}
        loading="lazy"
        decoding="async"
      />
      {isZoomed && (
        <div className="absolute inset-0 pointer-events-none border-2 border-gold/50" />
      )}
    </div>
  );
}
