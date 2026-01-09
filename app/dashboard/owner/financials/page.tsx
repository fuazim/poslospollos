'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/components/shared/CustomSelect';
import { saveAs } from 'file-saver';

export default function OwnerFinancialsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [period, setPeriod] = useState('This Month');
    const [isExporting, setIsExporting] = useState(false);

    const financialSummary = [
        { label: 'Total Revenue', amount: 154200, type: 'income' },
        { label: 'Cost of Goods Sold (COGS)', amount: 48500, type: 'expense' },
        { label: 'Gross Profit', amount: 105700, type: 'net' },
        { label: 'Operating Expenses', amount: 32400, type: 'expense' },
        { label: 'Net Profit', amount: 73300, type: 'final' },
    ];

    const exportToPDF = async () => {
        try {
            setIsExporting(true);
            const { pdf } = await import('@react-pdf/renderer');
            const { FinancialReportPDF } = await import('@/components/pdf/FinancialReportPDF');

            const blob = await pdf(
                <FinancialReportPDF 
                    period={period}
                    data={financialSummary}
                    generatedAt={new Date().toLocaleString()}
                />
            ).toBlob();
            
            saveAs(blob, `LosPollos_Financials_${period.replace(' ', '_')}.pdf`);
        } catch (error) {
            console.error('Failed to export PDF:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Financial Report</h1>
                    <p className={`text-xs ${isDark ? 'text-[#888]' : 'text-[#a8a8a8]'}`}>Profit & Loss Statement Overview</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={exportToPDF}
                        disabled={isExporting}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-2 ${
                            isDark ? 'border-[#333] text-white hover:bg-[#222]' : 'border-gray-200 text-[#1a1a2e] hover:bg-gray-50'
                        }`}
                    >
                        {isExporting ? (
                            <>
                                <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Export PDF
                            </>
                        )}
                    </button>
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
                            { value: 'Q1 2026', label: 'Q1 2026' },
                        ]}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* P&L Table */}
                <div className={`lg:col-span-2 p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <h3 className={`text-sm font-bold mb-6 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Income Statement</h3>
                    
                    <div className="space-y-4">
                        {financialSummary.map((item, i) => (
                            <div key={i} className={`flex justify-between items-center p-4 rounded-xl ${
                                item.type === 'final' 
                                    ? 'bg-[#10B981]/10 border border-[#10B981]/20' 
                                    : isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'
                            }`}>
                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{item.label}</span>
                                <span className={`text-sm font-bold ${
                                    item.type === 'expense' ? 'text-[#EF4444]' :
                                    item.type === 'final' ? 'text-[#10B981]' : 
                                    isDark ? 'text-white' : 'text-[#1a1a2e]'
                                }`}>
                                    {item.type === 'expense' ? '-' : ''}${item.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className={`mt-8 pt-6 border-t ${isDark ? 'border-[#333]' : 'border-gray-100'}`}>
                        <p className={`text-xs text-center ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>
                            * Financial data is estimated based on POS transactions and standard cost inputs.
                        </p>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                     <h3 className={`text-sm font-bold mb-6 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Expense Breakdown</h3>
                     <div className="space-y-6">
                        {[
                            { label: 'Food Ingredients', val: 45, color: '#F4A900' },
                            { label: 'Labor Cost', val: 30, color: '#3B82F6' },
                            { label: 'Utilities', val: 15, color: '#8B5CF6' },
                            { label: 'Marketing', val: 10, color: '#EF4444' },
                        ].map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className={isDark ? 'text-[#ccc]' : 'text-[#555]'}>{exp.label}</span>
                                    <span className={`font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{exp.val}%</span>
                                </div>
                                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-[#222]' : 'bg-gray-100'}`}>
                                    <div 
                                        className="h-full rounded-full" 
                                        style={{ width: `${exp.val}%`, backgroundColor: exp.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                     </div>
                     
                     <div className={`mt-8 p-4 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f9fa]'}`}>
                        <h4 className={`text-xs font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Budget Status</h4>
                        <p className={`text-[10px] ${isDark ? 'text-[#888]' : 'text-[#666]'}`}>
                            You are <span className="text-[#10B981] font-bold">5% under budget</span> for this month. Good job on cost control!
                        </p>
                     </div>
                </div>
            </div>
        </div>
    );
}
