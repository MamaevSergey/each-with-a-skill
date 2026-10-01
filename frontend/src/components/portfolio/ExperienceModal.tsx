import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import ModalShell from './ModalShell';
import CustomSelect from './CustomSelect';
import DateField from './DateField';
import { ERR_CLASS, EXP_ROLES, EXP_TECHNOLOGIES, GRADIENT_BTN_STYLE, PEN_ICON } from '../../constants/portfolio';
import { formatDateRange, type ExperienceItem } from '../../utils/portfolio';

interface Props {
    open: boolean;
    onClose: () => void;
    items: ExperienceItem[];
    setItems: Dispatch<SetStateAction<ExperienceItem[]>>;
    onSave: () => void;
}

interface Errors {
    company?: boolean;
    role?: boolean;
    desc?: boolean;
    start?: boolean;
    end?: boolean;
    techs?: boolean;
}

const ERR_SPAN = 'text-red-500 text-[12px] absolute -bottom-5 left-1';
const LABEL_CLASS = 'text-white text-[16px] md:text-[18px] font-semibold';

export default function ExperienceModal({ open, onClose, items, setItems, onSave }: Props) {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [desc, setDesc] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [techs, setTechs] = useState<string[]>([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [errors, setErrors] = useState<Errors>({});
    const [techOpen, setTechOpen] = useState(false);

    const companyRef = useRef<HTMLInputElement>(null);
    const techWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (techWrapRef.current && !techWrapRef.current.contains(e.target as Node)) setTechOpen(false);
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    const resetForm = () => {
        setCompany('');
        setRole('');
        setDesc('');
        setStart('');
        setEnd('');
        setTechs([]);
        setErrors({});
        setEditIndex(-1);
    };

    const handleSubmit = () => {
        const errs: Errors = {
            company: !company.trim(),
            role: !role,
            desc: !desc.trim(),
            start: !start,
            end: !!(end && start && end < start),
            techs: techs.length === 0,
        };
        setErrors(errs);
        if (errs.end) alert('Дата окончания не может быть раньше даты начала.');
        if (Object.values(errs).some(Boolean)) return;

        const item: ExperienceItem = { company: company.trim(), role, desc: desc.trim(), start, end, techs };
        setItems((prev) => (editIndex >= 0 ? prev.map((it, i) => (i === editIndex ? item : it)) : [...prev, item]));
        resetForm();
    };

    const handleEdit = (index: number) => {
        const item = items[index];
        if (!item) return;
        resetForm();
        setEditIndex(index);
        setCompany(item.company);
        setRole(item.role);
        setDesc(item.desc);
        setStart(item.start);
        setEnd(item.end);
        setTechs(item.techs);
        companyRef.current?.focus();
    };

    const handleDelete = (index: number) => {
        if (confirm('Удалить этот опыт работы?')) {
            setItems((prev) => prev.filter((_, i) => i !== index));
            resetForm();
        }
    };

    const toggleTech = (name: string) =>
        setTechs((prev) => (prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]));

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            className="max-w-[850px] rounded-[24px] md:rounded-[40px] p-6 md:p-10 flex flex-col gap-6"
        >
            <h2 className="text-white text-[24px] md:text-[32px] font-semibold text-center mb-4">Опыт работы</h2>
            <div className="bg-[#363636] border border-[#9A9A9A]/60 rounded-[20px] p-5 md:p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 relative">
                        <label className={LABEL_CLASS}>Название компании</label>
                        <input
                            ref={companyRef}
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className={`w-full bg-[#222222] border-none rounded-[10px] h-[44px] px-4 text-[#BEBEBE] text-[14px] md:text-[15px] placeholder-[#BEBEBE]/60 outline-none focus:ring-2 focus:ring-secondary transition-all ${errors.company ? ERR_CLASS : ''}`}
                            placeholder="Введите название компании"
                        />
                        <span className={`${ERR_SPAN} ${errors.company ? '' : 'hidden'}`}>Обязательное поле</span>
                    </div>

                    <div className="flex flex-col gap-2 order-2 relative">
                        <label className={LABEL_CLASS}>Роль в компании</label>
                        <CustomSelect
                            variant="exp"
                            options={EXP_ROLES}
                            value={role}
                            onChange={setRole}
                            placeholder="Выберите роль"
                            hasError={errors.role}
                            errorText="Выберите роль"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    <div className="flex flex-col gap-2 h-full relative">
                        <label className={LABEL_CLASS}>Описание компании</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className={`w-full h-full min-h-[120px] md:min-h-0 bg-[#222222] border-none rounded-[10px] p-4 text-[#BEBEBE] text-[14px] md:text-[15px] placeholder-[#BEBEBE]/60 outline-none focus:ring-2 focus:ring-secondary transition-all resize-none custom-scroll ${errors.desc ? ERR_CLASS : ''}`}
                            placeholder="Описание, что вы делали в компании, проекты в компании, над которыми работали и т.д."
                        />
                        <span className={`${ERR_SPAN} ${errors.desc ? '' : 'hidden'}`}>Обязательное поле</span>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 relative">
                            <label className={LABEL_CLASS}>Период работы</label>
                            <div className="flex gap-3">
                                <DateField value={start} onChange={setStart} placeholder="Дата начала" hasError={errors.start} />
                                <DateField value={end} onChange={setEnd} placeholder="Дата конца" hasError={errors.end} />
                            </div>
                            <span className={`${ERR_SPAN} ${errors.start ? '' : 'hidden'}`}>Укажите дату начала</span>
                        </div>
                        <div className="flex flex-col gap-2 relative" ref={techWrapRef}>
                            <label className={LABEL_CLASS}>Технологический стек</label>
                            <div
                                onClick={() => setTechOpen((o) => !o)}
                                className={`w-full bg-[#222222] border-none rounded-[10px] h-[44px] px-4 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-secondary transition-all ${errors.techs ? ERR_CLASS : ''}`}
                            >
                                <span className="text-[#BEBEBE] text-[14px] md:text-[15px] truncate select-none">Выберите технологии</span>
                                <span className="material-symbols-outlined text-[#BEBEBE] text-[20px]">expand_more</span>
                            </div>
                            <span className={`${ERR_SPAN} ${errors.techs ? '' : 'hidden'}`}>Выберите хотя бы одну технологию</span>

                            {techOpen && (
                                <div className="absolute top-[75px] left-0 w-full bg-[#222222] border border-[#363636] rounded-[10px] shadow-xl z-50 p-2 max-h-[190px] overflow-y-auto custom-scroll flex flex-col gap-1">
                                    {EXP_TECHNOLOGIES.map((name) => (
                                        <label
                                            key={name}
                                            className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors group"
                                        >
                                            <span className="text-[#BEBEBE] text-[14px] select-none">{name}</span>
                                            <div className="relative w-5 h-5 rounded-[4px] bg-[#363636] flex items-center justify-center border border-[#AEAEAE]/50 group-hover:border-[#AEAEAE]">
                                                <input
                                                    type="checkbox"
                                                    checked={techs.includes(name)}
                                                    onChange={() => toggleTech(name)}
                                                    className="absolute opacity-0 cursor-pointer peer"
                                                />
                                                <span className="material-symbols-outlined text-[16px] text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                                                    check
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-2">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-[#222222] text-white font-semibold text-[16px] md:text-[18px] h-[40px] px-8 rounded-full hover:bg-[#2a2a2a] transition-colors"
                    >
                        Сбросить
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-white font-semibold text-[16px] md:text-[18px] h-[40px] px-8 rounded-full hover:opacity-90 transition-opacity shadow-lg"
                        style={GRADIENT_BTN_STYLE}
                    >
                        {editIndex >= 0 ? 'Изменить' : 'Добавить'}
                    </button>
                </div>
            </div>
            <div className="w-full mt-2">
                <h3 className="text-white text-[22px] md:text-[28px] font-semibold mb-4">Созданные элементы</h3>
                <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto custom-scroll pr-2 md:pr-4">
                    {items.length === 0 ? (
                        <p className="text-[#BEBEBE] text-[15px] text-center pt-4">Здесь ничего нет</p>
                    ) : (
                        items.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#1A1A1A] rounded-[10px] p-5 md:p-6 relative border border-transparent hover:border-[#363636] transition-colors"
                            >
                                <div className="absolute top-5 right-5 flex flex-col gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(index)}
                                        className="w-[28px] h-[28px] bg-[#363636] rounded-[6px] flex items-center justify-center hover:bg-[#4a4a4a] transition-colors border border-[#AEAEAE]/30"
                                    >
                                        <img src={PEN_ICON} className="w-[14px] h-[14px] invert opacity-90" alt="" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                        className="w-[28px] h-[28px] bg-[#363636] rounded-[6px] flex items-center justify-center hover:bg-red-500/80 transition-colors border border-[#AEAEAE]/30"
                                    >
                                        <span className="material-symbols-outlined text-[17px] text-white">delete</span>
                                    </button>
                                </div>
                                <h4 className="text-white text-[18px] md:text-[20px] font-bold mb-1 pr-10">{item.company}</h4>
                                <p className="text-[#BEBEBE] text-[13px] md:text-[14px] font-medium mb-3">
                                    {item.role} <span className="mx-2 text-[#BEBEBE]/50">|</span> {formatDateRange(item.start, item.end)}
                                </p>
                                <p className="text-[#BEBEBE] text-[13px] md:text-[14px] leading-relaxed mb-6 pr-8 md:pr-12">{item.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.techs.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 bg-[#222222] border border-[#9A9A9A] rounded-[6px] text-[#C7C7C7] text-[10px] md:text-[11px] font-medium"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center w-full mt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full md:w-auto min-w-[140px] h-[46px] rounded-full text-white bg-[#171717] hover:bg-[#333333] transition-colors font-semibold text-[16px]"
                >
                    Назад
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    className="w-full md:w-auto min-w-[140px] h-[46px] rounded-full text-white hover:opacity-90 transition-opacity font-semibold text-[16px] shadow-lg"
                    style={GRADIENT_BTN_STYLE}
                >
                    Сохранить
                </button>
            </div>
        </ModalShell>
    );
}