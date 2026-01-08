'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

type OrderStatus = 'ordered' | 'in-kitchen' | 'ready' | 'picked-up';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    items: string[];
    total: number;
    status: OrderStatus;
    orderType: 'dine-in' | 'take-away';
    createdAt: string;
}

const mockOrders: Order[] = [
    { id: '1', orderNumber: 'A101', customerName: 'John', items: ['Cartel Bucket', 'Soda'], total: 27.48, status: 'ordered', orderType: 'dine-in', createdAt: '2m' },
    { id: '2', orderNumber: 'A102', customerName: 'Maria', items: ['Gus Special', 'Fries'], total: 15.97, status: 'in-kitchen', orderType: 'take-away', createdAt: '5m' },
    { id: '3', orderNumber: 'A103', customerName: 'Carlos', items: ['Family Feast'], total: 29.99, status: 'in-kitchen', orderType: 'dine-in', createdAt: '8m' },
    { id: '4', orderNumber: 'A104', customerName: 'Sarah', items: ['Wings', 'Coleslaw'], total: 12.98, status: 'ready', orderType: 'take-away', createdAt: '12m' },
    { id: '5', orderNumber: 'A105', customerName: 'Mike', items: ['Heisenberg Meal'], total: 14.49, status: 'ready', orderType: 'dine-in', createdAt: '15m' },
];

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
    'ordered': { label: 'New', color: '#F59E0B' },
    'in-kitchen': { label: 'Cooking', color: '#3B82F6' },
    'ready': { label: 'Ready', color: '#10B981' },
    'picked-up': { label: 'Done', color: '#888' },
};

export default function LiveOrdersPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');

    const filteredOrders = mockOrders.filter(order => {
        if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;
        return true;
    });

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Live Orders</h1>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Real-time monitoring</p>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#10B981]/10 text-[#10B981] rounded-xl text-[9px] font-medium self-start">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span>
                    Live
                </span>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                <button
                    onClick={() => setSelectedStatus('all')}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${selectedStatus === 'all'
                            ? isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'
                            : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                        }`}
                >
                    All ({mockOrders.length})
                </button>
                {(Object.keys(statusConfig) as OrderStatus[]).slice(0, 3).map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all flex items-center gap-1.5 ${selectedStatus === status
                                ? isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'
                                : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                            }`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig[status].color }}></span>
                        {statusConfig[status].label}
                    </button>
                ))}
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredOrders.map((order) => (
                    <div key={order.id} className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>#{order.orderNumber}</span>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusConfig[order.status].color }} />
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 bg-[#F4A900] rounded-full flex items-center justify-center text-[#1a1a2e] font-semibold text-[9px]">
                                {order.customerName[0]}
                            </div>
                            <div>
                                <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{order.customerName}</p>
                                <p className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>{order.orderType === 'dine-in' ? 'Dine In' : 'Take Away'} • {order.createdAt}</p>
                            </div>
                        </div>

                        <div className="space-y-0.5 mb-3">
                            {order.items.map((item, index) => (
                                <p key={index} className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>{item}</p>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${order.total.toFixed(2)}</p>
                            <button className={`px-2.5 py-1 rounded-lg text-[9px] font-medium text-white ${order.status === 'ordered' ? 'bg-[#3B82F6]' :
                                    order.status === 'in-kitchen' ? 'bg-[#10B981]' :
                                        'bg-[#1a1a2e]'
                                }`}>
                                {order.status === 'ordered' ? 'Start' :
                                    order.status === 'in-kitchen' ? 'Ready' : 'Done'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
