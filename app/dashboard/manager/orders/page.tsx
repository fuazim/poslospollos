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
    const [orders, setOrders] = useState(mockOrders);

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const filteredOrders = orders.filter(order => {
        if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;
        return true;
    });

    const getNextAction = (status: OrderStatus) => {
        switch (status) {
            case 'ordered': return { label: 'Start Cooking', next: 'in-kitchen' as OrderStatus, color: 'bg-[#3B82F6] hover:bg-[#2563EB] text-white' };
            case 'in-kitchen': return { label: 'Mark Ready', next: 'ready' as OrderStatus, color: 'bg-[#10B981] hover:bg-[#059669] text-white' };
            case 'ready': return { label: 'Complete', next: 'picked-up' as OrderStatus, color: 'bg-[#6B7280] hover:bg-[#4B5563] text-white' };
            default: return null;
        }
    };

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
                    All ({orders.length})
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
                        {statusConfig[status].label} ({orders.filter(o => o.status === status).length})
                    </button>
                ))}
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredOrders.map((order) => {
                    const action = getNextAction(order.status);
                    
                    return (
                    <div key={order.id} className={`rounded-2xl p-4 flex flex-col h-full border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-transparent shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>#{order.orderNumber}</span>
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide" 
                                style={{ backgroundColor: `${statusConfig[order.status].color}20`, color: statusConfig[order.status].color }}>
                                {statusConfig[order.status].label}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 pb-3">
                            <div className="w-8 h-8 bg-[#F4A900] rounded-full flex items-center justify-center text-[#1a1a2e] font-bold text-[10px]">
                                {order.customerName[0]}
                            </div>
                            <div>
                                <p className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{order.customerName}</p>
                                <p className={`text-[9px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>{order.orderType === 'dine-in' ? 'Dine In' : 'Take Away'} • {order.createdAt}</p>
                            </div>
                        </div>

                        <ul className="space-y-1.5 mb-4 flex-1">
                            {order.items.map((item, i) => (
                                <li key={i} className={`text-[11px] flex items-center gap-2 ${isDark ? 'text-[#ccc]' : 'text-[#444]'}`}>
                                    <span className="w-1 h-1 bg-[#F4A900] rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center justify-between pt-3 mt-auto mb-3">
                            <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>Total Amount</span>
                            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${order.total.toFixed(2)}</span>
                        </div>
                        
                        {/* Action Button */}
                        {action ? (
                            <button
                                onClick={() => handleUpdateStatus(order.id, action.next)}
                                className={`w-full py-2.5 rounded-xl text-[11px] font-bold transition-all active:scale-[0.98] ${action.color}`}
                            >
                                {action.label}
                            </button>
                        ) : (
                             <div className={`w-full py-2.5 rounded-xl text-[11px] font-medium text-center ${isDark ? 'bg-[#222] text-[#666]' : 'bg-gray-100 text-gray-400'}`}>
                                Completed
                            </div>
                        )}
                    </div>
                    );
                })}
            </div>
        </div>
    );
}
