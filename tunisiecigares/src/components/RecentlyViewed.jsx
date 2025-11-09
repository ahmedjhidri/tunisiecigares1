// Recently Viewed Products Component
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';
import ProductGrid from './ProductGrid.jsx';

export default function RecentlyViewed({ excludeProductId = null, maxItems = 4 }) {
  const { recentlyViewed } = useRecentlyViewed();

  // Filter out current product if viewing product page
  const filtered = excludeProductId
    ? recentlyViewed.filter(p => p.id !== excludeProductId)
    : recentlyViewed;

  const products = filtered.slice(0, maxItems);

  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="title-gold text-2xl">Recently Viewed</h2>
        <span className="text-white/60 text-sm">{products.length} items</span>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
