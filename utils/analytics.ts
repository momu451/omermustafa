/**
 * Utility for tracking events using Google Analytics (GA4)
 * It checks if window.gtag exists before attempting to send data.
 */

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
    // Log to console for development visibility
    console.debug(`[Analytics] Event: ${action} | Category: ${category} | Label: ${label}`);
  } catch (error) {
    console.warn('[Analytics] Failed to send event', error);
  }
};