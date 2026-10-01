import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/layout/AuthHeader';
import { loginUser } from '../api/authApi';
import {useToast} from "../components/ui/Toast.tsx";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { showToast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const navigate = useNavigate();
    const isUsernameInvalid = usernameTouched && username.length > 0 && username.length < 4;
    const isUsernameValid = usernameTouched && username.length >= 4;
    const isPasswordInvalid = passwordTouched && password.length > 0 && password.length < 8;
    const isPasswordValid = passwordTouched && password.length >= 8;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameTouched(true);
        setPasswordTouched(true);

        if (username.length < 4 || password.length < 8) {
            return;
        }

        setLoading(true);
        try {
            await loginUser(username, password);
            showToast({ message: 'Успешный вход!', type: 'success' });
            navigate('/my-portfolio');
        } catch (err: any) {
            showToast({ message: err.message || 'Ошибка входа', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            <div className="bg-mesh-gradient"></div>

            <AuthHeader />

            <main className="flex-grow flex items-center justify-center px-4 py-12 md:py-24 z-10 relative">
                <div className="glass-card w-full max-w-[440px] p-8 md:p-10 rounded-xl">

                    <div className="text-center mb-10">
                        <h1 className="font-headline-md text-headline-md text-text-primary mb-2">Добро пожаловать</h1>
                        <p className="font-body-md text-body-md text-text-secondary">Пожалуйста, введите свои данные для входа в систему</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-text-primary px-1" htmlFor="username">Логин</label>
                            <div
                                className={`glow-focus flex items-center input-dark rounded-lg px-4 py-3 group transition-transform duration-180 ease-out focus-within:scale-[1.01] ${isUsernameInvalid ? 'input-error' : ''} ${isUsernameValid ? 'input-success' : ''}`}
                            >
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
                            {isUsernameInvalid && (
                                <p className="text-error font-label-sm text-label-sm mt-1 px-1">Минимум 4 символа</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="font-label-md text-label-md text-text-primary" htmlFor="password">Пароль</label>
                                <a className="font-label-sm text-label-sm text-secondary hover:underline transition-all" href="https://vk.ru/vkindex" target="_blank" rel="noopener noreferrer">Забыли пароль?</a>
                            </div>

                            <div
                                className={`glow-focus flex items-center input-dark rounded-lg px-4 py-3 group transition-transform duration-180 ease-out focus-within:scale-[1.01] ${isPasswordInvalid ? 'input-error' : ''} ${isPasswordValid ? 'input-success' : ''}`}
                            >
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
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="accent-gradient-btn w-full py-4 rounded-lg text-text-primary font-label-md text-label-md font-bold shadow-lg shadow-blue-500/10 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center cursor-pointer border-none active:scale-95 transition-transform duration-180 ease-out"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined text-[18px] animate-spin align-middle mr-2 select-none" style={{ fontVariationSettings: "'FILL' 0" }}>progress_activity</span>
                                    Выполняется...
                                </>
                            ) : (
                                'Вход'
                            )}
                        </button>
                    </form>
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-subtle"></div>
                        </div>
                        <div className="relative flex justify-center text-label-sm uppercase">
                            <span className="bg-[#1a1a1a] px-4 text-text-secondary font-label-sm">Или</span>
                        </div>
                    </div>
                    <p className="text-center mt-10 font-body-md text-body-md text-text-secondary">
                        Нет аккаунта?
                        <a
                            onClick={(e) => { e.preventDefault(); navigate('/register'); }}
                            href="/register"
                            className="text-secondary hover:text-text-primary font-bold ml-1 transition-colors cursor-pointer"
                        >
                            Зарегистрироваться
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}