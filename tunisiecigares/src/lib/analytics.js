export function trackEvent(action, category, label) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', action, { event_category: category, event_label: label });
    }
  } catch {}
}


