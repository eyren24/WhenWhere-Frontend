import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {ReqEventoDTO, ReqNotaDTO, ResAgendaDTO, ResEventoDTO, ResTagDTO} from "../../services/api";
import { useAgendaStore } from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type { DateSelectArg, EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventRenderers } from "./EventRenderers.tsx";
import { mapEvents } from "./EventMappers.tsx";
import CreateEventoModale from "../modals/CreateEventoModale.tsx";
import { MostraEvento } from "../modals/MostraEvento.tsx";
import { motion } from "framer-motion";
import { emitAgendaChanged } from "../../stores/lib/agendaBus";
import {QuickCreateChoice} from "../areaPersonale/QuickCreateChoice.tsx";
import {CreateNotaModal} from "../areaPersonale/CreateNotaModal.tsx";
import { CalendarCard } from "../areaPersonale/CalendarCard.tsx";
import {CalendarHeader} from "../areaPersonale/CalendarHeader.tsx";
import {CalendarSkeleton} from "../areaPersonale/CalendarSkeleton.tsx";

type Props = {
    agenda: ResAgendaDTO;
    onDeleteAgenda?: () => void;
    tags?: ResTagDTO[]; // lista dei tag (stessa della creazione evento)
    onCreateNota?: (payload: ReqNotaDTO) => Promise<void> | void;
};

function isEventoDTO(v: unknown): v is ResEventoDTO {
    if (!v || typeof v !== "object") return false;
    const o = v as Record<string, unknown>;
    return typeof o.id === "number" && typeof o.titolo === "string" && typeof o.dataInizio === "string";
}
const isHex = (c?: string) => !!c && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c);

export const Calendario: React.FC<Props> = ({ agenda, onDeleteAgenda, tags = [], onCreateNota }) => {
    const { isLoading, createEvent, getAllEventi, deleteAgenda } = useAgendaStore();

    const calendarRef = useRef<FullCalendar | null>(null);
    const [eventi, setEventi] = useState<EventInput[]>([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<ResEventoDTO | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [createEventModal, setCreateEventModal] = useState(false);
    const [createPayload, setCreatePayload] = useState<{ startISO: string; endISO: string } | null>(null);
    const [askDelete, setAskDelete] = useState(false);

    // quick choice + nota
    const [quickChoiceOpen, setQuickChoiceOpen] = useState(false);
    const [range, setRange] = useState<{ startISO: string; endISO: string } | null>(null);
    const [showNoteModal, setShowNoteModal] = useState(false);

    const accent = useMemo(() => (isHex(agenda.tema) ? (agenda.tema as string) : "#0ea5e9"), [agenda.tema]);
    const ONE_HOUR = 60 * 60 * 1000;

    const handleRenderEventContent = useCallback(
        (eventInfo: EventContentArg): React.ReactElement => EventRenderers(eventInfo),
        []
    );

    const refreshEvents = useCallback((): void => {
        setEventsLoading(true);
        getAllEventi(agenda.id, {})
            .then((res) => {
                if (res.success) setEventi(mapEvents(res.events ?? []));
                else toast.error(res.error ?? "Errore durante la ricezione degli eventi.");
            })
            .catch((err: unknown) => console.error(err))
            .finally(() => setEventsLoading(false));
    }, [agenda.id, getAllEventi]);

    const handleCreateEvento = useCallback(
        (evento: ReqEventoDTO): void => {
            if (isLoading) return;
            createEvent(evento)
                .then((res) => {
                    if (res.success) {
                        toast.success(res.message ?? "Evento creato con successo!");
                        refreshEvents();
                        setCreateEventModal(false);
                        emitAgendaChanged();
                    } else {
                        toast.error(res.error ?? "Errore durante la creazione dell'evento.");
                    }
                })
                .catch(() => toast.error("Impossibile creare l'evento."));
        },
        [createEvent, isLoading, refreshEvents]
    );

    // === scelta rapida ===
    const openQuickChoice = useCallback((start: Date, end: Date) => {
        setRange({ startISO: start.toISOString(), endISO: end.toISOString() });
        setQuickChoiceOpen(true);
    }, []);

    const handleDateClick = useCallback((arg: DateClickArg): void => {
        openQuickChoice(arg.date, new Date(arg.date.getTime() + ONE_HOUR));
    }, [openQuickChoice]);

    const handleSelect = useCallback((arg: DateSelectArg): void => {
        const start = arg.start;
        const end = arg.allDay ? new Date(start.getTime() + 24 * 60 * 60 * 1000) : arg.end ?? new Date(start.getTime() + ONE_HOUR);
        openQuickChoice(start, end);
    }, [openQuickChoice]);

    const handleEventClick = useCallback(
        (arg: EventClickArg): void => {
            const raw = arg.event.extendedProps?.raw;
            if (isEventoDTO(raw)) {
                setSelectedEvent(raw);
                setShowEventModal(true);
            } else {
                getAllEventi(agenda.id, {})
                    .then((res) => {
                        if (res.success && res.events) {
                            const found = res.events.find((ev) => ev.titolo === arg.event.title);
                            if (found) {
                                setSelectedEvent(found);
                                setShowEventModal(true);
                            }
                        }
                    })
                    .catch((err) => console.error(err));
            }
        },
        [agenda.id, getAllEventi]
    );

    const internalDeleteAgenda = useCallback((): void => {
        const tId = toast.loading("Eliminazione in corso...");
        deleteAgenda(agenda.id)
            .then((res) => {
                if (!res?.success) throw new Error(res?.error ?? "Impossibile eliminare l'agenda");
                toast.success("Agenda eliminata.", { id: tId });
                setEventi([]);
                emitAgendaChanged();
            })
            .catch((e: unknown) => toast.error(String(e), { id: tId }));
    }, [agenda.id, deleteAgenda]);

    const confirmDelete = useCallback((): void => {
        setAskDelete(false);
        if (onDeleteAgenda) onDeleteAgenda();
        else internalDeleteAgenda();
    }, [onDeleteAgenda, internalDeleteAgenda]);

    useEffect(() => { refreshEvents(); }, [refreshEvents]);

    return (
        <>
            <div className="w-full px-3 sm:px-4">
                <div className="mx-auto max-w-[760px]">
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                        <CalendarCard accent={accent}>
                            <CalendarHeader
                                title={agenda.nomeAgenda}
                                subtitle={agenda.descrizione || ""}
                                accent={accent}
                                askDelete={askDelete}
                                setAskDelete={setAskDelete}
                                onConfirmDelete={confirmDelete}
                            />

                            <div className="rounded-xl p-2 sm:p-3 bg-white/60 backdrop-blur-sm shadow-sm border" style={{ borderColor: "#e5e7eb", transform: "scale(0.95)", transformOrigin: "top center" }}>
                                {eventsLoading ? (
                                    <CalendarSkeleton />
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
                                        headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
                                        dayMaxEvents
                                    />
                                )}
                            </div>
                        </CalendarCard>
                    </motion.div>
                </div>
            </div>

            {/* Modali evento */}
            {showEventModal && selectedEvent ? (
                <MostraEvento
                    isOpen={showEventModal}
                    onClose={() => { setSelectedEvent(null); setShowEventModal(false); }}
                    selectedEvent={selectedEvent}
                />
            ) : null}

            {createEventModal && createPayload ? (
                <CreateEventoModale
                    isOpen={createEventModal}
                    onClose={() => setCreateEventModal(false)}
                    onCreate={handleCreateEvento}
                    agendaId={agenda.id}
                    dataInizio={createPayload.startISO}
                    dataFine={createPayload.endISO}
                    defaultValues={{ stato: "Pianificato", rating: 0 }}
                />
            ) : null}

            {/* Scelta rapida */}
            {quickChoiceOpen && range ? (
                <QuickCreateChoice
                    isOpen={quickChoiceOpen}
                    onClose={() => setQuickChoiceOpen(false)}
                    dateLabel={new Intl.DateTimeFormat("it-IT", { dateStyle: "full", timeStyle: "short" }).format(new Date(range.startISO))}
                    accentHex={accent}
                    onPick={(type) => {
                        setQuickChoiceOpen(false);
                        if (type === "evento") {
                            setCreatePayload({ startISO: range.startISO, endISO: range.endISO });
                            setCreateEventModal(true);
                        } else {
                            setShowNoteModal(true);
                        }
                    }}
                />
            ) : null}

            {/* Create Nota */}
            {showNoteModal && range ? (
                <CreateNotaModal
                    isOpen={showNoteModal}
                    onClose={() => setShowNoteModal(false)}
                    accentHex={accent}
                    agendaId={agenda.id}
                    startISO={range.startISO}
                    endISO={range.endISO}
                    tags={tags}
                    onSubmit={(payload) => {
                        if (onCreateNota) return onCreateNota(payload);
                        toast("Collega 'onCreateNota' per salvare la nota.");
                    }}
                />
            ) : null}
        </>
    );
};
