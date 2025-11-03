import { useMemo, useState } from 'react';

const MESSENGER_URL = 'https://m.me/100093202210414';

export default function ProductDetail({ product }) {
  const [active, setActive] = useState(0);
  const images = useMemo(() => product.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop',
  ], [product]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-cocoa/60">
          <img src={images[active]} alt={`${product.name} main`} className="h-full w-full object-cover" />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-video overflow-hidden rounded border ${i === active ? 'border-gold' : 'border-cocoa/60'} hover:brightness-110 transition-base`}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="title-gold text-3xl">{product.name}</h2>
        <p className="text-white/70 mt-1">{product.origin} • {product.format}</p>
        <div className="text-gold font-semibold mt-3 text-xl">{product.price_TND} TND</div>
        <p className="mt-4 text-white/90">{product.long_desc}</p>

        <div className="mt-6 flex gap-2">
          <button className="btn-primary" onClick={() => window.open(MESSENGER_URL, '_blank')}>
            Order via Messenger
          </button>
        </div>

        {product.tags?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="text-xs rounded border border-gold/50 text-gold px-2 py-1">{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}


