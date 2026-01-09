'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/lib/theme-context';

interface MenuProductCardProps {
    name: string;
    price: number;
    imageUrl?: string;
    isCombo?: boolean;
    // Mode: 'cashier' untuk add to cart, 'manager' untuk edit
    mode?: 'cashier' | 'manager';
    onClick?: () => void;
    onEdit?: () => void;
}

export default function MenuProductCard({
    name,
    price,
    imageUrl,
    isCombo = false,
    mode = 'cashier',
    onClick,
    onEdit,
}: MenuProductCardProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleClick = () => {
        if (mode === 'cashier' && onClick) {
            onClick();
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
                rounded-2xl overflow-hidden text-left transition-all
                ${mode === 'cashier' ? 'active:scale-95 cursor-pointer' : 'cursor-default'}
                ${isDark ? 'bg-[#141414]' : 'bg-white'}
            `}
        >
            {/* Image Container - Square aspect ratio */}
            <div className={`relative aspect-square ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'}`}>
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                    />
                )}
                
                {/* Combo Badge */}
                {isCombo && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 bg-[#F4A900] text-[#1a1a2e] text-[9px] font-bold rounded-lg uppercase tracking-wide">
                        Combo
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-3">
                <h3 className={`text-[11px] font-semibold mb-1 truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>
                    {name}
                </h3>
                <div className="flex items-center justify-between">
                    <span className={`text-[12px] font-bold ${isDark ? 'text-[#F4A900]' : 'text-[#1a1a2e]'}`}>
                        ${price.toFixed(2)}
                    </span>

                    {/* Edit Button for Manager Mode */}
                    {mode === 'manager' && (
                        <button
                            onClick={handleEdit}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-opacity-80 ${isDark ? 'bg-[#222] text-[#555] hover:text-white' : 'bg-[#f5f5f5] text-[#a8a8a8] hover:text-[#1a1a2e]'}`}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </button>
    );
}
