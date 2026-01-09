import { create } from 'zustand';
import { CartItem, KioskStep, Language, OrderType, PaymentMethod, Product, ProductOption } from './types';

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Generate order number (e.g., A123)
const generateOrderNumber = () => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const number = Math.floor(100 + Math.random() * 900);
    return `${letter}${number}`;
};

interface KioskState {
    // Current step
    currentStep: KioskStep;
    setStep: (step: KioskStep) => void;

    // Language
    language: Language;
    setLanguage: (lang: Language) => void;
    
    // Accessibility
    isHighContrast: boolean;
    toggleHighContrast: () => void;

    // Order type
    orderType: OrderType | null;
    setOrderType: (type: OrderType) => void;

    // Selected category (for navigation)
    selectedCategoryId: string | null;
    setSelectedCategoryId: (id: string | null) => void;

    // Selected product (for detail view)
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;

    // Cart
    cart: CartItem[];
    addToCart: (product: Product, selectedOptions: ProductOption[], quantity: number) => void;
    updateCartItem: (cartItemId: string, quantity: number) => void;
    removeFromCart: (cartItemId: string) => void;
    clearCart: () => void;
    getCartTotal: () => { subtotal: number; tax: number; total: number; itemCount: number };

    // Customer info
    customerName: string;
    setCustomerName: (name: string) => void;

    // Payment
    paymentMethod: PaymentMethod | null;
    setPaymentMethod: (method: PaymentMethod) => void;

    // Order result
    orderNumber: string | null;
    orderId: string | null;

    // Actions
    placeOrder: () => { orderId: string; orderNumber: string };
    resetKiosk: () => void;

    // Idle timeout
    lastInteraction: Date;
    updateLastInteraction: () => void;
}

const TAX_RATE = 0.1; // 10% tax

export const useKioskStore = create<KioskState>((set, get) => ({
    // Initial state
    currentStep: 'welcome',
    language: 'en',
    orderType: null,
    selectedCategoryId: null,
    selectedProduct: null,
    cart: [],
    customerName: '',
    paymentMethod: null,
    orderNumber: null,
    orderId: null,
    lastInteraction: new Date(),

    // Step navigation
    setStep: (step) => {
        set({ currentStep: step });
        get().updateLastInteraction();
    },

    // Language
    setLanguage: (lang) => {
        set({ language: lang });
        get().updateLastInteraction();
    },

    // Accessibility
    isHighContrast: false,
    toggleHighContrast: () => {
        set((state) => ({ isHighContrast: !state.isHighContrast }));
        get().updateLastInteraction();
    },

    // Order type
    setOrderType: (type) => {
        set({ orderType: type });
        get().updateLastInteraction();
    },

    // Category selection
    setSelectedCategoryId: (id) => {
        set({ selectedCategoryId: id });
        get().updateLastInteraction();
    },

    // Product selection
    setSelectedProduct: (product) => {
        set({ selectedProduct: product });
        get().updateLastInteraction();
    },

    // Cart management
    addToCart: (product, selectedOptions, quantity) => {
        const optionsPrice = selectedOptions.reduce((sum, opt) => sum + opt.extraPrice, 0);
        const unitPrice = product.basePrice + optionsPrice;

        const newItem: CartItem = {
            id: generateId(),
            product,
            selectedOptions,
            quantity,
            unitPrice,
            totalPrice: unitPrice * quantity,
        };

        set((state) => ({ cart: [...state.cart, newItem] }));
        get().updateLastInteraction();
    },

    updateCartItem: (cartItemId, quantity) => {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === cartItemId
                    ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
                    : item
            ),
        }));
        get().updateLastInteraction();
    },

    removeFromCart: (cartItemId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== cartItemId),
        }));
        get().updateLastInteraction();
    },

    clearCart: () => {
        set({ cart: [] });
    },

    getCartTotal: () => {
        const cart = get().cart;
        const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        return { subtotal, tax, total, itemCount };
    },

    // Customer name
    setCustomerName: (name) => {
        set({ customerName: name });
        get().updateLastInteraction();
    },

    // Payment method
    setPaymentMethod: (method) => {
        set({ paymentMethod: method });
        get().updateLastInteraction();
    },

    // Place order
    placeOrder: () => {
        const orderNumber = generateOrderNumber();
        const orderId = generateId();
        set({ orderNumber, orderId });
        return { orderId, orderNumber };
    },

    // Reset kiosk to initial state
    resetKiosk: () => {
        set({
            currentStep: 'welcome',
            orderType: null,
            selectedCategoryId: null,
            selectedProduct: null,
            cart: [],
            customerName: '',
            paymentMethod: null,
            orderNumber: null,
            orderId: null,
            lastInteraction: new Date(),
        });
    },

    // Update last interaction time
    updateLastInteraction: () => {
        set({ lastInteraction: new Date() });
    },
}));
