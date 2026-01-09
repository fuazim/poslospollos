'use client';

import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const paddingStyles = {
    none: '',
    sm: 'p-5',
    md: 'p-7',
    lg: 'p-9',
    xl: 'p-12',
};

export default function Card({
    children,
    onClick,
    className = '',
    padding = 'md',
}: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`
                bg-white rounded-3xl
                transition-transform duration-150 ease-out
                ${paddingStyles[padding]}
                ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
}
