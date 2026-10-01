import { useState, type Dispatch, type SetStateAction } from 'react';
import ModalShell from './ModalShell';
import DateField from './DateField';
import { ERR_CLASS, GRADIENT_BTN_STYLE, PEN_ICON } from '../../constants/portfolio';
import { formatDateRange, safeUrl, type TimelineItem } from '../../utils/portfolio';

export interface TimelineTexts {
    heading: string;
    titleLabel: string;
    titlePlaceholder: string;
    descLabel: string;
    descPlaceholder: string;
    periodLabel: string;
    deleteConfirm: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    items: TimelineItem[];
    setItems: Dispatch<SetStateAction<TimelineItem[]>>;
    onSave: () => void;
    texts: TimelineTexts;
}

interface Errors {
    title?: boolean;
    desc?: boolean;
    start?: boolean;
    end?: boolean;
}

const ERR_SPAN = 'text-red-500 text-[12px] absolute -bottom-5 left-1';
const LABEL_CLASS = 'text-white text-[16px] md:text-[18px] font-semibold';
const FIELD_CLASS =
    'w-full bg-[#222222] border border-transparent rounded-[10px] text-[#BEBEBE] text-[14px] md:text-[15px] outline-none focus:ring-2 focus:ring-secondary transition-all';

export default function TimelineModal({ open, onClose, items, setItems, onSave, texts }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [certificate, setCertificate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [errors, setErrors] = useState<Errors>({});

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCertificate('');
        setStart('');
        setEnd('');
        setErrors({});
        setEditIndex(-1);
    };

    const handleSubmit = () => {
        const errs: Errors = {
            title: !title.trim(),
            desc: !description.trim(),
            start: !start,
            end: !!(end && start && end < start),
        };
        setErrors(errs);
        if (errs.end) alert('Дата окончания не может быть раньше даты начала.');
        if (Object.values(errs).some(Boolean)) return;

        const item: TimelineItem = {
            title: title.trim(),
            description: description.trim(),
            startDate: start,
            endDate: end,
            certificate: certificate.trim(),
        };
        setItems((prev) => (editIndex >= 0 ? prev.map((it, i) => (i === editIndex ? item : it)) : [...prev, item]));
        resetForm();
    };

    const handleEdit = (index: number) => {
        const item = items[index];
        if (!item) return;
        resetForm();
        setEditIndex(index);
        setTitle(item.title);
        setDescription(item.description);
        setStart(item.startDate);
        setEnd(item.endDate);
        setCertificate(item.certificate);
    };

    const handleDelete = (index: number) => {
        if (confirm(texts.deleteConfirm)) {
            setItems((prev) => prev.filter((_, i) => i !== index));
            resetForm();
        }
    };

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            className="max-w-[850px] max-h-[calc(100vh-2rem)] overflow-y-auto custom-scroll rounded-[24px] md:rounded-[40px] p-6 md:p-10 flex flex-col gap-6"
        >
            <h2 className="text-white text-[24px] md:text-[32px] font-semibold text-center mb-4">{texts.heading}</h2>

            <div className="bg-[#363636] border border-[#9A9A9A]/60 rounded-[20px] p-5 md:p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 relative">
                            <label className={LABEL_CLASS}>{texts.titleLabel}</label>
                            <input
                                type="text"
                                maxLength={120}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`${FIELD_CLASS} h-[44px] px-4 ${errors.title ? ERR_CLASS : ''}`}
                                placeholder={texts.titlePlaceholder}
                            />
                            <span className={`${ERR_SPAN} ${errors.title ? '' : 'hidden'}`}>Обязательное поле</span>
                        </div>
                        <div className="flex flex-col gap-2 flex-1 relative">
                            <label className={LABEL_CLASS}>{texts.descLabel}</label>
                            <textarea
                                maxLength={1000}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`${FIELD_CLASS} flex-1 min-h-[120px] md:min-h-[144px] p-4 resize-none custom-scroll ${errors.desc ? ERR_CLASS : ''}`}
                                placeholder={texts.descPlaceholder}
                            />
                            <span className={`${ERR_SPAN} ${errors.desc ? '' : 'hidden'}`}>Обязательное поле</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 relative">
                            <label className={LABEL_CLASS}>Сертификат</label>
                            <input
                                type="url"
                                maxLength={500}
                                value={certificate}
                                onChange={(e) => setCertificate(e.target.value)}
                                className={`${FIELD_CLASS} h-[44px] px-4`}
                                placeholder="Вставьте ссылку (необязательно)"
                            />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label className={LABEL_CLASS}>{texts.periodLabel}</label>
                            <div className="flex gap-3">
                                <DateField value={start} onChange={setStart} placeholder="Дата начала" hasError={errors.start} />
                                <DateField value={end} onChange={setEnd} placeholder="Дата конца" hasError={errors.end} />
                            </div>
                            <span className={`${ERR_SPAN} ${errors.start ? '' : 'hidden'}`}>Укажите дату начала</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-auto">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full sm:w-auto min-w-[120px] h-[40px] px-6 rounded-full text-white bg-[#171717] hover:bg-[#333333] transition-colors font-semibold"
                            >
                                Сбросить
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full sm:w-auto min-w-[120px] h-[40px] px-6 rounded-full text-white hover:opacity-90 transition-opacity font-semibold shadow-lg"
                                style={GRADIENT_BTN_STYLE}
                            >
                                {editIndex >= 0 ? 'Изменить' : 'Добавить'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-2">
                <h3 className="text-white text-[22px] md:text-[28px] font-semibold mb-4">Созданные элементы</h3>
                <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto custom-scroll pr-2 md:pr-4">
                    {items.length === 0 ? (
                        <p className="text-[#BEBEBE] text-[15px] text-center pt-4">Здесь ничего нет</p>
                    ) : (
                        items.map((item, index) => {
                            const cert = safeUrl(item.certificate);
                            return (
                                <article
                                    key={index}
                                    className="bg-[#1A1A1A] rounded-[10px] p-5 md:p-6 relative border border-transparent hover:border-[#363636] transition-colors mb-4"
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
                                            <span className="material-symbols-outlined text-[17px]">delete</span>
                                        </button>
                                    </div>
                                    <h4 className="text-white text-[18px] md:text-[20px] font-bold mb-1 pr-12">{item.title}</h4>
                                    <p className="text-[#BEBEBE] text-[13px] md:text-[14px] font-medium mb-3">
                                        {formatDateRange(item.startDate, item.endDate)}
                                    </p>
                                    <p className="text-[#BEBEBE] text-[13px] md:text-[14px] leading-relaxed mb-4 pr-8">{item.description}</p>
                                    {cert && (
                                        <a
                                            className="text-[13px] font-semibold text-[#00B3FF] hover:underline"
                                            href={cert}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Сертификат
                                        </a>
                                    )}
                                </article>
                            );
                        })
                    )}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full mt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto min-w-[140px] h-[46px] rounded-full text-white bg-[#171717] hover:bg-[#333333] transition-colors font-semibold text-[16px]"
                >
                    Назад
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    className="w-full sm:w-auto min-w-[140px] h-[46px] rounded-full text-white hover:opacity-90 transition-opacity font-semibold text-[16px] shadow-lg"
                    style={GRADIENT_BTN_STYLE}
                >
                    Сохранить
                </button>
            </div>
        </ModalShell>
    );
}