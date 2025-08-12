import {create} from "zustand/react";
import type {FiltriAgendaDTO, ReqAgendaDTO, ReqUpdateEventoDTO, ResAgendaDTO, ResEventoDTO} from "../services/api";
import axios from "axios";
import {createAgenda, deleteAgenda, getAllAgende, getAllEventi, updateEvento} from "../services/api/services.ts";

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
    creaAgenda: (agenda: ReqAgendaDTO) => Promise<{ success: boolean, message?: string; error?: string }>;
    deleteAgenda: (agenda: number) => Promise<{ success: boolean, message?: string; error?: string }>;
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
    creaAgenda: async (agenda) => {
        set({isLoading: true});
        try {
            await createAgenda(agenda);
            set({isLoading: false});
            return {success: true, message: 'Agenda creata con successo!'}
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
}));