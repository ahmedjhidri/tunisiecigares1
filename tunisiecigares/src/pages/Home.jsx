import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import RecentlyViewed from '../components/RecentlyViewed.jsx';
import products from '../data/products.js';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      <Hero />

      <section className="container-page py-12">
        <div className="flex items-end justify-between">
          <h2 className="title-gold text-2xl">Our Cigars</h2>
          <Link to="/products" className="text-gold hover:brightness-110 transition-base">View all →</Link>
        </div>
        <div className="mt-6">
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Recently Viewed Section */}
      <RecentlyViewed maxItems={4} />

      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="title-gold text-2xl">About</h2>
            <p className="mt-3 text-white/80">
              Tunisie Cigares curates a premium selection of cigars with an
              elegant, concierge experience. Discover iconic Cuban classics and
              refined international blends. Orders are placed securely via
              Messenger with personalized service.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-white/80">
              We value craftsmanship, authenticity, and responsible enjoyment.
              For inquiries or recommendations, message us any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


