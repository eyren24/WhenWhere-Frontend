import {create} from "zustand/react";
import axios from "axios";
import type {ReqLoginUser, ReqRegisterUser, ReqUpdateUtenteDTO, ResUtenteDTO, TokenInfoDTO} from "../services/api";
import {getUserInfo, getUtenteById, login, register, updateUtente, verify} from "../services/api/services.ts";
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
    getUtenteById: (userId: number) => Promise<{ success: boolean, utente?: ResUtenteDTO, error?: string }>;
    updateUtente: (userId: number, nuovoUtente:ReqUpdateUtenteDTO) => Promise<{ success: boolean, message: string }>;
    verifyEmail: (email: string, code:string) => Promise<{ success: boolean, message: string }>;
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
            console.log(response);
            return {success: true};
        } catch (error) {
            console.log(error);
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
        set({
            isLoading: false,
            isAuthenticated: false,
            tokenInfo: null,
        });
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
            console.log(error);
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
    },
    getUtenteById: async (userId) => {
        set({isLoading: true});
        try {
            const response = await getUtenteById(userId);
            return {success: true, utente: response.data}
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {success: false, error: error.response?.data}
            } else if (error instanceof Error) {
                // Errore generico
                return {success: false, error: error.message}
            } else {
                // Errore
                return {success: false, error: 'Errore sconosciuto durante il login'}
            }
        } finally {
            set({isLoading: false});
        }
    },
    updateUtente: async (userId, nuovoUtente) => {
        set({isLoading: true});
        try {
            const response = await updateUtente(userId, nuovoUtente);
            return {success: true, message: response.data}
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {success: false, message: error.response?.data}
            } else if (error instanceof Error) {
                // Errore generico
                return {success: false, message: error.message}
            } else {
                // Errore
                return {success: false, message: 'Errore sconosciuto durante il login'}
            }
        } finally {
            set({isLoading: false});
        }
    },
    verifyEmail: async (email, code) => {
        set({isLoading: true});
        try {
            const response = await verify(email, code);
            return {success: true, message: response.data}
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {success: false, message: error.response?.data}
            } else if (error instanceof Error) {
                // Errore generico
                return {success: false, message: error.message}
            } else {
                // Errore
                return {success: false, message: 'Errore sconosciuto durante il login'}
            }
        } finally {
            set({isLoading: false});
        }
    }
}));