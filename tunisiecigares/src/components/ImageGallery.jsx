// src/components/ImageGallery.jsx
import { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

export default function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-cocoa/30 rounded-xl flex items-center justify-center">
        <p className="text-white/40">No image available</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl border border-cocoa/60 group bg-transparent flex items-center justify-center">
          <img
            src={images[activeIndex]}
            alt={`${productName} view ${activeIndex + 1}`}
            className="w-full h-full object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-base text-white"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  idx === activeIndex
                    ? 'border-gold scale-105'
                    : 'border-cocoa/60 hover:border-gold/50'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain bg-transparent p-1"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white z-10"
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoom"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[activeIndex]}
            alt={productName}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

