import React, { useEffect, useMemo, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { FaCalendarAlt, FaInfoCircle, FaBell, FaTag, FaPen, FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

import type { ReqUpdateEventoDTO, ResEventoDTO } from "../../services/api";
import { emitAgendaChanged } from "../../stores/lib/agendaBus";
import { useAgendaStore } from "../../stores/AgendaStore";

import { ModalShell } from "../ui/ModalShell";
import {EventMetaRow} from "../ui/EventMetaRow.tsx";
import {StarDisplay} from "../ui/StarDisplay.tsx";
import {EditEventoModal} from "./EditEventoModal.tsx";

type MostraEventoProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedEvent: ResEventoDTO;
};

export const MostraEvento: React.FC<MostraEventoProps> = ({ isOpen, onClose, selectedEvent }) => {
    const { deleteEvento, aggiornaEvento, isLoading } = useAgendaStore();

    const descrizione = selectedEvent.descrizione ?? "";
    const stato = selectedEvent.stato ?? "";
    const tagId = selectedEvent.tagId ?? "";
    const notifica = Boolean(selectedEvent.notifica);
    const rating = Number(selectedEvent.rating ?? 0);

    const hasRating = useMemo(() => rating > 0, [rating]);

    // modale di edit separato
    const [showEdit, setShowEdit] = useState(false);

    // focus su chiudi
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        if (!isOpen) return;
        const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
        return () => clearTimeout(t);
    }, [isOpen]);

    // ESC per chiudere
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    const handleDelete = async () => {
        await deleteEvento(selectedEvent.id)
            .then((res) => (res.success ? toast.success(res.message || "") : toast.error(res.message || "")))
            .catch((err) => toast.error(err.message));
        onClose();
        emitAgendaChanged();
    };

    const handleEditSubmit = async (dto: ReqUpdateEventoDTO) => {
        await aggiornaEvento(selectedEvent.id, dto)
            .then((res) => (res.success ? toast.success(res.message || "") : toast.error(res.message || "")))
            .catch((err) => toast.error(err.message));
        setShowEdit(false);
        emitAgendaChanged();
    };

    return (
        <>
            <ModalShell isOpen={isOpen} onClose={onClose} title="Dettagli evento">
                {/* Header custom */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" aria-hidden />
                        <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.titolo}</h3>
                    </div>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-gray-50"
                        onClick={onClose}
                        aria-label="Chiudi"
                        title="Chiudi"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Body: solo visualizzazione */}
                <div className="space-y-4">
                    <EventMetaRow icon={<FaInfoCircle aria-hidden />} label="Descrizione:">
                        {descrizione || "-"}
                    </EventMetaRow>

                    <EventMetaRow label="Stato:" badge>
                        {stato || "-"}
                    </EventMetaRow>

                    <EventMetaRow icon={<FaTag aria-hidden />} label="Tag:">
                        {tagId || "-"}
                    </EventMetaRow>

                    {notifica && (
                        <EventMetaRow icon={<FaBell aria-hidden />} label="Notifica:">
                            Attiva
                        </EventMetaRow>
                    )}

                    {hasRating && (
                        <EventMetaRow label="Valutazione:">
                            <StarDisplay value={rating} />
                        </EventMetaRow>
                    )}
                </div>

                {/* Footer azioni */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        onClick={handleDelete}
                        title="Elimina evento"
                    >
                        <FaTrash /> {isLoading ? <ClipLoader size={16} /> : "Elimina evento"}
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        onClick={() => setShowEdit(true)}
                        title="Modifica evento"
                    >
                        <FaPen /> Modifica evento
                    </button>
                </div>
            </ModalShell>

            {/* Modale di Edit separato */}
            <EditEventoModal
                isOpen={showEdit}
                onClose={() => setShowEdit(false)}
                selectedEvent={selectedEvent}
                onSubmit={handleEditSubmit}
            />
        </>
    );
};