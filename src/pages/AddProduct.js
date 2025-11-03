import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import './AddProduct.css';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('produce');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productName || !quantity || !price || !description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const productData = {
        name: productName,
        category: category,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        description: description,
        producerId: currentUser.uid,
        producerEmail: currentUser.email,
        producerRole: userRole,
        createdAt: new Date().toISOString(),
        status: 'available'
      };

      await addDoc(collection(db, 'products'), productData);
      
      setMessage('Product added successfully!');
      setTimeout(() => {
        navigate('/products');
      }, 2000);
      
    } catch (error) {
      setError('Failed to add product: ' + error.message);
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryEmoji = (cat) => {
    switch (cat) {
      case 'produce': return '🌾';
      case 'seafood': return '🐟';
      case 'meat': return '🥩';
      default: return '📦';
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-header">
        <h1>Add New Product</h1>
        <p>Add your {userRole} products to the marketplace</p>
      </div>

      <div className="add-product-form-container">
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name *</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Fresh Tomatoes, Red Snapper, Beef Steak"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            >
              <option value="produce">🌾 Produce (Fruits, Vegetables, Grains)</option>
              <option value="seafood">🐟 Seafood (Fish, Shellfish)</option>
              <option value="meat">🥩 Meat (Beef, Lamb, Poultry)</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 10"
                min="0"
                step="0.1"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (TND) *</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 15.50"
                min="0"
                step="0.01"
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product, quality, origin, etc."
              rows="4"
              required
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>

        <div className="product-preview">
          <h3>Product Preview</h3>
          <div className="preview-card">
            <div className="preview-header">
              <span className="preview-emoji">{getCategoryEmoji(category)}</span>
              <h4>{productName || 'Product Name'}</h4>
            </div>
            <div className="preview-details">
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Quantity:</strong> {quantity || '0'}</p>
              <p><strong>Price:</strong> {price ? `${price} TND` : '0 TND'}</p>
              <p><strong>Description:</strong> {description || 'No description yet'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct; 