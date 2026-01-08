'use client';

import { useEffect, useState } from 'react';
import { useKioskStore } from '@/lib/store';
import { Button } from '@/app/components/ui';

export default function PaymentSuccessScreen() {
    const { orderNumber, customerName, orderType, getCartTotal, resetKiosk } = useKioskStore();
    const { total, itemCount } = getCartTotal();
    const [countdown, setCountdown] = useState(15);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            resetKiosk();
        }
    }, [countdown, resetKiosk]);

    return (
        <div className="flex h-screen w-full flex-col bg-[#FDFBF7] items-center justify-center px-16 py-12">
            {/* Success Icon */}
            <div className="w-48 h-48 bg-[#22C55E] rounded-full flex items-center justify-center mb-10">
                <span className="text-white text-8xl font-light">✓</span>
            </div>

            {/* Order Number */}
            <div className="text-center mb-10">
                <p className="text-[#a8a8a8] text-xl mb-3">Your Order Number</p>
                <div className="bg-white rounded-3xl px-14 py-8">
                    <h1 className="text-8xl font-black text-[#5a2e18] tracking-tight">#{orderNumber}</h1>
                </div>
            </div>

            <h2 className="text-4xl font-black text-[#5a2e18] mb-3">Thank you, {customerName}!</h2>
            <p className="text-[#a8a8a8] text-xl text-center max-w-lg mb-10">
                Your order has been placed successfully. We&apos;ll call your number when your order is ready.
            </p>

            {/* Order Details */}
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mb-10">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[#a8a8a8] text-lg">Order Type</span>
                        <span className="font-bold text-[#5a2e18] text-lg">
                            {orderType === 'dine-in' ? 'Dine In' : 'Take Away'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#a8a8a8] text-lg">Items</span>
                        <span className="font-bold text-[#5a2e18] text-lg">{itemCount} items</span>
                    </div>
                    <div className="h-px bg-[#f0f0f0] my-2" />
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-[#5a2e18]">Total Paid</span>
                        <span className="text-2xl font-black text-[#22C55E]">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-5 mb-8">
                <Button variant="outline" size="xl">Print Receipt</Button>
                <Button variant="primary" size="xl" onClick={resetKiosk}>Start New Order</Button>
            </div>

            <p className="text-[#c4c4c4] text-base">
                Returning to home screen in <span className="font-bold text-[#DA291C]">{countdown}s</span>
            </p>
        </div>
    );
}
