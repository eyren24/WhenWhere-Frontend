import axios from 'axios';
import {authApi} from './services';

export const getJwtToken = () => localStorage.getItem('token') ?? '';

let isRefreshing = false;
let failedRequestsQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedRequestsQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedRequestsQueue = [];
};

export const apiClient = axios.create({
    headers: {
        "Authorization": `Bearer ${getJwtToken()}`
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getJwtToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({resolve, reject});
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error('No refresh token available');

                const response = await authApi.apiAuthRefreshTokenPost(refreshToken);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                processQueue(null, response.data.token);

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                logout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete apiClient.defaults.headers.common['Authorization'];
    window.location.href = '/login';
};