'use client';

import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#DA291C] text-white active:bg-[#b82318]',
    secondary: 'bg-[#F4A900] text-[#5a2e18] active:bg-[#d99500]',
    ghost: 'bg-transparent text-[#5a2e18] active:bg-[#f5f5f5]',
    outline: 'bg-white text-[#5a2e18] active:bg-[#f5f5f5]',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3.5 text-base gap-2.5',
    lg: 'px-9 py-4.5 text-lg gap-3',
    xl: 'px-12 py-6 text-xl gap-4',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
    disabled = false,
    fullWidth = false,
    icon,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center
                font-bold rounded-2xl
                transition-all duration-150 ease-out
                active:scale-[0.97]
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? 'w-full' : ''}
                ${disabled ? 'opacity-50 pointer-events-none' : ''}
                ${className}
            `}
        >
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
