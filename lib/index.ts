/**
 * Library Index
 * Central export point for all lib modules
 */

// Config
export * from './config';

// Types
export * from './types';

// Utils
export * from './utils';

// Stores
export { useKioskStore } from './store';

// Theme
export { ThemeProvider, useTheme } from './theme-context';

// Print
export { printReceipt, getReceiptHTML } from './print-receipt';
export type { PrintReceiptData } from './print-receipt';

// Mock Data (for development)
export { mockCategories, mockProducts, mockProductOptions, getProductsWithOptions, getProductsByCategory, getActiveCategories } from './mock-data';
