import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { useToast} from "../components/ui/Toast.tsx";

export default function Register() {
    const navigate = useNavigate();

    const [step1Class, setStep1Class] = useState('step-active');
    const [step2Class, setStep2Class] = useState('step-hidden');
    const [currentStep, setCurrentStep] = useState(1);
    const { showToast } = useToast();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const isUsernameInvalid = usernameTouched && username.length > 0 && username.length < 4;
    const isUsernameValid = usernameTouched && username.length >= 4;
    const isPasswordInvalid = passwordTouched && password.length > 0 && password.length < 8;
    const isPasswordValid = passwordTouched && password.length >= 8;

    const handleGoToStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameTouched(true);
        setPasswordTouched(true);

        if (username.length < 4 || password.length < 8) {
            return;
        }

        setStep1Class('step-exit');
        setTimeout(() => {
            setStep2Class('step-active');
            setCurrentStep(2);
        }, 50);
    };

    const handleGoToStep1 = () => {
        setStep2Class('step-hidden');
        setTimeout(() => {
            setStep1Class('step-active');
            setCurrentStep(1);
        }, 50);
    };

    const handleCompleteRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await registerUser({ username, password, firstName, lastName, email });
            setIsSuccess(true);
            showToast({ message: 'Регистрация успешна! Пожалуйста, войдите в систему.', type: 'success' });

            setTimeout(() => {
                navigate('/login');
            }, 500);
        } catch (err: any) {
            showToast({ message: err.message || 'Ошибка регистрации', type: 'error' });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col antialiased overflow-x-hidden overflow-y-scroll selection:bg-secondary-container selection:text-on-secondary-container">
            <header className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-[76px] max-w-container-max mx-auto bg-background/80 backdrop-blur-xl border-b border-transparent md:border-none">
                <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); navigate('/'); }}
                    className="text-headline-sm font-headline-sm font-bold text-on-surface hover:text-primary transition-colors duration-180 ease-custom-ease cursor-pointer"
                >
                    EWAS - Portfolio
                </a>
                <div className="flex items-center gap-4">
                    <span className="text-text-secondary hidden md:inline-block">У вас уже есть аккаунт?</span>
                    <a
                        href="/login"
                        onClick={(e) => { e.preventDefault(); navigate('/login'); }}
                        className="text-primary hover:text-text-primary font-semibold transition-colors duration-180 ease-custom-ease flex items-center gap-2 font-label-md"
                    >
                        Вход
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>login</span>
                    </a>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-margin-mobile md:px-margin-desktop relative">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-tertiary-container/20 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
                </div>
                <div className="w-full max-w-md relative z-10 bg-surface border border-border-subtle rounded-xl shadow-ambient p-8 md:p-10 overflow-hidden animate-reveal">
                    <div className="flex items-center gap-2 mb-8">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-360 bg-primary`}></div>
                        <div className="flex-grow h-[1px] bg-border-subtle"></div>
                        <div className={`w-2 h-2 rounded-full transition-colors duration-360 ${currentStep === 2 ? 'bg-primary' : 'bg-border-subtle'}`}></div>
                    </div>

                    <div className="relative min-h-[350px]">
                        <div className={`step-container flex flex-col h-full ${step1Class}`}>
                            <div className="mb-8">
                                <h1 className="font-headline-md text-headline-md text-text-primary mb-2">Создайте ваш аккаунт</h1>
                                <p className="text-text-secondary">Создайте свое профессиональное портфолио и делитесь им с другими</p>
                            </div>

                            <form className="flex-grow flex flex-col gap-6" onSubmit={handleGoToStep2}>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-text-primary px-1" htmlFor="username">Логин</label>
                                    <div className={`glow-focus flex items-center input-dark rounded-lg px-4 py-3 group transition-transform duration-180 ease-out focus-within:scale-[1.01] ${isUsernameInvalid ? 'input-error' : ''} ${isUsernameValid ? 'input-success' : ''}`}>
                                        <span className="material-symbols-outlined text-text-secondary mr-3 text-[20px] group-focus-within:hidden select-none" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                                        <input
                                            id="username"
                                            type="text"
                                            placeholder="Введите логин"
                                            className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-text-primary font-body-md placeholder:text-outline/40 p-0"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            onBlur={() => setUsernameTouched(true)}
                                        />
                                    </div>
                                    {isUsernameInvalid && <p className="text-error font-label-sm text-label-sm mt-1 px-1">Минимум 4 символа</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="font-label-md text-label-md text-text-primary" htmlFor="password">Пароль</label>
                                    </div>
                                    <div className={`glow-focus flex items-center input-dark rounded-lg px-4 py-3 group transition-transform duration-180 ease-out focus-within:scale-[1.01] ${isPasswordInvalid ? 'input-error' : ''} ${isPasswordValid ? 'input-success' : ''}`}>
                                        <span className="material-symbols-outlined text-text-secondary mr-3 text-[20px] group-focus-within:hidden select-none" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-text-primary font-body-md placeholder:text-outline/40 p-0"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={() => setPasswordTouched(true)}
                                        />
                                        <button
                                            type="button"
                                            className="text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center ml-2 outline-none cursor-pointer bg-transparent border-none p-0"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                      <span className="material-symbols-outlined text-[20px] select-none" style={{ fontVariationSettings: "'FILL' 0" }}>
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                                        </button>
                                    </div>
                                    <p className="text-text-secondary font-label-sm text-label-sm mt-1 px-1">Минимум 8 символов</p>
                                </div>
                                <div className="mt-auto pt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-accent-gradient text-text-primary font-label-md text-label-md py-3 rounded-lg shadow-glow hover:opacity-90 active:scale-95 transition-all duration-180 ease-custom-ease flex items-center justify-center gap-2 border-none cursor-pointer"
                                    >
                                        Продолжить
                                        <span className="material-symbols-outlined text-[18px] select-none" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className={`step-container flex flex-col h-full ${step2Class}`}>
                            <div className="mb-8 flex items-center gap-3">
                                <button
                                    onClick={handleGoToStep1}
                                    type="button"
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest hover:bg-surface-bright text-text-secondary hover:text-text-primary transition-colors duration-180 cursor-pointer border-none"
                                >
                                    <span className="material-symbols-outlined text-[18px] select-none" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                                </button>
                                <div>
                                    <h2 className="font-headline-sm text-headline-sm text-text-primary">Личные данные</h2>
                                </div>
                            </div>

                            <form className="flex-grow flex flex-col gap-6" onSubmit={handleCompleteRegistration}>
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label className="font-label-md text-label-md text-text-primary px-1" htmlFor="firstName">Имя</label>
                                        <div className="glow-focus flex items-center input-dark rounded-lg px-4 py-3 transition-transform duration-180 ease-out focus-within:scale-[1.01]">
                                            <input
                                                id="firstName"
                                                type="text"
                                                required
                                                className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-text-primary font-body-md placeholder:text-outline/40 p-0"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label className="font-label-md text-label-md text-text-primary px-1" htmlFor="lastName">Фамилия</label>
                                        <div className="glow-focus flex items-center input-dark rounded-lg px-4 py-3 transition-transform duration-180 ease-out focus-within:scale-[1.01]">
                                            <input
                                                id="lastName"
                                                type="text"
                                                required
                                                className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-text-primary font-body-md placeholder:text-outline/40 p-0"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-text-primary px-1" htmlFor="emailStep2">Почта</label>
                                    <div className="glow-focus flex items-center input-dark rounded-lg px-4 py-3 group transition-transform duration-180 ease-out focus-within:scale-[1.01]">
                                        <span className="material-symbols-outlined text-text-secondary mr-3 text-[20px] group-focus-within:hidden select-none" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                                        <input
                                            id="emailStep2"
                                            type="email"
                                            placeholder="Email@domain.com"
                                            required
                                            className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-text-primary font-body-md placeholder:text-outline/40 p-0"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-auto pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isSuccess}
                                        className={`w-full font-label-md text-label-md py-3 rounded-lg flex items-center justify-center gap-2 border-none cursor-pointer transition-all duration-180 ease-custom-ease ${
                                            isSuccess
                                                ? 'bg-primary text-surface-container-lowest'
                                                : 'bg-accent-gradient text-text-primary shadow-glow hover:opacity-90 active:scale-95'
                                        } ${isSubmitting && !isSuccess ? 'opacity-70 pointer-events-none' : ''}`}
                                    >
                                        {isSuccess ? (
                                            <>
                                                <span className="material-symbols-outlined text-[18px] select-none" style={{ fontVariationSettings: "'FILL' 0" }}>done_all</span>
                                                Выполнено
                                            </>
                                        ) : isSubmitting ? (
                                            <>
                                                <span className="material-symbols-outlined text-[18px] animate-spin select-none" style={{ fontVariationSettings: "'FILL' 0" }}>progress_activity</span>
                                                Выполняется...
                                            </>
                                        ) : (
                                            <>
                                                Завершить регистрацию
                                                <span className="material-symbols-outlined text-[18px] select-none" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}