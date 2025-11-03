import { Link } from 'react-router-dom';
import { products } from '../data/products.js';

export default function Products() {
  return (
    <div className="container-page py-12 sm:py-16">
      <h1 className="title-gold text-4xl mb-8 text-center">Our Cigars</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="card p-6 hover:border-gold/60 transition-base"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-white">{product.name}</h3>
              {product.premium && (
                <span className="px-2 py-1 text-xs font-medium bg-gold/20 text-gold rounded border border-gold/40">
                  Premium
                </span>
              )}
            </div>
            <p className="text-gold text-lg mb-2">{product.price_TND} TND</p>
            <p className="text-white/70 text-sm">{product.short_desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-cocoa/40 text-white/80 rounded border border-cocoa/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

