import {create} from "zustand/react";
import type {
    FiltriAgendaDTO,
    ReqAgendaDTO,
    ReqEventoDTO,
    ReqUpdateEventoDTO,
    ResAgendaDTO,
    ResEventoDTO, ResTagDTO
} from "../services/api";
import axios from "axios";
import {
    createAgenda,
    createEvent,
    deleteAgenda, deleteEvento, getAgendaById,
    getAllAgende,
    getAllEventi, getTags,
    updateEvento
} from "../services/api/services.ts";

interface AgendaStore {
    isLoading: boolean;
    getAll: () => Promise<{ success: boolean, agenda?: ResAgendaDTO[], error?: string }>;
    getAllEventi: (agenda: number, filtri: FiltriAgendaDTO) => Promise<{
        success: boolean,
        events?: ResEventoDTO[],
        error?: string
    }>;
    aggiornaEvento: (evento: number, nuovoEvento: ReqUpdateEventoDTO) => Promise<{
        success: boolean,
        message?: string,
        error?: string
    }>;
    createEvent: (evento: ReqEventoDTO) => Promise<{
        success: boolean,
        message?: string,
        error?: string
    }>;
    deleteEvento: (eventoId: number) => Promise<{
        success: boolean,
        message?: string,
        error?: string
    }>;
    creaAgenda: (agenda: ReqAgendaDTO) => Promise<{ success: boolean, message?: string; error?: string }>;
    getAgendaById: (agendaId: number) => Promise<{ success: boolean, agenda?: ResAgendaDTO; error?: string }>;
    deleteAgenda: (agenda: number) => Promise<{ success: boolean, message?: string; error?: string }>;
    getTags: () => Promise<{ success: boolean, tags?: ResTagDTO[]; error?: string }>;
}


export const useAgendaStore = create<AgendaStore>((set) => ({
    isLoading: false,
    getAll: async () => {
        set({isLoading: true});
        try {
            const response = await getAllAgende();
            set({isLoading: false});
            return {success: true, agenda: response.data}
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
    getAllEventi: async (agenda, filtri) => {
        set({isLoading: true});
        try {
            const response = await getAllEventi(agenda, filtri);
            set({isLoading: false});
            return {success: true, events: response.data}
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
    aggiornaEvento: async (evento, nuovoEvento) => {
        set({isLoading: true});
        try {
            await updateEvento(evento, nuovoEvento);
            set({isLoading: false});
            return {success: true, message: 'Evento aggiornato con successo!'}
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
    createEvent: async (evento) => {
        set({isLoading: true});
        try {
            await createEvent(evento);
            set({isLoading: false});
            return {success: true, message: 'Evento creato con successo!'}
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
    deleteEvento: async (eventoId) => {
        set({isLoading: true});
        try {
            await deleteEvento(eventoId);
            set({isLoading: false});
            return {success: true, message: 'Evento eliminato con successo!'}
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
    creaAgenda: async (agenda) => {
        set({isLoading: true});
        try {
            await createAgenda(agenda);
            set({isLoading: false});
            return {success: true, message: 'Agenda creata con successo!'}
        } catch (error) {
            console.log(error)
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
    getAgendaById: async (agenda) => {
        set({isLoading: true});
        try {
            const res = await getAgendaById(agenda);
            set({isLoading: false});
            return {success: true, agenda: res.data}
        } catch (error) {
            console.log(error)
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
    deleteAgenda: async (agenda) => {
        set({isLoading: true});
        try {
            await deleteAgenda(agenda);
            set({isLoading: false});
            return {success: true, message: 'Agenda eliminata con successo!'}
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
    getTags: async () => {
        set({isLoading: true});
        try {
            const res = await getTags();
            set({isLoading: false});
            return {success: true, tags: res.data}
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
    }
}));