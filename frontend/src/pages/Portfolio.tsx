import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPortfolioData } from '../api/userApi';
import { useToast } from '../components/ui/Toast';

export default function Portfolio() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const trackerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!username) {
            navigate('/');
            return;
        }

        fetchPortfolioData(username)
            .then((data) => {
                if (data.avatar === '/images/default-avatar.png') {
                    data.avatar = '';
                }
                setProfile(data);
                setLoading(false);
                setTimeout(() => setShowContent(true), 50);
            })
            .catch(() => {
                showToast({ message: 'Пользователь не найден', type: 'error' });
                navigate('/', { replace: true });
            });
    }, [username, navigate, showToast]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsScrolled(!entry.isIntersecting);
                });
            },
            { root: null, threshold: 0 }
        );

        if (trackerRef.current) {
            observer.observe(trackerRef.current);
        }

        return () => observer.disconnect();
    }, [loading]);

    const formatDateRange = (start: string, end: string) => {
        if (!start) return '';
        const startStr = new Date(start).toLocaleDateString('ru-RU');
        const endStr = end ? new Date(end).toLocaleDateString('ru-RU') : 'Настоящее время';
        return `${startStr} - ${endStr}`;
    };

    const getInitials = (first?: string, last?: string) => {
        const f = first?.trim() || '';
        const l = last?.trim() || '';
        if (!f && !l) return 'НП';
        return `${f.charAt(0).toUpperCase()}${l.charAt(0).toUpperCase()}`;
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = `${window.location.origin}/portfolio/${username}`;
        navigator.clipboard.writeText(url);
        showToast({ message: 'Ссылка скопирована', type: 'success' });
    };

    const handleCopyEmail = () => {
        if (profile?.email) {
            navigator.clipboard.writeText(profile.email);
            showToast({ message: 'Почта скопирована!', type: 'success' });
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Загрузка портфолио...</div>;
    }

    const fullName = `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Неизвестный Пользователь';

    return (
        <div className="bg-background text-on-surface font-body-md min-h-screen antialiased selection:bg-secondary-container selection:text-on-secondary-container">
            <div className="bg-mesh-gradient"></div>
            <div id="scroll-tracker" ref={trackerRef}></div>
            <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`} id="headerWrapper">
                <header className="dynamic-header">
                    <a
                        onClick={(e) => { e.preventDefault(); navigate('/'); }}
                        href="/"
                        className="text-[20px] md:text-headline-sm font-bold text-on-surface hover:text-primary transition-colors duration-180 cursor-pointer"
                    >
                        Профиль пользователя
                    </a>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#363636] transition-colors bg-transparent border-none cursor-pointer p-0"
                    >
                        <span className="material-symbols-outlined text-text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                    <div className="hidden md:flex items-center gap-4 md:gap-6">
                        <nav className="flex items-center gap-6">
                            <a href="#" className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors">Проекты</a>
                            <a href="#" onClick={handleShare} className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors">Поделиться</a>
                        </nav>
                        <button className="accent-gradient-btn text-white py-2 px-4 md:px-6 rounded-lg hover:opacity-90 font-semibold shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] text-[14px] md:text-[16px] border-none cursor-pointer transition-transform duration-180 active:scale-95">
                            Скачать резюме
                        </button>
                    </div>
                </header>
                {isMobileMenuOpen && (
                    <div className="fixed top-[76px] left-0 right-0 bg-surface-container border-b border-border-subtle md:hidden z-50 mobile-menu-enter">
                        <nav className="flex flex-col p-4 gap-4">
                            <a href="#" className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors py-2">Проекты</a>
                            <a href="#" onClick={handleShare} className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors py-2">Поделиться</a>
                            <button className="accent-gradient-btn text-white py-2 px-4 rounded-lg w-full text-left font-semibold text-[16px] border-none">
                                Скачать резюме
                            </button>
                        </nav>
                    </div>
                )}
            </div>
            {showContent && (
                <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-[124px] animate-fade-in-up stagger-1">
                            <div className="bg-surface-container rounded-3xl p-8 flex flex-col items-center border border-border-subtle shadow-lg relative overflow-hidden">
                                <div className="w-[200px] h-[200px] bg-[#D9D9D9] rounded-full mb-6 flex items-center justify-center overflow-hidden shadow-inner">
                                    {profile?.avatar ? (
                                        <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[72px] font-bold text-[#464646] tracking-wider select-none">
                                            {getInitials(profile?.firstName, profile?.lastName)}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-[28px] font-bold text-text-primary text-center mb-1 leading-tight">{fullName}</h1>
                                <p className="text-[18px] font-medium text-text-secondary mb-8">{profile?.role || 'Неизвестный'}</p>
                                <div className="w-full space-y-2">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#363636] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-text-secondary text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>domain</span>
                                        </div>
                                        <span className="text-[16px] font-semibold text-[#E9E9E9] pt-1">{profile?.company || 'Нет информации'}</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#363636] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-text-secondary text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>school</span>
                                        </div>
                                        <span className="text-[16px] font-semibold text-[#E9E9E9] pt-1">{profile?.education || 'Нет информации'}</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#363636] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-text-secondary text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                                        </div>
                                        <span className="text-[16px] font-semibold text-[#E9E9E9] pt-1 leading-snug">{profile?.location || 'Нет информации'}</span>
                                    </div>
                                    <div className="flex items-start gap-4 group cursor-pointer relative" onClick={handleCopyEmail}>
                                        <div className="w-8 h-8 rounded-lg bg-[#363636] flex items-center justify-center shrink-0 group-hover:bg-[#444] transition-colors">
                                            <span className="material-symbols-outlined text-text-secondary text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                                        </div>
                                        <span className="text-[16px] font-semibold text-[#E9E9E9] pt-1 break-all group-hover:text-secondary transition-colors">
                                            {profile?.email || 'Нет информации'}
                                        </span>
                                    </div>
                                </div>
                                {(profile?.github || profile?.telegram || profile?.vk) && (
                                    <div className="flex justify-center gap-4 mt-8 w-full pt-6 border-t border-border-subtle">
                                        {profile.github && (
                                            <a href={profile.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#363636] hover:bg-[#444] transition-colors flex items-center justify-center text-text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                                            </a>
                                        )}
                                        {profile.telegram && (
                                            <a href={profile.telegram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#363636] hover:bg-[#444] transition-colors flex items-center justify-center text-text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                                            </a>
                                        )}
                                        {profile.vk && (
                                            <a href={profile.vk} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#363636] hover:bg-[#444] transition-colors flex items-center justify-center text-text-primary">
                                                <svg fill="currentColor" className="w-[24px] h-[24px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.931-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.604 0-.976.001.001 2.672-3.761 2.95-5.04z"/></svg>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-8 flex flex-col gap-8 relative">
                            <section className="bg-surface-container rounded-3xl p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-2">
                                <h2 className="text-[28px] font-bold text-text-primary mb-4">Обо мне</h2>
                                <p className="text-[18px] text-[#BEBEBE] leading-relaxed font-medium whitespace-pre-wrap">
                                    {profile?.bio || 'Нет информации'}
                                </p>
                            </section>
                            <section className="bg-surface-container rounded-3xl p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-3">
                                <h2 className="text-[28px] font-bold text-text-primary mb-4">Опыт работы</h2>
                                <div className="relative pl-6 lg:pl-10">
                                    <div className="absolute left-[1px] lg:left-[13px] -translate-x-1/2 top-2 bottom-0 w-[2px] bg-[#363636] rounded-full"></div>
                                    {!profile?.experienceItems?.length ? (
                                        <p className="text-[#BEBEBE] text-[15px] pt-2">Нет добавленного опыта.</p>
                                    ) : (
                                        profile.experienceItems.map((item: any, idx: number) => (
                                            <div key={idx} className="relative mb-6">
                                                <div className={`absolute -left-[30px] lg:-left-[34px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-surface-container shadow-[0_0_0_4px_#363636] z-10 ${idx === 0 ? 'bg-[#E4E4E4]' : 'bg-[#595959]'}`}></div>
                                                <div className="bg-surface rounded-[20px] p-6 lg:p-4 border border-border-subtle">
                                                    <h3 className="text-[20px] font-bold text-text-primary break-words mb-2">{item.company}</h3>
                                                    <div className={`flex flex-wrap items-center gap-3 text-[15px] font-medium text-[#BEBEBE] ${item.desc ? 'mb-6' : ''}`}>
                                                        <span>{item.role}</span>
                                                        <span className="w-1 h-1 rounded-full bg-[#BEBEBE]"></span>
                                                        <span>{formatDateRange(item.start, item.end)}</span>
                                                    </div>
                                                    {item.desc && <p className="text-[15px] font-medium text-[#BEBEBE] leading-relaxed mb-10 whitespace-pre-wrap">{item.desc}</p>}
                                                    <div className="flex flex-wrap gap-3">
                                                        {item.techs?.map((t: string, i: number) => (
                                                            <span key={i} className="px-3 py-1.5 bg-[#222222] border border-[#9A9A9A] rounded-lg text-[#C7C7C7] text-[12px] font-medium">{t}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                            <section className="bg-surface-container rounded-3xl p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-4 relative group">
                                <h2 className="text-[28px] font-bold text-text-primary mb-4">Технологический стек</h2>
                                <div className="bg-[#242424] rounded-[20px] p-6 tech-slider-wrapper">
                                    {!profile?.techStack?.length ? (
                                        <p className="text-[#BEBEBE] text-[15px] pt-2">Нет выбранного стека.</p>
                                    ) : (
                                        <div className="tech-slider gap-8 items-center" style={{ width: 'max-content' }}>
                                            {[...profile.techStack, ...profile.techStack].map((tech: any, idx: number) => (
                                                <div key={idx} className="relative group/icon shrink-0" aria-hidden={idx >= profile.techStack.length}>
                                                    <img src={tech.src} alt={tech.alt} className="w-[60px] h-[60px] hover:scale-110 transition-transform select-none" />
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 bg-surface px-3 py-1 rounded-lg text-sm text-white border border-border-subtle shadow-2xl transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                                                        {tech.alt}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                            <section className="bg-surface-container rounded-3xl p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-5 relative group">
                                <h2 className="text-[28px] font-bold text-text-primary mb-4">События</h2>
                                <div className="relative pl-6 lg:pl-10">
                                    <div className="absolute left-[1px] lg:left-[13px] -translate-x-1/2 top-2 bottom-0 w-[2px] bg-[#363636] rounded-full"></div>
                                    {!profile?.eventItems?.length ? (
                                        <p className="text-[#BEBEBE] text-[15px] pt-2">Нет добавленных событий.</p>
                                    ) : (
                                        profile.eventItems.map((item: any, idx: number) => (
                                            <div key={idx} className="relative mb-6">
                                                <div className={`absolute -left-[30px] lg:-left-[34px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-surface-container shadow-[0_0_0_4px_#363636] z-10 ${idx === 0 ? 'bg-[#E4E4E4]' : 'bg-[#595959]'}`}></div>
                                                <div className="bg-surface rounded-[10px] p-6 lg:p-4 border border-border-subtle relative overflow-hidden flex flex-col">
                                                    <h3 className="text-[20px] font-bold text-text-primary mb-2 pr-24">{item.title}</h3>
                                                    <p className="text-[15px] font-medium text-[#BEBEBE] mb-6 whitespace-pre-wrap">{item.description}</p>
                                                    <div className="flex items-center justify-between mt-auto">
                                                        <span className="text-[15px] font-medium text-[#BEBEBE]">{formatDateRange(item.startDate, item.endDate)}</span>
                                                        {item.certificate && <a href={item.certificate} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-[#00B3FF] hover:underline relative z-20">Сертификат</a>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                            <section className="bg-surface-container rounded-3xl p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-5 relative group">
                                <h2 className="text-[28px] font-bold text-text-primary mb-4">Образование</h2>
                                <div className="relative pl-6 lg:pl-10">
                                    <div className="absolute left-[1px] lg:left-[13px] -translate-x-1/2 top-2 bottom-0 w-[2px] bg-[#363636] rounded-full"></div>
                                    {!profile?.educationItems?.length ? (
                                        <p className="text-[#BEBEBE] text-[15px] pt-2">Нет добавленного образования.</p>
                                    ) : (
                                        profile.educationItems.map((item: any, idx: number) => (
                                            <div key={idx} className="relative mb-6">
                                                <div className={`absolute -left-[30px] lg:-left-[34px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-surface-container shadow-[0_0_0_4px_#363636] z-10 ${idx === 0 ? 'bg-[#E4E4E4]' : 'bg-[#595959]'}`}></div>
                                                <div className="bg-surface rounded-[10px] p-6 lg:p-4 border border-border-subtle relative overflow-hidden flex flex-col">
                                                    <h3 className="text-[20px] font-bold text-text-primary mb-2 pr-24 break-words">{item.title}</h3>
                                                    <p className="text-[15px] font-medium text-[#BEBEBE] mb-6 whitespace-pre-wrap">{item.description}</p>
                                                    <div className="flex items-center justify-between mt-auto">
                                                        <span className="text-[15px] font-medium text-[#BEBEBE]">{formatDateRange(item.startDate, item.endDate)}</span>
                                                        {item.certificate && <a href={item.certificate} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-[#00B3FF] hover:underline relative z-20">Сертификат</a>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}