'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CategoryButtonProps {
    name: string;
    iconUrl?: string;
    isActive?: boolean;
    onClick?: () => void;
}

export default function CategoryButton({
    name,
    iconUrl,
    isActive = false,
    onClick,
}: CategoryButtonProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <button
            onClick={onClick}
            className="w-full flex flex-col items-center outline-none active:scale-95 transition-transform duration-150"
        >
            {/* Icon Container */}
            <div
                className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center mb-3
                    transition-all duration-200 bg-[#F8F8F6]
                    ${isActive ? 'border-[3px] border-[#F4A900]' : 'border-[3px] border-transparent'}
                `}
            >
                {iconUrl ? (
                    <div className="relative w-12 h-12">
                        <Image
                            src={iconUrl}
                            alt={name}
                            fill
                            className={`object-contain transition-opacity duration-300 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#e8e8e8]" />
                )}
            </div>

            {/* Label */}
            <span
                className={`
                    text-xs font-bold text-center leading-tight
                    max-w-[80px] line-clamp-2
                    transition-colors duration-200
                    ${isActive ? 'text-[#5a2e18]' : 'text-[#a8a8a8]'}
                `}
            >
                {name}
            </span>
        </button>
    );
}
