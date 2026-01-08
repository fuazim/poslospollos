'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

interface Promo {
    id: string;
    name: string;
    type: 'discount' | 'bundle' | 'happy-hour';
    discount: number;
    period: string;
    isActive: boolean;
    uses: number;
}

const mockPromos: Promo[] = [
    { id: '1', name: 'Weekend Special', type: 'discount', discount: 15, period: 'Jan 6-7', isActive: true, uses: 45 },
    { id: '2', name: 'Family Bundle', type: 'bundle', discount: 20, period: 'Jan 1-31', isActive: true, uses: 89 },
    { id: '3', name: 'Happy Hour', type: 'happy-hour', discount: 10, period: 'All year', isActive: false, uses: 22 },
];

const typeColors = {
    'discount': '#10B981',
    'bundle': '#3B82F6',
    'happy-hour': '#F59E0B',
};

export default function PromosPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [promos] = useState(mockPromos);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Promos</h1>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Manage promotions</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#F4A900] text-[#1a1a2e] rounded-xl text-[10px] font-semibold self-start">
                    <span>+</span> Create
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Active</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>2</p>
                </div>
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Uses</p>
                    <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>156</p>
                </div>
                <div className="rounded-2xl p-4 bg-[#10B981]/10">
                    <p className={`text-[9px] mb-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Impact</p>
                    <p className="text-base font-bold text-[#10B981]">+$1.2k</p>
                </div>
            </div>

            {/* Promos List */}
            <div className="space-y-2">
                {promos.map((promo) => (
                    <div key={promo.id} className={`flex items-center gap-4 rounded-2xl p-4 ${!promo.isActive ? 'opacity-50' : ''} ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: typeColors[promo.type] }} />
                        <div className="flex-1 min-w-0">
                            <p className={`text-[11px] font-medium truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{promo.name}</p>
                            <p className={`text-[9px] ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>{promo.period}</p>
                        </div>
                        <div className="text-center hidden sm:block">
                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{promo.discount}%</p>
                        </div>
                        <div className="text-center hidden sm:block">
                            <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{promo.uses}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-[8px] font-semibold shrink-0 ${promo.isActive ? 'bg-[#10B981]/10 text-[#10B981]' : isDark ? 'bg-[#1a1a1a] text-[#555]' : 'bg-[#f0f0f0] text-[#a8a8a8]'
                            }`}>
                            {promo.isActive ? 'Active' : 'Off'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
