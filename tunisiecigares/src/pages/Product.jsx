import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.js';
import ProductDetail from '../components/ProductDetail.jsx';
import ProductRecommendations from '../components/ProductRecommendations.jsx';
import RecentlyViewed from '../components/RecentlyViewed.jsx';
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';

export default function Product() {
  const { id } = useParams();
  const { addProduct } = useRecentlyViewed();
  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  // Track recently viewed when product changes
  useEffect(() => {
    if (product) {
      addProduct(product);
    }
  }, [product, addProduct]);

  if (!product) {
    return (
      <div className="container-page py-12">
        <p className="text-white/80">Product not found.</p>
        <Link to="/products" className="btn-secondary mt-4 inline-block">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      {/* JSON-LD Product schema for SEO */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          brand: 'Cigar Lounge Tunisia',
          category: 'Cigar',
          image: product.images && product.images.length ? product.images : undefined,
          description: product.long_desc,
          offers: {
            '@type': 'Offer',
            price: String(product.price_TND),
            priceCurrency: 'TND',
            availability: 'https://schema.org/InStock'
          }
        })}
      </script>
      <ProductDetail product={product} />

      {/* Product Recommendations */}
      <ProductRecommendations currentProduct={product} maxItems={4} />

      {/* Recently Viewed (excluding current product) */}
      <RecentlyViewed excludeProductId={product.id} maxItems={4} />
    </div>
  );
}


