'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import { printReceipt, PrintReceiptData } from '@/lib/print-receipt';
import MenuProductCard from '@/components/ui/MenuProductCard';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl?: string;
}

const categories = ['All', 'Chicken', 'Buckets', 'Burgers', 'Sides', 'Drinks'];

const products: Product[] = [
    { id: '1', name: 'Gus Special (2pc)', price: 8.99, category: 'chicken', imageUrl: '/images/products/gus-special.png' },
    { id: '2', name: 'Cartel Bucket', price: 24.99, category: 'buckets', imageUrl: '/images/products/cartel-bucket.png' },
    { id: '3', name: 'Heisenberg Meal', price: 11.99, category: 'chicken', imageUrl: '/images/products/heisenberg-meal.png' },
    { id: '4', name: 'Blue Sky Wings', price: 7.99, category: 'chicken', imageUrl: '/images/products/blue-sky-wings.png' },
    { id: '5', name: 'Fire Burger', price: 9.99, category: 'burgers', imageUrl: '/images/products/jesses-fire-burger.png' },
    { id: '6', name: 'Hermanos Soda', price: 2.49, category: 'drinks', imageUrl: '/images/products/hermanos-soda.png' },
    { id: '7', name: 'Albuquerque Fries', price: 2.99, category: 'sides', imageUrl: '/images/products/albuquerque-fries.png' },
    { id: '8', name: 'Coleslaw', price: 1.99, category: 'sides', imageUrl: '/images/products/coleslaw-blanco.png' },
];

export default function CashierPOS() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('dine-in');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
    const [cashReceived, setCashReceived] = useState('');
    const [receiptData, setReceiptData] = useState<PrintReceiptData | null>(null);
    const [orderCounter, setOrderCounter] = useState(109);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory.toLowerCase());

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const clearOrder = () => {
        setCart([]);
        setCustomerName('');
        setOrderType('dine-in');
        setCashReceived('');
    };

    const handlePayment = (method: 'cash' | 'card') => {
        setPaymentMethod(method);
        setShowPaymentModal(true);
    };

    const processPayment = () => {
        const orderNum = `A${orderCounter}`;
        const cashAmount = parseFloat(cashReceived) || 0;

        const data: PrintReceiptData = {
            orderNumber: orderNum,
            customerName: customerName || 'Guest',
            orderType,
            items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
            subtotal,
            tax,
            total,
            paymentMethod,
            cashReceived: paymentMethod === 'cash' ? cashAmount : undefined,
            change: paymentMethod === 'cash' ? cashAmount - total : undefined,
            cashierName: 'Cashier 1',
            date: new Date(),
        };

        setReceiptData(data);
        setOrderCounter(prev => prev + 1);
        setShowPaymentModal(false);
        setShowReceiptModal(true);
    };

    const handlePrint = () => {
        if (!receiptData) return;
        printReceipt(receiptData);
    };

    const finishOrder = () => {
        setShowReceiptModal(false);
        clearOrder();
        setReceiptData(null);
    };

    const cashChange = (parseFloat(cashReceived) || 0) - total;
    const canProcess = paymentMethod === 'card' || (parseFloat(cashReceived) || 0) >= total;

    return (
        <>
            <div className="flex h-full no-print">
                {/* Products Section */}
                <div className="flex-1 p-4 overflow-auto">
                    <div className="mb-4">
                        <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>New Order</h1>
                        <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Select items to add</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${selectedCategory === cat
                                    ? isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'
                                    : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {filteredProducts.map(product => (
                            <MenuProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                imageUrl={product.imageUrl}
                                mode="cashier"
                                onClick={() => addToCart(product)}
                            />
                        ))}
                    </div>
                </div>

                {/* Cart Section */}
                <div className={`w-80 shrink-0 flex flex-col h-full ${isDark ? 'bg-[#111]' : 'bg-white'}`}>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Current Order</h2>
                            {cart.length > 0 && (
                                <button onClick={clearOrder} className="text-[#EF4444] text-[10px] font-medium">
                                    Clear
                                </button>
                            )}
                        </div>

                        <input
                            type="text"
                            placeholder="Customer name..."
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl text-[11px] mb-3 focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white placeholder-[#444]' : 'bg-[#f5f5f5] text-[#1a1a2e] placeholder-[#a8a8a8]'
                                }`}
                        />

                        <div className={`flex rounded-xl p-0.5 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'}`}>
                            <button
                                onClick={() => setOrderType('dine-in')}
                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${orderType === 'dine-in'
                                    ? isDark ? 'bg-[#2a2a2a] text-white' : 'bg-white text-[#1a1a2e]'
                                    : isDark ? 'text-[#555]' : 'text-[#a8a8a8]'
                                    }`}
                            >
                                Dine In
                            </button>
                            <button
                                onClick={() => setOrderType('take-away')}
                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${orderType === 'take-away'
                                    ? isDark ? 'bg-[#2a2a2a] text-white' : 'bg-white text-[#1a1a2e]'
                                    : isDark ? 'text-[#555]' : 'text-[#a8a8a8]'
                                    }`}
                            >
                                Take Away
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto px-4">
                        {cart.length === 0 ? (
                            <div className={`flex flex-col items-center justify-center h-full ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                                </svg>
                                <p className="text-[11px] mt-2">Cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {cart.map(item => (
                                    <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[10px] font-medium truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{item.name}</p>
                                            <p className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] ${isDark ? 'bg-[#222] text-white' : 'bg-white text-[#1a1a2e]'}`}
                                            >
                                                −
                                            </button>
                                            <span className={`w-6 text-center text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] ${isDark ? 'bg-[#222] text-white' : 'bg-white text-[#1a1a2e]'}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-[#EF4444] p-1">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={`p-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAFAFA]'}`}>
                        <div className="space-y-1 mb-4">
                            <div className="flex justify-between text-[10px]">
                                <span className={isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}>Subtotal</span>
                                <span className={isDark ? 'text-white' : 'text-[#1a1a2e]'}>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className={isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}>Tax (10%)</span>
                                <span className={isDark ? 'text-white' : 'text-[#1a1a2e]'}>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold pt-2">
                                <span className={isDark ? 'text-white' : 'text-[#1a1a2e]'}>Total</span>
                                <span className="text-[#F4A900]">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handlePayment('cash')}
                                disabled={cart.length === 0}
                                className={`py-3 rounded-xl text-[11px] font-semibold transition-all ${cart.length === 0
                                    ? 'bg-[#333] text-[#666] cursor-not-allowed'
                                    : 'bg-[#10B981] text-white active:scale-95'
                                    }`}
                            >
                                Cash
                            </button>
                            <button
                                onClick={() => handlePayment('card')}
                                disabled={cart.length === 0}
                                className={`py-3 rounded-xl text-[11px] font-semibold transition-all ${cart.length === 0
                                    ? 'bg-[#333] text-[#666] cursor-not-allowed'
                                    : 'bg-[#3B82F6] text-white active:scale-95'
                                    }`}
                            >
                                Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 no-print">
                    <div className={`w-full max-w-sm rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <h2 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>
                            {paymentMethod === 'cash' ? '💵 Cash Payment' : '💳 Card Payment'}
                        </h2>

                        <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                            <div className="flex justify-between mb-1">
                                <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Total Amount</span>
                                <span className="text-lg font-bold text-[#F4A900]">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {paymentMethod === 'cash' && (
                            <>
                                <div className="mb-4">
                                    <label className={`text-[10px] block mb-2 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Cash Received</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={cashReceived}
                                        onChange={(e) => setCashReceived(e.target.value)}
                                        placeholder="0.00"
                                        className={`w-full px-4 py-3 rounded-xl text-lg font-bold text-center focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'
                                            }`}
                                    />
                                </div>

                                {parseFloat(cashReceived) > 0 && (
                                    <div className={`rounded-xl p-4 mb-4 ${cashChange >= 0 ? 'bg-[#10B981]/10' : 'bg-[#EF4444]/10'}`}>
                                        <div className="flex justify-between">
                                            <span className={`text-[11px] ${cashChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                                {cashChange >= 0 ? 'Change' : 'Insufficient'}
                                            </span>
                                            <span className={`text-lg font-bold ${cashChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                                ${Math.abs(cashChange).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Quick amounts */}
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {[20, 50, 100, Math.ceil(total)].map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => setCashReceived(amount.toString())}
                                            className={`py-2 rounded-lg text-[10px] font-medium ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'
                                                }`}
                                        >
                                            ${amount}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {paymentMethod === 'card' && (
                            <div className={`rounded-xl p-4 mb-4 text-center ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>
                                    Swipe/Insert/Tap card on terminal
                                </p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={() => { setShowPaymentModal(false); setCashReceived(''); }}
                                className={`flex-1 py-3 rounded-xl text-[11px] font-medium ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f5f5f5] text-[#888]'}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={processPayment}
                                disabled={!canProcess}
                                className={`flex-1 py-3 rounded-xl text-[11px] font-semibold transition-all ${canProcess
                                    ? 'bg-[#F4A900] text-[#1a1a2e] active:scale-95'
                                    : 'bg-[#333] text-[#666] cursor-not-allowed'
                                    }`}
                            >
                                Complete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Receipt Modal */}
            {showReceiptModal && receiptData && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 no-print p-4">
                    <div className={`w-full max-w-sm rounded-2xl overflow-hidden ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        {/* Success Header */}
                        <div className={`p-5 text-center ${isDark ? 'bg-[#10B981]/10' : 'bg-[#10B981]/5'}`}>
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#10B981] flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Payment Successful</h2>
                            <p className={`text-[11px] mt-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Order #{receiptData.orderNumber}</p>
                        </div>

                        {/* Order Summary */}
                        <div className="p-4">
                            <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <div className="flex justify-between mb-2">
                                    <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Total</span>
                                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${receiptData.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Payment</span>
                                    <span className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{receiptData.paymentMethod.toUpperCase()}</span>
                                </div>
                                {receiptData.paymentMethod === 'cash' && receiptData.change !== undefined && (
                                    <div className="flex justify-between">
                                        <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Change</span>
                                        <span className="text-[11px] font-medium text-[#10B981]">${receiptData.change.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={finishOrder}
                                    className={`flex-1 py-3 rounded-xl text-[11px] font-medium ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}
                                >
                                    New Order
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="flex-1 py-3 rounded-xl text-[11px] font-semibold bg-[#F4A900] text-[#1a1a2e] active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9V2h12v7" />
                                        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                                        <rect x="6" y="14" width="12" height="8" />
                                    </svg>
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
