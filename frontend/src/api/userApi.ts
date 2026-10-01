import { API_BASE_URL } from "./authApi";

export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': 'Bearer ' + token } : {})
    };
};

export const searchUserByLogin = async (login: string) => {
    try {
        const response = await fetch(API_BASE_URL + '/portfolio/' + login.trim());

        if (response.status === 404) {
            throw new Error('Пользователь не найден');
        }
        if (!response.ok) {
            throw new Error('Ошибка при поиске');
        }

        const data = await response.json();
        return { login: data.login, exists: true };
    } catch (error) {
        throw error;
    }
};

export const fetchPortfolioData = async (username: string) => {
    try {
        const isMe = username === 'me';
        const endpoint = isMe
            ? API_BASE_URL + '/users/me'
            : API_BASE_URL + '/portfolio/' + username;

        const headers = isMe ? getAuthHeaders() : { 'Content-Type': 'application/json' };

        const response = await fetch(endpoint, { headers });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('UNAUTHORIZED');
            }
            throw new Error('Пользователь не найден');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
