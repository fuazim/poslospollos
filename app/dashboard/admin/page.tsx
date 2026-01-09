'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import CustomSelect from '@/components/shared/CustomSelect';
interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'cashier';
    status: 'active' | 'inactive';
    lastActive: string;
}

const mockUsers: User[] = [
    { id: '1', name: 'John Admin', email: 'john@lospollos.com', role: 'admin', status: 'active', lastActive: '2 min ago' },
    { id: '2', name: 'Sarah Manager', email: 'sarah@lospollos.com', role: 'manager', status: 'active', lastActive: '15 min ago' },
    { id: '3', name: 'Mike Cashier', email: 'mike@lospollos.com', role: 'cashier', status: 'active', lastActive: '1 hour ago' },
    { id: '4', name: 'Emma Cashier', email: 'emma@lospollos.com', role: 'cashier', status: 'inactive', lastActive: '2 days ago' },
    { id: '5', name: 'Carlos Manager', email: 'carlos@lospollos.com', role: 'manager', status: 'active', lastActive: '30 min ago' },
];

const roleColors: Record<string, string> = {
    admin: '#8B5CF6',
    manager: '#F4A900',
    cashier: '#3B82F6',
};

export default function AdminUsersPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUserRole, setNewUserRole] = useState('cashier');
    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const stats = {
        total: mockUsers.length,
        active: mockUsers.filter(u => u.status === 'active').length,
        admins: mockUsers.filter(u => u.role === 'admin').length,
        managers: mockUsers.filter(u => u.role === 'manager').length,
        cashiers: mockUsers.filter(u => u.role === 'cashier').length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Users</h1>
                    <p className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Manage user accounts and permissions</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-xl text-[11px] font-semibold active:scale-95 transition-transform"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Total Users</p>
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{stats.total}</p>
                </div>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Active</p>
                    <p className="text-xl font-bold text-[#10B981]">{stats.active}</p>
                </div>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Admins</p>
                    <p className="text-xl font-bold text-[#8B5CF6]">{stats.admins}</p>
                </div>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Managers</p>
                    <p className="text-xl font-bold text-[#F4A900]">{stats.managers}</p>
                </div>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                    <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Cashiers</p>
                    <p className="text-xl font-bold text-[#3B82F6]">{stats.cashiers}</p>
                </div>
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
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`flex-1 bg-transparent text-[11px] focus:outline-none ${isDark ? 'text-white placeholder-[#555]' : 'text-[#1a1a2e] placeholder-[#a8a8a8]'}`}
                    />
                </div>
                <div className="flex gap-1">
                    {['all', 'admin', 'manager', 'cashier'].map(role => (
                        <button
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className={`px-3 py-2 rounded-xl text-[10px] font-medium transition-all ${selectedRole === role
                                ? isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'
                                : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                                }`}
                        >
                            {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users List */}
            <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-medium ${isDark ? 'text-[#555] bg-[#0a0a0a]' : 'text-[#a8a8a8] bg-[#f8f8f8]'}`}>
                    <div className="col-span-4">User</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Last Active</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                {filteredUsers.map(user => (
                    <div key={user.id} className={`grid grid-cols-12 gap-4 px-4 py-3 items-center border-t ${isDark ? 'border-[#1a1a1a]' : 'border-[#f0f0f0]'}`}>
                        <div className="col-span-4 flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-[10px]"
                                style={{ backgroundColor: roleColors[user.role] }}
                            >
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{user.name}</p>
                                <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{user.email}</p>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span
                                className="px-2 py-1 rounded-lg text-[9px] font-medium text-white"
                                style={{ backgroundColor: roleColors[user.role] }}
                            >
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <span className={`flex items-center gap-1.5 text-[10px] ${user.status === 'active' ? 'text-[#10B981]' : isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-[#10B981]' : isDark ? 'bg-[#555]' : 'bg-[#a8a8a8]'}`} />
                                {user.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{user.lastActive}</p>
                        </div>
                        <div className="col-span-2 flex justify-end gap-1">
                            <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#1a1a1a] text-[#555]' : 'hover:bg-[#f5f5f5] text-[#a8a8a8]'}`}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </button>
                            <button className={`p-2 rounded-lg transition-colors text-[#EF4444] ${isDark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-[#f5f5f5]'}`}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className={`w-full max-w-md rounded-2xl p-5 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <h2 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Add New User</h2>

                        <div className="space-y-3">
                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white placeholder-[#444]' : 'bg-[#f5f5f5] text-[#1a1a2e] placeholder-[#a8a8a8]'}`}
                                />
                            </div>
                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white placeholder-[#444]' : 'bg-[#f5f5f5] text-[#1a1a2e] placeholder-[#a8a8a8]'}`}
                                />
                            </div>
                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Role</label>
                                <CustomSelect
                                    value={newUserRole}
                                    onChange={setNewUserRole}
                                    isDark={isDark}
                                    options={[
                                        { value: 'cashier', label: 'Cashier' },
                                        { value: 'manager', label: 'Manager' },
                                        { value: 'admin', label: 'Admin' },
                                    ]}
                                />
                            </div>
                            <div>
                                <label className={`text-[10px] block mb-1 ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}>Temporary Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter temporary password"
                                    className={`w-full px-3 py-2.5 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#1a1a1a] text-white placeholder-[#444]' : 'bg-[#f5f5f5] text-[#1a1a2e] placeholder-[#a8a8a8]'}`}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-5">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className={`flex-1 py-2.5 rounded-xl text-[11px] font-medium ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f5f5f5] text-[#888]'}`}
                            >
                                Cancel
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl text-[11px] font-semibold bg-[#8B5CF6] text-white active:scale-95 transition-transform">
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
