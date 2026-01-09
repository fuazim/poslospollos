'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useKioskStore } from '@/lib/store';
import { PaymentMethod } from '@/lib/types';
import { Logo, Button, Card } from '@/components/ui';

export default function PaymentMethodScreen() {
    const { setStep, setPaymentMethod, getCartTotal, customerName, placeOrder } = useKioskStore();
    const { total } = getCartTotal();
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const handleImageLoad = (id: string) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const handleSelectPayment = (method: PaymentMethod) => {
        setPaymentMethod(method);

        if (method === 'cash') {
            placeOrder();
            setStep('payment-success');
        } else {
            setStep('payment-processing');
        }
    };

    const paymentMethods = [
        { id: 'card' as PaymentMethod, iconUrl: '/images/icons/card.svg', label: 'Card', sublabel: 'Credit / Debit' },
        { id: 'qr' as PaymentMethod, iconUrl: '/images/icons/qr.svg', label: 'QR / E-Wallet', sublabel: 'Scan to pay' },
        { id: 'cash' as PaymentMethod, iconUrl: '/images/icons/cash.svg', label: 'Cash', sublabel: 'Pay at counter' },
    ];

    return (
        <div className="flex h-screen w-full flex-col bg-[#FDFBF7] items-center px-16 py-12">
            <Logo size="lg" className="mb-10" />

            <div className="text-center mb-12">
                <h1 className="text-5xl font-black text-[#5a2e18] mb-4">Choose Payment Method</h1>
                <p className="text-[#a8a8a8] text-xl">
                    Hi <span className="font-bold text-[#5a2e18]">{customerName}</span>! Your total is{' '}
                    <span className="font-black text-[#DA291C] text-2xl">${total.toFixed(2)}</span>
                </p>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-5xl w-full mb-auto">
                {paymentMethods.map((method) => (
                    <Card key={method.id} onClick={() => handleSelectPayment(method.id)} padding="xl" className="flex flex-col items-center py-14">
                        <div className="w-24 h-24 bg-[#F8F8F6] rounded-3xl flex items-center justify-center mb-8">
                            <div className="relative w-14 h-14">
                                <Image
                                    src={method.iconUrl}
                                    alt={method.label}
                                    fill
                                    className={`object-contain transition-opacity duration-300 ease-out ${loadedImages[method.id] ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => handleImageLoad(method.id)}
                                />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-[#5a2e18] mb-2">{method.label}</h3>
                        <p className="text-[#a8a8a8] text-lg">{method.sublabel}</p>
                    </Card>
                ))}
            </div>

            <div className="bg-white rounded-2xl px-10 py-6 mb-8">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <Image src="/images/icons/basket.svg" alt="Cart" width={32} height={32} className="opacity-50" />
                    </div>
                    <div>
                        <p className="text-sm text-[#a8a8a8] font-semibold uppercase tracking-wide">Amount to Pay</p>
                        <p className="text-4xl font-black text-[#5a2e18]">${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <Button variant="ghost" size="xl" onClick={() => setStep('customer-name')}>
                Back
            </Button>
        </div>
    );
}
