/**
 * ID Generation Utilities
 */

import { ORDER_PREFIX_LETTERS, ORDER_NUMBER_MIN, ORDER_NUMBER_MAX } from '@/lib/config/constants';

/**
 * Generate unique ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}

/**
 * Generate order number (e.g., A123)
 */
export function generateOrderNumber(): string {
    const letter = ORDER_PREFIX_LETTERS[Math.floor(Math.random() * ORDER_PREFIX_LETTERS.length)];
    const number = Math.floor(ORDER_NUMBER_MIN + Math.random() * (ORDER_NUMBER_MAX - ORDER_NUMBER_MIN + 1));
    return `${letter}${number}`;
}

/**
 * Generate UUID v4
 */
export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
