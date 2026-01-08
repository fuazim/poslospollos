'use client';

import { useKioskStore } from '@/lib/store';
import { getActiveCategories, getProductsByCategory } from '@/lib/mock-data';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Logo, Button, ProductCard, CategoryButton } from '@/app/components/ui';

export default function MenuScreen() {
    const {
        setStep,
        selectedCategoryId,
        setSelectedCategoryId,
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
    } = useKioskStore();

    const categories = getActiveCategories();
    const [products, setProducts] = useState(getProductsByCategory(selectedCategoryId || categories[0]?.id));
    const [badgeBounce, setBadgeBounce] = useState(false);

    useEffect(() => {
        if (!selectedCategoryId && categories.length > 0) {
            setSelectedCategoryId(categories[0].id);
        }
    }, [categories, selectedCategoryId, setSelectedCategoryId]);

    useEffect(() => {
        if (selectedCategoryId) {
            setProducts(getProductsByCategory(selectedCategoryId));
        }
    }, [selectedCategoryId]);

    // Get quantity of a product in cart
    const getProductQuantity = (productId: string) => {
        const cartItem = cart.find(item => item.product.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    // Get cart item by product id
    const getCartItem = (productId: string) => {
        return cart.find(item => item.product.id === productId);
    };

    // Add product to cart with bounce animation
    const handleAddProduct = (product: any) => {
        const existingItem = getCartItem(product.id);

        // Trigger badge bounce
        setBadgeBounce(true);
        setTimeout(() => setBadgeBounce(false), 400);

        if (existingItem) {
            updateCartItem(existingItem.id, existingItem.quantity + 1);
        } else {
            addToCart(product, [], 1);
        }
    };

    // Remove product from cart
    const handleRemoveProduct = (product: any) => {
        const existingItem = getCartItem(product.id);
        if (existingItem) {
            if (existingItem.quantity > 1) {
                updateCartItem(existingItem.id, existingItem.quantity - 1);
            } else {
                removeFromCart(existingItem.id);
            }
        }
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const iconMap: Record<string, string> = {
        'Pollos Clásicos': '/images/icons/chicken-meals.svg',
        'Familia Buckets': '/images/icons/family-buckets.svg',
        'Hermanos Burgers': '/images/icons/burgers.svg',
        'Los Sides': '/images/icons/french-fries.svg',
        'Bebidas': '/images/icons/soft-drinks.svg',
        'Postres': '/images/icons/dessets.svg',
        'Combos Hermanos': '/images/icons/combos.svg',
        'Specials': '/images/icons/specials.svg',
    };

    return (
        <div className="flex h-screen w-full bg-[#FDFBF7] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[120px] flex flex-col items-center bg-white py-8 h-full shrink-0">
                <Logo size="md" className="mb-8" />

                <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-28 px-3 space-y-5">
                    {categories.map((cat) => (
                        <CategoryButton
                            key={cat.id}
                            name={cat.name}
                            iconUrl={iconMap[cat.name]}
                            isActive={selectedCategoryId === cat.id}
                            onClick={() => setSelectedCategoryId(cat.id)}
                        />
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative">
                {/* Header */}
                <header className="px-10 py-8 shrink-0">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h1 className="text-5xl font-black text-[#5a2e18] tracking-tight">
                                {categories.find(c => c.id === selectedCategoryId)?.name || 'Menu'}
                            </h1>
                            <p className="text-[#a8a8a8] text-lg mt-2">
                                {products.length} items available
                            </p>
                        </div>
                    </div>

                    {/* Filter Tags */}
                    <div className="flex gap-3">
                        <Button variant="primary" size="md">All Items</Button>
                        <Button variant="outline" size="md">Spicy</Button>
                        <Button variant="outline" size="md">Vegetarian</Button>
                        <Button variant="outline" size="md">Popular</Button>
                    </div>
                </header>

                {/* Products Grid */}
                <div className="flex-1 overflow-y-auto px-10 pb-36 no-scrollbar">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.basePrice}
                                description={product.description}
                                imageUrl={product.imageUrl}
                                isCombo={product.isCombo}
                                isFeatured={index === 0}
                                quantity={getProductQuantity(product.id)}
                                onAdd={() => handleAddProduct(product)}
                                onRemove={() => handleRemoveProduct(product)}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-8 left-0 right-0 px-10 pointer-events-none flex justify-between items-end">
                    {/* Back Button */}
                    <button
                        onClick={() => setStep('order-type')}
                        className="pointer-events-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#5a2e18] active:bg-[#f5f5f5] active:scale-95 transition-all duration-150"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Cart */}
                    {cartItemCount > 0 && (
                        <button
                            onClick={() => setStep('cart')}
                            className="pointer-events-auto flex items-center gap-5 bg-[#DA291C] text-white px-8 py-5 rounded-2xl active:scale-[0.98] transition-all duration-150"
                        >
                            <div className="relative">
                                <Image src="/images/icons/basket.svg" alt="Cart" width={28} height={28} className="brightness-0 invert" />
                                <motion.span
                                    key={cartItemCount}
                                    initial={{ scale: 0.5 }}
                                    animate={badgeBounce ? {
                                        scale: [1, 1.5, 1],
                                        y: [0, -8, 0],
                                    } : { scale: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.34, 1.56, 0.64, 1]
                                    }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFC72C] text-[#5a2e18] text-xs font-black flex items-center justify-center rounded-full"
                                >
                                    {cartItemCount}
                                </motion.span>
                            </div>
                            <div className="flex flex-col items-start leading-none w-24">
                                <span className="text-xs uppercase font-semibold opacity-80">Total</span>
                                <span className="text-2xl font-black">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="h-8 w-px bg-white/30 mx-2" />
                            <span className="font-bold text-lg">View Cart</span>
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}
