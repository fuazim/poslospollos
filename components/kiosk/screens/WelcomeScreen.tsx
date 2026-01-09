'use client';

import { useKioskStore } from '@/lib/store';
import { Logo, Button } from '@/components/ui';

export default function WelcomeScreen() {
    const { setStep, language, setLanguage } = useKioskStore();

    const handleStart = () => {
        setStep('order-type');
    };

    return (
        <div
            className="relative flex h-screen w-full flex-col bg-[#FDFBF7] cursor-pointer overflow-hidden"
            onClick={handleStart}
        >
            {/* Top Bar (Language) */}
            <div 
                className="absolute top-0 left-0 right-0 p-8 flex justify-end items-start z-30 pointer-events-none"
            >
                {/* Controls */}
                <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Language Toggle - Refined */}
                    <div className="bg-[#FFC72C] rounded-full p-1 flex shadow-lg">
                        <button
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-out flex items-center justify-center leading-none ${
                                language === 'en' ? 'bg-white text-[#5a2e18] shadow-sm' : 'text-[#5a2e18]/70 hover:text-[#5a2e18]'
                            }`}
                            onClick={() => setLanguage('en')}
                        >
                            English
                        </button>
                        <button
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ease-out flex items-center justify-center leading-none ${
                                language === 'id' ? 'bg-white text-[#5a2e18] shadow-sm' : 'text-[#5a2e18]/70 hover:text-[#5a2e18]'
                            }`}
                            onClick={() => setLanguage('id')}
                        >
                            Bahasa
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-[#AD362B]">
                <div className="text-center z-10 p-12">
                    <h1 className="text-[7rem] font-black tracking-tight leading-none mb-3 text-[#FFC72C]">
                        GRILL KING
                    </h1>
                    <h2 className="text-[5rem] font-black text-white tracking-tight leading-none">
                        POCKET
                    </h2>
                    <p className="text-white/90 text-2xl font-medium mt-8 tracking-wide">
                        Chicken • Beef • Halloumi
                    </p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="relative flex flex-col items-center justify-center py-16 min-h-[42vh] rounded-t-[3rem] -mt-12 z-20 bg-[#FDFBF7]">
                {/* Logo */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white rounded-full p-4 shadow-xl">
                    <Logo size="lg" />
                </div>

                <div className="h-10" />

                {/* CTA */}
                <div className="flex flex-col items-center mt-6">
                    <h2 className="text-6xl font-black text-[#5a2e18] tracking-tight animate-pulse">
                        Order Here
                    </h2>
                    <p className="text-xl mt-3 font-medium text-[#a8a8a8]">
                        Fresh & delicious, made just for you
                    </p>
                </div>

                {/* Footer */}
                <p className="mt-auto pt-8 text-[#c4c4c4] text-sm font-semibold uppercase tracking-[0.2em]">
                    Touch screen to start
                </p>
            </div>
        </div>
    );
}
