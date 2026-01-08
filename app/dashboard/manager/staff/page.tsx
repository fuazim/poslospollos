'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

interface Staff {
    id: string;
    name: string;
    role: 'cashier' | 'kitchen';
    status: 'online' | 'offline';
    sales: number;
    orders: number;
}

const mockStaff: Staff[] = [
    { id: '1', name: 'John Doe', role: 'cashier', status: 'online', sales: 1250, orders: 32 },
    { id: '2', name: 'Maria Garcia', role: 'cashier', status: 'online', sales: 980, orders: 28 },
    { id: '3', name: 'Carlos Rodriguez', role: 'kitchen', status: 'online', sales: 0, orders: 45 },
    { id: '4', name: 'Sarah Johnson', role: 'cashier', status: 'offline', sales: 0, orders: 0 },
];

const roleColors = { 'cashier': '#3B82F6', 'kitchen': '#F59E0B' };

export default function StaffPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [staff] = useState(mockStaff);

    const onlineCount = staff.filter(s => s.status === 'online').length;
    const totalSales = staff.reduce((sum, s) => sum + s.sales, 0);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Staff</h1>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Monitor performance</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#F4A900] text-[#1a1a2e] rounded-xl text-[10px] font-semibold self-start">
                    <span>+</span> Add
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{staff.length}</p>
                </div>
                <div className="rounded-2xl p-4 bg-[#10B981]/10">
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Online</p>
                    <p className="text-base font-bold text-[#10B981]">{onlineCount}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Sales</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${totalSales}</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Refunds</p>
                    <p className="text-base font-bold text-[#EF4444]">3</p>
                </div>
            </div>

            {/* Staff List */}
            <div className="space-y-2">
                {staff.map((member) => (
                    <div key={member.id} className={`flex items-center gap-3 rounded-2xl p-4 ${member.status === 'offline' ? 'opacity-50' : ''} ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className="relative shrink-0">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-semibold text-[9px] ${isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'}`}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${isDark ? 'border-[#141414]' : 'border-white'} ${member.status === 'online' ? 'bg-[#10B981]' : 'bg-[#888]'
                                }`}></span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className={`text-[11px] font-medium truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{member.name}</p>
                            <p className="text-[9px]" style={{ color: roleColors[member.role] }}>
                                {member.role === 'cashier' ? 'Cashier' : 'Kitchen'}
                            </p>
                        </div>

                        <div className="text-center hidden sm:block">
                            <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{member.orders}</p>
                            <p className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>orders</p>
                        </div>

                        <div className="text-center hidden sm:block">
                            <p className="text-[11px] font-medium text-[#10B981]">${member.sales}</p>
                            <p className={`text-[8px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>sales</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
