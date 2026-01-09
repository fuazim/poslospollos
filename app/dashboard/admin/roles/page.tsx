'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';

interface Role {
    id: string;
    name: string;
    description: string;
    color: string;
    usersCount: number;
    permissions: string[];
}

const mockRoles: Role[] = [
    {
        id: '1',
        name: 'Admin',
        description: 'Full system access',
        color: '#8B5CF6',
        usersCount: 1,
        permissions: ['users.manage', 'roles.manage', 'settings.manage', 'logs.view', 'reports.view', 'menu.manage', 'orders.manage']
    },
    {
        id: '2',
        name: 'Manager',
        description: 'Store management access',
        color: '#F4A900',
        usersCount: 2,
        permissions: ['reports.view', 'menu.manage', 'orders.manage', 'staff.view', 'promos.manage']
    },
    {
        id: '3',
        name: 'Cashier',
        description: 'POS and transactions',
        color: '#3B82F6',
        usersCount: 2,
        permissions: ['orders.create', 'transactions.view', 'refunds.create']
    },
];

const allPermissions = [
    { id: 'users.manage', label: 'Manage Users', category: 'Admin' },
    { id: 'roles.manage', label: 'Manage Roles', category: 'Admin' },
    { id: 'settings.manage', label: 'System Settings', category: 'Admin' },
    { id: 'logs.view', label: 'View Logs', category: 'Admin' },
    { id: 'reports.view', label: 'View Reports', category: 'Manager' },
    { id: 'menu.manage', label: 'Manage Menu', category: 'Manager' },
    { id: 'orders.manage', label: 'Manage Orders', category: 'Manager' },
    { id: 'staff.view', label: 'View Staff', category: 'Manager' },
    { id: 'promos.manage', label: 'Manage Promos', category: 'Manager' },
    { id: 'orders.create', label: 'Create Orders', category: 'Cashier' },
    { id: 'transactions.view', label: 'View Transactions', category: 'Cashier' },
    { id: 'refunds.create', label: 'Process Refunds', category: 'Cashier' },
];

export default function AdminRolesPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Roles</h1>
                    <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Manage roles and permissions</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-xl text-[11px] font-semibold active:scale-95 transition-transform">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Role
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Roles List */}
                <div className="lg:col-span-1 space-y-3">
                    {mockRoles.map(role => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role)}
                            className={`w-full text-left p-4 rounded-2xl transition-all ${selectedRole?.id === role.id
                                    ? isDark ? 'bg-[#1a1a1a] ring-2 ring-[#8B5CF6]' : 'bg-white ring-2 ring-[#8B5CF6]'
                                    : isDark ? 'bg-[#141414] hover:bg-[#1a1a1a]' : 'bg-white hover:bg-[#f8f8f8]'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${role.color}20` }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={role.color} strokeWidth="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className={`text-[12px] font-semibold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{role.name}</p>
                                    <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{role.description}</p>
                                </div>
                                <div className={`px-2 py-1 rounded-lg text-[9px] font-medium ${isDark ? 'bg-[#222] text-[#888]' : 'bg-[#f5f5f5] text-[#888]'}`}>
                                    {role.usersCount} users
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Permissions Panel */}
                <div className={`lg:col-span-2 rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    {selectedRole ? (
                        <>
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${selectedRole.color}20` }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedRole.color} strokeWidth="1.5">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5" />
                                            <path d="M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{selectedRole.name}</h2>
                                        <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{selectedRole.permissions.length} permissions</p>
                                    </div>
                                </div>
                                <button className={`px-3 py-2 rounded-xl text-[10px] font-medium ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#1a1a2e]'}`}>
                                    Edit Role
                                </button>
                            </div>

                            <div className="space-y-4">
                                {['Admin', 'Manager', 'Cashier'].map(category => (
                                    <div key={category}>
                                        <p className={`text-[10px] font-medium mb-2 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{category} Permissions</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {allPermissions.filter(p => p.category === category).map(permission => (
                                                <div
                                                    key={permission.id}
                                                    className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}
                                                >
                                                    <div className={`w-4 h-4 rounded-md flex items-center justify-center ${selectedRole.permissions.includes(permission.id)
                                                            ? 'bg-[#10B981]'
                                                            : isDark ? 'bg-[#222]' : 'bg-[#e5e5e5]'
                                                        }`}>
                                                        {selectedRole.permissions.includes(permission.id) && (
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={`text-[10px] ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{permission.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={`flex flex-col items-center justify-center h-64 ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                            <p className="text-[11px] mt-3">Select a role to view permissions</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
