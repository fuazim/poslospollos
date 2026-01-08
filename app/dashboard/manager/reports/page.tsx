'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

export default function ReportsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const [selectedReport, setSelectedReport] = useState('sales');

    const reports = ['Sales', 'Products', 'Staff', 'Insights'];

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Reports</h1>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Generate reports</p>
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

            {/* Report Types */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                {reports.map((report) => (
                    <button
                        key={report}
                        onClick={() => setSelectedReport(report.toLowerCase())}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${selectedReport === report.toLowerCase()
                                ? 'bg-[#F4A900] text-[#1a1a2e]'
                                : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                            }`}
                    >
                        {report}
                    </button>
                ))}
            </div>

            {/* Report Content */}
            <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>
                            {selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Report
                        </h2>
                        <p className={`text-[9px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>
                            {selectedPeriod === 'today' ? 'Jan 8, 2024' : selectedPeriod === 'week' ? 'Jan 1-8' : 'January 2024'}
                        </p>
                    </div>
                    <div className="flex gap-1.5">
                        <button className={`px-2.5 py-1.5 rounded-lg text-[9px] font-medium ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}>
                            CSV
                        </button>
                        <button className="px-2.5 py-1.5 bg-[#DA291C] text-white rounded-lg text-[9px] font-medium">
                            PDF
                        </button>
                    </div>
                </div>

                {selectedReport === 'sales' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div className={`rounded-xl p-3 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>Revenue</p>
                                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>$4,825</p>
                            </div>
                            <div className={`rounded-xl p-3 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>Orders</p>
                                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>127</p>
                            </div>
                            <div className={`rounded-xl p-3 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>Avg Ticket</p>
                                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>$38</p>
                            </div>
                            <div className={`rounded-xl p-3 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>Refunds</p>
                                <p className="text-sm font-bold text-[#EF4444]">$45</p>
                            </div>
                        </div>
                        <div className={`h-28 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#1a1a1a] text-[#444]' : 'bg-[#f8f8f8] text-[#a8a8a8]'}`}>
                            <span className="text-[9px]">Chart</span>
                        </div>
                    </div>
                )}

                {selectedReport !== 'sales' && (
                    <div className={`h-40 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#1a1a1a] text-[#444]' : 'bg-[#f8f8f8] text-[#a8a8a8]'}`}>
                        <span className="text-[9px]">{selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Report</span>
                    </div>
                )}
            </div>
        </div>
    );
}
