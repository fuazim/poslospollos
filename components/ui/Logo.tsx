'use client';

import Image from 'next/image';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
    return (
        <div className={`relative ${sizeStyles[size]} ${className}`}>
            <Image
                src="/images/logos/los-pollos-logo.png"
                alt="Los Pollos Hermanos"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100px, 200px"
            />
        </div>
    );
}
