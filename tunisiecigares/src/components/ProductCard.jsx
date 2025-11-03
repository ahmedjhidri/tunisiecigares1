import { Link } from 'react-router-dom';

const MESSENGER_URL = 'https://m.me/100093202210414';

export default function ProductCard({ product }) {
  const {
    id,
    name,
    price_TND,
    origin,
    format,
    short_desc,
    images = [],
    premium,
  } = product;

  const img = images[0] || 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img src={img} alt={`${name} product image`} className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        {premium && (
          <span className="absolute top-3 left-3 rounded bg-gold/90 text-ebony text-xs font-semibold px-2 py-1 shadow">Premium</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-lg text-gold">{name}</h3>
        <p className="text-white/70 text-sm mt-1">{origin} • {format}</p>
        <p className="text-white mt-2 text-sm flex-1">{short_desc}</p>
        <div className="mt-3 font-semibold text-gold">{price_TND} TND</div>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => window.open(MESSENGER_URL, '_blank')}
            className="btn-primary"
            aria-label={`Order ${name} via Messenger`}
          >
            Order via Messenger
          </button>
          <Link to={`/product/${id}`} className="btn-secondary" aria-label={`View details for ${name}`}>View Details</Link>
        </div>
      </div>
    </div>
  );
}


