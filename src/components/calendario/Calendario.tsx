import FullCalendar from "@fullcalendar/react";
import React, {useEffect, useMemo, useRef, useState} from "react";
import type {ReqEventoDTO, ResAgendaDTO, ResEventoDTO} from "../../services/api";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {DateSelectArg, EventClickArg, EventContentArg, EventInput} from "@fullcalendar/core";
import interactionPlugin, {type DateClickArg} from "@fullcalendar/interaction";
import {CalendarHeader} from "./CalendarHeader.tsx";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {EventRenderers} from "./EventRenderers.tsx";
import {mapEvents} from "./EventMappers.tsx";
import CreateEventoModale from "../modals/CreateEventoModale.tsx";
import {MostraEvento} from "../modals/MostraEvento.tsx";

export const Calendario = ({agenda}: { agenda: ResAgendaDTO }) => {
    const {isLoading, createEvent, getAllEventi, deleteAgenda} = useAgendaStore();

    const calendarRef = useRef<FullCalendar | null>(null);
    const [eventi, setEventi] = useState<EventInput[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<ResEventoDTO | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [createEventModal, setCreateEventModal] = useState(false);
    const [createPayload, setCreatePayload] = useState<{ startISO: string; endISO: string } | null>(null);

    const handleRenderEventContent = (eventInfo: EventContentArg): React.ReactElement =>
        EventRenderers(eventInfo);

    const ONE_HOUR = useMemo(() => 60 * 60 * 1000, []);

    const handleCreateEvento = async (evento: ReqEventoDTO) => {
        if (isLoading) return;
        try {
            const res = await createEvent(evento);
            if (res.success) {
                toast.success(res.message || "Evento creato con successo!");
                const r = await getAllEventi(agenda.id, {});
                if (r.success) setEventi(mapEvents(r.events || []));
                setCreateEventModal(false);
            } else {
                toast.error(res.error || "Errore durante la creazione dell'evento.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDateClick = (arg: DateClickArg) => {
        const startISO = arg.date.toISOString();
        const endISO = new Date(arg.date.getTime() + ONE_HOUR).toISOString();
        setCreatePayload({startISO, endISO});
        setCreateEventModal(true);
    };

    const handleSelect = (arg: DateSelectArg) => {
        const start = arg.start;
        let end = arg.end;
        if (arg.allDay) end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
        setCreatePayload({startISO: start.toISOString(), endISO: end!.toISOString()});
        setCreateEventModal(true);
    };

    const handleEventClick = async (arg: EventClickArg) => {
        // Se hai messo extendedProps.raw in mapEvents, usa quello:
        const raw = arg.event.extendedProps?.raw as ResEventoDTO | undefined;
        if (raw) {
            setSelectedEvent(raw);
            setShowEventModal(true);
            return;
        }
        // Fallback: ricerca per titolo (come facevi già)
        const res = await getAllEventi(agenda.id, {});
        if (res.success && res.events) {
            const found = res.events.find((ev) => ev.titolo === arg.event.title);
            if (!found) return;
            setSelectedEvent(found);
            setShowEventModal(true);
        }
    };

    const handleDeleteAgenda = async (agendaId: number) => {
        try {
            const res = await deleteAgenda(agendaId);
            if (!res.success) console.error(res.error || "Impossibile eliminare l'agenda");
            setEventi([]);
        } catch (e) {
            console.error((e as Error).message);
        }
    };

    useEffect(() => {
        getAllEventi(agenda.id, {})
            .then((res) => {
                if (res.success) setEventi(mapEvents(res.events || []));
                else toast.error(res.error || "Errore durante la ricezione degli eventi.");
            })
            .catch((err) => console.error(err));
    }, [agenda.id, getAllEventi]);

    return (
        <>
            <div className="w-full px-3 sm:px-4">
                <div
                    className="
            mx-auto max-w-[700px]
            bg-white/70 backdrop-blur
            rounded-2xl border border-gray-200
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            p-3 sm:p-4
            text-[13px]
            origin-top
          "
                    style={{ transform: "scale(0.95)" }}
                >
                    <CalendarHeader
                        agenda={agenda || "Nessuna descrizione"}
                        onDelete={() => handleDeleteAgenda(agenda.id)}
                    />

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
                </div>
            </div>

            {showEventModal && selectedEvent && (
                <MostraEvento
                    isOpen={showEventModal}
                    onClose={() => { setSelectedEvent(null); setShowEventModal(false); }}
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
