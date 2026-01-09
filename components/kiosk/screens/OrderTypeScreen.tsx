'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useKioskStore } from '@/lib/store';
import { Logo, Button, Card } from '@/components/ui';

export default function OrderTypeScreen() {
    const { setStep, setOrderType } = useKioskStore();
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const handleImageLoad = (id: string) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const handleSelect = (type: 'dine-in' | 'take-away') => {
        setOrderType(type);
        setStep('categories');
    };

    return (
        <div className="flex h-screen w-full flex-col bg-[#FDFBF7] relative overflow-hidden">
            {/* Header */}
            <div className="pt-16 pb-12 text-center flex flex-col items-center">
                <Logo size="lg" className="mb-8" />
                <h1 className="text-5xl font-black text-[#5a2e18] tracking-tight">
                    Where would you like to eat?
                </h1>
                <p className="text-[#a8a8a8] text-xl mt-3">
                    Choose your dining preference
                </p>
            </div>

            {/* Cards Container */}
            <div className="flex-1 flex items-center justify-center gap-16 px-16 pb-32">
                {/* Dine In */}
                <Card
                    onClick={() => handleSelect('dine-in')}
                    padding="xl"
                    className="flex-1 max-w-lg aspect-4/5 flex flex-col items-center justify-center"
                >
                    <div className="w-56 h-56 bg-[#F8F8F6] rounded-3xl flex items-center justify-center mb-10">
                        <div className="relative w-32 h-32">
                            <Image
                                src="/images/icons/dine-in.svg"
                                alt="Dine In"
                                fill
                                className={`object-contain transition-opacity duration-300 ease-out ${loadedImages['dine-in'] ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => handleImageLoad('dine-in')}
                                sizes="128px"
                            />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black text-[#5a2e18]">Dine In</h2>
                    <p className="text-[#a8a8a8] text-xl font-medium mt-3">
                        Enjoy your meal here
                    </p>
                </Card>

                {/* Take Away */}
                <Card
                    onClick={() => handleSelect('take-away')}
                    padding="xl"
                    className="flex-1 max-w-lg aspect-4/5 flex flex-col items-center justify-center"
                >
                    <div className="w-56 h-56 bg-[#F8F8F6] rounded-3xl flex items-center justify-center mb-10">
                        <div className="relative w-32 h-32">
                            <Image
                                src="/images/icons/take-away.svg"
                                alt="Take Away"
                                fill
                                className={`object-contain transition-opacity duration-300 ease-out ${loadedImages['take-away'] ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => handleImageLoad('take-away')}
                                sizes="128px"
                            />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black text-[#5a2e18]">Take Away</h2>
                    <p className="text-[#a8a8a8] text-xl font-medium mt-3">
                        Grab and go
                    </p>
                </Card>
            </div>

            {/* Cancel Button */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep('welcome')}
                >
                    Cancel Order
                </Button>
            </div>
        </div>
    );
}
