'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product, ProductOption } from '@/lib/types';
import { Button } from '@/components/ui';

interface ProductCustomizationModalProps {
    product: Product;
    onClose: () => void;
    onConfirm: (product: Product, selectedOptions: ProductOption[], quantity: number) => void;
}

// Mock Options Configuration (In a real app, this would come from the product data)
const getProductOptions = (category: string) => {
    switch (category) {
        case 'chicken':
        case 'burgers':
            return [
                {
                    id: 'size',
                    name: 'Size',
                    type: 'single',
                    choices: [
                        { id: 'reg', label: 'Regular', price: 0 },
                        { id: 'lg', label: 'Large Meal', price: 2.50 },
                    ]
                },
                {
                    id: 'extras',
                    name: 'Add-ons',
                    type: 'multiple',
                    choices: [
                        { id: 'cheese', label: 'Extra Cheese', price: 0.99 },
                        { id: 'bacon', label: 'Crispy Bacon', price: 1.50 },
                        { id: 'dip', label: 'Signature Dip', price: 0.50 },
                    ]
                }
            ];
        case 'drinks':
            return [
                {
                    id: 'size',
                    name: 'Size',
                    type: 'single',
                    choices: [
                        { id: 'reg', label: 'Regular', price: 0 },
                        { id: 'lg', label: 'Large', price: 0.80 },
                    ]
                },
                {
                    id: 'ice',
                    name: 'Ice Level',
                    type: 'single',
                    choices: [
                        { id: 'regular', label: 'Regular Ice', price: 0 },
                        { id: 'less', label: 'Less Ice', price: 0 },
                        { id: 'no', label: 'No Ice', price: 0 },
                    ]
                }
            ];
        default:
            return [];
    }
};

export default function ProductCustomizationModal({ product, onClose, onConfirm }: ProductCustomizationModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedChoices, setSelectedChoices] = useState<Record<string, string | string[]>>({
        // Default selections
        size: 'reg',
        ice: 'regular',
        extras: [],
    });

    const optionsConfig = getProductOptions(product.categoryId === 'drinks' ? 'drinks' : 'chicken');

    const handleOptionToggle = (optionId: string, choiceId: string, type: string) => {
        if (type === 'single') {
            setSelectedChoices(prev => ({ ...prev, [optionId]: choiceId }));
        } else {
            // Multiple selection logic
            setSelectedChoices(prev => {
                const current = (prev[optionId] as string[]) || [];
                if (current.includes(choiceId)) {
                    return { ...prev, [optionId]: current.filter(id => id !== choiceId) };
                } else {
                    return { ...prev, [optionId]: [...current, choiceId] };
                }
            });
        }
    };

    // Calculate total price
    const calculateTotal = () => {
        let total = product.basePrice;
        
        optionsConfig.forEach(opt => {
            const selection = selectedChoices[opt.id];
            if (!selection) return;

            if (Array.isArray(selection)) {
                selection.forEach(selId => {
                    const choice = opt.choices.find(c => c.id === selId);
                    if (choice) total += choice.price;
                });
            } else {
                const choice = opt.choices.find(c => c.id === selection);
                if (choice) total += choice.price;
            }
        });

        return total * quantity;
    };

    const handleConfirm = () => {
        // Convert local state to ProductOption[] format expected by store
        const finalOptions: ProductOption[] = [];
        
        optionsConfig.forEach(opt => {
            const selection = selectedChoices[opt.id];
            if (!selection) return;

            if (Array.isArray(selection)) {
                selection.forEach(selId => {
                    const choice = opt.choices.find(c => c.id === selId);
                    if (choice) {
                        finalOptions.push({
                            id: choice.id,
                            productId: product.id,
                            optionGroup: 'addon',
                            label: choice.label,
                            extraPrice: choice.price,
                            isDefault: false,
                            sortOrder: 0
                        });
                    }
                });
            } else {
                const choice = opt.choices.find(c => c.id === selection);
                if (choice && choice.id !== 'reg' && choice.id !== 'regular') { // Only add non-default opts
                     finalOptions.push({
                        id: choice.id,
                        productId: product.id,
                        optionGroup: opt.id === 'size' ? 'size' : 'addon',
                        label: `${opt.name}: ${choice.label}`,
                        extraPrice: choice.price,
                        isDefault: false,
                        sortOrder: 0
                    });
                }
            }
        });

        onConfirm(product, finalOptions, quantity);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 transition-all duration-300">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-xl rounded-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header Image - Square/Rectangular Clean Look */}
                <div className="relative w-full aspect-square bg-[#F8F8F6] shrink-0">
                    {product.imageUrl ? (
                        <Image 
                            src={product.imageUrl} 
                            alt={product.name} 
                            fill 
                            className="object-cover" 
                            sizes="(max-width: 768px) 100vw, 600px"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <span className="text-gray-300">No Image</span>
                        </div>
                    )}
                    <button 
                        onClick={onClose}
                        className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#5a2e18] font-bold transition-transform active:scale-95"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-black text-[#5a2e18] mb-2 leading-tight">{product.name}</h2>
                        <p className="text-[#a8a8a8] font-medium">{product.description}</p>
                    </div>

                    {/* Options Grid */}
                    <div className="space-y-8">
                        {optionsConfig.map(option => (
                            <div key={option.id}>
                                <h3 className="text-lg font-bold text-[#5a2e18] mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-[#FFC72C] rounded-full inline-block"></span>
                                    {option.name}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {option.choices.map(choice => {
                                        const isSelected = option.type === 'single' 
                                            ? selectedChoices[option.id] === choice.id
                                            : (selectedChoices[option.id] as string[])?.includes(choice.id);

                                        return (
                                            <button
                                                key={choice.id}
                                                onClick={() => handleOptionToggle(option.id, choice.id, option.type)}
                                                className={`p-4 rounded-2xl text-left transition-all duration-200 ${
                                                    isSelected 
                                                        ? 'bg-[#FFC72C] text-[#5a2e18] transform scale-[1.02]' 
                                                        : 'bg-[#F8F8F6] text-[#5a2e18] hover:bg-[#efefef]'
                                                }`}
                                            >
                                                <div className="font-bold text-sm text-[#5a2e18]">{choice.label}</div>
                                                <div className={`text-xs mt-1 font-medium ${isSelected ? 'text-[#5a2e18]/80' : 'text-[#a8a8a8]'}`}>
                                                    {choice.price > 0 ? `+$${choice.price.toFixed(2)}` : 'Free'}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white shrink-0 flex items-center gap-6">
                    {/* Quantity Stepper - Flat */}
                    <div className="flex items-center gap-4 bg-[#F8F8F6] p-2 rounded-2xl">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl font-bold text-[#5a2e18] hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            -
                        </button>
                        <span className="w-6 text-center font-black text-xl text-[#5a2e18]">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl font-bold text-[#5a2e18] hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            +
                        </button>
                    </div>

                    {/* Add Button */}
                    <Button 
                        variant="primary" 
                        size="xl" 
                        fullWidth 
                        onClick={handleConfirm}
                        className="flex justify-between items-center group h-18 rounded-2xl"
                    >
                        <span className="text-lg">Add to Order</span>
                        <span className="bg-black/20 w-28 h-10 flex items-center justify-center rounded-xl text-lg group-hover:bg-black/30 transition-colors tabular-nums">
                            ${calculateTotal().toFixed(2)}
                        </span>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
