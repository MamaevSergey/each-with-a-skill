import { useNavigate } from 'react-router-dom';

export default function AuthHeader() {
    const navigate = useNavigate();

    return (
        <header className="rounded-b-lg fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-[76px] max-w-container-max mx-auto bg-background/80 backdrop-blur-xl border-b border-transparent md:border-none">
            <a
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
                href="/"
                className="text-headline-sm font-headline-sm font-bold text-on-surface hover:text-primary transition-colors duration-180 ease-custom-ease cursor-pointer"
            >
                EWAS - Portfolio
            </a>
            <div className="flex items-center gap-2">
                <span className="text-text-secondary hidden md:inline-block text-body-md font-body-md">Вернуться к поиску</span>
                <a
                    onClick={(e) => { e.preventDefault(); navigate('/'); }}
                    href="/"
                    className="text-primary hover:text-text-primary font-semibold transition-colors duration-180 ease-custom-ease flex items-center gap-2 cursor-pointer"
                >
                    <span className="material-symbols-outlined -scale-x-100 text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>data_loss_prevention</span>
                </a>
            </div>
        </header>
    );
}