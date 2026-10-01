import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
}

interface ToastContextValue {
    showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<(ToastOptions & { id: number }) | null>(null);

    const showToast = useCallback(({ message, type = 'info', duration = 3000 }: ToastOptions) => {
        const id = Date.now();
        setToast({ message, type, duration, id });
        setTimeout(() => {
            setToast((current) => (current?.id === id ? null : current));
        }, duration);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-fade-in-up">
                    <div className={`px-6 py-3 rounded-full shadow-ambient font-label-md flex items-center gap-3 ${
                        toast.type === 'error' ? 'bg-error text-on-error' :
                            toast.type === 'success' ? 'bg-primary text-surface-container-lowest' :
                                'bg-surface-container-highest text-text-primary'
                    }`}>
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {toast.type === 'error' ? 'error' : toast.type === 'success' ? 'check_circle' : 'info'}
                        </span>
                        {toast.message}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}