/**
 * Formatting Utilities
 * Currency, dates, numbers
 */

import { CURRENCY_SYMBOL, CURRENCY_LOCALE } from '@/lib/config/constants';

/**
 * Format number as currency
 */
export function formatCurrency(amount: number): string {
    return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
}

/**
 * Format number with locale
 */
export function formatNumber(num: number, decimals: number = 0): string {
    return num.toLocaleString(CURRENCY_LOCALE, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString(CURRENCY_LOCALE, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

/**
 * Format time for display
 */
export function formatTime(date: Date): string {
    return date.toLocaleTimeString(CURRENCY_LOCALE, {
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Format date and time together
 */
export function formatDateTime(date: Date): string {
    return `${formatDate(date)} ${formatTime(date)}`;
}

/**
 * Get relative time (e.g., "5 minutes ago")
 */
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}
