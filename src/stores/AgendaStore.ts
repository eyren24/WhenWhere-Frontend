import {create} from "zustand";
import axios from "axios";
import type {ReqAgendaDTO, ReqUpdateAgenda, ResAgendaDTO} from "../services/api";
import {createAgenda, deleteAgenda, getAgendaById, getAllAgende, updateAgenda} from "../services/api/services";

interface AgendaStore {
    isLoading: boolean;
    getAll: () => Promise<{ success: boolean; agenda?: ResAgendaDTO[]; error?: string }>;
    creaAgenda: (agenda: ReqAgendaDTO) => Promise<{ success: boolean; message?: string; error?: string }>;
    getAgendaById: (agendaId: number) => Promise<{ success: boolean; agenda?: ResAgendaDTO; error?: string }>;
    deleteAgenda: (agendaId: number) => Promise<{ success: boolean; message?: string; error?: string }>;
    aggiorna: (agendaId: number, agendaNew: ReqUpdateAgenda) => Promise<{
        success: boolean;
        message?: string;
        error?: string
    }>;
}

const handleError = (e: unknown): string =>
    axios.isAxiosError(e) ? e.response?.data ?? "Errore Axios" : e instanceof Error ? e.message : "Errore generico";

export const useAgendaStore = create<AgendaStore>((set) => ({
    isLoading: false,

    getAll: async () => {
        set({ isLoading: true });
        try {
            const res = await getAllAgende();
            return { success: true, agenda: res.data };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },

    creaAgenda: async (agenda) => {
        set({ isLoading: true });
        try {
            await createAgenda(agenda);
            return { success: true, message: "Agenda creata con successo!" };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },

    getAgendaById: async (agendaId) => {
        set({ isLoading: true });
        try {
            const res = await getAgendaById(agendaId);
            return { success: true, agenda: res.data };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAgenda: async (agendaId) => {
        set({ isLoading: true });
        try {
            await deleteAgenda(agendaId);
            return { success: true, message: "Agenda eliminata con successo!" };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },
    aggiorna: async (agendaId, agendaNew) => {
        set({isLoading: true});
        try {
            await updateAgenda(agendaId, agendaNew);
            return {success: true, message: "Agenda aggiornata con successo!"};
        } catch (e) {
            return {success: false, error: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },
}));
