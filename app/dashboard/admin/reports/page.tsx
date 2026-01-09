'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/components/shared/CustomSelect';

const mockSalesData = {
    today: { revenue: 4825.50, orders: 127, avgOrder: 38.01 },
    week: { revenue: 28450.00, orders: 752, avgOrder: 37.83 },
    month: { revenue: 124680.00, orders: 3284, avgOrder: 37.96 },
};

const mockTopProducts = [
    { name: 'Cartel Bucket (8pc)', quantity: 456, revenue: 11388.44 },
    { name: 'Gus Special (2pc)', quantity: 389, revenue: 3498.11 },
    { name: 'Heisenberg Meal', quantity: 342, revenue: 4100.58 },
    { name: 'Family Feast', quantity: 285, revenue: 8543.15 },
    { name: 'Blue Sky Wings', quantity: 267, revenue: 2132.33 },
];

const mockDailyRevenue = [
    { day: 'Mon', revenue: 4250 },
    { day: 'Tue', revenue: 3890 },
    { day: 'Wed', revenue: 4120 },
    { day: 'Thu', revenue: 4580 },
    { day: 'Fri', revenue: 5230 },
    { day: 'Sat', revenue: 6120 },
    { day: 'Sun', revenue: 4260 },
];

const mockPaymentMethods = [
    { method: 'Cash', amount: 52340, percentage: 42 },
    { method: 'Card', amount: 49250, percentage: 39 },
    { method: 'E-Wallet', amount: 23090, percentage: 19 },
];

export default function AdminReportsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [period, setPeriod] = useState('month');
    const [reportType, setReportType] = useState('sales');

    const stats = mockSalesData[period as keyof typeof mockSalesData];
    const maxRevenue = Math.max(...mockDailyRevenue.map(d => d.revenue));

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Reports</h1>
                    <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Sales analytics and business reports</p>
                </div>
                <div className="flex items-center gap-3">
                    <CustomSelect
                        value={period}
                        onChange={setPeriod}
                        isDark={isDark}
                        className="w-32"
                        options={[
                            { value: 'today', label: 'Today' },
                            { value: 'week', label: 'This Week' },
                            { value: 'month', label: 'This Month' },
                        ]}
                    />
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-medium ${isDark ? 'bg-[#141414] text-white' : 'bg-white text-[#1a1a2e]'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export
                    </button>
                </div>
            </div>

            {/* Report Type Tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { id: 'sales', label: 'Sales Overview' },
                    { id: 'products', label: 'Products' },
                    { id: 'payments', label: 'Payments' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setReportType(tab.id)}
                        className={`px-4 py-2 rounded-xl text-[11px] font-medium transition-all ${reportType === tab.id
                            ? 'bg-[#8B5CF6] text-white'
                            : isDark ? 'bg-[#141414] text-[#666]' : 'bg-white text-[#888]'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Sales Overview */}
            {reportType === 'sales' && (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#10B981]/20' : 'bg-[#10B981]/10'}`}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                    </svg>
                                </div>
                                <span className="text-[#10B981] text-[10px] font-medium">+12.5%</span>
                            </div>
                            <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total Revenue</p>
                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${stats.revenue.toLocaleString()}</p>
                        </div>

                        <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#3B82F6]/20' : 'bg-[#3B82F6]/10'}`}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                                        <rect x="9" y="3" width="6" height="4" rx="1" />
                                    </svg>
                                </div>
                                <span className="text-[#10B981] text-[10px] font-medium">+8.3%</span>
                            </div>
                            <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total Orders</p>
                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{stats.orders.toLocaleString()}</p>
                        </div>

                        <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#8B5CF6]/20' : 'bg-[#8B5CF6]/10'}`}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5">
                                        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                                        <rect x="8" y="2" width="8" height="4" rx="1" />
                                    </svg>
                                </div>
                                <span className="text-[#EF4444] text-[10px] font-medium">-2.1%</span>
                            </div>
                            <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Avg. Order Value</p>
                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${stats.avgOrder.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Daily Revenue Chart */}
                    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <h3 className={`text-sm font-semibold mb-5 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Daily Revenue</h3>
                        <div className="flex items-end gap-4 h-40">
                            {mockDailyRevenue.map((data, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <span className={`text-[9px] font-medium ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>
                                        ${(data.revenue / 1000).toFixed(1)}k
                                    </span>
                                    <div
                                        className="w-full bg-linear-to-t from-[#8B5CF6] to-[#A78BFA] rounded-lg transition-all duration-300"
                                        style={{ height: `${(data.revenue / maxRevenue) * 100}px` }}
                                    />
                                    <span className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{data.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Products Report */}
            {reportType === 'products' && (
                <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Top Selling Products</h3>
                    <div className="space-y-2">
                        {mockTopProducts.map((product, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}
                            >
                                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold ${index === 0 ? 'bg-[#F4A900] text-[#1a1a2e]' : isDark ? 'bg-[#222] text-[#666]' : 'bg-white text-[#888]'
                                    }`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{product.name}</p>
                                    <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{product.quantity} sold</p>
                                </div>
                                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${product.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Payments Report */}
            {reportType === 'payments' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Payment Methods */}
                    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <h3 className={`text-sm font-semibold mb-5 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Payment Methods</h3>
                        <div className="space-y-4">
                            {mockPaymentMethods.map((payment, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{payment.method}</span>
                                        <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>${payment.amount.toLocaleString()} ({payment.percentage}%)</span>
                                    </div>
                                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`}>
                                        <div
                                            className={`h-full rounded-full ${index === 0 ? 'bg-[#10B981]' : index === 1 ? 'bg-[#3B82F6]' : 'bg-[#8B5CF6]'
                                                }`}
                                            style={{ width: `${payment.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <h3 className={`text-sm font-semibold mb-5 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Payment Summary</h3>
                        <div className="space-y-3">
                            <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>Total Transactions</span>
                                <span className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{stats.orders.toLocaleString()}</span>
                            </div>
                            <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>Successful</span>
                                <span className="text-[11px] font-semibold text-[#10B981]">{Math.floor(stats.orders * 0.98).toLocaleString()}</span>
                            </div>
                            <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>Refunded</span>
                                <span className="text-[11px] font-semibold text-[#EF4444]">{Math.floor(stats.orders * 0.02).toLocaleString()}</span>
                            </div>
                            <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>Total Revenue</span>
                                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${stats.revenue.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
