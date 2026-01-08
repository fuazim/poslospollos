'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

const mockStats = {
    todaySales: 4825.50,
    totalOrders: 127,
    avgOrderValue: 38.01,
    pendingOrders: 8,
};

const mockPaymentBreakdown = [
    { method: 'Card', amount: 2450.00, color: '#3B82F6' },
    { method: 'Cash', amount: 1575.50, color: '#10B981' },
    { method: 'E-Wallet', amount: 800.00, color: '#8B5CF6' },
];

const mockBestSellers = [
    { name: 'Cartel Bucket (8pc)', sales: 45, revenue: 1124.55 },
    { name: 'Gus Special (2pc)', sales: 38, revenue: 341.62 },
    { name: 'Heisenberg Meal', sales: 32, revenue: 383.68 },
    { name: 'Family Feast', sales: 28, revenue: 839.72 },
];

const mockHourlyData = [
    { hour: '9', revenue: 189 },
    { hour: '10', revenue: 456 },
    { hour: '11', revenue: 1064 },
    { hour: '12', revenue: 1330 },
    { hour: '1', revenue: 836 },
    { hour: '2', revenue: 570 },
    { hour: '3', revenue: 380 },
];

export default function ManagerOverview() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const maxRevenue = Math.max(...mockHourlyData.map(d => d.revenue));

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Overview</h1>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Welcome back</p>
                </div>
                <div className={`flex rounded-2xl p-1 self-start ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`}>
                    {['today', 'week', 'month'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${selectedPeriod === period
                                    ? isDark ? 'bg-[#2a2a2a] text-white' : 'bg-white text-[#1a1a2e]'
                                    : isDark ? 'text-[#555]' : 'text-[#a8a8a8]'
                                }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#10B981]/20' : 'bg-[#10B981]/10'}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                            </svg>
                        </div>
                        <span className="text-[#10B981] text-[9px] font-medium">+12%</span>
                    </div>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Sales</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${mockStats.todaySales.toLocaleString()}</p>
                </div>

                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#3B82F6]/20' : 'bg-[#3B82F6]/10'}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                                <rect x="9" y="3" width="6" height="4" rx="1" />
                            </svg>
                        </div>
                        <span className="text-[#10B981] text-[9px] font-medium">+8%</span>
                    </div>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Orders</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{mockStats.totalOrders}</p>
                </div>

                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#8B5CF6]/20' : 'bg-[#8B5CF6]/10'}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5">
                                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" />
                            </svg>
                        </div>
                        <span className="text-[#EF4444] text-[9px] font-medium">-2%</span>
                    </div>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Avg Value</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${mockStats.avgOrderValue}</p>
                </div>

                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#F4A900]/10' : 'bg-[#F4A900]/5'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-[#F4A900]/20 rounded-xl flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F4A900" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <span className="px-1.5 py-0.5 bg-[#F4A900] text-[#1a1a2e] text-[8px] font-bold rounded-lg">Live</span>
                    </div>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Pending</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{mockStats.pendingOrders}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
                {/* Hourly Chart */}
                <div className={`lg:col-span-2 rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <h2 className={`text-[11px] font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Hourly Sales</h2>
                    <div className="flex items-end gap-2 h-28">
                        {mockHourlyData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-1.5">
                                <span className={`text-[8px] font-medium ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>${data.revenue}</span>
                                <div
                                    className="w-full bg-[#F4A900] rounded-lg transition-all duration-300"
                                    style={{ height: `${(data.revenue / maxRevenue) * 70}px` }}
                                />
                                <span className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>{data.hour}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment */}
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <h2 className={`text-[11px] font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Payments</h2>
                    <div className="space-y-3">
                        {mockPaymentBreakdown.map((payment, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-[9px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>{payment.method}</span>
                                    <span className={`text-[9px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${payment.amount.toFixed(0)}</span>
                                </div>
                                <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}>
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: `${(payment.amount / mockStats.todaySales) * 100}%`, backgroundColor: payment.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Best Sellers */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Best Sellers</h2>
                    <button className="text-[#F4A900] text-[9px] font-medium">View All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {mockBestSellers.map((item, index) => (
                        <div key={index} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold ${index === 0 ? 'bg-[#F4A900] text-[#1a1a2e]' :
                                    isDark ? 'bg-[#222] text-[#666]' : 'bg-[#e8e8e8] text-[#888]'
                                }`}>
                                {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className={`text-[10px] font-medium truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{item.name}</p>
                                <p className={`text-[8px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{item.sales} sold</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
