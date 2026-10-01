import { useState, useEffect, type ChangeEvent } from 'react'; // Добавили useEffect
import ModalShell from './ModalShell';
import CustomSelect from './CustomSelect';
import { ERR_CLASS, GRADIENT_BTN_STYLE, PROFILE_ROLES } from '../../constants/portfolio';
import type { ProfileData } from '../../utils/portfolio';

interface Props {
    open: boolean;
    onClose: () => void;
    profile: ProfileData;
    avatar: string;
    onSave: (profile: ProfileData, avatar: string) => void;
}

type Errors = Partial<Record<keyof ProfileData, boolean>>;

const INPUT_CLASS = 'w-full bg-[#171717] border border-transparent rounded-[12px] h-[44px] px-4 text-white text-[14px] md:text-[15px] placeholder-[#696969] outline-none focus:ring-2 focus:ring-secondary transition-all';
const LINK_INPUT_CLASS = 'w-full bg-[#171717] border border-transparent rounded-[12px] h-full pl-[56px] pr-4 text-white text-[14px] md:text-[15px] placeholder-[#696969] outline-none focus:ring-2 focus:ring-secondary transition-all';
const LABEL_CLASS = 'text-white text-[16px] md:text-[18px] font-semibold';
const H3_CLASS = 'text-white text-[20px] md:text-[24px] font-semibold mb-4';
const ERR_SPAN = 'text-red-500 text-[12px] absolute -bottom-5 left-1';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^(https?:\/\/[^\s]+|@[^\s]+)$/i;

export default function ProfileModal({ open, onClose, profile, avatar, onSave }: Props) {
    const [draft, setDraft] = useState<ProfileData>({} as ProfileData);
    const [avatarDraft, setAvatarDraft] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        if (open) {
            setDraft({
                firstName: profile?.firstName || '',
                lastName: profile?.lastName || '',
                role: profile?.role || 'Backend Developer',
                company: profile?.company || '',
                location: profile?.location || '',
                education: profile?.education || '',
                email: profile?.email || '',
                github: profile?.github || '',
                vk: profile?.vk || '',
                telegram: profile?.telegram || '',
                bio: profile?.bio || '',
            } as ProfileData);
            setAvatarDraft(avatar || '');
            setAvatarError('');
            setErrors({});
        }
    }, [open, profile, avatar]);

    const set = (key: keyof ProfileData) => (value: string) => setDraft((d) => ({ ...d, [key]: value }));

    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarError('');

        if (file.size > 5 * 1024 * 1024) {
            setAvatarError('Размер файла не должен превышать 5MB');
            e.target.value = '';
            return;
        }
        if (!file.type.startsWith('image/')) {
            setAvatarError('Пожалуйста, загрузите изображение');
            e.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setAvatarDraft(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        const next: Errors = {};
        const required: (keyof ProfileData)[] = ['firstName', 'lastName', 'company', 'location', 'education', 'bio'];

        required.forEach((k) => {
            const val = draft[k] || '';
            if (!val.trim()) next[k] = true;
        });

        const emailVal = draft.email || '';
        if (!EMAIL_RE.test(emailVal.trim())) next.email = true;

        (['github', 'vk', 'telegram'] as const).forEach((k) => {
            const v = draft[k] || '';
            if (v.trim() && !URL_RE.test(v.trim())) next[k] = true;
        });

        setErrors(next);
        if (Object.keys(next).length) return;

        const trimmed = Object.fromEntries(
            (Object.keys(draft) as (keyof ProfileData)[]).map((k) => [k, (draft[k] || '').trim()])
        ) as unknown as ProfileData;

        onSave(trimmed, avatarDraft);
    };

    const textField = (key: keyof ProfileData, label: string, placeholder: string, extra = '') => (
        <div className={`flex flex-col gap-2 relative ${extra}`}>
            <label className={LABEL_CLASS}>{label}</label>
            <input
                type="text"
                value={draft[key]}
                onChange={(e) => set(key)(e.target.value)}
                className={`${INPUT_CLASS} ${errors[key] ? ERR_CLASS : ''}`}
                placeholder={placeholder}
            />
            <span className={`${ERR_SPAN} ${errors[key] ? '' : 'hidden'}`}>Обязательное поле</span>
        </div>
    );

    const linkField = (key: keyof ProfileData, label: string, icon: string, placeholder: string, errorText: string) => (
        <div className="flex flex-col gap-2 relative">
            <label className={LABEL_CLASS}>{label}</label>
            <div className="relative h-[44px]">
                <div className="absolute left-0 top-0 h-full w-[44px] bg-[#171717] rounded-l-[12px] flex items-center justify-center border-r border-[#2e2e2e]">
                    <span className="material-symbols-outlined text-white text-[20px]">{icon}</span>
                </div>
                <input
                    type="text"
                    value={draft[key]}
                    onChange={(e) => set(key)(e.target.value)}
                    className={`${LINK_INPUT_CLASS} ${errors[key] ? ERR_CLASS : ''}`}
                    placeholder={placeholder}
                />
            </div>
            <span className={`${ERR_SPAN} ${errors[key] ? '' : 'hidden'}`}>{errorText}</span>
        </div>
    );

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            className="max-w-[700px] rounded-[24px] md:rounded-[36px] p-6 md:p-8 flex-col gap-6 md:gap-8"
        >
            <div className="flex flex-col gap-2 mb-6 relative">
                <label htmlFor="profileAvatar" className="text-white text-[20px] md:text-[24px] font-semibold mb-2 text-center">
                    Аватар профиля
                </label>
                <div className="relative w-[120px] h-[120px] mx-auto">
                    <input id="profileAvatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                    <label
                        htmlFor="profileAvatar"
                        className="w-full h-full bg-[#222222] border-2 border-dashed border-[#BEBEBE]/40 rounded-full flex items-center justify-center cursor-pointer hover:border-secondary transition-colors overflow-hidden"
                    >
                        {avatarDraft ? (
                            <img src={avatarDraft} className="w-full h-full object-cover" alt="Превью аватарки" />
                        ) : (
                            <div className="text-center flex flex-col items-center justify-center">
                                <span className="material-symbols-outlined text-[#BEBEBE] text-[32px] block mb-1">image</span>
                                <span className="text-[#BEBEBE] text-[12px]">Загрузить</span>
                            </div>
                        )}
                    </label>
                </div>
                <span className={`text-red-500 text-[12px] absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap ${avatarError ? '' : 'hidden'}`}>
                    {avatarError}
                </span>
            </div>
            <div className="w-full mb-6">
                <h3 className={H3_CLASS}>Личная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {textField('firstName', 'Имя', 'Укажите ваше имя')}
                    <div className="flex flex-col gap-2 relative">
                        <label className={LABEL_CLASS}>Ваша роль</label>
                        <CustomSelect variant="profile" options={PROFILE_ROLES} value={draft.role} onChange={set('role')} />
                    </div>
                    {textField('lastName', 'Фамилия', 'Укажите вашу фамилию', 'md:col-span-1')}
                </div>
            </div>
            <div className="w-full mb-6">
                <h3 className={H3_CLASS}>Дополнительная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {textField('company', 'Место работы', 'Укажите компанию')}
                    {textField('location', 'Место жительства', 'Укажите город')}
                    {textField('education', 'Образование', 'Учебное заведение', 'md:col-span-1')}
                </div>
            </div>
            <div className="w-full mb-6">
                <h3 className={H3_CLASS}>Контактная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {linkField('github', 'GitHub', 'code', 'https://github.com/...', 'Укажите корректную ссылку')}
                    {linkField('vk', 'Вконтакте', 'group', 'https://vk.com/...', 'Укажите корректную ссылку')}
                    {linkField('telegram', 'Telegram', 'send', 'https://t.me/... или @Nick', 'Укажите корректную ссылку')}
                    {linkField('email', 'Почта', 'mail', 'YourEmail@...', 'Укажите корректную почту')}
                </div>
            </div>
            <div className="w-full mb-6 relative">
                <h3 className={H3_CLASS}>Информация о вас</h3>
                <textarea
                    value={draft.bio}
                    onChange={(e) => set('bio')(e.target.value)}
                    className={`w-full bg-[#171717] border border-transparent rounded-[15px] h-[150px] p-4 text-white text-[14px] md:text-[15px] placeholder-[#696969] outline-none focus:ring-2 focus:ring-secondary transition-all resize-none custom-scroll ${errors.bio ? ERR_CLASS : ''}`}
                    placeholder="Начните вводить текст..."
                />
                <span className={`${ERR_SPAN} ${errors.bio ? '' : 'hidden'}`}>Обязательное поле</span>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center w-full mt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full md:w-auto min-w-[140px] h-[46px] rounded-full text-white bg-[#171717] hover:bg-[#333333] transition-colors font-semibold text-[16px]"
                >
                    Отмена
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="w-full md:w-auto min-w-[140px] h-[46px] rounded-full text-white hover:opacity-90 transition-opacity font-semibold text-[16px]"
                    style={GRADIENT_BTN_STYLE}
                >
                    Сохранить
                </button>
            </div>
        </ModalShell>
    );
}