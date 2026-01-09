'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getRoleFromPath, roleConfig } from '@/lib/config/nav-config';
import { LOGOS } from '@/lib/config/company';

interface MobileHeaderProps {
    isDark: boolean;
    onOpenMenu: () => void;
}

export function MobileHeader({ isDark, onOpenMenu }: MobileHeaderProps) {
    const pathname = usePathname();
    const role = getRoleFromPath(pathname);
    const { label: roleLabel } = roleConfig[role];

    return (
        <div className={`sticky top-0 z-30 flex items-center gap-3 px-4 py-3 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAFAFA]'}`}>
            <button
                onClick={onOpenMenu}
                className={`p-2 rounded-lg ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a2e]'}`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
            </button>
            <Image src={LOGOS.main} alt="Logo" width={28} height={28} />
            <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{roleLabel}</span>
        </div>
    );
}
