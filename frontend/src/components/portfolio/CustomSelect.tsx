import { useEffect, useRef, useState } from 'react';
import { ERR_CLASS } from '../../constants/portfolio';

interface Props {
    variant: 'profile' | 'exp';
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
    errorText?: string;
}

const STYLES = {
    profile: {
        container: 'relative w-full text-white text-[14px] md:text-[15px]',
        trigger: 'w-full bg-[#171717] rounded-[12px] h-[48px] px-4 flex items-center justify-between border-none outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer',
        icon: 'text-white/60',
        list: 'absolute left-0 w-full mt-2 bg-[#171717] rounded-[12px] p-2 border border-white/10 z-50 shadow-lg',
    },
    exp: {
        container: 'relative w-full text-[14px] md:text-[15px]',
        trigger: 'w-full bg-[#222222] rounded-[10px] h-[44px] px-4 flex items-center justify-between border-none outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer',
        icon: 'text-[#BEBEBE]',
        list: 'absolute left-0 w-full mt-2 bg-[#222222] border border-[#363636] rounded-[10px] p-2 z-50 shadow-xl',
    },
} as const;

export default function CustomSelect({ variant, options, value, onChange, placeholder, hasError, errorText }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const s = STYLES[variant];

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    const isPlaceholder = !value;

    return (
        <div className={s.container} ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`${s.trigger} ${hasError ? ERR_CLASS : ''}`}
            >
                <span className={variant === 'exp' ? (isPlaceholder ? 'text-[#BEBEBE]/60' : 'text-[#BEBEBE]') : ''}>
                    {value || placeholder}
                </span>
                <div className={s.icon}>
                    {open ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m7 20 5-5 5 5" />
                            <path d="m7 4 5 5 5-5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                        </svg>
                    )}
                </div>
            </button>

            {errorText && (
                <span className={`text-red-500 text-[12px] absolute -bottom-5 left-1 ${hasError ? '' : 'hidden'}`}>{errorText}</span>
            )}

            {open && (
                <ul className={s.list}>
                    {options.map((opt) => (
                        <li
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-white/5 rounded-[8px] cursor-pointer transition-colors text-[#BEBEBE]"
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}