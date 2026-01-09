'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/components/shared/CustomSelect';

interface SettingSection {
    id: string;
    title: string;
    icon: React.ReactNode;
}

const sections: SettingSection[] = [
    {
        id: 'general',
        title: 'General',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
        )
    },
    {
        id: 'store',
        title: 'Store Info',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    },
    {
        id: 'tax',
        title: 'Tax & Fees',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        )
    },
    {
        id: 'receipt',
        title: 'Receipt',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
        )
    },
];

export default function AdminSettingsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeSection, setActiveSection] = useState('general');
    const [taxRate, setTaxRate] = useState('10');
    const [storeName, setStoreName] = useState('Los Pollos Hermanos');
    const [storeAddress, setStoreAddress] = useState('308 Negra Arroyo Lane, Albuquerque, NM 87104');
    const [storePhone, setStorePhone] = useState('(505) 555-0123');
    const [autoLogout, setAutoLogout] = useState('30');
    const [paperSize, setPaperSize] = useState('80');

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Settings</h1>
                <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Configure system settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sections Nav */}
                <div className="lg:col-span-1 space-y-1">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${activeSection === section.id
                                ? isDark ? 'bg-[#8B5CF6]/15 text-[#8B5CF6]' : 'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                                : isDark ? 'text-[#666] hover:bg-[#141414]' : 'text-[#888] hover:bg-[#f8f8f8]'
                                }`}
                        >
                            {section.icon}
                            <span className="text-[11px] font-medium">{section.title}</span>
                        </button>
                    ))}
                </div>

                {/* Settings Panel */}
                <div className={`lg:col-span-3 rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    {activeSection === 'general' && (
                        <div className="space-y-5">
                            <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>General Settings</h2>

                            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Dark Mode Default</p>
                                        <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Set dark mode as default for all users</p>
                                    </div>
                                    <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${isDark ? 'bg-[#8B5CF6]' : 'bg-[#e5e5e5]'}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isDark ? 'left-5' : 'left-1'}`} />
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Sound Notifications</p>
                                        <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Play sounds for new orders</p>
                                    </div>
                                    <div className="w-10 h-6 rounded-full relative cursor-pointer bg-[#8B5CF6]">
                                        <div className="absolute top-1 left-5 w-4 h-4 rounded-full bg-white" />
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Auto-logout</p>
                                        <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Automatic logout after inactivity</p>
                                    </div>
                                    <CustomSelect
                                        value={autoLogout}
                                        onChange={setAutoLogout}
                                        isDark={isDark}
                                        className="w-32"
                                        options={[
                                            { value: '15', label: '15 minutes' },
                                            { value: '30', label: '30 minutes' },
                                            { value: '60', label: '1 hour' },
                                            { value: 'never', label: 'Never' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'store' && (
                        <div className="space-y-5">
                            <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Store Information</h2>

                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Store Name</label>
                                <input
                                    type="text"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}
                                />
                            </div>
                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Address</label>
                                <textarea
                                    value={storeAddress}
                                    onChange={(e) => setStoreAddress(e.target.value)}
                                    rows={2}
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none resize-none ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}
                                />
                            </div>
                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Phone Number</label>
                                <input
                                    type="text"
                                    value={storePhone}
                                    onChange={(e) => setStorePhone(e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}
                                />
                            </div>

                            <button className="px-4 py-2.5 rounded-xl text-[11px] font-semibold bg-[#8B5CF6] text-white active:scale-95 transition-transform">
                                Save Changes
                            </button>
                        </div>
                    )}

                    {activeSection === 'tax' && (
                        <div className="space-y-5">
                            <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Tax & Fees</h2>

                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Tax Rate (%)</label>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}
                                />
                            </div>

                            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Include Tax in Price</p>
                                        <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Show prices with tax included</p>
                                    </div>
                                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${isDark ? 'bg-[#222]' : 'bg-[#e5e5e5]'}`}>
                                        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
                                    </div>
                                </div>
                            </div>

                            <button className="px-4 py-2.5 rounded-xl text-[11px] font-semibold bg-[#8B5CF6] text-white active:scale-95 transition-transform">
                                Save Changes
                            </button>
                        </div>
                    )}

                    {activeSection === 'receipt' && (
                        <div className="space-y-5">
                            <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Receipt Settings</h2>

                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Receipt Header</label>
                                <input
                                    type="text"
                                    defaultValue="LOS POLLOS HERMANOS"
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}
                                />
                            </div>
                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Receipt Footer</label>
                                <textarea
                                    defaultValue="Thank You! Taste the Family Recipe"
                                    rows={2}
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none resize-none ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}
                                />
                            </div>

                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Paper Size</label>
                                <CustomSelect
                                    value={paperSize}
                                    onChange={setPaperSize}
                                    isDark={isDark}
                                    options={[
                                        { value: '80', label: '80mm (Standard)' },
                                        { value: '58', label: '58mm (Compact)' },
                                    ]}
                                />
                            </div>

                            <button className="px-4 py-2.5 rounded-xl text-[11px] font-semibold bg-[#8B5CF6] text-white active:scale-95 transition-transform">
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
