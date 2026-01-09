import { MenuCategory, Product, ProductOption } from './types';

// Mock Categories - Los Pollos Hermanos Style
export const mockCategories: MenuCategory[] = [
    {
        id: 'cat-1',
        name: 'Pollos Clásicos',
        description: 'Our famous fried chicken',
        imageUrl: '/images/categories/chicken.jpg',
        sortOrder: 1,
        isActive: true,
        badge: 'popular',
    },
    {
        id: 'cat-2',
        name: 'Familia Buckets',
        description: 'Perfect for sharing',
        imageUrl: '/images/categories/bucket.jpg',
        sortOrder: 2,
        isActive: true,
    },
    {
        id: 'cat-3',
        name: 'Hermanos Burgers',
        description: 'Juicy chicken burgers',
        imageUrl: '/images/categories/burger.jpg',
        sortOrder: 3,
        isActive: true,
        badge: 'new',
    },
    {
        id: 'cat-4',
        name: 'Los Sides',
        description: 'Fries, salads & more',
        imageUrl: '/images/categories/sides.jpg',
        sortOrder: 4,
        isActive: true,
    },
    {
        id: 'cat-5',
        name: 'Bebidas',
        description: 'Refreshing beverages',
        imageUrl: '/images/categories/drinks.jpg',
        sortOrder: 5,
        isActive: true,
    },
    {
        id: 'cat-6',
        name: 'Postres',
        description: 'Sweet treats',
        imageUrl: '/images/categories/desserts.jpg',
        sortOrder: 6,
        isActive: true,
    },
    {
        id: 'cat-7',
        name: 'Combos Hermanos',
        description: 'Best value meals',
        imageUrl: '/images/categories/combo.jpg',
        sortOrder: 7,
        isActive: true,
        badge: 'popular',
    },
    {
        id: 'cat-8',
        name: 'Specials',
        description: 'Limited time offers',
        imageUrl: '/images/categories/specials.jpg',
        sortOrder: 8,
        isActive: false,
        badge: 'new',
    },
];

// Mock Products - Los Pollos Hermanos Breaking Bad Theme
export const mockProducts: Product[] = [
    // Pollos Clásicos
    {
        id: 'prod-1',
        categoryId: 'cat-1',
        name: 'Gus Special (2pcs)',
        description: 'The boss\'s favorite - 2 pieces of our legendary fried chicken',
        basePrice: 8.99,
        imageUrl: '/images/products/gus-special.png',
        isCombo: true,
        isActive: true,
        sortOrder: 1,
    },
    {
        id: 'prod-2',
        categoryId: 'cat-1',
        name: 'Heisenberg Meal (3pcs)',
        description: 'Say my name - 3 pieces of crispy perfection with your choice of side',
        basePrice: 11.99,
        imageUrl: '/images/products/heisenberg-meal.png',
        isCombo: true,
        isActive: true,
        sortOrder: 2,
    },
    {
        id: 'prod-3',
        categoryId: 'cat-1',
        name: 'Blue Sky Wings (6pcs)',
        description: '99.1% pure crispy spicy wings - the purest in the Southwest',
        basePrice: 7.99,
        imageUrl: '/images/products/blue-sky-wings.png',
        isCombo: false,
        isActive: true,
        sortOrder: 3,
    },
    // Familia Buckets
    {
        id: 'prod-4',
        categoryId: 'cat-2',
        name: 'Cartel Bucket (8pcs)',
        description: 'For the whole crew - 8 pieces, 2 large sides, 4 biscuits',
        basePrice: 24.99,
        imageUrl: '/images/products/cartel-bucket.png',
        isCombo: true,
        isActive: true,
        sortOrder: 1,
    },
    {
        id: 'prod-5',
        categoryId: 'cat-2',
        name: 'Empire Bucket (12pcs)',
        description: 'Build your empire - 12 pieces, 3 large sides, 6 biscuits',
        basePrice: 34.99,
        imageUrl: '/images/products/empire-bucket.png',
        isCombo: true,
        isActive: true,
        sortOrder: 2,
    },
    // Hermanos Burgers
    {
        id: 'prod-6',
        categoryId: 'cat-3',
        name: 'Walter White Classic',
        description: 'Chemistry perfected - crispy chicken fillet with lettuce, tomato, and special sauce',
        basePrice: 6.99,
        imageUrl: '/images/products/walter-white-classic.png',
        isCombo: false,
        isActive: true,
        sortOrder: 1,
    },
    {
        id: 'prod-7',
        categoryId: 'cat-3',
        name: 'Jesse\'s Fire Burger',
        description: 'Yeah science! - Spicy chicken with jalapeños and chipotle sauce',
        basePrice: 7.49,
        imageUrl: '/images/products/jesses-fire-burger.png',
        isCombo: false,
        isActive: true,
        sortOrder: 2,
    },
    // Los Sides
    {
        id: 'prod-8',
        categoryId: 'cat-4',
        name: 'Albuquerque Fries',
        description: 'Golden crispy fries from the Land of Enchantment',
        basePrice: 2.99,
        imageUrl: '/images/products/albuquerque-fries.png',
        isCombo: false,
        isActive: true,
        sortOrder: 1,
    },
    {
        id: 'prod-9',
        categoryId: 'cat-4',
        name: 'Coleslaw Blanco',
        description: 'Fresh and creamy coleslaw',
        basePrice: 2.49,
        imageUrl: '/images/products/coleslaw-blanco.png',
        isCombo: false,
        isActive: true,
        sortOrder: 2,
    },
    // Bebidas
    {
        id: 'prod-10',
        categoryId: 'cat-5',
        name: 'Hermanos Soda',
        description: 'Coca-Cola, Sprite, or Fanta',
        basePrice: 2.49,
        imageUrl: '/images/products/hermanos-soda.png',
        isCombo: false,
        isActive: true,
        sortOrder: 1,
    },
    // Postres
    {
        id: 'prod-11',
        categoryId: 'cat-6',
        name: 'Breaking Bad Sundae',
        description: 'Dangerously delicious - vanilla ice cream with blue raspberry sauce',
        basePrice: 3.49,
        imageUrl: '/images/products/breaking-bad-sundae.png',
        isCombo: false,
        isActive: true,
        sortOrder: 1,
    },
];

// Mock Product Options
export const mockProductOptions: ProductOption[] = [
    // Size options (for drinks)
    { id: 'opt-1', productId: 'prod-10', optionGroup: 'size', label: 'Small', extraPrice: 0, isDefault: true, sortOrder: 1 },
    { id: 'opt-2', productId: 'prod-10', optionGroup: 'size', label: 'Medium', extraPrice: 0.50, isDefault: false, sortOrder: 2 },
    { id: 'opt-3', productId: 'prod-10', optionGroup: 'size', label: 'Large', extraPrice: 1.00, isDefault: false, sortOrder: 3 },

    // Size options (for fries)
    { id: 'opt-4', productId: 'prod-8', optionGroup: 'size', label: 'Regular', extraPrice: 0, isDefault: true, sortOrder: 1 },
    { id: 'opt-5', productId: 'prod-8', optionGroup: 'size', label: 'Large', extraPrice: 1.00, isDefault: false, sortOrder: 2 },

    // Side options (for chicken meals)
    { id: 'opt-6', productId: 'prod-1', optionGroup: 'side', label: 'Fries', extraPrice: 0, isDefault: true, sortOrder: 1 },
    { id: 'opt-7', productId: 'prod-1', optionGroup: 'side', label: 'Coleslaw', extraPrice: 0, isDefault: false, sortOrder: 2 },
    { id: 'opt-8', productId: 'prod-1', optionGroup: 'side', label: 'Mashed Potatoes', extraPrice: 0.50, isDefault: false, sortOrder: 3 },

    { id: 'opt-9', productId: 'prod-2', optionGroup: 'side', label: 'Fries', extraPrice: 0, isDefault: true, sortOrder: 1 },
    { id: 'opt-10', productId: 'prod-2', optionGroup: 'side', label: 'Coleslaw', extraPrice: 0, isDefault: false, sortOrder: 2 },
    { id: 'opt-11', productId: 'prod-2', optionGroup: 'side', label: 'Mashed Potatoes', extraPrice: 0.50, isDefault: false, sortOrder: 3 },

    // Drink options (for combo meals)
    { id: 'opt-12', productId: 'prod-1', optionGroup: 'drink', label: 'Coca-Cola', extraPrice: 0, isDefault: true, sortOrder: 1 },
    { id: 'opt-13', productId: 'prod-1', optionGroup: 'drink', label: 'Sprite', extraPrice: 0, isDefault: false, sortOrder: 2 },
    { id: 'opt-14', productId: 'prod-1', optionGroup: 'drink', label: 'Fanta', extraPrice: 0, isDefault: false, sortOrder: 3 },
    { id: 'opt-15', productId: 'prod-1', optionGroup: 'drink', label: 'No Drink', extraPrice: -1.00, isDefault: false, sortOrder: 4 },

    // Sauce options
    { id: 'opt-16', productId: 'prod-3', optionGroup: 'sauce', label: 'BBQ Sauce', extraPrice: 0, isDefault: true, sortOrder: 1 },
    { id: 'opt-17', productId: 'prod-3', optionGroup: 'sauce', label: 'Hot Sauce', extraPrice: 0, isDefault: false, sortOrder: 2 },
    { id: 'opt-18', productId: 'prod-3', optionGroup: 'sauce', label: 'Ranch', extraPrice: 0.25, isDefault: false, sortOrder: 3 },

    // Add-ons
    { id: 'opt-19', productId: 'prod-6', optionGroup: 'addon', label: 'Extra Cheese', extraPrice: 0.75, isDefault: false, sortOrder: 1 },
    { id: 'opt-20', productId: 'prod-6', optionGroup: 'addon', label: 'Bacon', extraPrice: 1.25, isDefault: false, sortOrder: 2 },
    { id: 'opt-21', productId: 'prod-7', optionGroup: 'addon', label: 'Extra Cheese', extraPrice: 0.75, isDefault: false, sortOrder: 1 },
    { id: 'opt-22', productId: 'prod-7', optionGroup: 'addon', label: 'Bacon', extraPrice: 1.25, isDefault: false, sortOrder: 2 },
];

// Helper function to get products with their options
export function getProductsWithOptions(): Product[] {
    return mockProducts.map((product) => ({
        ...product,
        options: mockProductOptions.filter((opt) => opt.productId === product.id),
    }));
}

// Helper function to get products by category
export function getProductsByCategory(categoryId: string): Product[] {
    return getProductsWithOptions().filter((p) => p.categoryId === categoryId && p.isActive);
}

// Helper function to get active categories
export function getActiveCategories(): MenuCategory[] {
    return mockCategories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}
