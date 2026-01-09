/**
 * Dashboard Navigation Configuration
 * Centralized nav items for all dashboard roles
 */

import React from 'react';

export interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

// SVG Icon components for cleaner code
const Icons = {
    grid: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    clipboard: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h6" />
        </svg>
    ),
    menu: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
    ),
    star: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
        </svg>
    ),
    users: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    download: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    ),
    dashboard: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
        </svg>
    ),
    bell: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    ),
    pos: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M2 10h20M12 17v4M8 21h8" />
        </svg>
    ),
    refund: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 10h18M3 14h18M12 3v7M16 6l-4 4-4-4" />
        </svg>
    ),
    layers: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    ),
    settings: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    ),
    chart: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
        </svg>
    ),
    invoice: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
        </svg>
    ),
    logs: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
    ),
};

// Manager Navigation Items
export const managerNavItems: NavItem[] = [
    { label: 'Overview', href: '/dashboard/manager', icon: Icons.grid },
    { label: 'Live Orders', href: '/dashboard/manager/orders', icon: Icons.clipboard, badge: 3 },
    { label: 'Menu', href: '/dashboard/manager/menu', icon: Icons.menu },
    { label: 'Promos', href: '/dashboard/manager/promos', icon: Icons.star },
    { label: 'Staff', href: '/dashboard/manager/staff', icon: Icons.users },
    { label: 'Reports', href: '/dashboard/manager/reports', icon: Icons.download },
];

// Cashier Navigation Items
export const cashierNavItems: NavItem[] = [
    { label: 'POS', href: '/dashboard/cashier', icon: Icons.pos },
    { label: 'Transactions', href: '/dashboard/cashier/transactions', icon: Icons.clipboard },
    { label: 'Refunds', href: '/dashboard/cashier/refunds', icon: Icons.refund },
];

// Admin Navigation Items
export const adminNavItems: NavItem[] = [
    { label: 'Users', href: '/dashboard/admin', icon: Icons.users },
    { label: 'Roles', href: '/dashboard/admin/roles', icon: Icons.layers },
    { label: 'Reports', href: '/dashboard/admin/reports', icon: Icons.chart },
    { label: 'Invoices', href: '/dashboard/admin/invoices', icon: Icons.invoice },
    { label: 'Logs', href: '/dashboard/admin/logs', icon: Icons.logs },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: Icons.settings },
];

// Owner Navigation Items (for future use)
export const ownerNavItems: NavItem[] = [
    { label: 'Overview', href: '/dashboard/owner', icon: Icons.dashboard },
    { label: 'Analytics', href: '/dashboard/owner/analytics', icon: Icons.chart },
    { label: 'Financials', href: '/dashboard/owner/financials', icon: Icons.invoice },
    { label: 'Alerts', href: '/dashboard/owner/alerts', icon: Icons.bell },
];

// Role Configuration
export type DashboardRole = 'manager' | 'cashier' | 'admin' | 'owner';

export interface RoleConfig {
    label: string;
    color: string;
    navItems: NavItem[];
}

export const roleConfig: Record<DashboardRole, RoleConfig> = {
    admin: {
        label: 'Admin',
        color: '#8B5CF6', // Violet
        navItems: adminNavItems,
    },
    manager: {
        label: 'Manager',
        color: '#F59E0B', // Amber
        navItems: managerNavItems,
    },
    cashier: {
        label: 'Cashier',
        color: '#10B981', // Emerald
        navItems: cashierNavItems,
    },
    owner: {
        label: 'Owner',
        color: '#0EA5E9', // Sky Blue
        navItems: ownerNavItems,
    },
};

// Helper to get role from pathname
export const getRoleFromPath = (pathname: string): DashboardRole => {
    if (pathname.includes('/dashboard/admin')) return 'admin';
    if (pathname.includes('/dashboard/cashier')) return 'cashier';
    if (pathname.includes('/dashboard/owner')) return 'owner';
    return 'manager'; // Default fallback
};
