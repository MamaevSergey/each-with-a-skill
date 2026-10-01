export interface ProfileData {
    login?: string;
    firstName: string;
    lastName: string;
    role: string;
    company: string;
    education: string;
    location: string;
    email: string;
    github: string;
    telegram: string;
    vk: string;
    bio: string;
}

export interface ExperienceItem {
    id?: number;
    company: string;
    role: string;
    desc: string;
    start: string;
    end: string;
    techs: string[];
}

export interface TimelineItem {
    id?: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    certificate: string;
}

export interface TechItem {
    id: string;
    src: string;
    alt: string;
}

const PROFILE_KEYS: Record<keyof ProfileData, string> = {
    login: 'user_login',
    firstName: 'user_first_name',
    lastName: 'user_last_name',
    role: 'user_role',
    company: 'user_company',
    education: 'user_education',
    location: 'user_location',
    email: 'user_email',
    github: 'user_github',
    telegram: 'user_telegram',
    vk: 'user_vk',
    bio: 'user_bio',
};

const read = <T,>(key: string, fallback: T): T => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
};

const write = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
        alert('Не удалось сохранить данные: превышен лимит хранилища браузера.');
    }
};

export const loadProfile = (): ProfileData => {
    const result = {} as ProfileData;
    (Object.keys(PROFILE_KEYS) as (keyof ProfileData)[]).forEach((k) => {
        result[k] = localStorage.getItem(PROFILE_KEYS[k]) || '';
    });
    return result;
};

export const saveProfile = (data: ProfileData) => {
    (Object.keys(PROFILE_KEYS) as (keyof ProfileData)[]).forEach((k) => write(PROFILE_KEYS[k], data[k] ?? ''));
};

export const loadAvatar = () => localStorage.getItem('userAvatar') || '';
export const saveAvatar = (avatar: string) => {
    if (avatar) write('userAvatar', avatar);
};

export const loadExperience = () => read<ExperienceItem[]>('userExperience', []);
export const saveExperience = (items: ExperienceItem[]) => write('userExperience', JSON.stringify(items));

export const loadEvents = () => read<TimelineItem[]>('userEvents', []);
export const saveEvents = (items: TimelineItem[]) => write('userEvents', JSON.stringify(items));

export const loadEducation = () => read<TimelineItem[]>('userEducation', []);
export const saveEducation = (items: TimelineItem[]) => write('userEducation', JSON.stringify(items));
export const loadTechStack = () => read<TechItem[]>('userTechStack', []);
export const saveTechStack = (items: TechItem[]) => write('userTechStack', JSON.stringify(items));

export const formatDateRange = (start: string, end: string) => {
    if (!start) return '';
    const startStr = new Date(start).toLocaleDateString('ru-RU');
    const endStr = end ? new Date(end).toLocaleDateString('ru-RU') : 'Настоящее время';
    return `${startStr} - ${endStr}`;
};

export const getInitials = (first?: string, last?: string) => {
    const f = first?.trim() || '';
    const l = last?.trim() || '';
    if (!f && !l) return 'НП';
    return `${f.charAt(0).toUpperCase()}${l.charAt(0).toUpperCase()}`;
};

export const safeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : undefined);

export const normalizeSocialUrl = (type: 'github' | 'telegram' | 'vk', url: string) => {
    if (type === 'telegram' && url.startsWith('@')) return `https://t.me/${url.slice(1)}`;
    return url;
};