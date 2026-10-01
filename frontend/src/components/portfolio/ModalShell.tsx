import { useEffect, useRef, useState, type ReactNode } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    className: string;
    children: ReactNode;
}

export default function ModalShell({ open, onClose, className, children }: Props) {
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(false);
    const wasOpen = useRef(false);

    useEffect(() => {
        let raf1 = 0;
        let raf2 = 0;
        let timer: number | undefined;

        if (open) {
            wasOpen.current = true;
            setMounted(true);
            document.body.style.overflow = 'hidden';
            raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => setVisible(true));
            });
        } else if (wasOpen.current) {
            setVisible(false);
            timer = window.setTimeout(() => {
                setMounted(false);
                document.body.style.overflow = '';
            }, 300);
        }

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
            if (timer) clearTimeout(timer);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    useEffect(() => () => {
        document.body.style.overflow = '';
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm items-center justify-center p-4 md:p-6 overflow-y-auto custom-scroll transition-opacity duration-300 ${mounted ? 'flex' : 'hidden'} ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                className={`modal-content relative bg-[#2D2D2D] border border-[#A9A9A9]/40 w-full shadow-2xl transition-all duration-300 my-auto ${className} ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
            >
                {children}
            </div>
        </div>
    );
}