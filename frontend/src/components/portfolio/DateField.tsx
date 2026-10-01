import { useState } from 'react';
import { ERR_CLASS } from '../../constants/portfolio';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    hasError?: boolean;
}

export default function DateField({ value, onChange, placeholder, hasError }: Props) {
    const [focused, setFocused] = useState(false);

    return (
        <div
            className={`relative flex-1 h-[44px] bg-[#222222] border border-transparent rounded-[10px] focus-within:ring-2 focus-within:ring-secondary transition-all ${hasError ? ERR_CLASS : ''}`}
        >
            <input
                type={focused || value ? 'date' : 'text'}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="absolute inset-0 w-full h-full bg-transparent border-none pl-3 pr-9 text-[#BEBEBE] text-[14px] outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10"
            />
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#BEBEBE] pointer-events-none text-[18px] z-0">
                calendar_today
            </span>
        </div>
    );
}