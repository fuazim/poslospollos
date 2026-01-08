// Base types for the kiosk application

// Language options
export type Language = 'en' | 'es' | 'id';

// Order type
export type OrderType = 'dine-in' | 'take-away';

// Payment methods
export type PaymentMethod = 'card' | 'qr' | 'cash' | 'gift-card';

// Order status
export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'preparing' | 'ready';

// Menu Category
export interface MenuCategory {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    sortOrder: number;
    isActive: boolean;
    badge?: 'new' | 'popular';
}

// Product Option (size, sauce, side, drink)
export interface ProductOption {
    id: string;
    productId: string;
    optionGroup: 'size' | 'side' | 'drink' | 'sauce' | 'addon';
    label: string;
    extraPrice: number;
    isDefault: boolean;
    sortOrder: number;
}

// Product
export interface Product {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    basePrice: number;
    imageUrl?: string;
    isCombo: boolean;
    isActive: boolean;
    sortOrder: number;
    options?: ProductOption[];
}

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
