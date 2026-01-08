'use client';

import { useEffect, useState } from 'react';
import WelcomeScreen from './components/screens/WelcomeScreen';
import OrderTypeScreen from './components/screens/OrderTypeScreen';
import MenuScreen from './components/screens/MenuScreen';
import CartScreen from './components/screens/CartScreen';
import CustomerNameScreen from './components/screens/CustomerNameScreen';
import PaymentMethodScreen from './components/screens/PaymentMethodScreen';
import PaymentProcessingScreen from './components/screens/PaymentProcessingScreen';
import PaymentSuccessScreen from './components/screens/PaymentSuccessScreen';
import PaymentFailedScreen from './components/screens/PaymentFailedScreen';
import { useKioskStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { currentStep } = useKioskStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Disable right click for kiosk mode
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
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
    <main className="min-h-screen w-full bg-[#fdfbf7] text-[#171717]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
