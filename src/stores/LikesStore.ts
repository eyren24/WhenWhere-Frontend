import {create} from "zustand";
import axios from "axios";
import type {ReqLikesDTO, ResLikesDTO, ResSocialDTO, ResUtenteDTO} from "../services/api";
import {addLike, getByUser, getUserByUsername, top10Agende} from "../services/api/services.ts";

interface AgendaStore {
    isLoading: boolean;
    addLike: (nuovaAgenda: ReqLikesDTO) => Promise<{ success: boolean, message: string }>;
    getByUser: (userId: number) => Promise<{ success: boolean, message: string, likes: ResLikesDTO[] }>;
    getTopAgende: () => Promise<{ success: boolean, agende: ResSocialDTO[], error?: string }>;
    getByUsername: (username: string) => Promise<{ success: boolean, utente?: ResUtenteDTO, error?: string }>;
}

const handleError = (e: unknown): string =>
    axios.isAxiosError(e) ? e.response?.data ?? "Errore Axios" : e instanceof Error ? e.message : "Errore generico";

export const useLikesStore = create<AgendaStore>((set) => ({
    isLoading: false,
    addLike: async (nuovaAgenda) => {
        set({isLoading: true});
        try {
            await addLike(nuovaAgenda);
            return {success: true, message: "Like aggiunto"};
        } catch (e) {
            return {success: false, message: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },
    getByUser: async (userId) => {
        set({isLoading: true});
        try {
            const res = await getByUser(userId);
            return {success: true, message: "", likes: res.data};
        } catch (e) {
            return {success: false, message: handleError(e), likes: []};
        } finally {
            set({isLoading: false});
        }
    },
    getTopAgende: async () => {
        set({isLoading: true});
        try {
            const res = await top10Agende();
            return {success: true, agende: res.data};
        } catch (e) {
            return {success: false, agende: [], error: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },
    getByUsername: async (username) => {
        set({isLoading: true});
        try {
            const response = await getUserByUsername(username);
            return {success: true, utente: response.data}
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {success: false, error: error.response?.data}
            } else if (error instanceof Error) {
                return {success: false, error: error.message}
            } else {
                // Errore
                return {success: false, error: 'Errore sconosciuto durante il login'}
            }
        } finally {
            set({isLoading: false})
        }
    }
}));