import { Link } from 'react-router-dom';
import { products } from '../data/products.js';

export default function Home() {
  const featuredProducts = products.filter(p => p.premium).slice(0, 3);

  return (
    <div className="container-page py-12 sm:py-16">
      <section className="text-center mb-16">
        <h1 className="title-gold text-4xl sm:text-5xl mb-4">Cigar Lounge Tunisia</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Premium cigars curated for the discerning connoisseur
        </p>
        <Link to="/products" className="btn-primary text-lg px-8 py-3">
          Explore Our Collection
        </Link>
      </section>

      <section>
        <h2 className="title-gold text-3xl mb-8 text-center">Featured Selection</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="card p-6 hover:border-gold/60 transition-base"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-gold text-lg mb-2">{product.price_TND} TND</p>
              <p className="text-white/70 text-sm">{product.short_desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

