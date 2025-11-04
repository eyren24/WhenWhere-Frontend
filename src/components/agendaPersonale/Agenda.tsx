import "../../assets/css/AreaPersonale/Agenda.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import { FaPen } from "react-icons/fa";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useAgendaStore } from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {
    ReqUpdateAgenda,
    ResAgendaDTO,
    ResNotaDTO,
    ResEventoDTO
} from "../../services/api";
import { CustomLoader } from "../layout/CustomLoader.tsx";
import { EditAgendaModal } from "../modals/EditAgendaModal.tsx";
import { SelectCreateModal } from "../modals/SelectCreateModal.tsx";
import { CreateNotaModal } from "../modals/CreateNotaModal.tsx";
import { CreateEventoModal } from "../modals/CreateEventoModal.tsx";
import { EditNotaModal } from "../modals/EditNotaModal.tsx";
import { EditEventoModal } from "../modals/EditEventoModal.tsx";
import type { EventClickArg } from "@fullcalendar/core";

export const Agenda = () => {
    const { id } = useParams<{ id: string }>();
    const { getAgendaById, aggiorna } = useAgendaStore();

    const [agenda, setAgenda] = useState<ResAgendaDTO>();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModal, setIsEditModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [activeModal, setActiveModal] = useState<
        "none" | "select" | "nota" | "evento" | "editNota" | "editEvento"
    >("none");
    const [selectedDate, setSelectedDate] = useState<DateClickArg | null>(null);
    const [selectedNota, setSelectedNota] = useState<ResNotaDTO | null>(null);
    const [selectedEvento, setSelectedEvento] = useState<ResEventoDTO | null>(null);

    // === Fetch Agenda ===
    useEffect(() => {
        setIsLoading(true);
        getAgendaById(Number(id))
            .then((res) => {
                if (res.success) setAgenda(res.agenda);
                else toast.error(res.error || "Errore generale!");
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [getAgendaById, id, refresh]);

    // === Actions ===
    const handleDateClick = useCallback((arg: DateClickArg) => {
        setSelectedDate(arg);
        setActiveModal("select");
    }, []);

    const handleEventClick = useCallback(
        (arg: EventClickArg) => {
            const { id } = arg.event;
            if (id.startsWith("nota-")) {
                const notaId = parseInt(id.replace("nota-", ""));
                const nota = agenda?.nota?.find((n) => n.id === notaId);
                if (nota) {
                    setSelectedNota(nota);
                    setActiveModal("editNota");
                }
            } else if (id.startsWith("evento-")) {
                const eventoId = parseInt(id.replace("evento-", ""));
                const evento = agenda?.evento?.find((e) => e.id === eventoId);
                if (evento) {
                    setSelectedEvento(evento);
                    setActiveModal("editEvento");
                }
            }
        },
        [agenda]
    );

    const handleSaveAgenda = useCallback(
        (dto: ReqUpdateAgenda) => {
            if (!agenda) return;
            aggiorna(agenda.id, dto)
                .then((res) => {
                    if (res.success) toast.success("Agenda aggiornata!");
                    else toast.error(res.error || "Errore");
                })
                .catch(console.error)
                .finally(() => setRefresh((p) => !p));
        },
        [agenda, aggiorna]
    );

    const closeAllModals = () => setActiveModal("none");

    // === Derived Events ===
    const events = useMemo(() => {
        if (!agenda) return [];

        const eventi = (agenda.evento ?? []).map((e) => ({
            id: `evento-${e.id}`,
            title: e.titolo,
            start: e.dataInizio,
            end: e.dataFine,
            color: agenda.tema, // colore tema agenda
        }));

        const note = (agenda.nota ?? []).map((n) => ({
            id: `nota-${n.id}`,
            title: n.titolo || "Nota",
            start: n.dataCreazione,
            color: n.tema || "#bbb", // colore tema nota
        }));

        return [...eventi, ...note];
    }, [agenda]);

    // === Modal Handlers ===
    const handleCreateEvento = (arg: DateClickArg) => {
        setSelectedDate(arg);
        setActiveModal("evento");
    };
    const handleCreateNota = (arg: DateClickArg) => {
        setSelectedDate(arg);
        setActiveModal("nota");
    };

    // === Common refresh after actions ===
    const refreshAfterAction = useCallback(() => {
        setRefresh((p) => !p);
        closeAllModals();
    }, []);

    return (
        <>
            {selectedDate && agenda && (
                <>
                    <SelectCreateModal
                        isOpen={activeModal === "select"}
                        onClose={closeAllModals}
                        selectedDate={selectedDate}
                        onCreateEvento={handleCreateEvento}
                        onCreateNota={handleCreateNota}
                    />
                    <CreateNotaModal
                        isOpen={activeModal === "nota"}
                        onClose={closeAllModals}
                        selectedDate={selectedDate}
                        onSave={refreshAfterAction}
                        agenda={agenda}
                    />
                    <CreateEventoModal
                        isOpen={activeModal === "evento"}
                        onClose={closeAllModals}
                        selectedDate={selectedDate}
                        onSave={refreshAfterAction}
                        agenda={agenda}
                    />
                </>
            )}

            {selectedNota && (
                <EditNotaModal
                    isOpen={activeModal === "editNota"}
                    onClose={closeAllModals}
                    nota={selectedNota}
                    onSave={refreshAfterAction}
                />
            )}

            {selectedEvento && (
                <EditEventoModal
                    isOpen={activeModal === "editEvento"}
                    onClose={closeAllModals}
                    evento={selectedEvento}
                    onSave={refreshAfterAction}
                />
            )}

            <section className="agenda-wrapper">
                <div className="agenda-header">
                    <h2 className="agenda-title">La mia agenda</h2>
                    <button
                        className="agenda-edit-btn"
                        onClick={() => setIsEditModal(true)}
                        aria-label="Modifica agenda"
                    >
                        <FaPen />
                    </button>
                </div>

                {isLoading ? (
                    <CustomLoader />
                ) : (
                    <div className="agenda-content">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            locale="it"
                            height="auto"
                            fixedWeekCount={false}
                            firstDay={1}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,dayGridWeek",
                            }}
                            events={events}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                        />
                    </div>
                )}

                {isEditModal && agenda && (
                    <EditAgendaModal
                        agenda={agenda}
                        onSave={handleSaveAgenda}
                        onClose={() => setIsEditModal(false)}
                    />
                )}
            </section>
        </>
    );
};
