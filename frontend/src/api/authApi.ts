export const API_BASE_URL = 'http://localhost:8080/api/v1';

export const loginUser = async (login: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });

        if (!response.ok) {
            throw new Error("Неверные данные");
        }

        const data = await response.json();

        localStorage.setItem(`accessToken`, data.accessToken);
        localStorage.setItem(`refreshToken`, data.refreshToken);
        return data;
    } catch (error) {
        throw error;
    }
};

export interface RegisterData {
    username: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export const registerUser = async (userData: RegisterData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: userData.username,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || 'Ошибка регистрации');
        }
        
        return { status: response.status, message: await response.text() };
    } catch (error) {
        throw error;
    }
};
