'use client';

import { useKioskStore } from '@/lib/store';
import { Button } from '@/components/ui';

export default function PaymentFailedScreen() {
    const { setStep, resetKiosk } = useKioskStore();

    return (
        <div className="flex h-screen w-full flex-col bg-[#FDFBF7] items-center justify-center px-16 py-12">
            {/* Error Icon */}
            <div className="w-48 h-48 bg-[#EF4444] rounded-full flex items-center justify-center mb-12">
                <span className="text-white text-8xl font-light">×</span>
            </div>

            <h1 className="text-5xl font-black text-[#5a2e18] mb-4 text-center">Payment Failed</h1>
            <p className="text-[#a8a8a8] text-xl text-center max-w-lg mb-12">
                We couldn&apos;t process your payment. Please try again or choose a different payment method.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-md">
                <Button variant="primary" size="xl" fullWidth onClick={() => setStep('payment-processing')}>
                    Try Again
                </Button>
                <Button variant="outline" size="xl" fullWidth onClick={() => setStep('payment-method')}>
                    Change Payment Method
                </Button>
                <Button variant="ghost" size="lg" fullWidth onClick={resetKiosk}>
                    Cancel Order
                </Button>
            </div>
        </div>
    );
}
