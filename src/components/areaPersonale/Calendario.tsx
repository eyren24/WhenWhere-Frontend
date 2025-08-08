import { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { ResAgendaDTO, ResEventoDTO } from "../../services/api";
import { useAgendaStore } from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {EventApi, EventClickArg, EventContentArg, EventInput} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import {MostraEvento} from "../modals/MostraEvento.tsx";

interface CalendarioProps {
    agenda: ResAgendaDTO;
}

const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? "star filled" : "star"}>
        ★
      </span>
        );
    }
    return <div className="stars">{stars}</div>;
};

const mapEvents = (
    events: ResEventoDTO[]
): EventInput[] => {
    return events.map((e) => {
        const start = new Date(e.dataInizio);
        let end = e.dataFine ? new Date(e.dataFine) : undefined;

        if (end && start.getTime() === end.getTime()) {
            end = undefined;
        }

        return {
            id: String(e.id),
            title: e.titolo,
            start,
            end,
            extendedProps: {
                descrizione: e.descrizione,
                rating: e.rating,
                stato: e.stato,
                notifica: e.notifica,
                tagNome: "Sconosciuto",
            },
        };
    });
};

export const Calendario = ({ agenda }: CalendarioProps) => {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { getAllEventi } = useAgendaStore();
    const calendarRef = useRef<FullCalendar | null>(null);

    useEffect(() => {
        if (!agenda.id) return;
        getAllEventi(agenda.id, {})
            .then((res) => {
                if (res.success) {
                    setEvents(mapEvents(res.events ?? []));
                }
            })
            .catch((err) => {
                toast.error(err);
            });
    }, [agenda.id, getAllEventi]);

    const handleDateClick = (arg: DateClickArg) => {
        console.log("Clicked date: ", arg.dateStr);
    };

    const handleEventClick = (arg: EventClickArg) => {
        setSelectedEvent(arg.event);
        setModalOpen(true);
    };

    const renderEventContent = (eventInfo: EventContentArg) => {
        const { event } = eventInfo;
        const rating = event.extendedProps.rating ?? 0;
        return (
            <div className="fc-event-content-custom">
                <b>{event.title}</b>
                {renderStars(rating)}
            </div>
        );
    };

    return (
        <>
            <div className="calendar-wrapper compact-calendar">
                <h3>{agenda.descrizione}</h3>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="it"
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                    height="auto"
                    contentHeight={500}
                />
            </div>

            {modalOpen && selectedEvent && (
                <MostraEvento selectedEvent={selectedEvent} setModalOpen={setModalOpen} />
            )}
        </>
    );
};
