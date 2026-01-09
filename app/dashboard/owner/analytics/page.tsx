'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/components/shared/CustomSelect';

const categoryPerformance = [
    { name: 'Chicken', sales: 45000, growth: '+12%', color: '#F4A900' },
    { name: 'Burgers', sales: 32000, growth: '+8%', color: '#EF4444' },
    { name: 'Sides', sales: 15500, growth: '+15%', color: '#3B82F6' },
    { name: 'Drinks', sales: 12000, growth: '-2%', color: '#10B981' },
    { name: 'Desserts', sales: 8500, growth: '+5%', color: '#8B5CF6' },
];

const mockHourlySales = [12, 18, 45, 78, 90, 65, 55, 80, 110, 95, 60, 40];

export default function OwnerAnalyticsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [period, setPeriod] = useState('This Month');

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Analytics</h1>
                    <p className={`text-xs ${isDark ? 'text-[#888]' : 'text-[#a8a8a8]'}`}>Deep dive into sales and product performance</p>
                </div>
                <CustomSelect
                    value={period}
                    onChange={setPeriod}
                    isDark={isDark}
                    className="w-36"
                    bgClass={isDark ? 'bg-[#1a1a1a]' : 'bg-white'}
                    options={[
                        { value: 'Today', label: 'Today' },
                        { value: 'This Week', label: 'This Week' },
                        { value: 'This Month', label: 'This Month' },
                        { value: 'This Year', label: 'This Year' },
                    ]}
                />
            </div>

            {/* Sales Breakdown Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Performance */}
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <h3 className={`text-sm font-bold mb-6 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Sales by Category</h3>
                    <div className="space-y-5">
                        {categoryPerformance.map((cat, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className={`font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{cat.name}</span>
                                    <div className="flex gap-2">
                                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${(cat.sales / 1000).toFixed(1)}k</span>
                                        <span className={`text-[10px] ${cat.growth.startsWith('+') ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{cat.growth}</span>
                                    </div>
                                </div>
                                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-[#222]' : 'bg-gray-100'}`}>
                                    <div 
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${(cat.sales / 50000) * 100}%`, backgroundColor: cat.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hourly Traffic Pattern (Mock Bar Chart) */}
                <div className={`lg:col-span-2 p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Peak Hours Traffic</h3>
                        <div className="flex gap-2 text-[10px]">
                            <span className="flex items-center gap-1 text-[#888]"><div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>Orders</span>
                        </div>
                    </div>
                    <div className="flex items-end justify-between h-64 gap-2">
                        {mockHourlySales.map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className={`relative w-full rounded-t-lg bg-[#3B82F6] opacity-80 group-hover:opacity-100 transition-all`} style={{ height: `${val}%` }}>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#3B82F6]">{val}</div>
                                </div>
                                <span className="text-[10px] text-[#888]">{i + 10}am</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Avg Order Value', val: '$24.50', sub: '+2.4%', up: true },
                    { label: 'Conversion Rate', val: '68%', sub: '+1.1%', up: true },
                    { label: 'Return Customer', val: '42%', sub: '-0.5%', up: false },
                    { label: 'Refund Rate', val: '1.2%', sub: '-0.1%', up: true }, // refund turun = bagus (up trend secara positif)
                ].map((stat, i) => (
                    <div key={i} className={`p-5 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <p className={`text-[10px] mb-1 ${isDark ? 'text-[#888]' : 'text-[#666]'}`}>{stat.label}</p>
                        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{stat.val}</h4>
                        <span className={`text-[10px] ${stat.up ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{stat.sub} vs last month</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
