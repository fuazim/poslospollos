'use client';

import { useTheme } from '@/lib/theme-context';
import { useState } from 'react';

import CustomSelect from '@/components/shared/CustomSelect';

// Mock Data
const stats = [
    { label: 'Total Revenue', value: '$124,500', change: '+12.5%', trend: 'up' },
    { label: 'Net Profit', value: '$45,200', change: '+8.2%', trend: 'up' },
    { label: 'Total Orders', value: '3,842', change: '-2.1%', trend: 'down' },
    { label: 'Avg Ticket Size', value: '$32.40', change: '+4.3%', trend: 'up' },
];

const alertItems = [
    { id: 1, title: 'Unusual Refund Spike', desc: 'Branch A reported 5 refunds in 1 hour', type: 'warning', time: '2h ago' },
    { id: 2, title: 'Sales Goal Reached', desc: 'Daily target of $5k hit at 6 PM', type: 'success', time: '5h ago' },
    { id: 3, title: 'Low Stock Alert', desc: 'Chicken Wings stock below 10%', type: 'error', time: '1d ago' },
];

export default function OwnerDashboardPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [timeRange, setTimeRange] = useState('This Month');

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Business Overview</h1>
                    <p className={`text-xs ${isDark ? 'text-[#888]' : 'text-[#a8a8a8]'}`}>Performance monitoring & operational health</p>
                </div>
                <CustomSelect
                    value={timeRange}
                    onChange={setTimeRange}
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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className={`p-5 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'} border ${isDark ? 'border-transparent' : 'border-gray-100'}`}>
                        <p className={`text-[11px] font-medium mb-1 ${isDark ? 'text-[#888]' : 'text-[#666]'}`}>{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{stat.value}</h3>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                stat.trend === 'up' 
                                    ? 'bg-[#10B981]/10 text-[#10B981]' 
                                    : 'bg-[#EF4444]/10 text-[#EF4444]'
                            }`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart: Revenue Trend */}
                <div className={`lg:col-span-2 p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Revenue Trend</h3>
                        <div className="flex gap-2">
                             <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#0EA5E9]"></span>
                                <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>This Year</span>
                             </div>
                             <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                                <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>Last Year</span>
                             </div>
                        </div>
                    </div>
                    
                    {/* Mock Line Chart Visualization */}
                    <div className="w-full h-64 flex items-end gap-2 sm:gap-4">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative h-full">
                                {/* Tooltip Mock */}
                                <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-[9px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10`}>
                                    ${h * 1500}
                                </div>
                                {/* Bar 1 */}
                                <div 
                                    className="w-full bg-[#0EA5E9] rounded-t-sm opacity-80 hover:opacity-100 transition-all"
                                    style={{ height: `${h}%` }}
                                ></div>
                                {/* Bar 2 (Background Mock for trend) */}
                                <div 
                                    className="w-full bg-[#10B981]/30 rounded-t-sm absolute bottom-0 -z-10"
                                    style={{ height: `${h * 0.8}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    {/* X-Axis Labels */}
                    <div className="flex justify-between mt-3 text-[9px] text-[#888]">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <span key={m}>{m}</span>
                        ))}
                    </div>
                </div>

                {/* Side Panel: Alerts & Health */}
                <div className={`space-y-6`}>
                    {/* Operational Health */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <h3 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Operational Health</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[11px] mb-1.5">
                                    <span className={isDark ? 'text-[#888]' : 'text-[#666]'}>Refund Rate</span>
                                    <span className="font-semibold text-[#EF4444]">High (2.4%)</span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-[#222]' : 'bg-gray-100'}`}>
                                    <div className="h-full rounded-full bg-[#EF4444] w-[70%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[11px] mb-1.5">
                                    <span className={isDark ? 'text-[#888]' : 'text-[#666]'}>Payment Success</span>
                                    <span className="font-semibold text-[#10B981]">99.8%</span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-[#222]' : 'bg-gray-100'}`}>
                                    <div className="h-full rounded-full bg-[#10B981] w-[99%]"></div>
                                </div>
                            </div>
                             <div>
                                <div className="flex justify-between text-[11px] mb-1.5">
                                    <span className={isDark ? 'text-[#888]' : 'text-[#666]'}>Customer Satisfaction</span>
                                    <span className="font-semibold text-[#F59E0B]">4.2/5.0</span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-[#222]' : 'bg-gray-100'}`}>
                                    <div className="h-full rounded-full bg-[#F59E0B] w-[84%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Alerts */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                         <h3 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Recent Alerts</h3>
                         <div className="space-y-3">
                            {alertItems.map(alert => (
                                <div key={alert.id} className="flex gap-3 items-start">
                                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                                        alert.type === 'error' ? 'bg-[#EF4444]' :
                                        alert.type === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
                                    }`} />
                                    <div>
                                        <p className={`text-[11px] font-medium leading-tight ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{alert.title}</p>
                                        <p className={`text-[10px] mt-0.5 ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>{alert.desc}</p>
                                        <p className={`text-[9px] mt-1 text-[#888]`}>{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>

            {/* Best Sellers Table (Simplified) */}
             <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-4">
                     <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Top Performing Products</h3>
                     <button className={`text-[10px] font-medium ${isDark ? 'text-[#0EA5E9]' : 'text-[#0284C7]'}`}>View Full Report &rarr;</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`text-[10px] uppercase border-b ${isDark ? 'border-[#222] text-[#666]' : 'border-gray-100 text-[#888]'}`}>
                                <th className="pb-3 pl-2">Product Name</th>
                                <th className="pb-3">Category</th>
                                <th className="pb-3">Sold</th>
                                <th className="pb-3 text-right pr-2">Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody className={`text-[11px] ${isDark ? 'text-[#ccc]' : 'text-[#444]'}`}>
                            {[
                                { name: 'Cartel Bucket', cat: 'Family Meals', sold: 450, rev: '$12,350' },
                                { name: 'Heisenberg Meal', cat: 'Combos', sold: 380, rev: '$8,200' },
                                { name: 'Los Pollos Classic', cat: 'Chicken', sold: 310, rev: '$4,500' },
                                { name: 'Curly Fries', cat: 'Sides', sold: 890, rev: '$3,100' },
                            ].map((item, idx) => (
                                <tr key={idx} className={`border-b last:border-0 ${isDark ? 'border-[#222]' : 'border-gray-50'}`}>
                                    <td className="py-3 pl-2 font-medium">{item.name}</td>
                                    <td className="py-3">{item.cat}</td>
                                    <td className="py-3">{item.sold}</td>
                                    <td className="py-3 text-right pr-2 font-semibold">{item.rev}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
}
