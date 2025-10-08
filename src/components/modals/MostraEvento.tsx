import React, { useEffect, useMemo, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { FaCalendarAlt, FaInfoCircle, FaBell, FaTag, FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

import type { ReqUpdateEventoDTO, ResEventoDTO } from "../../services/api";
import { emitAgendaChanged } from "../../stores/lib/agendaBus";
import { useAgendaStore } from "../../stores/AgendaStore";

import { ModalShell } from "../ui/ModalShell";
import { EventMetaRow } from "../ui/EventMetaRow.tsx";
import { StarDisplay } from "../ui/StarDisplay.tsx";
import { EditEventoModal } from "./EditEventoModal.tsx";

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

    const [showEdit, setShowEdit] = useState(false);

    const closeBtnRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        if (!isOpen) return;
        const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
        return () => clearTimeout(t);
    }, [isOpen]);

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
                <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                    {/* Header */}
                    <div className="mb-2 p-4 pb-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-500" aria-hidden />
                            <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.titolo}</h3>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-4">
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

                    {/* Footer */}
                    <div className="p-4 pt-0 mt-2 flex items-center justify-between">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50/70 backdrop-blur px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
                            onClick={handleDelete}
                            title="Elimina evento"
                        >
                            <FaTrash /> {isLoading ? <ClipLoader size={16} /> : "Elimina evento"}
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700"
                            onClick={() => setShowEdit(true)}
                            title="Modifica evento"
                        >
                            <FaPen /> Modifica evento
                        </button>
                    </div>
                </div>
            </ModalShell>

            <EditEventoModal
                isOpen={showEdit}
                onClose={() => setShowEdit(false)}
                selectedEvent={selectedEvent}
                onSubmit={handleEditSubmit}
            />
        </>
    );
};
