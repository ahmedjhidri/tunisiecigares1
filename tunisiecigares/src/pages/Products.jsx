import ProductGrid from '../components/ProductGrid.jsx';
import products from '../data/products.js';

export default function Products() {
  return (
    <div className="container-page py-12">
      <h1 className="title-gold text-3xl">Catalog</h1>
      <p className="text-white/80 mt-2">Explore our selection of premium cigars.</p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}


