// Recently Viewed Products Context - Tracks user's recently viewed products
import { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

const STORAGE_KEY = 'tunisie_cigares_recently_viewed';
const MAX_ITEMS = 10;

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  }, []);

  // Save to localStorage when recentlyViewed changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Error saving recently viewed:', error);
    }
  }, [recentlyViewed]);

  const addProduct = (product) => {
    if (!product || !product.id) return;

    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id);
      // Add to beginning and limit to MAX_ITEMS
      return [product, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing recently viewed:', error);
    }
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addProduct,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
