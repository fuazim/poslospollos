/**
 * Company Information
 * Used in receipts, headers, footers
 */

export const COMPANY = {
    name: 'Los Pollos Hermanos',
    shortName: 'Los Pollos',
    tagline: 'The Chicken Brothers',
    slogan: 'Taste the Family Recipe',
    
    address: {
        street: '308 Negra Arroyo Lane',
        city: 'Albuquerque',
        state: 'NM',
        zip: '87104',
        country: 'USA',
    },
    
    contact: {
        phone: '(505) 555-0123',
        email: 'info@lospollos.com',
        website: 'www.lospollos.com',
    },
    
    // For receipts
    getFullAddress(): string {
        const { street, city, state, zip } = this.address;
        return `${street}\n${city}, ${state} ${zip}`;
    },
    
    getFormattedPhone(): string {
        return `Tel: ${this.contact.phone}`;
    },
} as const;

// Logo paths
export const LOGOS = {
    main: '/images/logos/los-pollos-logo.png',
    icon: '/images/logos/los-pollos-icon.png',
    white: '/images/logos/los-pollos-logo-white.png',
} as const;
