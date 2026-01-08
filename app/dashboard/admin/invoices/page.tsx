'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/app/components/CustomSelect';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Transaction {
    id: string;
    orderNumber: string;
    date: string;
    time: string;
    customer: string;
    items: { name: string; qty: number; price: number }[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    cashier: string;
}

const mockTransactions: Transaction[] = [
    {
        id: '1', orderNumber: 'A108', date: '2026-01-08', time: '14:45',
        customer: 'John Doe',
        items: [{ name: 'Cartel Bucket (8pc)', qty: 1, price: 24.99 }, { name: 'Hermanos Soda', qty: 2, price: 2.49 }],
        subtotal: 29.97, tax: 3.00, total: 32.97, paymentMethod: 'Card', cashier: 'Mike'
    },
    {
        id: '2', orderNumber: 'A107', date: '2026-01-08', time: '14:32',
        customer: 'Maria Garcia',
        items: [{ name: 'Gus Special (2pc)', qty: 2, price: 8.99 }, { name: 'Albuquerque Fries', qty: 1, price: 2.99 }],
        subtotal: 20.97, tax: 2.10, total: 23.07, paymentMethod: 'Cash', cashier: 'Mike'
    },
    {
        id: '3', orderNumber: 'A106', date: '2026-01-08', time: '14:15',
        customer: 'Carlos Mendez',
        items: [{ name: 'Heisenberg Meal', qty: 1, price: 11.99 }],
        subtotal: 11.99, tax: 1.20, total: 13.19, paymentMethod: 'E-Wallet', cashier: 'Emma'
    },
    {
        id: '4', orderNumber: 'A105', date: '2026-01-08', time: '13:58',
        customer: 'Sarah Wilson',
        items: [{ name: 'Family Feast', qty: 1, price: 29.99 }, { name: 'Coleslaw', qty: 2, price: 1.99 }],
        subtotal: 33.97, tax: 3.40, total: 37.37, paymentMethod: 'Card', cashier: 'Emma'
    },
    {
        id: '5', orderNumber: 'A104', date: '2026-01-07', time: '18:22',
        customer: 'Guest',
        items: [{ name: 'Blue Sky Wings', qty: 2, price: 7.99 }],
        subtotal: 15.98, tax: 1.60, total: 17.58, paymentMethod: 'Cash', cashier: 'Mike'
    },
];

const taxSummary = {
    totalSales: 124680.00,
    totalTax: 12468.00,
    netSales: 112212.00,
    taxRate: 10,
    period: 'January 2026',
};

export default function AdminInvoicesPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('transactions');
    const [period, setPeriod] = useState('today');
    const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        setSelectedTransactions(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedTransactions.length === mockTransactions.length) {
            setSelectedTransactions([]);
        } else {
            setSelectedTransactions(mockTransactions.map(t => t.id));
        }
    };

    // Export to Excel
    const exportToExcel = () => {
        const dataToExport = selectedTransactions.length > 0
            ? mockTransactions.filter(t => selectedTransactions.includes(t.id))
            : mockTransactions;

        // Flatten data for Excel
        const excelData = dataToExport.map(t => ({
            'Order #': t.orderNumber,
            'Date': t.date,
            'Time': t.time,
            'Customer': t.customer,
            'Items': t.items.map(i => `${i.name} x${i.qty}`).join(', '),
            'Subtotal': t.subtotal,
            'Tax (10%)': t.tax,
            'Total': t.total,
            'Payment': t.paymentMethod,
            'Cashier': t.cashier,
        }));

        // Create workbook
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

        // Add summary sheet
        const summaryData = [
            { 'Description': 'Total Transactions', 'Value': dataToExport.length },
            { 'Description': 'Total Sales', 'Value': dataToExport.reduce((s, t) => s + t.subtotal, 0).toFixed(2) },
            { 'Description': 'Total Tax Collected', 'Value': dataToExport.reduce((s, t) => s + t.tax, 0).toFixed(2) },
            { 'Description': 'Grand Total', 'Value': dataToExport.reduce((s, t) => s + t.total, 0).toFixed(2) },
        ];
        const wsSummary = XLSX.utils.json_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

        // Generate file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `LosPollos_Transactions_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Export Tax Report
    const exportTaxReport = () => {
        const taxData = [
            { 'Period': taxSummary.period },
            { 'Business': 'Los Pollos Hermanos' },
            { 'Address': '308 Negra Arroyo Lane, Albuquerque, NM 87104' },
            { 'NPWP': '01.234.567.8-901.000' },
            {},
            { 'Description': 'Gross Sales', 'Amount': taxSummary.totalSales },
            { 'Description': `Tax Collected (${taxSummary.taxRate}%)`, 'Amount': taxSummary.totalTax },
            { 'Description': 'Net Sales', 'Amount': taxSummary.netSales },
        ];

        const ws = XLSX.utils.json_to_sheet(taxData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Tax Report');

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `LosPollos_TaxReport_${taxSummary.period.replace(' ', '_')}.xlsx`);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Invoices</h1>
                    <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Transaction records & tax reports</p>
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
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { id: 'transactions', label: 'Transactions' },
                    { id: 'tax', label: 'Tax Summary' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-xl text-[11px] font-medium transition-all ${activeTab === tab.id
                                ? 'bg-[#8B5CF6] text-white'
                                : isDark ? 'bg-[#141414] text-[#666]' : 'bg-white text-[#888]'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
                <>
                    {/* Actions */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={selectAll}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-medium ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f5f5f5] text-[#666]'}`}
                            >
                                {selectedTransactions.length === mockTransactions.length ? 'Deselect All' : 'Select All'}
                            </button>
                            {selectedTransactions.length > 0 && (
                                <span className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>
                                    {selectedTransactions.length} selected
                                </span>
                            )}
                        </div>
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded-xl text-[11px] font-medium active:scale-95 transition-transform"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Export Excel
                        </button>
                    </div>

                    {/* Transactions Table */}
                    <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-medium ${isDark ? 'text-[#555] bg-[#0a0a0a]' : 'text-[#a8a8a8] bg-[#f8f8f8]'}`}>
                            <div className="col-span-1"></div>
                            <div className="col-span-2">Order</div>
                            <div className="col-span-2">Customer</div>
                            <div className="col-span-3">Items</div>
                            <div className="col-span-1">Tax</div>
                            <div className="col-span-1">Total</div>
                            <div className="col-span-2">Payment</div>
                        </div>
                        {mockTransactions.map(tx => (
                            <div
                                key={tx.id}
                                className={`grid grid-cols-12 gap-4 px-4 py-3 items-center border-t cursor-pointer transition-colors ${selectedTransactions.includes(tx.id)
                                        ? isDark ? 'bg-[#8B5CF6]/10' : 'bg-[#8B5CF6]/5'
                                        : ''
                                    } ${isDark ? 'border-[#1a1a1a]' : 'border-[#f0f0f0]'}`}
                                onClick={() => toggleSelection(tx.id)}
                            >
                                <div className="col-span-1">
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedTransactions.includes(tx.id)
                                            ? 'bg-[#8B5CF6] border-[#8B5CF6]'
                                            : isDark ? 'border-[#333]' : 'border-[#ddd]'
                                        }`}>
                                        {selectedTransactions.includes(tx.id) && (
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>#{tx.orderNumber}</p>
                                    <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{tx.date} {tx.time}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className={`text-[11px] ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{tx.customer}</p>
                                </div>
                                <div className="col-span-3">
                                    <p className={`text-[10px] truncate ${isDark ? 'text-[#888]' : 'text-[#666]'}`}>
                                        {tx.items.map(i => `${i.name} x${i.qty}`).join(', ')}
                                    </p>
                                </div>
                                <div className="col-span-1">
                                    <p className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>${tx.tax.toFixed(2)}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${tx.total.toFixed(2)}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className={`px-2 py-1 rounded-lg text-[9px] font-medium ${tx.paymentMethod === 'Cash' ? 'bg-[#10B981]/15 text-[#10B981]' :
                                            tx.paymentMethod === 'Card' ? 'bg-[#3B82F6]/15 text-[#3B82F6]' :
                                                'bg-[#8B5CF6]/15 text-[#8B5CF6]'
                                        }`}>
                                        {tx.paymentMethod}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Footer */}
                    <div className={`mt-4 p-4 rounded-2xl flex items-center justify-between ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className="flex gap-8">
                            <div>
                                <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total Transactions</p>
                                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{mockTransactions.length}</p>
                            </div>
                            <div>
                                <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total Tax</p>
                                <p className="text-sm font-bold text-[#F4A900]">${mockTransactions.reduce((s, t) => s + t.tax, 0).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total Revenue</p>
                                <p className="text-sm font-bold text-[#10B981]">${mockTransactions.reduce((s, t) => s + t.total, 0).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Tax Summary Tab */}
            {activeTab === 'tax' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Tax Overview */}
                    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Tax Overview</h3>
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-medium ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f5f5f5] text-[#666]'}`}>
                                {taxSummary.period}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`text-[11px] ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>Gross Sales</span>
                                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${taxSummary.totalSales.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#F4A900]/10' : 'bg-[#F4A900]/5'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className={`text-[11px] ${isDark ? 'text-[#F4A900]' : 'text-[#B8860B]'}`}>Tax Collected (PPN {taxSummary.taxRate}%)</span>
                                    </div>
                                    <span className="text-lg font-bold text-[#F4A900]">${taxSummary.totalTax.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#10B981]/10' : 'bg-[#10B981]/5'}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-[#10B981]">Net Sales (After Tax)</span>
                                    <span className="text-lg font-bold text-[#10B981]">${taxSummary.netSales.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Info & Export */}
                    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <h3 className={`text-sm font-semibold mb-5 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Business Information</h3>

                        <div className="space-y-3 mb-6">
                            <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[9px] mb-1 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Business Name</p>
                                <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Los Pollos Hermanos</p>
                            </div>
                            <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[9px] mb-1 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>NPWP</p>
                                <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>01.234.567.8-901.000</p>
                            </div>
                            <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <p className={`text-[9px] mb-1 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Address</p>
                                <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>308 Negra Arroyo Lane, Albuquerque, NM 87104</p>
                            </div>
                        </div>

                        <button
                            onClick={exportTaxReport}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#8B5CF6] text-white rounded-xl text-[11px] font-semibold active:scale-95 transition-transform"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                            </svg>
                            Export Tax Report (Excel)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
