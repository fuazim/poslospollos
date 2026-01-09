'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useKioskStore } from '@/lib/store';

export default function PaymentProcessingScreen() {
    const { setStep, placeOrder, paymentMethod } = useKioskStore();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            placeOrder();
            const success = true;
            if (success) {
                setStep('payment-success');
            } else {
                setStep('payment-failed');
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [placeOrder, setStep]);

    const paymentInfo: Record<string, { label: string; iconUrl: string; instruction: string }> = {
        card: { label: 'Processing card payment...', iconUrl: '/images/icons/card.svg', instruction: 'Please insert or tap your card' },
        qr: { label: 'Waiting for QR scan...', iconUrl: '/images/icons/qr.svg', instruction: 'Scan the QR code with your phone' },
        cash: { label: 'Confirming cash payment...', iconUrl: '/images/icons/cash.svg', instruction: 'Please proceed to the counter' },
        'gift-card': { label: 'Validating gift card...', iconUrl: '/images/icons/gift-card.svg', instruction: 'Please wait while we verify' },
    };

    const current = paymentInfo[paymentMethod || 'card'];

    return (
        <div className="flex h-screen w-full flex-col bg-[#FDFBF7] items-center justify-center">
            {/* Loader */}
            <div className="relative w-48 h-48 mb-12">
                <div className="absolute inset-0 rounded-full border-[6px] border-[#f0f0f0]" />
                <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-[#F4A900] animate-spin" />
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <div className="relative w-16 h-16">
                        <Image
                            src={current?.iconUrl}
                            alt="Payment"
                            fill
                            className={`object-contain transition-opacity duration-300 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-4xl font-black text-[#5a2e18] mb-4 text-center">
                {current?.label || 'Processing...'}
            </h1>
            <p className="text-[#a8a8a8] text-xl text-center mb-8">
                {current?.instruction}
            </p>

            <p className="text-[#c4c4c4] text-base mt-10">
                Please do not close this screen
            </p>
        </div>
    );
}
