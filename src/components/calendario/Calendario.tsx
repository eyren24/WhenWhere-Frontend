import FullCalendar from "@fullcalendar/react";
import React, {useEffect, useMemo, useRef, useState} from "react";
import type {ReqEventoDTO, ResAgendaDTO, ResEventoDTO} from "../../services/api";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {DateSelectArg, EventClickArg, EventContentArg, EventInput} from "@fullcalendar/core";
import interactionPlugin, {type DateClickArg} from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {EventRenderers} from "./EventRenderers.tsx";
import {mapEvents} from "./EventMappers.tsx";
import CreateEventoModale from "../modals/CreateEventoModale.tsx";
import {MostraEvento} from "../modals/MostraEvento.tsx";
import {motion, AnimatePresence} from "framer-motion";
import {emitAgendaChanged} from "../../stores/lib/agendaBus";

type Props = {
    agenda: ResAgendaDTO;
    onDeleteAgenda?: () => void;
};

export const Calendario: React.FC<Props> = ({ agenda, onDeleteAgenda }) => {
    const { isLoading, createEvent, getAllEventi, deleteAgenda } = useAgendaStore();

    const calendarRef = useRef<FullCalendar | null>(null);
    const [eventi, setEventi] = useState<EventInput[]>([]);
    const [eventsLoading, setEventsLoading] = useState<boolean>(true);

    const [selectedEvent, setSelectedEvent] = useState<ResEventoDTO | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);

    const [createEventModal, setCreateEventModal] = useState(false);
    const [createPayload, setCreatePayload] = useState<{ startISO: string; endISO: string } | null>(null);

    const [askDelete, setAskDelete] = useState<boolean>(false);

    const handleRenderEventContent = (eventInfo: EventContentArg): React.ReactElement =>
        EventRenderers(eventInfo);

    const ONE_HOUR = useMemo(() => 60 * 60 * 1000, []);

    const refreshEvents = () => {
        setEventsLoading(true);
        getAllEventi(agenda.id, {})
            .then((res) => {
                if (res.success) setEventi(mapEvents(res.events || []));
                else toast.error(res.error || "Errore durante la ricezione degli eventi.");
            })
            .catch((err) => console.error(err))
            .then(() => setEventsLoading(false));
    };

    const handleCreateEvento = (evento: ReqEventoDTO) => {
        if (isLoading) return;
        createEvent(evento)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message || "Evento creato con successo!");
                    refreshEvents();
                    setCreateEventModal(false);
                    emitAgendaChanged();
                } else {
                    toast.error(res.error || "Errore durante la creazione dell'evento.");
                }
            })
            .catch(() => toast.error("Impossibile creare l'evento."));
    };

    const handleDateClick = (arg: DateClickArg) => {
        const startISO = arg.date.toISOString();
        const endISO = new Date(arg.date.getTime() + ONE_HOUR).toISOString();
        setCreatePayload({ startISO, endISO });
        setCreateEventModal(true);
    };

    const handleSelect = (arg: DateSelectArg) => {
        const start = arg.start;
        let end = arg.end;
        if (arg.allDay) end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
        setCreatePayload({ startISO: start.toISOString(), endISO: end!.toISOString() });
        setCreateEventModal(true);
    };

    const handleEventClick = (arg: EventClickArg) => {
        const raw = arg.event.extendedProps?.raw as ResEventoDTO | undefined;
        if (raw) {
            setSelectedEvent(raw);
            setShowEventModal(true);
        } else {
            getAllEventi(agenda.id, {})
                .then((res) => {
                    if (res.success && res.events) {
                        const found = res.events.find((ev) => ev.titolo === arg.event.title);
                        if (!found) return;
                        setSelectedEvent(found);
                        setShowEventModal(true);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const internalDeleteAgenda = () => {
        const tId = toast.loading("Eliminazione in corso...");
        deleteAgenda(agenda.id)
            .then((res) => {
                if (!res?.success) throw new Error(res?.error || "Impossibile eliminare l'agenda");
                toast.success("Agenda eliminata.", { id: tId });
                setEventi([]);
                emitAgendaChanged();
            })
            .catch((e) => toast.error(String(e), { id: tId }));
    };

    const confirmDelete = () => {
        setAskDelete(false);
        if (onDeleteAgenda) onDeleteAgenda();
        else internalDeleteAgenda();
    };

    const cancelDelete = () => setAskDelete(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setAskDelete(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        refreshEvents();
    }, [agenda.id, getAllEventi]);

    const nomeAgenda: string = agenda.nomeAgenda || agenda.nome || "Agenda";
    const descrizione: string | undefined = agenda.descrizione || (undefined as unknown as string);

    return (
        <>
            <div className="w-full px-3 sm:px-4">
                <div className="mx-auto max-w-[700px]"> {/* container più piccolo */}
                    {/* Card contenitore con bordo+shadow e animazioni */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="
              rounded-2xl border border-gray-200 bg-white/80 backdrop-blur
              shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5
              p-3 sm:p-4
              origin-top
            "
                        style={{ transformOrigin: "top center" }}
                    >
                        {/* Header: titolo + azioni */}
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200"
                                    aria-hidden
                                >
                                    🗓️
                                </motion.div>
                                <div className="leading-tight">
                                    <h3 className="text-[15px] font-semibold text-gray-800">{nomeAgenda}</h3>
                                    {descrizione && (
                                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{descrizione}</p>
                                    )}
                                </div>
                            </div>

                            {/* Pulsante elimina con conferma inline */}
                            <div className="relative">
                                <motion.button
                                    type="button"
                                    onClick={() => setAskDelete((v) => !v)}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="
                    inline-flex items-center gap-2 rounded-md
                    bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700
                    ring-1 ring-inset ring-rose-200 hover:bg-rose-100
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400
                    transition
                  "
                                    title="Elimina agenda"
                                    aria-haspopup="dialog"
                                    aria-expanded={askDelete}
                                    aria-controls="confirm-delete-popover"
                                >
                                    <span className="text-sm">🗑️</span>
                                    <span>Elimina</span>
                                </motion.button>

                                <AnimatePresence>
                                    {askDelete && (
                                        <motion.div
                                            id="confirm-delete-popover"
                                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 6, scale: 1 }}
                                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute right-0 mt-2 w-[260px] rounded-xl border border-rose-200/70 bg-white shadow-lg p-3 z-20"
                                            role="dialog"
                                            aria-label="Conferma eliminazione agenda"
                                        >
                                            <p className="text-sm text-gray-700">
                                                Vuoi davvero eliminare <span className="font-semibold">{nomeAgenda}</span>?
                                            </p>
                                            <div className="mt-3 flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={cancelDelete}
                                                    className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 ring-1 ring-inset ring-gray-200 transition"
                                                >
                                                    Annulla
                                                </button>
                                                <motion.button
                                                    type="button"
                                                    onClick={confirmDelete}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="rounded-md px-3 py-1.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 transition shadow-sm"
                                                >
                                                    Elimina
                                                </motion.button>
                                            </div>
                                            <div className="pointer-events-none absolute -top-2 right-6 h-4 w-4 rotate-45 bg-white border-t border-l border-rose-200/70" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Calendar compatto */}
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-xl border border-gray-100 bg-white p-2 sm:p-3 shadow-sm"
                            style={{ transform: "scale(0.95)", transformOrigin: "top center" }} // più piccolo
                        >
                            {eventsLoading ? (
                                <div className="w-full">
                                    <div className="h-7 w-36 bg-gray-200 rounded mb-3 animate-pulse" />
                                    <div className="grid grid-cols-7 gap-[1px] bg-gray-200">
                                        {Array.from({ length: 35 }).map((_, i) => (
                                            <div key={i} className="aspect-[1.1/1] bg-white">
                                                <div className="h-full w-full animate-pulse bg-gray-100" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <FullCalendar
                                    ref={calendarRef}
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    locale="it"
                                    events={eventi}
                                    dateClick={handleDateClick}
                                    select={handleSelect}
                                    selectable
                                    eventClick={handleEventClick}
                                    eventContent={handleRenderEventContent}
                                    height="auto"
                                    expandRows
                                    handleWindowResize
                                    headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
                                    dayMaxEvents
                                />
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {showEventModal && selectedEvent && (
                <MostraEvento
                    isOpen={showEventModal}
                    onClose={() => {
                        setSelectedEvent(null);
                        setShowEventModal(false);
                    }}
                    selectedEvent={selectedEvent}
                />
            )}

            {createEventModal && createPayload && (
                <CreateEventoModale
                    isOpen={createEventModal}
                    onClose={() => setCreateEventModal(false)}
                    onCreate={handleCreateEvento}
                    agendaId={agenda.id}
                    dataInizio={createPayload.startISO}
                    dataFine={createPayload.endISO}
                    defaultValues={{ stato: "Pianificato", rating: 0 }}
                />
            )}
        </>
    );
};
