import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimesCircle } from "react-icons/fa";
import { ModalShell } from "../areaPersonale/ModalShell";
import type { ReqUpdateEventoDTO, ResEventoDTO } from "../../services/api";
import { TextField } from "../areaPersonale/TextField.tsx";
import { TextAreaField } from "../areaPersonale/TextAreaField.tsx";

type EditEventoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedEvent: ResEventoDTO;
    onSubmit: (dto: ReqUpdateEventoDTO) => Promise<void> | void;
};

export const EditEventoModal: React.FC<EditEventoModalProps> = ({
                                                                    isOpen,
                                                                    onClose,
                                                                    selectedEvent,
                                                                    onSubmit,
                                                                }) => {
    const firstRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        const t = setTimeout(() => firstRef.current?.focus(), 0);
        return () => clearTimeout(t);
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const titolo = String(fd.get("titolo") || "").trim();
        const stato = String(fd.get("stato") || "").trim();
        const descrizione = String(fd.get("descrizione") || "").trim();

        if (!titolo || !stato) return;

        const dto: ReqUpdateEventoDTO = {
            titolo,
            stato,
            descrizione,
            tagId: selectedEvent.tagId ?? 1,
        };

        await Promise.resolve(onSubmit(dto));
    };

    return (
        <ModalShell isOpen={isOpen} onClose={onClose} title="Modifica evento">
            <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                <form className="p-4 sm:p-5 space-y-5" onSubmit={handleSubmit} noValidate>
                    <div>
                        <h2 className="text-base font-semibold text-gray-800">Aggiorna dettagli</h2>
                        <p className="text-xs text-gray-500">Titolo, descrizione e stato dell’evento.</p>
                    </div>

                    <TextField
                        ref={firstRef}
                        id="titolo"
                        name="titolo"
                        type="text"
                        label="Titolo"
                        requiredMark
                        defaultValue={selectedEvent.titolo || ""}
                        placeholder="Titolo evento"
                        maxLength={140}
                    />

                    <TextAreaField
                        id="descrizione"
                        name="descrizione"
                        label="Descrizione"
                        defaultValue={selectedEvent.descrizione || ""}
                        placeholder="A cosa serve questo evento?"
                        rows={4}
                        maxLength={800}
                    />

                    <TextField
                        id="stato"
                        name="stato"
                        type="text"
                        label="Stato"
                        requiredMark
                        defaultValue={selectedEvent.stato || ""}
                        placeholder="Es. Pianificato / In corso / Completato"
                        list="event-stato-suggestions"
                        maxLength={80}
                    />
                    <datalist id="event-stato-suggestions">
                        <option value="Pianificato" />
                        <option value="In corso" />
                        <option value="Completato" />
                        <option value="Rinviato" />
                    </datalist>

                    <div className="flex items-center gap-2 pt-2 justify-end">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white/60 backdrop-blur px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white/80 transition"
                            onClick={onClose}
                        >
                            <FaTimesCircle /> Annulla
                        </button>
                        <motion.button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700"
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaSave /> Salva modifiche
                        </motion.button>
                    </div>
                </form>
            </div>
        </ModalShell>
    );
};
