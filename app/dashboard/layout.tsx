'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ThemeProvider, useTheme } from '@/lib/theme-context';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

// Manager nav items
const managerNavItems: NavItem[] = [
    {
        label: 'Overview',
        href: '/dashboard/manager',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        label: 'Live Orders',
        href: '/dashboard/manager/orders',
        badge: 3,
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12h6M9 16h6" />
            </svg>
        ),
    },
    {
        label: 'Menu',
        href: '/dashboard/manager/menu',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
        ),
    },
    {
        label: 'Promos',
        href: '/dashboard/manager/promos',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
            </svg>
        ),
    },
    {
        label: 'Staff',
        href: '/dashboard/manager/staff',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    },
    {
        label: 'Reports',
        href: '/dashboard/manager/reports',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
        ),
    },
];

// Cashier nav items
const cashierNavItems: NavItem[] = [
    {
        label: 'POS',
        href: '/dashboard/cashier',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M2 10h20M12 17v4M8 21h8" />
            </svg>
        ),
    },
    {
        label: 'Transactions',
        href: '/dashboard/cashier/transactions',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12h6M9 16h6" />
            </svg>
        ),
    },
    {
        label: 'Refunds',
        href: '/dashboard/cashier/refunds',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 10h18M3 14h18M12 3v7M16 6l-4 4-4-4" />
            </svg>
        ),
    },
];

// Admin nav items
const adminNavItems: NavItem[] = [
    {
        label: 'Users',
        href: '/dashboard/admin',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    },
    {
        label: 'Roles',
        href: '/dashboard/admin/roles',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        label: 'Settings',
        href: '/dashboard/admin/settings',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
        ),
    },
    {
        label: 'Reports',
        href: '/dashboard/admin/reports',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
            </svg>
        ),
    },
    {
        label: 'Invoices',
        href: '/dashboard/admin/invoices',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M12 18v-6" />
                <path d="M9 15h6" />
            </svg>
        ),
    },
    {
        label: 'Logs',
        href: '/dashboard/admin/logs',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
        ),
    },
];

type Role = 'manager' | 'cashier' | 'admin';

const roleConfig: Record<Role, { label: string; color: string; navItems: NavItem[] }> = {
    manager: { label: 'Manager', color: '#F4A900', navItems: managerNavItems },
    cashier: { label: 'Cashier 1', color: '#3B82F6', navItems: cashierNavItems },
    admin: { label: 'Admin', color: '#8B5CF6', navItems: adminNavItems },
};

function DashboardContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Determine role from path
    const role: Role = pathname.includes('/dashboard/admin')
        ? 'admin'
        : pathname.includes('/dashboard/cashier')
            ? 'cashier'
            : 'manager';
    const { label: roleLabel, color: roleColor, navItems } = roleConfig[role];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const isActiveLink = (href: string) => {
        if (role === 'manager' && href === '/dashboard/manager') {
            return pathname === href;
        }
        if (role === 'cashier' && href === '/dashboard/cashier') {
            return pathname === href;
        }
        if (role === 'admin' && href === '/dashboard/admin') {
            return pathname === href;
        }
        return pathname.startsWith(href) && href !== '/dashboard/manager' && href !== '/dashboard/cashier' && href !== '/dashboard/admin';
    };

    return (
        <div className={`flex h-screen overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAFAFA]'}`}>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                style={{ width: collapsed ? 64 : 208 }}
                className={`
                    ${isMobile ? 'fixed z-50 w-52' : ''}
                    ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
                    flex flex-col h-full shrink-0 overflow-hidden
                    transition-all duration-200 ease-linear
                    ${isDark ? 'bg-[#111]' : 'bg-white'}
                `}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 p-4 h-14">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <Image src="/images/logos/los-pollos-logo.png" alt="Logo" width={32} height={32} />
                    </div>
                    <div className={`overflow-hidden whitespace-nowrap transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                        <h1 className={`font-semibold text-sm leading-tight ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Los Pollos</h1>
                        <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>{roleLabel}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-2 overflow-y-auto overflow-x-hidden">
                    <p className={`px-3 py-2 text-[10px] font-medium uppercase tracking-wider whitespace-nowrap transition-opacity duration-200 ${collapsed ? 'opacity-0' : 'opacity-100'} ${isDark ? 'text-[#444]' : 'text-[#c4c4c4]'}`}>
                        Menu
                    </p>
                    <div className="space-y-0.5">
                        {navItems.map((item) => {
                            const isActive = isActiveLink(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    title={collapsed ? item.label : undefined}
                                    className={`flex items-center rounded-xl transition-all duration-200 ${collapsed ? 'justify-center w-10 h-10 mx-auto' : 'gap-2.5 px-3 py-2'
                                        } ${isActive
                                            ? isDark
                                                ? 'bg-[#F4A900]/15 text-[#F4A900]'
                                                : 'bg-[#F4A900]/10 text-[#1a1a2e]'
                                            : isDark
                                                ? 'text-[#666] hover:bg-[#1a1a1a] hover:text-white'
                                                : 'text-[#888] hover:bg-[#f5f5f5] hover:text-[#1a1a2e]'
                                        }`}
                                >
                                    <span className={`shrink-0 ${isActive ? 'text-[#F4A900]' : ''}`}>{item.icon}</span>
                                    {!collapsed && (
                                        <span className="text-[11px] font-medium whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    )}
                                    {!collapsed && item.badge && (
                                        <span className="ml-auto w-4 h-4 bg-[#DA291C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
                {/* Bottom section */}
                <div className="p-2 space-y-1">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        title={collapsed ? (isDark ? 'Light' : 'Dark') : undefined}
                        className={`flex items-center rounded-xl transition-all duration-200 ${collapsed ? 'justify-center w-10 h-10 mx-auto' : 'w-full gap-2.5 px-3 py-2'
                            } ${isDark
                                ? 'text-[#666] hover:bg-[#1a1a1a] hover:text-white'
                                : 'text-[#888] hover:bg-[#f5f5f5] hover:text-[#1a1a2e]'
                            }`}
                    >
                        {isDark ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        )}
                        {!collapsed && (
                            <span className="text-[11px] font-medium whitespace-nowrap">
                                {isDark ? 'Light' : 'Dark'}
                            </span>
                        )}
                    </button>

                    {/* Collapse Toggle */}
                    {!isMobile && (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className={`flex items-center rounded-xl transition-all duration-200 ${collapsed ? 'justify-center w-10 h-10 mx-auto' : 'w-full gap-2.5 px-3 py-2'
                                } ${isDark
                                    ? 'text-[#666] hover:bg-[#1a1a1a] hover:text-white'
                                    : 'text-[#888] hover:bg-[#f5f5f5] hover:text-[#1a1a2e]'
                                }`}
                        >
                            <svg
                                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                className={`shrink-0 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
                            >
                                <path d="M11 17l-5-5 5-5" />
                                <path d="M18 17l-5-5 5-5" />
                            </svg>
                            {!collapsed && (
                                <span className="text-[11px] font-medium whitespace-nowrap">
                                    Collapse
                                </span>
                            )}
                        </button>
                    )}
                </div>

                {/* User */}
                <div className="p-2">
                    <div className={`flex items-center gap-2.5 rounded-xl transition-all duration-200 ${collapsed ? 'justify-center p-2' : 'p-2.5'
                        } ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold text-[10px] shrink-0"
                            style={{ backgroundColor: roleColor }}
                        >
                            {roleLabel[0]}
                        </div>
                        <div className={`flex-1 min-w-0 overflow-hidden ${collapsed ? 'hidden' : 'block'}`}>
                            <p className={`font-medium text-[11px] truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{roleLabel}</p>
                            <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Online</p>
                        </div>
                        {!collapsed && (
                            <button
                                title="Logout"
                                className={`shrink-0 p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#222] text-[#666] hover:text-white' : 'hover:bg-[#e8e8e8] text-[#a8a8a8] hover:text-[#1a1a2e]'}`}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {isMobile && (
                    <div className={`sticky top-0 z-30 flex items-center gap-3 px-4 py-3 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAFAFA]'}`}>
                        <button
                            onClick={() => setMobileOpen(true)}
                            className={`p-2 rounded-lg ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a2e]'}`}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            </svg>
                        </button>
                        <Image src="/images/logos/los-pollos-logo.png" alt="Logo" width={28} height={28} />
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{roleLabel}</span>
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <DashboardContent>{children}</DashboardContent>
        </ThemeProvider>
    );
}
