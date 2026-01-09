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
    isActive?: boolean;
    onToggleStatus?: () => void;
}

export default function MenuProductCard({
    name,
    price,
    imageUrl,
    isCombo = false,
    isActive = true,
    mode = 'cashier',
    onClick,
    onEdit,
    onToggleStatus,
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
        onEdit?.();
    };

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleStatus?.();
    };

    return (
        <div
            onClick={handleClick}
            className={`
                group rounded-2xl overflow-hidden text-left transition-all relative
                ${mode === 'cashier' ? 'active:scale-95 cursor-pointer' : 'cursor-default'}
                ${isDark ? 'bg-[#141414]' : 'bg-white'}
                ${!isActive && mode === 'cashier' ? 'opacity-60 pointer-events-none' : ''}
            `}
        >
            {/* Image Container - Square aspect ratio */}
            <div className={`relative aspect-square ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'}`}>
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${!isActive ? 'grayscale' : ''}`}
                        onLoad={() => setImageLoaded(true)}
                        sizes="(max-width: 768px) 50vw, 20vw"
                    />
                )}
                
                {/* Sold Out Overlay */}
                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                        <span className="bg-[#EF4444] text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider transform -rotate-6">
                            Sold Out
                        </span>
                    </div>
                )}
                
                {/* Combo Badge */}
                {isCombo && isActive && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 bg-[#F4A900] text-[#1a1a2e] text-[9px] font-bold rounded-lg uppercase tracking-wide shadow-sm">
                        Combo
                    </span>
                )}

                {/* Manager Actions Overlay (Show on Hover/Always visible for touch) */}
                {mode === 'manager' && (
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                         {/* Edit Button */}
                        <button 
                            onClick={handleEdit}
                            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur text-[#1a1a2e] flex items-center justify-center hover:bg-white active:scale-95 transition-all"
                            title="Edit Product"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        
                        {/* Status Toggle Button */}
                        <button 
                            onClick={handleToggle}
                            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur active:scale-95 transition-all ${
                                isActive 
                                ? 'bg-[#10B981]/90 text-white hover:bg-[#10B981]' 
                                : 'bg-[#EF4444]/90 text-white hover:bg-[#EF4444]'
                            }`}
                            title={isActive ? "Mark Sold Out" : "Mark Active"}
                        >
                            {isActive ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            )}
                        </button>
                    </div>
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
                </div>
            </div>
        </div>
    );
}
