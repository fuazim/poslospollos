'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from '@/lib/theme-context';
import { Sidebar, MobileHeader } from '@/components/dashboard';

function DashboardContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

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
            <div className={`
                ${isMobile ? 'fixed z-50' : ''}
                ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
                transition-transform duration-200
            `}>
                <Sidebar
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    isDark={isDark}
                    onToggleTheme={toggleTheme}
                    isMobile={isMobile}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {isMobile && (
                    <MobileHeader
                        isDark={isDark}
                        onOpenMenu={() => setMobileOpen(true)}
                    />
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
