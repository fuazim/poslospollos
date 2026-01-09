/**
 * Menu Types
 * Categories, Products, Options
 */

// Menu Category
export interface MenuCategory {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    sortOrder: number;
    isActive: boolean;
    badge?: 'new' | 'popular';
}

// Product Option (size, sauce, side, drink)
export interface ProductOption {
    id: string;
    productId: string;
    optionGroup: 'size' | 'side' | 'drink' | 'sauce' | 'addon';
    label: string;
    extraPrice: number;
    isDefault: boolean;
    sortOrder: number;
}

// Product
export interface Product {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    basePrice: number;
    imageUrl?: string;
    isCombo: boolean;
    isActive: boolean;
    sortOrder: number;
    options?: ProductOption[];
}
