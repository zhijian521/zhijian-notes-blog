'use client';

import { CircleHelp, KeyRound, Lock, User } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

import { APP_ROUTES, API_ROUTES, STORAGE_KEYS } from '@/lib/site';

interface LoginFormState {
    password: string;
    remember: boolean;
    username: string;
}

interface RememberedLoginPayload {
    password: string;
    username: string;
}

const INITIAL_FORM: LoginFormState = {
    password: '',
    remember: false,
    username: '',
};

const SUPPORT_ACTIONS = [
    {
        icon: KeyRound,
        label: 'SSO 登录',
    },
    {
        icon: CircleHelp,
        label: '获取帮助',
    },
] as const;

/*== 后台登录页主体：使用直角视觉，同时支持本地记住密码回填。 ==*/
export default function AdminLoginCard() {
    const [loginForm, setLoginForm] = useState(INITIAL_FORM);
    const [message, setMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        try {
            const savedValue = window.localStorage.getItem(STORAGE_KEYS.adminRememberedLogin);

            if (!savedValue) {
                return;
            }

            const savedLogin = JSON.parse(savedValue) as RememberedLoginPayload;

            if (!savedLogin.username || !savedLogin.password) {
                window.localStorage.removeItem(STORAGE_KEYS.adminRememberedLogin);
                return;
            }

            setLoginForm({
                password: savedLogin.password,
                remember: true,
                username: savedLogin.username,
            });
        } catch {
            window.localStorage.removeItem(STORAGE_KEYS.adminRememberedLogin);
        }
    }, []);

    function handleFieldChange<Key extends keyof LoginFormState>(key: Key, value: LoginFormState[Key]) {
        setLoginForm((current) => ({
            ...current,
            [key]: value,
        }));

        if (key === 'remember' && value === false) {
            window.localStorage.removeItem(STORAGE_KEYS.adminRememberedLogin);
        }
    }

    function persistRememberedLogin() {
        if (loginForm.remember) {
            window.localStorage.setItem(
                STORAGE_KEYS.adminRememberedLogin,
                JSON.stringify({
                    password: loginForm.password,
                    username: loginForm.username.trim(),
                } satisfies RememberedLoginPayload),
            );
            return;
        }

        window.localStorage.removeItem(STORAGE_KEYS.adminRememberedLogin);
    }

    function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage(null);

        startTransition(async () => {
            try {
                const response = await fetch(API_ROUTES.adminLogin, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: loginForm.password,
                        username: loginForm.username.trim(),
                    }),
                });

                const payload = await response.json();

                if (!response.ok) {
                    setMessage(payload.message || '登录失败，请检查账号和密码。');
                    return;
                }

                persistRememberedLogin();
                window.location.href = APP_ROUTES.admin;
            } catch {
                setMessage('登录请求失败，请稍后重试。');
            }
        });
    }

    return (
        <main className='admin-login-page'>
            <div aria-hidden='true' className='admin-login-texture'>
                <div className='admin-login-texture-glow' />
            </div>

            <section className='admin-login-shell'>
                <header className='admin-login-brand'>
                    <div className='admin-login-logo-wrap'>
                        <img
                            alt='Zhijian Logo'
                            className='admin-login-logo'
                            decoding='async'
                            height='84'
                            src='/images/admin-login-logo.png'
                            width='84'
                        />
                    </div>
                    <h1 className='admin-login-title'>Zhijian Admin</h1>
                </header>

                <section className='admin-login-card' aria-label='后台登录表单'>
                    <form className='admin-login-form' onSubmit={handleLoginSubmit}>
                        <div className='admin-login-fieldset'>
                            <label className='admin-login-label' htmlFor='username'>
                                用户名
                            </label>
                            <div className='admin-login-input-wrap'>
                                <User className='admin-login-input-icon' />
                                <input
                                    autoComplete='username'
                                    className='admin-login-input'
                                    id='username'
                                    onChange={(event) => {
                                        handleFieldChange('username', event.target.value);
                                    }}
                                    placeholder='请输入您的用户名'
                                    required
                                    type='text'
                                    value={loginForm.username}
                                />
                            </div>
                        </div>

                        <div className='admin-login-fieldset'>
                            <label className='admin-login-label' htmlFor='password'>
                                密码
                            </label>
                            <div className='admin-login-input-wrap'>
                                <Lock className='admin-login-input-icon' />
                                <input
                                    autoComplete={loginForm.remember ? 'current-password' : 'off'}
                                    className='admin-login-input'
                                    id='password'
                                    onChange={(event) => {
                                        handleFieldChange('password', event.target.value);
                                    }}
                                    placeholder='请输入您的密码'
                                    required
                                    type='password'
                                    value={loginForm.password}
                                />
                            </div>
                        </div>

                        <label className='admin-login-checkbox-row' htmlFor='remember'>
                            <input
                                checked={loginForm.remember}
                                className='admin-login-checkbox'
                                id='remember'
                                onChange={(event) => {
                                    handleFieldChange('remember', event.target.checked);
                                }}
                                type='checkbox'
                            />
                            <span>记住密码</span>
                        </label>

                        <button className='admin-login-submit' disabled={isPending} type='submit'>
                            {isPending ? '登录中...' : '登录'}
                        </button>

                        <p aria-live='polite' className='admin-login-message'>
                            {message}
                        </p>
                    </form>

                    <div className='admin-login-divider' aria-hidden='true'>
                        <span className='admin-login-divider-line' />
                        <span className='admin-login-divider-text'>或通过其他方式</span>
                        <span className='admin-login-divider-line' />
                    </div>

                    <div className='admin-login-support-grid'>
                        {SUPPORT_ACTIONS.map(({ icon: Icon, label }) => (
                            <button className='admin-login-support-button' key={label} type='button'>
                                <Icon className='admin-login-support-icon' />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </section>

            <footer className='admin-login-footer'>
                <span className='admin-login-copyright'>© 2024 Zhijian. All rights reserved.</span>
            </footer>
        </main>
    );
}
