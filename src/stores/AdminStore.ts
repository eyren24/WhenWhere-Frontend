import {create} from "zustand/react";
import axios from "axios";
import type {FiltriUtenteDTO, ResAdminAgendeStatsDTO, ResAdminStatsDTO, ResUtenteDTO} from "../services/api";
import {getAgendeStats, getAllUsers, getStats, toggleStatusUtente} from "../services/api/services.ts";

interface AdminStore {
    isLoading: boolean;
    getAllUsers: (filtri: FiltriUtenteDTO) => Promise<{ success: boolean, message: string, users: ResUtenteDTO[] }>;
    toggleStatusUtente: (utenteId: number) => Promise<{ success: boolean, message: string }>;
    getStats: () => Promise<{ success: boolean, message: string, stats?: ResAdminStatsDTO }>;
    getAgendeStats: () => Promise<{ success: boolean, message: string, stats?: ResAdminAgendeStatsDTO }>;
}


export const useAdminStore = create<AdminStore>((set) => ({
    isLoading: false,
    getAllUsers: async (filtri) => {
        set({isLoading: true});
        try {
            const res = await getAllUsers(filtri);
            return {success: true, message: "", users: res.data};
        } catch (error) {
            console.log(error);
            set({isLoading: false});
            if (axios.isAxiosError(error)) {
                return {success: false, message: error.response?.data, users: []}
            } else if (error instanceof Error) {
                // Errore generico
                return {success: false, message: error.message, users: []}
            } else {
                // Errore
                return {success: false, message: 'Errore sconosciuto durante il login', users: []}
            }
        } finally {
            set({isLoading: false});
        }
    },
    toggleStatusUtente: async (utenteId) => {
        set({isLoading: true});
        try {
            const res = await toggleStatusUtente(utenteId);
            return {success: true, message: res.data};
        } catch (error) {
            console.log(error);
            set({isLoading: false});
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
    getStats: async () => {
        set({isLoading: true});
        try {
            const res = await getStats();
            return {success: true, message: "", stats: res.data};
        } catch (error) {
            console.log(error);
            set({isLoading: false});
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
    getAgendeStats: async () => {
        set({isLoading: true});
        try {
            const res = await getAgendeStats();
            return {success: true, message: "", stats: res.data};
        } catch (error) {
            console.log(error);
            set({isLoading: false});
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