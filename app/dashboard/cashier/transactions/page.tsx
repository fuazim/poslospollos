'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

interface Transaction {
    id: string;
    orderNumber: string;
    customerName: string;
    items: number;
    total: number;
    paymentMethod: 'cash' | 'card';
    status: 'completed' | 'refunded';
    time: string;
}

const mockTransactions: Transaction[] = [
    { id: '1', orderNumber: 'A108', customerName: 'John', items: 3, total: 27.48, paymentMethod: 'card', status: 'completed', time: '2:45 PM' },
    { id: '2', orderNumber: 'A107', customerName: 'Maria', items: 2, total: 15.97, paymentMethod: 'cash', status: 'completed', time: '2:32 PM' },
    { id: '3', orderNumber: 'A106', customerName: 'Carlos', items: 1, total: 29.99, paymentMethod: 'card', status: 'completed', time: '2:15 PM' },
    { id: '4', orderNumber: 'A105', customerName: 'Sarah', items: 4, total: 42.50, paymentMethod: 'cash', status: 'refunded', time: '1:58 PM' },
    { id: '5', orderNumber: 'A104', customerName: 'Mike', items: 2, total: 18.98, paymentMethod: 'card', status: 'completed', time: '1:42 PM' },
    { id: '6', orderNumber: 'A103', customerName: 'Emma', items: 5, total: 55.45, paymentMethod: 'card', status: 'completed', time: '1:20 PM' },
];

export default function TransactionsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [filter, setFilter] = useState<'all' | 'completed' | 'refunded'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = mockTransactions.filter(t => {
        if (filter !== 'all' && t.status !== filter) return false;
        if (searchQuery && !t.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) && !t.customerName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const todayTotal = mockTransactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.total, 0);
    const todayCount = mockTransactions.filter(t => t.status === 'completed').length;

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Transactions</h1>
                    <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Today's transaction history</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total Sales</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${todayTotal.toFixed(2)}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Orders</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{todayCount}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Avg Order</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${(todayTotal / todayCount).toFixed(2)}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Refunds</p>
                    <p className="text-base font-bold text-[#EF4444]">1</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-xs">
                    <svg className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search order or customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#141414] text-white placeholder-[#444]' : 'bg-white text-[#1a1a2e] placeholder-[#a8a8a8]'
                            }`}
                    />
                </div>
                <div className="flex gap-1.5">
                    {(['all', 'completed', 'refunded'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${filter === f
                                    ? isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'
                                    : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-2">
                {filteredTransactions.map(t => (
                    <div key={t.id} className={`flex items-center gap-4 rounded-2xl p-4 ${t.status === 'refunded' ? 'opacity-50' : ''} ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold ${t.paymentMethod === 'card' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-[#10B981]/10 text-[#10B981]'
                            }`}>
                            {t.paymentMethod === 'card' ? '💳' : '💵'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>#{t.orderNumber}</p>
                                {t.status === 'refunded' && (
                                    <span className="px-1.5 py-0.5 bg-[#EF4444]/10 text-[#EF4444] text-[8px] font-bold rounded">Refunded</span>
                                )}
                            </div>
                            <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{t.customerName} • {t.items} items</p>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${t.total.toFixed(2)}</p>
                            <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{t.time}</p>
                        </div>
                        <button className={`px-3 py-1.5 rounded-lg text-[9px] font-medium ${isDark ? 'bg-[#1a1a1a] text-[#666]' : 'bg-[#f5f5f5] text-[#888]'}`}>
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
