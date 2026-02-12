/**
 * Common constants used across tests
 */

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  NAVIGATION: 30000,
  ACTION: 15000,
};

export const WAIT_STATES = {
  VISIBLE: 'visible' as const,
  HIDDEN: 'hidden' as const,
  ATTACHED: 'attached' as const,
  DETACHED: 'detached' as const,
};

export const LOAD_STATES = {
  LOAD: 'load' as const,
  DOM_CONTENT_LOADED: 'domcontentloaded' as const,
  NETWORK_IDLE: 'networkidle' as const,
};

export const SCREENSHOT_OPTIONS = {
  FULL_PAGE: { fullPage: true },
  VIEWPORT: { fullPage: false },
};

export const MOBILE_DEVICES = {
  IPHONE_13: 'iPhone 13',
  PIXEL_5: 'Pixel 5',
  IPAD_PRO: 'iPad Pro',
};

export const BROWSERS = {
  CHROMIUM: 'chromium',
  FIREFOX: 'firefox',
  WEBKIT: 'webkit',
};

