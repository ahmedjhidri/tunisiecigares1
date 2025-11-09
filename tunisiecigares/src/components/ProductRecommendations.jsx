// Product Recommendations Component - Shows similar/recommended products
import { useMemo } from 'react';
import products from '../data/products.js';
import ProductGrid from './ProductGrid.jsx';

export default function ProductRecommendations({ currentProduct, maxItems = 4 }) {
  const recommendations = useMemo(() => {
    if (!currentProduct) return [];

    // Find products with similar characteristics
    const similar = products
      .filter(p => p.id !== currentProduct.id)
      .map(p => {
        let score = 0;
        
        // Same origin
        if (p.origin === currentProduct.origin) score += 3;
        
        // Same format
        if (p.format === currentProduct.format) score += 2;
        
        // Similar price range (within 20 TND)
        if (Math.abs(p.price_TND - currentProduct.price_TND) <= 20) score += 2;
        
        // Same premium status
        if (p.premium === currentProduct.premium) score += 1;
        
        // Shared tags
        const sharedTags = (p.tags || []).filter(tag => 
          (currentProduct.tags || []).includes(tag)
        ).length;
        score += sharedTags;
        
        // Same strength level
        if (p.strength === currentProduct.strength) score += 2;
        
        return { ...p, score };
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxItems)
      .map(({ score, ...product }) => product); // Remove score from product object

    return similar;
  }, [currentProduct, maxItems]);

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="title-gold text-2xl mb-6">You Might Also Like</h2>
      <ProductGrid products={recommendations} />
    </section>
  );
}
