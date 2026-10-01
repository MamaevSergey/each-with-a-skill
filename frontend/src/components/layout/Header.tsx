import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-[76px] max-w-container-max mx-auto bg-background/80 backdrop-blur-xl border-b border-transparent md:border-none">
            <a
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
                href="/"
                className="text-headline-sm font-headline-sm font-bold text-on-surface hover:text-primary transition-colors duration-180 ease-custom-ease cursor-pointer"
            >
                EWAS - Portfolio
            </a>
            <div className="flex items-center gap-2 sm:gap-4">
                {isLoggedIn ? (
                    <button
                        onClick={() => navigate('/my-portfolio')}
                        className="accent-gradient-btn text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-180 ease-custom-ease font-label-md shadow-glow px-4 sm:px-6 sm:text-label-md border-none cursor-pointer"
                    >
                        Мое портфолио
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/register')}
                            className="py-2 rounded-lg border border-outline-variant text-on-surface hover:border-outline hover:bg-surface-variant transition-all duration-180 ease-custom-ease font-label-md px-2 text-label-sm sm:px-4 sm:text-label-md bg-transparent cursor-pointer"
                        >
                            Регистрация
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="btn-gradient text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-180 ease-custom-ease font-label-md shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] px-3 text-label-sm sm:px-6 sm:text-label-md border-none cursor-pointer"
                        >
                            Логин
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}