import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../components/portfolio/ProfileModal';
import ExperienceModal from '../components/portfolio/ExperienceModal';
import TimelineModal, { type TimelineTexts } from '../components/portfolio/TimelineModal';
import StackModal from '../components/portfolio/StackModal';
import { PEN_ICON } from '../constants/portfolio';
import {
    formatDateRange,
    getInitials,
    normalizeSocialUrl,
    safeUrl,
    type ProfileData,
    type TechItem,
    type TimelineItem,
    type ExperienceItem
} from '../utils/portfolio';

import { getAuthHeaders, fetchPortfolioData } from '../api/userApi';
import { API_BASE_URL } from '../api/authApi';
import { useToast} from "../components/ui/Toast.tsx";

type ModalId = 'profile' | 'exp' | 'stack' | 'events' | 'education' | 'logout';

const EVENT_TEXTS: TimelineTexts = {
    heading: 'События',
    titleLabel: 'Название события',
    titlePlaceholder: 'Введите название события',
    descLabel: 'Описание события',
    descPlaceholder: 'Опишите событие, вашу роль и результат',
    periodLabel: 'Период работы',
    deleteConfirm: 'Удалить это событие?',
};

const EDUCATION_TEXTS: TimelineTexts = {
    heading: 'Образование',
    titleLabel: 'Название образования',
    titlePlaceholder: 'Введите название курса / Учебного заведения...',
    descLabel: 'Описание образования',
    descPlaceholder: 'Опишите образование, где учились, чем занимались и т.д.',
    periodLabel: 'Период прохождения',
    deleteConfirm: 'Удалить это образование?',
};

const LINE = (
    <div className="absolute left-[1px] lg:left-[13px] -translate-x-1/2 top-2 bottom-0 w-[2px] bg-[#363636] rounded-full"></div>
);

function EditButton({ onClick }: { onClick: () => void }) {
    return (
        <button type="button" onClick={onClick} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#363636] rounded-md hover:bg-[#626262] transition-colors cursor-pointer z-10">
            <img src={PEN_ICON} className="w-5 h-5 opacity-80 hover:opacity-100 invert" alt="" />
        </button>
    );
}

function Marker({ index }: { index: number }) {
    return (
        <div className={`absolute -left-[30px] lg:-left-[34px] top-1.5 w-[14px] h-[14px] rounded-full border-[3px] border-surface-container shadow-[0_0_0_4px_#363636] z-10 ${index === 0 ? 'bg-[#E4E4E4]' : 'bg-[#595959]'}`}></div>
    );
}

function TimelineCards({ items, emptyText }: { items: TimelineItem[]; emptyText: string }) {
    return (
        <div className="relative pl-6 lg:pl-10">
            {LINE}
            {items.length === 0 ? (
                <p className="text-[#BEBEBE] text-[15px] pt-2">{emptyText}</p>
            ) : (
                items.map((item, index) => {
                    const cert = safeUrl(item.certificate);
                    return (
                        <div key={index} className="relative mb-6">
                            <Marker index={index} />
                            <div className="bg-surface rounded-[10px] p-6 lg:p-4 border border-border-subtle relative overflow-hidden flex flex-col">
                                <h3 className="text-[20px] font-bold text-text-primary mb-2 pr-24 break-words">{item.title}</h3>
                                <p className="text-[15px] font-medium text-[#BEBEBE] mb-6">{item.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-[15px] font-medium text-[#BEBEBE]">
                                        {formatDateRange(item.startDate, item.endDate)}
                                    </span>
                                    {cert && (
                                        <a href={cert} target="_blank" rel="noreferrer" className="text-[15px] font-semibold text-[#00B3FF] hover:underline relative z-20">Сертификат</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

function SocialLink({ type, url }: { type: 'github' | 'telegram' | 'vk'; url: string }) {
    const titles = { github: 'GitHub', telegram: 'Telegram', vk: 'VK' } as const;
    return (
        <a href={normalizeSocialUrl(type, url)} target="_blank" rel="noopener noreferrer" title={titles[type]} className="w-12 h-12 rounded-xl bg-[#363636] hover:bg-[#444] transition-colors flex items-center justify-center text-text-primary">
            {type === 'github' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>}
            {type === 'telegram' && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>}
            {type === 'vk' && <svg fill="currentColor" className="w-[24px] h-[24px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.931-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.604 0-.976.001.001 2.672-3.761 2.95-5.04z" /></svg>}
        </a>
    );
}

export default function MyPortfolio() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalId | null>(null);
    const { showToast } = useToast();
    const [profile, setProfile] = useState<ProfileData>({} as ProfileData);
    const [avatar, setAvatar] = useState('');
    const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>([]);
    const [eventItems, setEventItems] = useState<TimelineItem[]>([]);
    const [educationItems, setEducationItems] = useState<TimelineItem[]>([]);
    const [techStack, setTechStack] = useState<TechItem[]>([]);
    const trackerRef = useRef<HTMLDivElement>(null);
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const closeModal = () => setActiveModal(null);

    useEffect(() => {
        document.body.classList.add('overflow-y-scroll');
        return () => document.body.classList.remove('overflow-y-scroll');
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => setIsScrolled(!entry.isIntersecting)),
            { root: null, threshold: 0 }
        );
        if (trackerRef.current) observer.observe(trackerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (menuBtnRef.current?.contains(target) || menuRef.current?.contains(target)) return;
            setMenuOpen(false);
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);
    useEffect(() => {
        fetchPortfolioData('me')
            .then(data => {
                setProfile(data);
                const loadedAvatar = data.avatar === '/images/default-avatar.png' ? '' : (data.avatar || '');
                setAvatar(loadedAvatar);
                setExperienceItems(data.experienceItems || []);
                setEventItems(data.eventItems || []);
                setEducationItems(data.educationItems || []);
                setTechStack(data.techStack || []);
            })
            .catch(err => {
                if (err.message === 'UNAUTHORIZED' || err.message === 'Пользователь не найден') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate('/login', { replace: true });
                }
            });
    }, [navigate]);

    const performLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login', { replace: true });
    };

    const handleShare = (e?: React.MouseEvent) => {
        e?.preventDefault();
        if (!profile.login) {
            showToast({ message: 'Логин не загружен', type: 'error' });
            return;
        }
        const url = `${window.location.origin}/portfolio/${profile.login}`;
        navigator.clipboard.writeText(url);
        showToast({ message: 'Ссылка скопирована', type: 'success' });
    };

    const handleCopyEmail = () => {
        if (profile.email) {
            navigator.clipboard.writeText(profile.email);
            showToast({ message: 'Почта скопирована!', type: 'success' });
        }
    };
    const handleProfileSave = async (data: ProfileData, newAvatar: string) => {
        try {
            let finalAvatarUrl = avatar;
            if (newAvatar && newAvatar.startsWith('data:image')) {
                const res = await fetch(newAvatar);
                const blob = await res.blob();
                const formData = new FormData();
                formData.append('file', blob, 'avatar.jpg');

                const uploadRes = await fetch(`${API_BASE_URL}/files/upload`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    body: formData
                });
                const uploadData = await uploadRes.json();
                finalAvatarUrl = uploadData.url;
            }

            const payload = { ...data, avatar: finalAvatarUrl };
            const profileRes = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            if (profileRes.ok) {
                setProfile(payload);
                setAvatar(finalAvatarUrl);
                closeModal();
            }
        } catch (err) {
            alert('Ошибка при сохранении профиля');
        }
    };

    const syncCollection = async (endpoint: string, localItems: any[]) => {
        const currentData = await fetchPortfolioData('me');
        const originalItems = currentData[endpoint === 'work-experiences' ? 'experienceItems' : endpoint === 'events' ? 'eventItems' : 'educationItems'] || [];

        const localIds = localItems.filter(item => item.id).map(item => item.id);
        const toDelete = originalItems.filter((item: any) => !localIds.includes(item.id));

        for (const item of toDelete) {
            await fetch(`${API_BASE_URL}/${endpoint}/${item.id}`, { method: 'DELETE', headers: getAuthHeaders() });
        }

        const updatedItems = [];

        for (const item of localItems) {
            if (item.id) {
                const res = await fetch(`${API_BASE_URL}/${endpoint}/${item.id}`, {
                    method: 'PUT',
                    headers: getAuthHeaders(),
                    body: JSON.stringify(item)
                });
                updatedItems.push(await res.json());
            } else {
                const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify(item)
                });
                updatedItems.push(await res.json());
            }
        }
        return updatedItems;
    };

    const handleExperienceSave = async () => {
        try {
            const updated = await syncCollection('work-experiences', experienceItems);
            setExperienceItems(updated);
            closeModal();
        } catch (e) {
            alert('Ошибка сохранения опыта');
        }
    };

    const handleEventsSave = async () => {
        try {
            const updated = await syncCollection('events', eventItems);
            setEventItems(updated);
            closeModal();
        } catch (e) {
            alert('Ошибка сохранения событий');
        }
    };

    const handleEducationSave = async () => {
        try {
            const updated = await syncCollection('educations', educationItems);
            setEducationItems(updated);
            closeModal();
        } catch (e) {
            alert('Ошибка сохранения образования');
        }
    };

    const handleStackSave = async (items: TechItem[]) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/me/stack`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ techStack: items })
            });
            if (response.ok) {
                setTechStack(items);
                closeModal();
            }
        } catch (err) {
            alert('Ошибка при сохранении стека');
        }
    };

    const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Неизвестный Пользователь';
    const hasSocials = !!(profile.github || profile.telegram || profile.vk);

    const infoRow = (icon: string, text: string, extraClass = '') => (
        <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#363636] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-text-secondary text-[24px]">{icon}</span>
            </div>
            <span className={`text-[16px] font-semibold text-[#E9E9E9] pt-1 ${extraClass}`}>{text || 'Нет информации'}</span>
        </div>
    );

    return (
        <div className="bg-background text-on-surface font-body-md min-h-screen antialiased selection:bg-secondary-container selection:text-on-secondary-container">
            <div className="bg-mesh-gradient"></div>
            <div id="scroll-tracker" ref={trackerRef}></div>
            <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
                <header className="dynamic-header">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-[20px] md:text-headline-sm font-bold text-on-surface hover:text-primary transition-colors duration-180 cursor-pointer">
                        Ваше портфолио
                    </a>
                    <button ref={menuBtnRef} type="button" onClick={() => setMenuOpen((o) => !o)} className="md:hidden flex items-center justify-center w-10 h-10 rounded-[12px] hover:bg-[#363636] transition-colors">
                        <span className="material-symbols-outlined text-text-primary text-[24px]">{menuOpen ? 'close' : 'menu'}</span>
                    </button>
                    <div className="hidden md:flex items-center gap-4 md:gap-6">
                        <nav className="flex items-center gap-6">
                            <a href="#" className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors">Проекты</a>
                            <a href="#" onClick={handleShare} className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors">Поделиться</a>
                        </nav>
                        <button className="accent-gradient-btn text-white py-2 px-4 md:px-6 rounded-[12px] hover:opacity-90 font-semibold shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] text-[14px] md:text-[16px]">
                            Скачать резюме
                        </button>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('logout'); }} className="text-text-primary font-semibold text-[16px] hover:text-error transition-colors cursor-pointer">
                            Выход
                        </a>
                    </div>
                </header>
                {menuOpen && (
                    <div ref={menuRef} className="fixed top-[76px] left-0 right-0 bg-surface-container border-b border-border-subtle md:hidden z-50 mobile-menu-enter">
                        <nav className="flex flex-col p-4 gap-4">
                            <a href="#" onClick={() => setMenuOpen(false)} className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors py-2">Проекты</a>
                            <a href="#" onClick={(e) => { handleShare(e); setMenuOpen(false); }} className="text-text-primary font-semibold text-[16px] hover:text-secondary transition-colors py-2">Поделиться</a>
                            <button className="accent-gradient-btn text-white py-2 px-4 rounded-[12px] w-full text-left font-semibold text-[16px]">Скачать резюме</button>
                            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setActiveModal('logout'); }} className="text-text-primary font-semibold text-[16px] hover:text-error transition-colors py-2 cursor-pointer">
                                Выход
                            </a>
                        </nav>
                    </div>
                )}
            </div>
            <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4 lg:sticky lg:top-[124px] animate-fade-in-up stagger-1">
                        <div className="bg-surface-container rounded-[30px] p-8 flex flex-col items-center border border-border-subtle shadow-lg relative overflow-hidden">
                            <EditButton onClick={() => setActiveModal('profile')} />
                            <div className="w-[200px] h-[200px] bg-[#D9D9D9] rounded-full mb-6 flex items-center justify-center overflow-hidden shadow-inner">
                                {avatar ? (
                                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[72px] font-bold text-[#464646] tracking-wider select-none">
                                        {getInitials(profile.firstName, profile.lastName)}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-[28px] font-bold text-text-primary text-center mb-1 leading-tight">{fullName}</h1>
                            <p className="text-[18px] font-medium text-text-secondary mb-8">{profile.role || 'Неизвестный'}</p>

                            <div className="w-full space-y-2">
                                {infoRow('domain', profile.company)}
                                {infoRow('school', profile.education)}
                                {infoRow('location_on', profile.location, 'leading-snug')}
                                <div className="flex items-start gap-4 group cursor-pointer relative" onClick={handleCopyEmail}>
                                    <div className="w-8 h-8 rounded-lg bg-[#363636] flex items-center justify-center shrink-0 group-hover:bg-[#444] transition-colors">
                                        <span className="material-symbols-outlined text-text-secondary text-[24px]">mail</span>
                                    </div>
                                    <span className="text-[16px] font-semibold text-[#E9E9E9] pt-1 break-all group-hover:text-secondary transition-colors">
                                        {profile.email || 'Нет информации'}
                                    </span>
                                </div>
                            </div>

                            {hasSocials && (
                                <div className="flex justify-center gap-4 mt-8 w-full pt-6 border-t border-border-subtle">
                                    {profile.github && <SocialLink type="github" url={profile.github} />}
                                    {profile.telegram && <SocialLink type="telegram" url={profile.telegram} />}
                                    {profile.vk && <SocialLink type="vk" url={profile.vk} />}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <section className="bg-surface-container rounded-[30px] p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-2">
                            <h2 className="text-[28px] font-bold text-text-primary mb-4">Обо мне</h2>
                            <p className="text-[18px] text-[#BEBEBE] leading-relaxed font-medium whitespace-pre-wrap">
                                {profile.bio || 'Нет информации'}
                            </p>
                        </section>
                        <section className="bg-surface-container rounded-[30px] p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-3">
                            <EditButton onClick={() => setActiveModal('exp')} />
                            <h2 className="text-[28px] font-bold text-text-primary mb-4">Опыт работы</h2>
                            <div className="relative pl-6 lg:pl-10">
                                {LINE}
                                {experienceItems.length === 0 ? (
                                    <p className="text-[#BEBEBE] text-[15px] pt-2">Нет добавленного опыта.</p>
                                ) : (
                                    experienceItems.map((item, index) => (
                                        <div key={index} className="relative mb-6">
                                            <Marker index={index} />
                                            <div className="bg-surface rounded-[20px] p-6 lg:p-4 border border-border-subtle">
                                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                                                    <h3 className="text-[20px] font-bold text-text-primary break-words">{item.company}</h3>
                                                </div>
                                                <div className={`flex flex-wrap items-center gap-3 text-[15px] font-medium text-[#BEBEBE] ${item.desc ? 'mb-6' : ''}`}>
                                                    <span>{item.role}</span>
                                                    <span className="w-1 h-1 rounded-full bg-[#BEBEBE]"></span>
                                                    <span>{formatDateRange(item.start, item.end)}</span>
                                                </div>
                                                {item.desc && (
                                                    <p className="text-[15px] font-medium text-[#BEBEBE] leading-relaxed mb-10 whitespace-pre-line">{item.desc}</p>
                                                )}
                                                <div className="flex flex-wrap gap-3">
                                                    {item.techs.map((t) => (
                                                        <span key={t} className="px-3 py-1.5 bg-[#222222] border border-[#9A9A9A] rounded-[12px] text-[#C7C7C7] text-[12px] font-medium">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                        <section className="bg-surface-container rounded-[30px] p-8 lg:p-6 border border-border-subtle shadow-lg relative group">
                            <EditButton onClick={() => setActiveModal('stack')} />
                            <h2 className="text-[28px] font-bold text-text-primary mb-4">Технологический стек</h2>
                            <div className="bg-[#242424] rounded-[20px] p-6 tech-slider-wrapper">
                                {techStack.length === 0 ? (
                                    <p className="text-[#BEBEBE] text-[15px] pt-2">Нет выбранного стека.</p>
                                ) : (
                                    <div className="tech-slider gap-8 items-center">
                                        {[...techStack, ...techStack].map((tech, idx) => (
                                            <div key={idx} className="relative group/icon cursor-pointer shrink-0" aria-hidden={idx >= techStack.length}>
                                                <img src={tech.src} alt={tech.alt} className="w-[60px] h-[60px] hover:scale-110 transition-transform" />
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 bg-surface px-3 py-1 rounded-[12px] text-sm text-white border border-border-subtle shadow-2xl transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                                                    {tech.alt}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                        <section className="bg-surface-container rounded-[30px] p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-5 relative group">
                            <h2 className="text-[28px] font-bold text-text-primary mb-4">События</h2>
                            <EditButton onClick={() => setActiveModal('events')} />
                            <TimelineCards items={eventItems} emptyText="Нет добавленных событий." />
                        </section>
                        <section className="bg-surface-container rounded-[30px] p-8 lg:p-6 border border-border-subtle shadow-lg animate-fade-in-up stagger-5 relative group">
                            <h2 className="text-[28px] font-bold text-text-primary mb-4">Образование</h2>
                            <EditButton onClick={() => setActiveModal('education')} />
                            <TimelineCards items={educationItems} emptyText="Нет добавленного образования." />
                        </section>
                    </div>
                </div>
            </main>
            <ProfileModal open={activeModal === 'profile'} onClose={closeModal} profile={profile} avatar={avatar} onSave={handleProfileSave} />
            <ExperienceModal open={activeModal === 'exp'} onClose={closeModal} items={experienceItems} setItems={setExperienceItems} onSave={handleExperienceSave} />
            <StackModal open={activeModal === 'stack'} onClose={closeModal} savedStack={techStack} onSave={handleStackSave} />
            <TimelineModal open={activeModal === 'events'} onClose={closeModal} items={eventItems} setItems={setEventItems} onSave={handleEventsSave} texts={EVENT_TEXTS} />
            <TimelineModal open={activeModal === 'education'} onClose={closeModal} items={educationItems} setItems={setEducationItems} onSave={handleEducationSave} texts={EDUCATION_TEXTS} />
            {activeModal === 'logout' && (
                <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#2D2D2D] border border-[#A9A9A9]/40 w-full max-w-[400px] rounded-[24px] p-6 shadow-2xl animate-fade-in-up">
                        <h2 className="text-white text-[24px] font-bold mb-4 text-center">Выход из системы</h2>
                        <p className="text-[#BEBEBE] text-[16px] text-center mb-8">Вы действительно хотите выйти из своего портфолио?</p>
                        <div className="flex gap-4">
                            <button onClick={closeModal} className="flex-1 bg-[#171717] hover:bg-[#333333] transition-colors text-white py-3 rounded-full font-semibold cursor-pointer">Отмена</button>
                            <button onClick={performLogout} className="flex-1 bg-error hover:bg-error/80 transition-colors text-on-error py-3 rounded-full font-semibold cursor-pointer">Выйти</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
