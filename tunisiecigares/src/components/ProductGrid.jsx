// Product Grid - Responsive grid matching reference layout
// 4 columns on large screens, 2 on tablets, 1 on mobile
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">Aucun produit trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
