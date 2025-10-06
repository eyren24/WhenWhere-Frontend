import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimesCircle } from "react-icons/fa";
import { ModalShell } from "../ui/ModalShell";
import type { ReqUpdateEventoDTO, ResEventoDTO } from "../../services/api";
import {TextField} from "../ui/TextField.tsx";
import {TextAreaField} from "../ui/TextAreaField.tsx";

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

        if (!titolo) return; // validazioni minime: gestiscile a livello superiore con toast
        if (!stato) return;

        const dto: ReqUpdateEventoDTO = {
            titolo,
            stato,
            descrizione,
            tagId: selectedEvent.tagId ?? 1,
            // se vuoi permettere anche rating qui, aggiungi "rating"
        };

        await Promise.resolve(onSubmit(dto));
    };

    return (
        <ModalShell isOpen={isOpen} onClose={onClose} title="Modifica evento">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
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

                <div className="flex items-center gap-2 pt-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={onClose}
                    >
                        <FaTimesCircle /> Annulla
                    </button>
                    <motion.button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaSave /> Salva modifiche
                    </motion.button>
                </div>
            </form>
        </ModalShell>
    );
};

