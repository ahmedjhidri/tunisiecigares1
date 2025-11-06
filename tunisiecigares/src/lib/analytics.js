// src/utils/analytics.js

class Analytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track page views
  pageView(pageName, properties = {}) {
    this.track('page_view', {
      page: pageName,
      timestamp: new Date().toISOString(),
      ...properties
    });
  }

  // Track events
  track(eventName, properties = {}) {
    const event = {
      event: eventName,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      ...properties
    };

    this.events.push(event);
    
    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log('[Analytics]', event);
    }
  }

  // E-commerce tracking
  trackProductView(product) {
    this.track('product_view', {
      product_id: product.id,
      product_name: product.name,
      price: product.price_TND,
      category: product.origin
    });
  }

  trackAddToCart(product, quantity) {
    this.track('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price_TND,
      quantity
    });
  }

  trackCheckoutStart(cart, total) {
    this.track('begin_checkout', {
      cart_size: cart.length,
      cart_value: total,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      }))
    });
  }

  trackPurchase(order) {
    this.track('purchase', {
      order_id: order.id,
      value: order.total,
      currency: 'TND',
      items: order.items
    });
  }

  trackSearch(query, results) {
    this.track('search', {
      search_term: query,
      results_count: results
    });
  }
}

const analytics = new Analytics();

// Named export for backward compatibility
export const trackEvent = (eventName, category, label, value) => {
  analytics.track(eventName, {
    category,
    label,
    value
  });
};

export default analytics;
