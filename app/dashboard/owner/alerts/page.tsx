'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/components/shared/CustomSelect';

const mockAlerts = [
    { id: 1, title: 'Server Efficiency Warning', msg: 'Main server CPU usage > 90% for 5 mins.', severity: 'critical', time: '10 mins ago' },
    { id: 2, title: 'High Refund Rate - Shift 2', msg: 'Refunds exceeded 5% of tatal transactions.', severity: 'warning', time: '2 hours ago' },
    { id: 3, title: 'Inventory Low: Chicken', msg: 'Stock level below reorder point (15%).', severity: 'warning', time: '5 hours ago' },
    { id: 4, title: 'Payment Gateway Restored', msg: 'Services are back online.', severity: 'info', time: '1 day ago' },
    { id: 5, title: 'Daily Report Ready', msg: 'Sales report for Jan 8 is available.', severity: 'success', time: '1 day ago' },
];

export default function OwnerAlertsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [filter, setFilter] = useState('All Alerts');

    const severityConfig = {
        critical: { color: '#EF4444', label: 'CRITICAL' },
        warning: { color: '#F59E0B', label: 'WARNING' },
        info: { color: '#3B82F6', label: 'INFO' },
        success: { color: '#10B981', label: 'SUCCESS' },
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
             {/* Header */}
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>System Alerts</h1>
                    <p className={`text-xs ${isDark ? 'text-[#888]' : 'text-[#a8a8a8]'}`}>Operational notifications and warnings</p>
                </div>
                <div className="flex gap-3">
                    <button className={`px-4 py-2 rounded-xl text-xs font-medium text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/5 transition-colors`}>
                        Clear All
                    </button>
                    <CustomSelect
                        value={filter}
                        onChange={setFilter}
                        isDark={isDark}
                        className="w-40"
                        bgClass={isDark ? 'bg-[#1a1a1a]' : 'bg-white'}
                        options={[
                            { value: 'All Alerts', label: 'All Alerts' },
                            { value: 'Critical', label: 'Critical' },
                            { value: 'Warnings', label: 'Warnings' },
                            { value: 'Unread', label: 'Unread' },
                        ]}
                    />
                </div>
            </div>

            <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                {mockAlerts.map((alert, i) => (
                     <div key={alert.id} className={`p-4 border-b last:border-0 flex gap-4 items-start ${isDark ? 'border-[#222] hover:bg-[#1a1a1a]' : 'border-gray-50 hover:bg-gray-50'} transition-colors cursor-pointer`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5`}
                             style={{ backgroundColor: `${severityConfig[alert.severity as keyof typeof severityConfig].color}20` }}>
                             <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: severityConfig[alert.severity as keyof typeof severityConfig].color }}></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{alert.title}</h4>
                                <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>{alert.time}</span>
                            </div>
                            <p className={`text-xs mt-1 ${isDark ? 'text-[#888]' : 'text-[#666]'}`}>{alert.msg}</p>
                            
                            <div className="flex gap-2 mt-3">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border`}
                                      style={{ 
                                          borderColor: `${severityConfig[alert.severity as keyof typeof severityConfig].color}40`,
                                          color: severityConfig[alert.severity as keyof typeof severityConfig].color 
                                      }}>
                                    {severityConfig[alert.severity as keyof typeof severityConfig].label}
                                </span>
                            </div>
                        </div>
                     </div>
                ))}
            </div>
        </div>
    );
}
