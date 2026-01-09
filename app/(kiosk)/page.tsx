'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useKioskStore } from '@/lib/store';
import { useIdleTimer } from '@/lib/hooks/useIdleTimer';

// Kiosk Screens
import WelcomeScreen from '@/components/kiosk/screens/WelcomeScreen';
import OrderTypeScreen from '@/components/kiosk/screens/OrderTypeScreen';
import MenuScreen from '@/components/kiosk/screens/MenuScreen';
import CartScreen from '@/components/kiosk/screens/CartScreen';
import CustomerNameScreen from '@/components/kiosk/screens/CustomerNameScreen';
import PaymentMethodScreen from '@/components/kiosk/screens/PaymentMethodScreen';
import PaymentProcessingScreen from '@/components/kiosk/screens/PaymentProcessingScreen';
import PaymentSuccessScreen from '@/components/kiosk/screens/PaymentSuccessScreen';
import PaymentFailedScreen from '@/components/kiosk/screens/PaymentFailedScreen';

export default function KioskPage() {
    const { currentStep, resetKiosk, isHighContrast } = useKioskStore();
    const [isClient, setIsClient] = useState(false);

    // Idle timer: Reset to welcome screen after 60 seconds of inactivity
    // Only active if not already on welcome screen
    useIdleTimer(60000, resetKiosk, currentStep !== 'welcome');

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Avoid hydration mismatch

    // Render current screen based on step
    const renderScreen = () => {
        switch (currentStep) {
            case 'welcome':
                return <WelcomeScreen />;
            case 'order-type':
                return <OrderTypeScreen />;
            case 'categories':
                return <MenuScreen />;
            case 'cart':
                return <CartScreen />;
            case 'customer-name':
                return <CustomerNameScreen />;
            case 'payment-method':
                return <PaymentMethodScreen />;
            case 'payment-processing':
                return <PaymentProcessingScreen />;
            case 'payment-success':
                return <PaymentSuccessScreen />;
            case 'payment-failed':
                return <PaymentFailedScreen />;
            default:
                return <WelcomeScreen />;
        }
    };

    return (
        <main className={`h-full w-full ${isHighContrast ? 'grayscale contrast-125' : ''}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full w-full"
                >
                    {renderScreen()}
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
