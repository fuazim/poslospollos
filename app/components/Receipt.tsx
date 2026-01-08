'use client';

import { forwardRef } from 'react';

interface ReceiptItem {
    name: string;
    quantity: number;
    price: number;
}

interface ReceiptData {
    orderNumber: string;
    customerName: string;
    orderType: 'dine-in' | 'take-away';
    items: ReceiptItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: 'cash' | 'card';
    cashReceived?: number;
    change?: number;
    cashierName: string;
    date: Date;
}

interface ReceiptProps {
    data: ReceiptData;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(({ data }, ref) => {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div
            ref={ref}
            className="receipt-container bg-white text-black p-4 font-mono text-[11px] leading-tight"
            style={{ width: '80mm', minHeight: 'auto' }}
        >
            {/* Header */}
            <div className="text-center mb-3">
                <div className="text-lg font-bold tracking-wider">LOS POLLOS</div>
                <div className="text-sm font-bold">HERMANOS</div>
                <div className="text-[9px] mt-1 text-gray-600">
                    "The Chicken Brothers"
                </div>
                <div className="border-b border-dashed border-black my-2"></div>
                <div className="text-[9px] text-gray-600">
                    308 Negra Arroyo Lane<br />
                    Albuquerque, NM 87104<br />
                    Tel: (505) 555-0123
                </div>
            </div>

            <div className="border-b border-dashed border-black my-2"></div>

            {/* Order Info */}
            <div className="flex justify-between text-[10px] mb-1">
                <span>Order #:</span>
                <span className="font-bold">{data.orderNumber}</span>
            </div>
            <div className="flex justify-between text-[10px] mb-1">
                <span>Date:</span>
                <span>{formatDate(data.date)}</span>
            </div>
            <div className="flex justify-between text-[10px] mb-1">
                <span>Time:</span>
                <span>{formatTime(data.date)}</span>
            </div>
            <div className="flex justify-between text-[10px] mb-1">
                <span>Customer:</span>
                <span>{data.customerName || 'Guest'}</span>
            </div>
            <div className="flex justify-between text-[10px] mb-1">
                <span>Type:</span>
                <span className="font-bold">{data.orderType === 'dine-in' ? 'DINE IN' : 'TAKE AWAY'}</span>
            </div>
            <div className="flex justify-between text-[10px]">
                <span>Cashier:</span>
                <span>{data.cashierName}</span>
            </div>

            <div className="border-b border-dashed border-black my-2"></div>

            {/* Items */}
            <div className="mb-2">
                <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span>Item</span>
                    <span>Amount</span>
                </div>
                <div className="border-b border-dotted border-gray-400 mb-1"></div>
                {data.items.map((item, index) => (
                    <div key={index} className="mb-1">
                        <div className="flex justify-between text-[10px]">
                            <span className="flex-1 pr-2">{item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="text-[9px] text-gray-500 pl-2">
                            {item.quantity} x ${item.price.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-b border-dashed border-black my-2"></div>

            {/* Totals */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                    <span>Subtotal:</span>
                    <span>${data.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                    <span>Tax (10%):</span>
                    <span>${data.tax.toFixed(2)}</span>
                </div>
                <div className="border-b border-dotted border-gray-400 my-1"></div>
                <div className="flex justify-between font-bold text-sm">
                    <span>TOTAL:</span>
                    <span>${data.total.toFixed(2)}</span>
                </div>
            </div>

            <div className="border-b border-dashed border-black my-2"></div>

            {/* Payment */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                    <span>Payment:</span>
                    <span className="font-bold">{data.paymentMethod.toUpperCase()}</span>
                </div>
                {data.paymentMethod === 'cash' && data.cashReceived && (
                    <>
                        <div className="flex justify-between text-[10px]">
                            <span>Cash Received:</span>
                            <span>${data.cashReceived.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold">
                            <span>Change:</span>
                            <span>${data.change?.toFixed(2)}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="border-b border-dashed border-black my-3"></div>

            {/* Footer */}
            <div className="text-center">
                <div className="text-[10px] font-bold mb-1">
                    ★ Thank You! ★
                </div>
                <div className="text-[9px] text-gray-600 mb-2">
                    "Taste the Family Recipe"
                </div>
                <div className="text-[8px] text-gray-500">
                    Visit us at: www.lospollos.com
                </div>

                {/* Decorative line */}
                <div className="mt-3 text-[10px] tracking-widest text-gray-400">
                    ═══════════════════
                </div>

                <div className="text-[8px] text-gray-400 mt-2">
                    Keep this receipt for refunds<br />
                    within 24 hours of purchase
                </div>
            </div>

            {/* Order Number Large (for kitchen) */}
            <div className="mt-3 pt-3 border-t border-dashed border-black text-center">
                <div className="text-2xl font-bold tracking-widest">
                    {data.orderNumber}
                </div>
                <div className="text-[9px] text-gray-500">
                    {data.orderType === 'dine-in' ? '[ DINE IN ]' : '[ TAKE AWAY ]'}
                </div>
            </div>
        </div>
    );
});

Receipt.displayName = 'Receipt';

export default Receipt;
