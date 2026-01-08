'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

interface LogEntry {
    id: string;
    action: string;
    user: string;
    details: string;
    timestamp: string;
    type: 'info' | 'warning' | 'success' | 'error';
}

const mockLogs: LogEntry[] = [
    { id: '1', action: 'User Login', user: 'John Admin', details: 'Logged in from 192.168.1.100', timestamp: '2 min ago', type: 'info' },
    { id: '2', action: 'Order Created', user: 'Mike Cashier', details: 'Order #A108 - $24.99', timestamp: '5 min ago', type: 'success' },
    { id: '3', action: 'Refund Processed', user: 'Mike Cashier', details: 'Order #A105 - $12.50 refunded', timestamp: '15 min ago', type: 'warning' },
    { id: '4', action: 'Menu Updated', user: 'Sarah Manager', details: 'Updated price for "Cartel Bucket"', timestamp: '30 min ago', type: 'info' },
    { id: '5', action: 'User Created', user: 'John Admin', details: 'Created user "Emma Cashier"', timestamp: '1 hour ago', type: 'success' },
    { id: '6', action: 'Failed Login', user: 'Unknown', details: 'Failed login attempt for "admin@test.com"', timestamp: '2 hours ago', type: 'error' },
    { id: '7', action: 'Settings Changed', user: 'John Admin', details: 'Tax rate changed from 8% to 10%', timestamp: '3 hours ago', type: 'info' },
    { id: '8', action: 'Promo Created', user: 'Sarah Manager', details: 'Created promo "Weekend Special"', timestamp: '5 hours ago', type: 'success' },
];

const typeColors: Record<string, { bg: string; text: string }> = {
    info: { bg: '#3B82F6', text: '#3B82F6' },
    success: { bg: '#10B981', text: '#10B981' },
    warning: { bg: '#F59E0B', text: '#F59E0B' },
    error: { bg: '#EF4444', text: '#EF4444' },
};

export default function AdminLogsPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    const filteredLogs = mockLogs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.details.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'all' || log.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Activity Logs</h1>
                    <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>System activity and audit trail</p>
                </div>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-medium ${isDark ? 'bg-[#141414] text-white' : 'bg-white text-[#1a1a2e]'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Export
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4">
                <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}>
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`flex-1 bg-transparent text-[11px] focus:outline-none ${isDark ? 'text-white placeholder-[#555]' : 'text-[#1a1a2e] placeholder-[#a8a8a8]'}`}
                    />
                </div>
                <div className="flex gap-1">
                    {['all', 'info', 'success', 'warning', 'error'].map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-3 py-2 rounded-xl text-[10px] font-medium transition-all ${selectedType === type
                                    ? isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'
                                    : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                                }`}
                        >
                            {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logs List */}
            <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                {filteredLogs.map((log, index) => (
                    <div
                        key={log.id}
                        className={`flex items-center gap-4 p-4 ${index !== 0 ? (isDark ? 'border-t border-[#1a1a1a]' : 'border-t border-[#f0f0f0]') : ''}`}
                    >
                        {/* Type Indicator */}
                        <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: typeColors[log.type].bg }}
                        />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{log.action}</p>
                                <span
                                    className="px-1.5 py-0.5 rounded text-[8px] font-medium"
                                    style={{
                                        backgroundColor: `${typeColors[log.type].bg}15`,
                                        color: typeColors[log.type].text
                                    }}
                                >
                                    {log.type.toUpperCase()}
                                </span>
                            </div>
                            <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{log.details}</p>
                        </div>

                        {/* User */}
                        <div className="text-right shrink-0">
                            <p className={`text-[10px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{log.user}</p>
                            <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{log.timestamp}</p>
                        </div>
                    </div>
                ))}

                {filteredLogs.length === 0 && (
                    <div className={`flex flex-col items-center justify-center py-12 ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                        </svg>
                        <p className="text-[11px] mt-2">No logs found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
