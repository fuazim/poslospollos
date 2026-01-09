/**
 * Receipt Types
 * Used for printing and receipt display
 */

export interface ReceiptItem {
    name: string;
    quantity: number;
    price: number;
}

export interface PrintReceiptData {
    orderNumber: string;
    customerName: string;
    orderType: 'dine-in' | 'take-away';
    items: ReceiptItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: 'cash' | 'card' | 'qr' | 'gift-card';
    cashReceived?: number;
    change?: number;
    cashierName: string;
    date: Date;
}
