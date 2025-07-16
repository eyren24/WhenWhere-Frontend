import {create} from "zustand/react";
import axios from "axios";
import type {ReqLoginUser, ReqRegisterUser, TokenInfoDTO} from "../services/api";
import {getUserInfo, login, register} from "../services/api/services.ts";
import {logout} from "../services/api/Interceptor.ts";


interface AuthStore {
    isAuthenticated: boolean;
    tokenInfo: TokenInfoDTO | null;
    isCheckingAuth: boolean;
    isLoading: boolean;
    login: (loginField: ReqLoginUser) => Promise<{ success: boolean, error?: string }>;
    logout: () => Promise<void>;
    getTokenInfo: () => Promise<{ success: boolean, info?: TokenInfoDTO, error?: string }>;
    signup: (registerField: ReqRegisterUser) => Promise<{ success: boolean, error?: string }>;
}


export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: !!localStorage.getItem("token"),
    isCheckingAuth: false,
    isLoading: false,
    tokenInfo: null,
    login: async (loginField) => {
        set({isLoading: true});
        try {
            const response = await login(loginField);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            set({isLoading: false, isAuthenticated: true});
            return {success: true};
        } catch (error) {
            set({isLoading: false});
            if (axios.isAxiosError(error)) {
                return {success: false, error: error.response?.data}
            } else if (error instanceof Error) {
                // Errore generico
                return {success: false, error: error.message}
            } else {
                // Errore
                return {success: false, error: 'Errore sconosciuto durante il login'}
            }
        }
    },
    logout: async () => {
        set({isLoading: true});
        logout();
        set({isLoading: false});
    },
    signup: async (registerField) => {
        set({isLoading: true});
        try {
            const response = await register(registerField);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem("refreshToken", response.data.refreshToken)
            set({isLoading: false, isAuthenticated: true});
            return {success: true};
        } catch (error) {
            set({isLoading: false});
            if (axios.isAxiosError(error)) {
                return {success: false, error: error.response?.data}
            } else if (error instanceof Error) {
                // Errore generico
                return {success: false, error: error.message}
            } else {
                // Errore
                return {success: false, error: 'Errore sconosciuto durante il login'}
            }
        }
    },
    getTokenInfo: async () => {
        set({isLoading: true, isCheckingAuth: true});
        try {
            const response = await getUserInfo();
            set({isLoading: false, tokenInfo: response.data, isCheckingAuth: false});
            return {success: true, info: response.data}
        } catch (error) {
            set({isLoading: false, isCheckingAuth: false});
            if (axios.isAxiosError(error)) {
                return {success: false, error: error.response?.data}
            } else if (error instanceof Error) {
                // Errore generico
                return {success: false, error: error.message}
            } else {
                // Errore
                return {success: false, error: 'Errore sconosciuto durante il login'}
            }
        }
    }
}));