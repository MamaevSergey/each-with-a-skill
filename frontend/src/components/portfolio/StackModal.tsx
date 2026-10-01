import { useCallback, useEffect, useState } from 'react';
import ModalShell from './ModalShell';
import { GRADIENT_BTN_STYLE, STACK_ICON_IDS, stackIconSrc } from '../../constants/portfolio';
import type { TechItem } from '../../utils/portfolio';

interface Props {
    open: boolean;
    onClose: () => void;
    savedStack: TechItem[];
    onSave: (items: TechItem[]) => void;
}

type ZoneId = 'selected' | 'all';
interface Zones {
    selected: string[];
    all: string[];
}

const buildZones = (saved: TechItem[]): Zones => {
    const selected = saved.map((t) => t.id).filter((id) => STACK_ICON_IDS.includes(id));
    return { selected, all: STACK_ICON_IDS.filter((id) => !selected.includes(id)) };
};

export default function StackModal({ open, onClose, savedStack, onSave }: Props) {
    const [zones, setZones] = useState<Zones>(() => buildZones(savedStack));
    const [overZone, setOverZone] = useState<ZoneId | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (open) {
            setZones(buildZones(savedStack));
            setError(false);
        }
    }, [open]);

    const moveTo = useCallback((id: string, zone: ZoneId) => {
        setZones((prev) => {
            const from: ZoneId = prev.selected.includes(id) ? 'selected' : 'all';
            if (from === zone) return prev;
            return {
                selected: zone === 'selected' ? [...prev.selected, id] : prev.selected.filter((x) => x !== id),
                all: zone === 'all' ? [...prev.all, id] : prev.all.filter((x) => x !== id),
            };
        });
    }, []);

    const toggle = (id: string) =>
        setZones((prev) => {
            const to: ZoneId = prev.selected.includes(id) ? 'all' : 'selected';
            return {
                selected: to === 'selected' ? [...prev.selected, id] : prev.selected.filter((x) => x !== id),
                all: to === 'all' ? [...prev.all, id] : prev.all.filter((x) => x !== id),
            };
        });

    useEffect(() => {
        if (!open) return;

        let item: HTMLElement | null = null;
        let clone: HTMLElement | null = null;
        let startX = 0;
        let startY = 0;

        const zoneAt = (x: number, y: number): ZoneId | null => {
            const el = document.elementFromPoint(x, y) as HTMLElement | null;
            const zone = el?.closest<HTMLElement>('[data-zone]')?.dataset.zone;
            return zone === 'selected' || zone === 'all' ? zone : null;
        };

        const cleanup = () => {
            clone?.remove();
            clone = null;
            item?.classList.remove('opacity-30');
            setOverZone(null);
        };

        const onStart = (e: TouchEvent) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>('.tech-item');
            if (!el) return;
            item = el;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const onMove = (e: TouchEvent) => {
            if (!item) return;
            const t = e.touches[0];
            if (Math.hypot(t.clientX - startX, t.clientY - startY) <= 7) return;

            if (e.cancelable) e.preventDefault();

            if (!clone) {
                clone = item.cloneNode(true) as HTMLElement;
                clone.classList.add('opacity-80', 'pointer-events-none', 'fixed', 'z-[99999]');
                clone.style.width = `${item.offsetWidth}px`;
                clone.style.height = `${item.offsetHeight}px`;
                document.body.appendChild(clone);
                item.classList.add('opacity-30');
            }
            clone.style.left = `${t.clientX - item.offsetWidth / 2}px`;
            clone.style.top = `${t.clientY - item.offsetHeight / 2}px`;
            setOverZone(zoneAt(t.clientX, t.clientY));
        };

        const onEnd = (e: TouchEvent) => {
            if (clone && item) {
                const t = e.changedTouches[0];
                const zone = zoneAt(t.clientX, t.clientY);
                const id = item.dataset.techId;
                cleanup();
                if (zone && id) moveTo(id, zone);
            }
            item = null;
        };

        const onCancel = () => {
            cleanup();
            item = null;
        };

        document.addEventListener('touchstart', onStart, { passive: false });
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
        document.addEventListener('touchcancel', onCancel);
        return () => {
            document.removeEventListener('touchstart', onStart);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
            document.removeEventListener('touchcancel', onCancel);
            cleanup();
        };
    }, [open, moveTo]);

    const handleSave = () => {
        if (zones.selected.length <= 3) {
            setError(true);
            return;
        }
        setError(false);
        onSave(zones.selected.map((id) => ({ id, src: stackIconSrc(id), alt: id })));
    };

    const renderItem = (id: string) => (
        <div
            key={id}
            data-tech-id={id}
            draggable
            onDragStart={(e) => {
                setDraggingId(id);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', id);
            }}
            onDragEnd={() => {
                setDraggingId(null);
                setOverZone(null);
            }}
            onClick={() => toggle(id)}
            className={`tech-item cursor-grab active:cursor-grabbing shrink-0 select-none group/item relative ${draggingId === id ? 'dragging' : ''}`}
        >
            <img
                src={stackIconSrc(id)}
                alt={id}
                draggable={false}
                className="w-12 h-12 md:w-14 md:h-14 pointer-events-none hover:scale-105 transition-transform"
            />
        </div>
    );

    const zoneHandlers = (zone: ZoneId) => ({
        onDragOver: (e: React.DragEvent) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            setOverZone(zone);
        },
        onDragLeave: (e: React.DragEvent) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOverZone((z) => (z === zone ? null : z));
        },
        onDrop: (e: React.DragEvent) => {
            e.preventDefault();
            setOverZone(null);
            const id = e.dataTransfer.getData('text/plain');
            if (id) moveTo(id, zone);
        },
    });

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            className="max-w-[650px] rounded-[24px] md:rounded-[36px] p-6 md:p-8 flex flex-col gap-6"
        >
            <div className="text-center">
                <h2 className="text-white text-[22px] md:text-[26px] font-bold">Технологический стек</h2>
                <p className="text-[#BEBEBE] text-[13px] md:text-[14px] mt-1 font-normal">
                    Перетащите нужные технологии в блок ниже
                </p>
            </div>
            <div
                data-zone="selected"
                {...zoneHandlers('selected')}
                className={`tech-dropzone bg-[#1E1E1E] border border-transparent rounded-[18px] p-4 md:p-6 min-h-[140px] md:min-h-[160px] flex flex-wrap items-center justify-start content-start gap-4 transition-all relative ${overZone === 'selected' ? 'dragover' : ''} ${error ? '!border-red-500' : ''}`}
            >
                {zones.selected.length === 0 && (
                    <p className="text-[#BEBEBE]/60 text-[14px] w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        Нет выбранного стека
                    </p>
                )}
                {zones.selected.map(renderItem)}
            </div>
            <span className={`text-red-500 text-[13px] -mt-4 text-center w-full ${error ? '' : 'hidden'}`}>
                Выберите более 3-х технологий
            </span>

            <h3 className="text-white text-[16px] md:text-[18px] font-semibold text-center -mb-2">Общий список технологий</h3>
            <div
                data-zone="all"
                {...zoneHandlers('all')}
                className={`tech-dropzone bg-[#1E1E1E] border border-transparent rounded-[18px] p-4 md:p-6 min-h-[140px] md:min-h-[160px] flex flex-wrap items-center content-start gap-4 max-h-[220px] overflow-y-auto custom-scroll transition-all ${overZone === 'all' ? 'dragover' : ''}`}
            >
                {zones.all.map(renderItem)}
            </div>

            <div className="flex flex-row gap-4 justify-center items-center w-full mt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="min-w-[120px] md:min-w-[140px] h-[44px] rounded-full text-white bg-[#171717] hover:bg-[#333333] transition-colors font-semibold text-[15px] md:text-[16px]"
                >
                    Отмена
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="min-w-[120px] md:min-w-[140px] h-[44px] rounded-full text-white hover:opacity-90 transition-opacity font-semibold text-[15px] md:text-[16px] shadow-lg"
                    style={GRADIENT_BTN_STYLE}
                >
                    Сохранить
                </button>
            </div>
        </ModalShell>
    );
}