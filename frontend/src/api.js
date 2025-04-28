import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const api = axios.create({
    baseURL:    import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            try {
                const response = await axios.post('/api/token/refresh/', {
                    refresh: refreshToken,
                });
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                return axios(originalRequest);
            } catch (e) {
                console.error('Token refresh failed', e);
                // Redirect to login or handle further
            }
        }
        return Promise.reject(error);
    }
);

export default api;
