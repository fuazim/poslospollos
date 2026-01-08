'use client';

import { useState } from 'react';
import Image from 'next/image';
import Card from './Card';

interface ProductCardProps {
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    isCombo?: boolean;
    isFeatured?: boolean;
    quantity?: number;
    onAdd?: () => void;
    onRemove?: () => void;
}

export default function ProductCard({
    name,
    price,
    description,
    imageUrl,
    isCombo = false,
    isFeatured = false,
    quantity = 0,
    onAdd,
    onRemove,
}: ProductCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Card padding="lg" className="flex flex-col relative">
            {/* Featured Badge */}
            {isFeatured && (
                <div className="absolute top-0 left-0 bg-[#DA291C] text-white text-xs font-bold uppercase px-5 py-2 rounded-br-2xl rounded-tl-3xl z-10">
                    Top Pick
                </div>
            )}

            {/* Combo Badge */}
            {isCombo && !isFeatured && (
                <div className="absolute top-0 left-0 bg-[#F4A900] text-[#5a2e18] text-xs font-bold uppercase px-5 py-2 rounded-br-2xl rounded-tl-3xl z-10">
                    Combo
                </div>
            )}

            {/* Image */}
            <div className="w-full aspect-square bg-[#F8F8F6] rounded-2xl mb-5 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className={`object-cover transition-opacity duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                ) : (
                    <div className="w-20 h-20 bg-[#e8e8e8] rounded-xl" />
                )}
            </div>

            {/* Info */}
            <div className="mt-auto space-y-2">
                <h3 className="text-lg font-bold text-[#5a2e18] line-clamp-1">
                    {name}
                </h3>
                {description && (
                    <p className="text-sm text-[#a8a8a8] line-clamp-1">
                        {description}
                    </p>
                )}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-black text-[#5a2e18] leading-none">
                        ${price.toFixed(2)}
                    </span>

                    {/* Quantity Controls */}
                    {quantity > 0 ? (
                        <div className="flex items-center h-10">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove?.();
                                }}
                                className="w-10 h-10 rounded-xl bg-[#f5f5f5] text-[#5a2e18] flex items-center justify-center transition-all duration-150 active:bg-[#e8e8e8] active:scale-95"
                            >
                                <span className="leading-none">−</span>
                            </button>
                            <div className="w-8 h-10 flex items-center justify-center">
                                <span className="text-lg font-black text-[#5a2e18] leading-none">{quantity}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAdd?.();
                                }}
                                className="w-10 h-10 rounded-xl bg-[#DA291C] text-white flex items-center justify-center transition-all duration-150 active:bg-[#b82318] active:scale-95"
                            >
                                <span className="leading-none">+</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAdd?.();
                            }}
                            className="w-10 h-10 rounded-xl bg-[#f5f5f5] text-[#5a2e18] flex items-center justify-center transition-all duration-150 active:bg-[#DA291C] active:text-white active:scale-95"
                        >
                            <span className="text-xl leading-none">+</span>
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
}
