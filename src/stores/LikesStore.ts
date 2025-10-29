import {create} from "zustand";
import axios from "axios";
import type {ReqLikesDTO, ResLikesDTO} from "../services/api";
import {addLike, getByUser} from "../services/api/services.ts";

interface AgendaStore {
    isLoading: boolean;
    addLike: (nuovaAgenda: ReqLikesDTO) => Promise<{ success: boolean, message: string }>;
    getByUser: (userId: number) => Promise<{ success: boolean, message: string, agenda: ResLikesDTO[] }>;
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
            return {success: true, message: "", agenda: res.data};
        } catch (e) {
            return {success: false, message: handleError(e), agenda: []};
        } finally {
            set({isLoading: false});
        }
    }
}));