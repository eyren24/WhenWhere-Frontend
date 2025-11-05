import { create } from "zustand";
import axios from "axios";
import type { FiltriAgendaDTO, ReqEventoDTO, ReqUpdateEventoDTO, ResEventoDTO, ResTagDTO } from "../services/api";
import { createEvento, deleteEvento, getAllEventi, getTags, updateEvento } from "../services/api/services";

interface EventoStore {
    isLoading: boolean;
    getAllEventi: (agendaId: number, filtri: FiltriAgendaDTO) => Promise<{ success: boolean; events?: ResEventoDTO[]; error?: string }>;
    createEvent: (evento: ReqEventoDTO) => Promise<{ success: boolean; message: string; }>;
    aggiornaEvento: (eventoId: number, nuovoEvento: ReqUpdateEventoDTO) => Promise<{ success: boolean; message?: string; error?: string }>;
    deleteEvento: (eventoId: number) => Promise<{ success: boolean; message?: string; error?: string }>;
    getTags: () => Promise<{ success: boolean; tags?: ResTagDTO[]; error?: string }>;
}

const handleError = (e: unknown): string =>
    axios.isAxiosError(e) ? e.response?.data ?? "Errore Axios" : e instanceof Error ? e.message : "Errore generico";

export const useEventoStore = create<EventoStore>((set) => ({
    isLoading: false,

    getAllEventi: async (agendaId, filtri) => {
        set({ isLoading: true });
        try {
            const res = await getAllEventi(agendaId, filtri);
            return { success: true, events: res.data };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },

    createEvent: async (evento) => {
        set({ isLoading: true });
        try {
            await createEvento(evento);
            return { success: true, message: "Evento creato con successo!" };
        } catch (e) {
            console.log(e)
            return { success: false, message: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },

    aggiornaEvento: async (eventoId, nuovoEvento) => {
        set({ isLoading: true });
        try {
            await updateEvento(eventoId, nuovoEvento);
            return { success: true, message: "Evento aggiornato con successo!" };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },

    deleteEvento: async (eventoId) => {
        set({ isLoading: true });
        try {
            await deleteEvento(eventoId);
            return { success: true, message: "Evento eliminato con successo!" };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },

    getTags: async () => {
        set({ isLoading: true });
        try {
            const res = await getTags();
            return { success: true, tags: res.data };
        } catch (e) {
            return { success: false, error: handleError(e) };
        } finally {
            set({ isLoading: false });
        }
    },
}));
