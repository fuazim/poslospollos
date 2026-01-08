'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl?: string;
    isActive: boolean;
    isCombo: boolean;
}

const mockCategories = ['All', 'Chicken', 'Buckets', 'Burgers', 'Sides', 'Drinks'];

const mockProducts: Product[] = [
    { id: '1', name: 'Gus Special', category: 'chicken', price: 8.99, imageUrl: '/images/products/gus-special.png', isActive: true, isCombo: false },
    { id: '2', name: 'Cartel Bucket', category: 'buckets', price: 24.99, imageUrl: '/images/products/cartel-bucket.png', isActive: true, isCombo: false },
    { id: '3', name: 'Heisenberg Meal', category: 'chicken', price: 11.99, imageUrl: '/images/products/heisenberg-meal.png', isActive: true, isCombo: true },
    { id: '4', name: 'Blue Sky Wings', category: 'chicken', price: 7.99, imageUrl: '/images/products/blue-sky-wings.png', isActive: true, isCombo: false },
    { id: '5', name: 'Fire Burger', category: 'burgers', price: 9.99, imageUrl: '/images/products/jesses-fire-burger.png', isActive: true, isCombo: false },
    { id: '6', name: 'Hermanos Soda', category: 'drinks', price: 2.49, imageUrl: '/images/products/hermanos-soda.png', isActive: true, isCombo: false },
];

export default function MenuManagementPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = mockProducts.filter(product => {
        if (selectedCategory !== 'All' && product.category !== selectedCategory.toLowerCase()) return false;
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Menu</h1>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#555]' : 'text-[#a8a8a8]'}`}>Manage products</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#F4A900] text-[#1a1a2e] rounded-xl text-[10px] font-semibold self-start">
                    <span>+</span> Add
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-xs mb-4">
                <svg className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#444]' : 'text-[#a8a8a8]'}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-[11px] focus:outline-none ${isDark ? 'bg-[#141414] text-white placeholder-[#444]' : 'bg-white text-[#1a1a2e] placeholder-[#a8a8a8]'
                        }`}
                />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                {mockCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${selectedCategory === category
                                ? isDark ? 'bg-[#222] text-white' : 'bg-[#1a1a2e] text-white'
                                : isDark ? 'bg-[#141414] text-[#555]' : 'bg-white text-[#888]'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {filteredProducts.map((product) => (
                    <div key={product.id} className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
                        <div className={`relative h-24 ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'}`}>
                            {product.imageUrl && (
                                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                            )}
                            {product.isCombo && (
                                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#F4A900] text-[#1a1a2e] text-[8px] font-bold rounded-lg">
                                    Combo
                                </span>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className={`text-[10px] font-semibold mb-0.5 truncate ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>{product.name}</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>${product.price.toFixed(2)}</span>
                                <button className={`w-6 h-6 rounded-lg flex items-center justify-center ${isDark ? 'bg-[#222] text-[#555]' : 'bg-[#f5f5f5] text-[#a8a8a8]'}`}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
