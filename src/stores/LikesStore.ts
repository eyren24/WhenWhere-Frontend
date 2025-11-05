import {create} from "zustand";
import axios from "axios";
import type {ReqLikesDTO, ResLikesDTO, ResUtenteDTO} from "../services/api";
import {addLike, getLikeByAgendaId, getUserByUsername, removeLike} from "../services/api/services.ts";

interface AgendaStore {
    isLoading: boolean;
    add: (nuovaAgenda: ReqLikesDTO) => Promise<{ success: boolean, message: string }>;
    remove: (likeId: number) => Promise<{ success: boolean, message: string }>;
    getByUsername: (username: string) => Promise<{ success: boolean, utente?: ResUtenteDTO, error?: string }>;
    byAgendaId: (ganedaId: number) => Promise<{ success: boolean, likes?: ResLikesDTO[], error?: string }>;
}

const handleError = (e: unknown): string =>
    axios.isAxiosError(e) ? e.response?.data ?? "Errore Axios" : e instanceof Error ? e.message : "Errore generico";

export const useLikesStore = create<AgendaStore>((set) => ({
    isLoading: false,
    add: async (nuovaAgenda) => {
        set({isLoading: true});
        try {
            await addLike(nuovaAgenda);
            return {success: true, message: "Like aggiunto!"};
        } catch (e) {
            return {success: false, message: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },
    remove: async (likeId) => {
        set({isLoading: true});
        try {
            await removeLike(likeId);
            return {success: true, message: "Like rimosso!"};
        } catch (e) {
            return {success: false, message: handleError(e)};
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
    },
    byAgendaId: async (agendaId) => {
        set({isLoading: true});
        try {
            const response = await getLikeByAgendaId(agendaId);
            return {success: true, likes: response.data}
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