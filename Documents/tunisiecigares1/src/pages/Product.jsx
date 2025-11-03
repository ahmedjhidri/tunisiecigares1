import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products.js';
import OrderModal from '../components/OrderModal.jsx';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="title-gold text-3xl mb-4">Product Not Found</h1>
        <p className="text-white/70 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-primary">
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container-page py-8 sm:py-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-base mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="card overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="card overflow-hidden">
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 2}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="title-gold text-3xl sm:text-4xl mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-semibold text-white">{product.price_TND} TND</span>
                {product.premium && (
                  <span className="px-3 py-1 text-xs font-medium bg-gold/20 text-gold rounded-full border border-gold/40">
                    Premium
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-cocoa/40 text-white/80 rounded-full border border-cocoa/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-white/60 space-y-1">
                <p><span className="font-medium">Origin:</span> {product.origin}</p>
                <p><span className="font-medium">Format:</span> {product.format}</p>
              </div>
            </div>

            <div className="border-t border-cocoa/60 pt-6">
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              <p className="text-white/80 leading-relaxed mb-6">{product.long_desc}</p>

              {/* Order Now Button */}
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="btn-primary w-full sm:w-auto text-lg px-8 py-3"
              >
                Order Now
              </button>
            </div>

            <div className="border-t border-cocoa/60 pt-6">
              <p className="text-sm text-white/60 mb-4">
                Need help? Contact us via{' '}
                <a
                  href="https://m.me/100093202210414"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  Messenger
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productName={product.name}
      />
    </>
  );
}

