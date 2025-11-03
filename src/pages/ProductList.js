import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userRole } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('status', '==', 'available'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setProducts(productsData);
    } catch (error) {
      setError('Failed to fetch products: ' + error.message);
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'produce': return '🌾';
      case 'seafood': return '🐟';
      case 'meat': return '🥩';
      default: return '📦';
    }
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 'produce': return 'Produce';
      case 'seafood': return 'Seafood';
      case 'meat': return 'Meat';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="product-list">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list">
        <div className="error-message">{error}</div>
        <button onClick={fetchProducts} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1>Marketplace Products</h1>
        <p>Discover fresh, local products from Tunisia's producers</p>
      </div>

      <div className="filters-section">
        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            🛒 All Products ({products.length})
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'produce' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('produce')}
          >
            🌾 Produce ({products.filter(p => p.category === 'produce').length})
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'seafood' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('seafood')}
          >
            🐟 Seafood ({products.filter(p => p.category === 'seafood').length})
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'meat' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('meat')}
          >
            🥩 Meat ({products.filter(p => p.category === 'meat').length})
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <h3>No products found</h3>
          <p>
            {selectedCategory === 'all' 
              ? 'No products available in the marketplace yet.' 
              : `No ${getCategoryName(selectedCategory)} products available.`
            }
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <span className="product-emoji">{getCategoryEmoji(product.category)}</span>
                <span className="product-category">{getCategoryName(product.category)}</span>
              </div>
              
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-details">
                  <div className="product-info">
                    <span className="info-label">Quantity:</span>
                    <span className="info-value">{product.quantity}</span>
                  </div>
                  <div className="product-info">
                    <span className="info-label">Price:</span>
                    <span className="info-value price">{product.price} TND</span>
                  </div>
                  <div className="product-info">
                    <span className="info-label">Producer:</span>
                    <span className="info-value">{product.producerEmail}</span>
                  </div>
                  <div className="product-info">
                    <span className="info-label">Added:</span>
                    <span className="info-value">{formatDate(product.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="product-actions">
                <button className="btn btn-primary">
                  Contact Producer
                </button>
                {userRole === 'buyer' && (
                  <button className="btn btn-secondary">
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="marketplace-info">
        <h3>About the Marketplace</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>🌾 Produce</h4>
            <p>Fresh fruits, vegetables, grains, and other agricultural products from local farmers.</p>
          </div>
          <div className="info-card">
            <h4>🐟 Seafood</h4>
            <p>Fresh fish, shellfish, and other seafood products from local fishermen.</p>
          </div>
          <div className="info-card">
            <h4>🥩 Meat</h4>
            <p>Quality meat products including beef, lamb, poultry from local butchers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList; 