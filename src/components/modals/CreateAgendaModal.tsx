import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCalendarPlus, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import type { ReqAgendaDTO } from "../../services/api";
import { useAgendaStore } from "../../stores/AgendaStore.ts";
import { emitAgendaChanged } from "../../stores/lib/agendaBus.ts";
import { ModalShell } from "../areaPersonale/ModalShell";
import { TextField } from "../areaPersonale/TextField.tsx";
import { TextAreaField } from "../areaPersonale/TextAreaField.tsx";

type CreateAgendaModalProps = {
    isOpen: boolean;
    onClose: () => void;
    isSubmitting?: boolean;
};

export const CreateAgendaModal: React.FC<CreateAgendaModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                    }) => {
    const firstFieldRef = useRef<HTMLInputElement | null>(null);
    const { isLoading, creaAgenda } = useAgendaStore();

    useEffect(() => {
        if (!isOpen) return;
        const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
        return () => clearTimeout(t);
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const nomeAgenda = String(fd.get("nomeAgenda") ?? "").trim();
        const descrizione = String(fd.get("descrizione") ?? "");
        const tema = String(fd.get("tema") ?? "");

        if (!nomeAgenda) {
            toast.error("Il nome dell'agenda è obbligatorio.");
            return;
        }

        const payload: ReqAgendaDTO = { nomeAgenda, descrizione, tema };

        try {
            const res = await creaAgenda(payload);
            if (res.success) {
                toast.success(res.message || "Agenda creata con successo!");
                emitAgendaChanged();
                onClose();
            } else {
                toast.error(res.error || "Si è verificato un errore durante la creazione dell'agenda.");
            }
        } catch (err) {
            toast.error(String(err));
        }
    };

    return (
        <ModalShell isOpen={isOpen} onClose={onClose} title="Nuova agenda">
            {/* Card “glass” minimale */}
            <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                <form className="p-4 sm:p-5 space-y-5" onSubmit={handleSubmit} noValidate>
                    {/* Header compatto */}
                    <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200">
                            <FaCalendarPlus aria-hidden />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-800">Crea una nuova agenda</h2>
                            <p className="text-xs text-gray-500">Imposta nome, descrizione e un eventuale tema.</p>
                        </div>
                    </div>

                    {/* Campi */}
                    <TextField
                        ref={firstFieldRef}
                        id="nomeAgenda"
                        name="nomeAgenda"
                        type="text"
                        label="Nome agenda"
                        requiredMark
                        placeholder="Es. Team Marketing Q4"
                        maxLength={120}
                    />

                    <TextAreaField
                        id="descrizione"
                        name="descrizione"
                        label="Descrizione (opzionale)"
                        placeholder="A cosa serve questa agenda?"
                        rows={4}
                        maxLength={600}
                    />

                    <div>
                        <label htmlFor="tema" className="block text-sm font-medium text-gray-700 mb-1">
                            Tema (opzionale)
                        </label>
                        <input
                            id="tema"
                            name="tema"
                            type="text"
                            list="agenda-tema-suggestions"
                            placeholder="Es. scuro, chiaro, #0F62FE…"
                            maxLength={64}
                            className="block w-full rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
                        />
                        <datalist id="agenda-tema-suggestions">
                            <option value="chiaro" />
                            <option value="scuro" />
                            <option value="azienda" />
                            <option value="#0F62FE" />
                        </datalist>
                    </div>

                    {/* Footer azioni */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                            type="button"
                            className="h-10 rounded-lg border border-gray-200 bg-white/60 backdrop-blur px-4 text-sm font-medium text-gray-700 hover:bg-white/80 transition"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Annulla
                        </button>
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white shadow hover:bg-sky-700 disabled:opacity-60"
                            disabled={isLoading}
                        >
                            {isLoading ? <FaSpinner className="animate-spin" /> : <FaCalendarPlus />}
                            Crea
                        </motion.button>
                    </div>
                </form>
            </div>
        </ModalShell>
    );
};
