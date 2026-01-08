'use client';

import { useKioskStore } from '@/lib/store';
import { Logo, Button } from '@/app/components/ui';

export default function WelcomeScreen() {
    const { setStep, language, setLanguage } = useKioskStore();

    const handleStart = () => {
        setStep('order-type');
    };

    return (
        <div
            className="flex h-screen w-full flex-col bg-[#FDFBF7] cursor-pointer"
            onClick={handleStart}
        >
            {/* Hero Section */}
            <div className="relative flex-1 w-full overflow-hidden bg-[#AD362B] flex items-center justify-center">
                <div className="text-center z-10 p-12">
                    <h1 className="text-[7rem] font-black text-[#FFC72C] tracking-tight leading-none mb-3">
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
            <div className="relative flex flex-col items-center justify-center bg-[#FDFBF7] py-16 min-h-[42vh] rounded-t-[3rem] -mt-12 z-20">
                {/* Logo */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white rounded-full p-4">
                    <Logo size="lg" />
                </div>

                <div className="h-20" />

                {/* CTA */}
                <div className="flex flex-col items-center mt-6">
                    <h2 className="text-6xl font-black text-[#5a2e18] tracking-tight">
                        Order Here
                    </h2>
                    <p className="text-[#a8a8a8] text-xl mt-3 font-medium">
                        Fresh & delicious, made just for you
                    </p>
                </div>

                {/* Language Selector */}
                <div
                    className="flex gap-4 mt-12"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant={language === 'en' ? 'primary' : 'outline'}
                        size="lg"
                        onClick={() => setLanguage('en')}
                    >
                        English
                    </Button>
                    <Button
                        variant={language === 'id' ? 'primary' : 'outline'}
                        size="lg"
                        onClick={() => setLanguage('id')}
                    >
                        Indonesia
                    </Button>
                </div>

                {/* Footer */}
                <p className="mt-auto pt-8 text-[#c4c4c4] text-sm font-semibold uppercase tracking-[0.2em]">
                    Touch screen to start
                </p>
            </div>
        </div>
    );
}
