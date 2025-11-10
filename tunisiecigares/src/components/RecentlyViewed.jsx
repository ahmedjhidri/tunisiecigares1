// Recently Viewed Products Component - Compact thumbnails
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';
import RecentlyViewedCard from './RecentlyViewedCard.jsx';

export default function RecentlyViewed({ excludeProductId = null, maxItems = 4 }) {
  const { recentlyViewed } = useRecentlyViewed();

  // Filter out current product if viewing product page
  const filtered = excludeProductId
    ? recentlyViewed.filter(p => p.id !== excludeProductId)
    : recentlyViewed;

  const products = filtered.slice(0, maxItems);

  if (products.length === 0) return null;

  return (
    <section className="container-page mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="title-gold text-xl md:text-2xl">Récemment consultés</h2>
        <span className="text-white/60 text-xs md:text-sm">{products.length} article{products.length > 1 ? 's' : ''}</span>
      </div>
      {/* Compact grid: 4 columns on desktop, 2 on tablet, 2 on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
        {products.map((product) => (
          <RecentlyViewedCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
