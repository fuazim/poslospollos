/**
 * Application Constants
 * Centralized configuration values
 */

// Tax Configuration
export const TAX_RATE = 0.1; // 10%
export const TAX_LABEL = 'Tax (10%)';

// Idle Timeout (in seconds)
export const IDLE_TIMEOUT_SECONDS = 60;

// Order Number Settings
export const ORDER_PREFIX_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ORDER_NUMBER_MIN = 100;
export const ORDER_NUMBER_MAX = 999;

// Print Settings
export const RECEIPT_WIDTH_MM = 58; // 58mm thermal printer
export const RECEIPT_LOGO_WIDTH_MM = 45;

// Currency
export const CURRENCY_SYMBOL = '$';
export const CURRENCY_CODE = 'USD';
export const CURRENCY_LOCALE = 'en-US';

// Theme
export const COLORS = {
    primary: '#DA291C',
    primaryHover: '#b82318',
    secondary: '#FFC72C',
    accent: '#F4A900',
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
} as const;

// Roles
export const ROLES = {
    owner: 'Owner',
    admin: 'Admin',
    manager: 'Manager',
    cashier: 'Cashier',
} as const;

export type RoleType = keyof typeof ROLES;
