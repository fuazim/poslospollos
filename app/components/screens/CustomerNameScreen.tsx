'use client';

import { useState } from 'react';
import { useKioskStore } from '@/lib/store';
import { Logo, Button } from '@/app/components/ui';

export default function CustomerNameScreen() {
    const { customerName, setCustomerName, setStep } = useKioskStore();
    const [name, setName] = useState(customerName);

    const handleContinue = () => {
        setCustomerName(name);
        setStep('payment-method');
    };

    const handleKeyPress = (key: string) => {
        if (key === 'backspace') {
            setName(prev => prev.slice(0, -1));
        } else if (key === 'space') {
            setName(prev => prev + ' ');
        } else {
            setName(prev => prev + key);
        }
    };

    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace'],
    ];

    return (
        <div className="flex h-screen w-full flex-col bg-[#FDFBF7] items-center justify-center px-16 py-12">
            <Logo size="lg" className="mb-10" />

            <h1 className="text-5xl font-black text-[#5a2e18] mb-3 text-center">
                What should we call you?
            </h1>
            <p className="text-[#a8a8a8] text-xl mb-12">
                Enter your name or nickname for your order
            </p>

            {/* Input Display */}
            <div className="w-full max-w-3xl bg-white rounded-3xl p-8 mb-10">
                <div className="text-5xl font-black text-center text-[#5a2e18] min-h-[72px] flex items-center justify-center">
                    {name || <span className="text-[#ddd]">Your name</span>}
                </div>
            </div>

            {/* Virtual Keyboard */}
            <div className="w-full max-w-4xl space-y-4">
                {keys.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-3">
                        {row.map((key) => (
                            <button
                                key={key}
                                onClick={() => handleKeyPress(key)}
                                className={`
                                    h-16 rounded-2xl font-bold text-xl
                                    flex items-center justify-center
                                    bg-white text-[#5a2e18]
                                    active:bg-[#f5f5f5] active:scale-95
                                    transition-all duration-100
                                    ${key === 'backspace' ? 'w-28' : 'w-16'}
                                `}
                            >
                                {key === 'backspace' ? '←' : key}
                            </button>
                        ))}
                    </div>
                ))}

                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => handleKeyPress('space')}
                        className="w-96 h-16 rounded-2xl font-bold text-lg bg-white text-[#a8a8a8] active:bg-[#f5f5f5] active:scale-[0.98] transition-all duration-100"
                    >
                        Space
                    </button>
                </div>
            </div>

            <div className="flex gap-5 mt-12">
                <Button variant="outline" size="xl" onClick={() => setStep('cart')}>
                    Back
                </Button>
                <Button variant="primary" size="xl" onClick={handleContinue} disabled={!name.trim()}>
                    Continue to Payment
                </Button>
            </div>
        </div>
    );
}
