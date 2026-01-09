'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NavItem, DashboardRole, roleConfig, getRoleFromPath } from '@/lib/config/nav-config';
import { LOGOS } from '@/lib/config/company';

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
    isDark: boolean;
    onToggleTheme: () => void;
    isMobile?: boolean;
}

export function Sidebar({ collapsed, onCollapse, isDark, onToggleTheme, isMobile = false }: SidebarProps) {
    const pathname = usePathname();
    const role: DashboardRole = getRoleFromPath(pathname);
    const { label: roleLabel, color: roleColor, navItems } = roleConfig[role];

    const isActiveLink = (href: string) => {
        // Exact match for main dashboard pages
        if (href === `/dashboard/${role}`) {
            return pathname === href;
        }
        // Prefix match for sub-pages
        return pathname.startsWith(href) && href !== `/dashboard/${role}`;
    };

    return (
        <aside
            style={{ width: collapsed ? 64 : 208 }}
            className={`
                ${isMobile ? 'fixed z-50 w-52' : ''}
                flex flex-col h-full shrink-0 overflow-hidden
                transition-all duration-300 ease-in-out
                ${isDark ? 'bg-[#111]' : 'bg-white'}
            `}
        >
            {/* Logo */}
            <div className="flex items-center gap-2.5 p-4 h-14">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    <Image src={LOGOS.main} alt="Logo" width={32} height={32} />
                </div>
                <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
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
                    {navItems.map((item: NavItem) => {
                        const isActive = isActiveLink(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={`flex items-center rounded-xl transition-all duration-200 h-10 ${collapsed ? 'justify-center w-10 mx-auto' : 'px-3 w-full'
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
                                <span className={`text-[11px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                                    collapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
                                }`}>
                                    {item.label}
                                </span>
                                {item.badge && (
                                    <span className={`bg-[#DA291C] text-white text-[9px] font-bold rounded-full flex items-center justify-center transition-all duration-300 ${
                                        collapsed ? 'w-0 h-0 opacity-0 scale-0 overflow-hidden ml-0' : 'w-4 h-4 opacity-100 scale-100 ml-auto'
                                    }`}>
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
                    onClick={onToggleTheme}
                    title={collapsed ? (isDark ? 'Light' : 'Dark') : undefined}
                    className={`flex items-center rounded-xl transition-all duration-200 h-10 ${collapsed ? 'justify-center w-10 mx-auto' : 'w-full px-3'
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
                    <span className={`text-[11px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        collapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
                    }`}>
                        {isDark ? 'Light' : 'Dark'}
                    </span>
                </button>

                {/* Collapse Toggle */}
                {!isMobile && (
                    <button
                        onClick={() => onCollapse(!collapsed)}
                        className={`flex items-center rounded-xl transition-all duration-200 h-10 ${collapsed ? 'justify-center w-10 mx-auto' : 'w-full px-3'
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
                        <span className={`text-[11px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                            collapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
                        }`}>
                            Collapse
                        </span>
                    </button>
                )}
            </div>

            {/* User */}
            <div className="p-2">
                <div className={`flex items-center gap-2.5 rounded-xl transition-all duration-200 p-2 ${collapsed ? 'justify-center' : ''
                    } ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold text-[10px] shrink-0"
                        style={{ backgroundColor: roleColor }}
                    >
                        {roleLabel[0]}
                    </div>
                    <div className={`flex-1 min-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                        collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    }`}>
                        <p className={`font-medium text-[11px] truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{roleLabel}</p>
                        <p className={`text-[9px] ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Online</p>
                    </div>
                    <button
                        title="Logout"
                        className={`shrink-0 p-1.5 rounded-lg transition-all duration-300 ${isDark ? 'hover:bg-[#222] text-[#666] hover:text-white' : 'hover:bg-[#e8e8e8] text-[#a8a8a8] hover:text-[#1a1a2e]'} ${
                            collapsed ? 'w-0 p-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
                        }`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
}
