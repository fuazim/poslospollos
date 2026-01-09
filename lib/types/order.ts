/**
 * Order Types
 * Cart, Orders, Payments
 */

import { Product, ProductOption } from './menu';

// Language options
export type Language = 'en' | 'es' | 'id';

// Order type
export type OrderType = 'dine-in' | 'take-away';

// Payment methods
export type PaymentMethod = 'card' | 'qr' | 'cash' | 'gift-card';

// Order status
export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'preparing' | 'ready' | 'completed';

// Cart Item - product with selected options
export interface CartItem {
    id: string; // unique cart item id
    product: Product;
    selectedOptions: ProductOption[];
    quantity: number;
    unitPrice: number; // base price + options
    totalPrice: number; // unitPrice * quantity
    notes?: string;
}

// Simple Cart Item (for dashboard/cashier)
export interface SimpleCartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Order
export interface Order {
    id: string;
    orderNumber: string;
    customerName?: string;
    orderType: OrderType;
    status: OrderStatus;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod?: PaymentMethod;
    createdAt: Date;
    paidAt?: Date;
}

// Kiosk screen steps
export type KioskStep =
    | 'welcome'
    | 'order-type'
    | 'categories'
    | 'products'
    | 'product-detail'
    | 'cart'
    | 'upsell'
    | 'customer-name'
    | 'payment-method'
    | 'payment-processing'
    | 'payment-success'
    | 'payment-failed';
