import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from './products.js';
import ProductDetail from './ProductDetail.jsx';
import ProductGrid from './ProductGrid.jsx';

export default function Product() {
  const { id } = useParams();
  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.id !== product.id).slice(0, 3);
  }, [product]);

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
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-12">
          <h3 className="title-gold text-2xl">Related products</h3>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}


