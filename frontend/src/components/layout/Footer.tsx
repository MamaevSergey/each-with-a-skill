export default function Footer() {
    return (
        <footer className="w-full px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto bg-surface-container-lowest border-t border-outline-variant mt-auto text-center md:text-left gap-4 md:gap-0">
            <div className="text-label-md font-label-md font-bold text-on-surface mb-4 md:mb-0">
                © 2026 EWAS Portfolio. Все права защищены.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors duration-180" href="#">
                    Информация о нас
                </a>
                <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors duration-180" href="#">
                    Контакты
                </a>
                <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors duration-180" href="#">
                    Политика конфиденциальности
                </a>
            </div>
        </footer>
    );
}