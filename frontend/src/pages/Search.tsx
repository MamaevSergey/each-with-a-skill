import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { searchUserByLogin } from '../api/userApi';

export default function Search() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) {
            setError('Введите логин для поиска');
            return;
        }
        setError('');
        setLoading(true);

        try {
            await searchUserByLogin(query);
            navigate(`/portfolio/${encodeURIComponent(query.trim())}`);
        } catch (err: any) {
            setError(err.message || 'Ошибка поиска');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-[100px] pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col justify-center relative">
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] opacity-30 pointer-events-none hidden lg:block rounded-2xl overflow-hidden"
                    style={{ background: 'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 60%)' }}
                >
                    <div
                        className="bg-contain bg-right bg-no-repeat w-full h-full opacity-90 mix-blend-screen rounded-2xl"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqBCnPPcFHY9WkUnSnXGxENsFXvPngE44cKB8mKCyRJMn60EdZ9h9e8oeWUOauSxDWmwsp2MdqKjzFNP51HzYNDL0q0LwdTz0aYO9kd2MGmLUBrOBNtPlIgzueQOY1AyzG6H-IchAUbAmEYX6aTkag0aJtiABaEToAqxkBN1jGsBOZtcttROB6facPm0LXt6JC2mGynl-fRiW42jAU8a1PtqBiTbAlEHNBSajF3MBx93TDvAvEA7hC1L1W3UsU6Xur_jFhjjMEi8A')" }}
                    />
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 mt-12 md:mt-24 relative z-10 text-center lg:text-left">
                    <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start">
                        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-text-primary mb-6 opacity-0 animate-fade-in-up stagger-1">
                            Найдите будущих сотрудников здесь
                        </h1>
                        <p className="font-body-lg text-body-lg text-text-secondary mb-12 max-w-2xl opacity-0 animate-fade-in-up stagger-2">
                            Создайте свою учетную запись, чтобы получить доступ к созданию своего собственного портфолио.
                        </p>

                        <form
                            onSubmit={handleSearch}
                            className="bg-surface border border-border-subtle rounded-xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.5)] max-w-2xl w-full flex items-center transition-all duration-360 ease-custom-ease glow-effect opacity-0 animate-fade-in-up stagger-3 mx-auto lg:mx-0"
                        >
                            <div className="flex items-center pl-4 text-on-surface-variant">
                                <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                            </div>
                            <input
                                className="bg-transparent border-none text-on-surface focus:outline-none focus:ring-0 w-full px-4 font-body-md placeholder:text-outline-variant h-12"
                                placeholder="Введите логин пользователя"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary-container text-on-surface px-6 h-12 rounded-lg flex items-center gap-2 hover:bg-surface-variant transition-colors duration-180 ease-custom-ease shrink-0 disabled:opacity-50 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px] select-none" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
                                <span className="font-label-md text-label-md hidden sm:block">
                  {loading ? 'Поиск...' : 'Поиск'}
                </span>
                            </button>
                        </form>
                        {error && <p className="text-error font-label-sm text-label-sm mt-2 text-left w-full max-w-2xl">{error}</p>}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}