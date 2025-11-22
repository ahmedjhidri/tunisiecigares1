import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.js';
import ProductDetail from '../components/ProductDetail.jsx';
import ProductRecommendations from '../components/ProductRecommendations.jsx';
import RecentlyViewed from '../components/RecentlyViewed.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SEO from '../components/SEO.jsx';
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

  const productName = product.name_fr || product.name;

  return (
    <>
      <SEO
        title={productName}
        product={product}
      />
      <Breadcrumbs
        items={[
          { label: 'Accueil', path: '/' },
          { label: 'Nos Cigares', path: '/products' },
          { label: productName, path: `/product/${product.id}` }
        ]}
      />
      <div className="container-page py-12">
        {/* JSON-LD Product schema for SEO */}
        <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            brand: product.brand || 'Tunisie Cigares',
            category: 'Cigar',
            image: product.images && product.images.length ? product.images : undefined,
            description: product.long_desc || product.short_desc,
            offers: {
              '@type': 'Offer',
              price: String(product.price_TND),
              priceCurrency: 'TND',
              availability: product.stock > 0 
                ? 'https://schema.org/InStock' 
                : 'https://schema.org/OutOfStock',
              priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            aggregateRating: product.rating ? {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviews_count || 0
            } : undefined
          })}
        </script>
        <ProductDetail product={product} />

      {/* Product Recommendations */}
      <ProductRecommendations currentProduct={product} maxItems={4} />

      {/* Recently Viewed (excluding current product) */}
      <RecentlyViewed excludeProductId={product.id} maxItems={4} />
      </div>
    </>
  );
}


