'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useKioskStore } from '@/lib/store';
import { Button, Card } from '@/components/ui';

export default function CartScreen() {
    const {
        cart,
        updateCartItem,
        removeFromCart,
        addToCart,
        getCartTotal,
        setStep,
        orderType
    } = useKioskStore();

    const { subtotal, tax, total, itemCount } = getCartTotal();

    // Track loaded images
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const handleImageLoad = (id: string) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    // Upsell items
    const upsellItems = [
        {
            id: 'upsell-1',
            name: 'Albuquerque Fries',
            price: 2.99,
            imageUrl: '/images/products/albuquerque-fries.png',
        },
        {
            id: 'upsell-2',
            name: 'Breaking Bad Sundae',
            price: 3.49,
            imageUrl: '/images/products/breaking-bad-sundae.png',
        },
        {
            id: 'upsell-3',
            name: 'Hermanos Soda',
            price: 2.49,
            imageUrl: '/images/products/hermanos-soda.png',
        },
    ];

    const handleAddUpsell = (item: typeof upsellItems[0]) => {
        const product = {
            id: item.id,
            categoryId: 'upsell',
            name: item.name,
            description: '',
            basePrice: item.price,
            imageUrl: item.imageUrl,
            isCombo: false,
            isActive: true,
            sortOrder: 0,
        };
        addToCart(product, [], 1);
    };

    // Check if upsell item is already in cart
    const isInCart = (itemId: string) => {
        return cart.some(cartItem => cartItem.product.id === itemId);
    };

    if (cart.length === 0) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-[#FDFBF7]">
                <div className="w-40 h-40 bg-[#F8F8F6] rounded-full flex items-center justify-center mb-8">
                    <Image src="/images/icons/basket.svg" alt="Empty Cart" width={64} height={64} className="opacity-30" />
                </div>
                <h1 className="text-4xl font-black text-[#5a2e18] mb-3">Your cart is empty</h1>
                <p className="text-[#a8a8a8] text-xl mb-10">Add some delicious items to get started</p>
                <Button variant="primary" size="xl" onClick={() => setStep('categories')}>
                    Browse Menu
                </Button>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-[#FDFBF7] overflow-hidden">
            {/* Cart Items */}
            <div className="flex-1 flex flex-col h-full">
                <header className="px-10 py-8 flex items-center gap-6 shrink-0">
                    <button
                        onClick={() => setStep('categories')}
                        className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#5a2e18] active:bg-[#f5f5f5] active:scale-95 transition-all duration-150"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-[#5a2e18]">Your Order</h1>
                        <p className="text-[#a8a8a8] text-lg mt-1">
                            {itemCount} item{itemCount > 1 ? 's' : ''} • {orderType === 'dine-in' ? 'Dine In' : 'Take Away'}
                        </p>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-10 py-4 no-scrollbar">
                    {/* Cart Items */}
                    <div className="space-y-4 mb-10">
                        {cart.map((item) => (
                            <Card key={item.id} padding="lg" className="flex gap-6">
                                <div className="w-24 h-24 bg-[#F8F8F6] rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                    {item.product.imageUrl ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                fill
                                                className={`object-cover transition-opacity duration-500 ease-out ${loadedImages[item.id] ? 'opacity-100' : 'opacity-0'}`}
                                                onLoad={() => handleImageLoad(item.id)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-[#e8e8e8] rounded-xl" />
                                    )}
                                </div>

                                <div className="flex-1 py-1">
                                    <h3 className="text-xl font-bold text-[#5a2e18]">{item.product.name}</h3>
                                    {item.selectedOptions.length > 0 && (
                                        <p className="text-base text-[#a8a8a8] mt-1">
                                            {item.selectedOptions.map(o => o.label).join(' • ')}
                                        </p>
                                    )}
                                    <p className="text-2xl font-black text-[#5a2e18] mt-2">${item.totalPrice.toFixed(2)}</p>
                                </div>

                                <div className="flex flex-col items-end justify-between py-1">
                                    <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 rounded-xl text-[#c4c4c4] flex items-center justify-center active:text-[#EF4444]">
                                        <span className="text-2xl font-light">×</span>
                                    </button>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                                            className="w-10 h-10 rounded-xl bg-[#F8F8F6] text-[#5a2e18] text-xl font-bold flex items-center justify-center active:bg-[#f0f0f0] active:scale-95 transition-all duration-150"
                                        >
                                            −
                                        </button>
                                        <span className="w-6 text-center text-lg font-bold text-[#5a2e18]">{item.quantity}</span>
                                        <button
                                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                            className="w-10 h-10 rounded-xl bg-[#F8F8F6] text-[#5a2e18] text-xl font-bold flex items-center justify-center active:bg-[#f0f0f0] active:scale-95 transition-all duration-150"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Upsell Section */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-[#5a2e18] mb-4">You might also like</h2>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                            {upsellItems.filter(item => !isInCart(item.id)).map((item) => (
                                <div
                                    key={item.id}
                                    className="shrink-0 w-40 bg-white rounded-2xl p-4 flex flex-col items-center"
                                >
                                    <div className="w-24 h-24 rounded-xl overflow-hidden mb-3 bg-[#F8F8F6]">
                                        {item.imageUrl ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    fill
                                                    className={`object-cover transition-opacity duration-500 ease-out ${loadedImages[`upsell-${item.id}`] ? 'opacity-100' : 'opacity-0'}`}
                                                    onLoad={() => handleImageLoad(`upsell-${item.id}`)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-10 h-10 bg-[#e8e8e8] rounded-lg" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm font-bold text-[#5a2e18] text-center line-clamp-2 h-10 mb-1">{item.name}</p>
                                    <p className="text-lg font-black text-[#DA291C] mb-3">+${item.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => handleAddUpsell(item)}
                                        className="w-full py-2 rounded-xl bg-[#F8F8F6] text-[#5a2e18] text-sm font-bold active:bg-[#f0f0f0] active:scale-95 transition-all duration-150"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-[400px] bg-white flex flex-col h-full p-10 shrink-0">
                <h2 className="text-2xl font-black text-[#5a2e18] mb-8">Order Summary</h2>

                <div className="flex-1">
                    <div className="space-y-5">
                        <div className="flex justify-between text-[#a8a8a8] text-lg">
                            <span>Subtotal</span>
                            <span className="font-bold text-[#5a2e18]">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#a8a8a8] text-lg">
                            <span>Tax (10%)</span>
                            <span className="font-bold text-[#5a2e18]">${tax.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-[#f0f0f0] my-6" />
                        <div className="flex justify-between items-end">
                            <span className="text-2xl font-bold text-[#5a2e18]">Total</span>
                            <span className="text-4xl font-black text-[#DA291C]">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-10 bg-[#F8F8F6] rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                            <span className="text-lg font-bold text-[#a8a8a8]">~</span>
                        </div>
                        <div>
                            <p className="text-sm text-[#a8a8a8] font-medium">Estimated Time</p>
                            <p className="text-lg font-bold text-[#5a2e18]">10-15 minutes</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    <Button variant="primary" size="xl" fullWidth onClick={() => setStep('customer-name')}>
                        Checkout
                    </Button>
                    <Button variant="outline" size="lg" fullWidth onClick={() => setStep('categories')}>
                        Add More Items
                    </Button>
                </div>
            </div>
        </div>
    );
}
