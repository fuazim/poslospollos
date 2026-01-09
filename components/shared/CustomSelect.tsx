'use client';

import { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isDark?: boolean;
    className?: string;
    bgClass?: string;
}

export default function CustomSelect({
    options,
    value,
    onChange,
    placeholder = 'Select...',
    isDark = false,
    className = '',
    bgClass,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Determine background class
    const backgroundClass = bgClass || (isDark ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-[#f5f5f5] hover:bg-[#eee]');

    return (
        <div ref={selectRef} className={`relative ${className}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] text-left transition-all ${backgroundClass} ${isDark ? 'text-white' : 'text-[#1a1a2e]'} ${isOpen ? (isDark ? 'ring-1 ring-[#333]' : 'ring-1 ring-[#ddd]') : ''}`}
            >
                <span className={!selectedOption ? (isDark ? 'text-[#555]' : 'text-[#a8a8a8]') : ''}>
                    {selectedOption?.label || placeholder}
                </span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-[#666]' : 'text-[#a8a8a8]'}`}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className={`absolute z-50 w-full mt-1 py-1 rounded-xl shadow-lg overflow-hidden ${isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-[#eee]'
                    }`}>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-[11px] text-left transition-colors ${value === option.value
                                    ? isDark
                                        ? 'bg-[#F4A900]/15 text-[#F4A900]'
                                        : 'bg-[#F4A900]/10 text-[#1a1a2e]'
                                    : isDark
                                        ? 'text-white hover:bg-[#222]'
                                        : 'text-[#1a1a2e] hover:bg-[#f8f8f8]'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
