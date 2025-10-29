import {create} from "zustand";
import axios from "axios";
import type {FiltriAgendaDTO, ReqNotaDTO, ResNotaDTO} from "../services/api";
import {creaNote, deleteNote, getNote, updateNote} from "../services/api/services";

interface NoteStore {
    isLoading: boolean;
    createNote: (nota: ReqNotaDTO) => Promise<{ success: boolean; message?: string; error?: string }>;
    deleteNote: (notaId: number) => Promise<{ success: boolean; message?: string; error?: string }>;
    getAllNotes: (ndaId: number, filtri: FiltriAgendaDTO) => Promise<{
        success: boolean;
        notes?: ResNotaDTO[];
        error?: string
    }>;
    updateNote: (notaId: number, nota: ReqNotaDTO) => Promise<{ success: boolean; message?: string; error?: string }>;
}

const handleError = (e: unknown): string =>
    axios.isAxiosError(e) ? e.response?.data ?? "Errore Axios" : e instanceof Error ? e.message : "Errore generico";

export const useNoteStore = create<NoteStore>((set) => ({
    isLoading: false,

    createNote: async (nota) => {
        set({isLoading: true});
        try {
            await creaNote(nota);
            return {success: true, message: "Nota creata con successo!"};
        } catch (e) {
            return {success: false, error: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },

    deleteNote: async (notaId) => {
        set({isLoading: true});
        try {
            await deleteNote(notaId);
            return {success: true, message: "Nota eliminata con successo!"};
        } catch (e) {
            return {success: false, error: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },

    getAllNotes: async (ndaId: number, filtri: FiltriAgendaDTO) => {
        set({isLoading: true});
        try {
            const res = await getNote(ndaId, filtri);
            return {success: true, notes: res.data};
        } catch (e) {
            return {success: false, error: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },

    updateNote: async (notaId, nota) => {
        set({isLoading: true});
        try {
            await updateNote(notaId, nota);
            return {success: true, message: "Nota aggiornata con successo!"};
        } catch (e) {
            return {success: false, error: handleError(e)};
        } finally {
            set({isLoading: false});
        }
    },
}));
