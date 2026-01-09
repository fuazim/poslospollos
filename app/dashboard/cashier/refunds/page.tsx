'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/components/shared/CustomSelect';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    items: string[];
    total: number;
    time: string;
    canRefund: boolean;
}

const recentOrders: Order[] = [
    { id: '1', orderNumber: 'A108', customerName: 'John', items: ['Cartel Bucket', 'Soda', 'Fries'], total: 27.48, time: '2:45 PM', canRefund: true },
    { id: '2', orderNumber: 'A107', customerName: 'Maria', items: ['Gus Special', 'Fries'], total: 15.97, time: '2:32 PM', canRefund: true },
    { id: '3', orderNumber: 'A106', customerName: 'Carlos', items: ['Family Feast'], total: 29.99, time: '2:15 PM', canRefund: true },
    { id: '4', orderNumber: 'A105', customerName: 'Sarah', items: ['Wings', 'Coleslaw', 'Drink', 'Sundae'], total: 42.50, time: '1:58 PM', canRefund: false },
];

export default function RefundsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [refundReason, setRefundReason] = useState('');

    const filteredOrders = recentOrders.filter(o =>
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Refunds</h1>
                <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Process order refunds</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Search Orders */}
                <div>
                    <div className="relative mb-4">
                        <svg className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search order number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#141414] text-white placeholder-[#444]' : 'bg-white text-[#1a1a2e] placeholder-[#a8a8a8]'
                                }`}
                        />
                    </div>

                    <p className={`text-[10px] font-medium mb-2 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Recent Orders</p>
                    <div className="space-y-2">
                        {filteredOrders.map(order => (
                            <button
                                key={order.id}
                                onClick={() => order.canRefund && setSelectedOrder(order)}
                                disabled={!order.canRefund}
                                className={`w-full flex items-center gap-3 rounded-2xl p-4 text-left transition-all ${selectedOrder?.id === order.id
                                    ? 'ring-2 ring-[#F4A900]'
                                    : ''
                                    } ${!order.canRefund ? 'opacity-40 cursor-not-allowed' : ''} ${isDark ? 'bg-[#141414]' : 'bg-white'}`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>#{order.orderNumber}</span>
                                        <span className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{order.time}</span>
                                    </div>
                                    <p className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>{order.customerName} • {order.items.length} items</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${order.total.toFixed(2)}</p>
                                    {!order.canRefund && (
                                        <span className="text-[8px] text-[#EF4444]">Already refunded</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Refund Form */}
                <div className={`rounded-2xl p-4 h-fit ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    {selectedOrder ? (
                        <>
                            <h2 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>
                                Refund Order #{selectedOrder.orderNumber}
                            </h2>

                            <div className={`rounded-xl p-3 mb-4 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[10px] mb-2 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Items:</p>
                                <div className="space-y-1">
                                    {selectedOrder.items.map((item, i) => (
                                        <p key={i} className={`text-[11px] ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>• {item}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className={`text-[10px] font-medium block mb-2 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>
                                    Reason for refund *
                                </label>
                                <CustomSelect
                                    value={refundReason}
                                    onChange={setRefundReason}
                                    isDark={isDark}
                                    placeholder="Select reason..."
                                    options={[
                                        { value: 'wrong_order', label: 'Wrong Order' },
                                        { value: 'quality', label: 'Quality Issue' },
                                        { value: 'customer_request', label: 'Customer Request' },
                                        { value: 'other', label: 'Other' },
                                    ]}
                                />
                            </div>

                            <div className={`flex items-center justify-between p-3 rounded-xl mb-4 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Refund Amount</span>
                                <span className="text-lg font-bold text-[#EF4444]">${selectedOrder.total.toFixed(2)}</span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className={`flex-1 py-2.5 rounded-xl text-[11px] font-medium ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f5f5f5] text-[#888]'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={!refundReason}
                                    className={`flex-1 py-2.5 rounded-xl text-[11px] font-medium transition-all ${refundReason
                                        ? 'bg-[#EF4444] text-white active:scale-95'
                                        : 'bg-[#333] text-[#666] cursor-not-allowed'
                                        }`}
                                >
                                    Process Refund
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={`flex flex-col items-center justify-center py-12 ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M3 10h18M3 14h18M12 3v7M16 6l-4 4-4-4" />
                            </svg>
                            <p className="text-[11px] mt-3">Select an order to refund</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
