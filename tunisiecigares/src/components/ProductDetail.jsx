import { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext.jsx'; // ← AJOUTE
import OrderModal from './OrderModal.jsx';

export default function ProductDetail({ product }) {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart(); // ← AJOUTE
  
  const images = useMemo(() => product.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop',
  ], [product]);

  return (
    <>
      {/* ... code existant pour les images ... */}

      <div>
        {/* ... titre, prix, description ... */}

        <div className="mt-6 flex gap-2">
          {/* ← AJOUTE LE BOUTON PANIER */}
          <button 
            onClick={() => addToCart(product)}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Ajouter au panier
          </button>
          <button 
            className="btn-primary flex-1" 
            onClick={() => setIsModalOpen(true)}
          >
            Commander maintenant
          </button>
        </div>

        {/* ... reste du code ... */}
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        productPrice={product.price_TND}
      />
    </>
  );
}
