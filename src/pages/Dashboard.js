import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { currentUser, userRole } = useAuth();

  const renderWelcomeMessage = () => {
    switch (userRole) {
      case 'farmer':
        return (
          <div className="welcome-section">
            <h2>Welcome, Farmer! 🌾</h2>
            <p>Manage your produce and connect with buyers in Tunisia.</p>
            <div className="action-buttons">
              <Link to="/add-product" className="btn btn-primary">
                Add New Product
              </Link>
              <Link to="/products" className="btn btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        );
      case 'fisherman':
        return (
          <div className="welcome-section">
            <h2>Welcome, Fisherman! 🐟</h2>
            <p>Showcase your fresh seafood to customers across Tunisia.</p>
            <div className="action-buttons">
              <Link to="/add-product" className="btn btn-primary">
                Add New Product
              </Link>
              <Link to="/products" className="btn btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        );
      case 'butcher':
        return (
          <div className="welcome-section">
            <h2>Welcome, Butcher! 🥩</h2>
            <p>Offer quality meat products to buyers in Tunisia.</p>
            <div className="action-buttons">
              <Link to="/add-product" className="btn btn-primary">
                Add New Product
              </Link>
              <Link to="/products" className="btn btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        );
      case 'buyer':
        return (
          <div className="welcome-section">
            <h2>Welcome, Buyer! 🛒</h2>
            <p>Discover fresh, local products from farmers, fishermen, and butchers.</p>
            <div className="action-buttons">
              <Link to="/products" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          </div>
        );
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome to Digital Farmer's Market Tunisia!</h2>
            <p>Connecting local producers with buyers across Tunisia.</p>
          </div>
        );
    }
  };

  const renderQuickStats = () => {
    if (userRole === 'buyer') {
      return (
        <div className="stats-section">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Available Categories</h4>
              <p>3</p>
              <span>Produce, Seafood, Meat</span>
            </div>
            <div className="stat-card">
              <h4>Local Producers</h4>
              <p>50+</p>
              <span>Across Tunisia</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="stats-section">
          <h3>Your Business</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Your Products</h4>
              <p>0</p>
              <span>Start adding products!</span>
            </div>
            <div className="stat-card">
              <h4>Potential Buyers</h4>
              <p>100+</p>
              <span>Looking for quality products</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {currentUser.email}</p>
      </div>

      {renderWelcomeMessage()}

      {renderQuickStats()}

      <div className="features-section">
        <h3>Platform Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🚜 For Producers</h4>
            <ul>
              <li>Add and manage your products</li>
              <li>Set your own prices</li>
              <li>Connect with local buyers</li>
              <li>Track your sales</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <h4>🛒 For Buyers</h4>
            <ul>
              <li>Browse fresh local products</li>
              <li>Filter by category and location</li>
              <li>Contact producers directly</li>
              <li>Support local economy</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <h4>🌍 Community</h4>
            <ul>
              <li>Build local connections</li>
              <li>Support sustainable farming</li>
              <li>Fresh, quality products</li>
              <li>Transparent pricing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 