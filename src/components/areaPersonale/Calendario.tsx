import {useEffect, useRef, useState} from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {type DateClickArg} from "@fullcalendar/interaction";
import type {ResAgendaDTO, ResEventoDTO, ReqEventoDTO} from "../../services/api";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {
    EventClickArg,
    EventContentArg,
    EventInput,
    DateSelectArg,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import {MostraEvento} from "../modals/MostraEvento.tsx";
import {FaTrash} from "react-icons/fa6";
import {emitAgendaChanged} from "../../stores/lib/agendaBus.ts";
import "../../assets/css/calendarTheme.css";
import type {JSX} from "react";
import {CreateEventoModale} from "../modals/CreateEventoModale.tsx";

interface CalendarioProps {
    agenda: ResAgendaDTO;
}

type PastelThemeId =
    | "mint" | "peach" | "lavender" | "sky" | "butter"
    | "coral" | "lilac" | "sage" | "powder" | "blush";

const PASTEL_THEMES: { id: PastelThemeId; label: string }[] = [
    {id: "mint", label: "Menta"},
    {id: "peach", label: "Pesca"},
    {id: "lavender", label: "Lavanda"},
    {id: "sky", label: "Cielo"},
    {id: "butter", label: "Burro"},
    {id: "coral", label: "Corallo"},
    {id: "lilac", label: "Lilla"},
    {id: "sage", label: "Salvia"},
    {id: "powder", label: "Polvere"},
    {id: "blush", label: "Blush"},
];

const THEME_KEY = (id: number) => `agenda-theme:${id}`;

const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<span key={i} className={i <= rating ? "star filled" : "star"}>★</span>);
    }
    return <div className="stars">{stars}</div>;
};

const mapEvents = (events: ResEventoDTO[]): EventInput[] =>
    events.map((e) => {
        const start = new Date(e.dataInizio);
        let end = e.dataFine ? new Date(e.dataFine) : undefined;
        if (end && start.getTime() === end.getTime()) end = undefined;
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


export const Calendario = ({agenda}: CalendarioProps) => {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<ResEventoDTO | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [creaEventoModal, setCreaEventoModal] = useState(false);
    const [createPayload, setCreatePayload] = useState<{ startISO: string; endISO: string } | null>(null);

    const {deleteAgenda, getAllEventi, createEvent} = useAgendaStore();
    const calendarRef = useRef<FullCalendar | null>(null);

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [contentHeight, setContentHeight] = useState<number>(560);

    useEffect(() => {
        const compute = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            setIsMobile(vw < 760);
            const h = Math.max(420, Math.min(860, Math.floor(vh - 220)));
            setContentHeight(h);
        };
        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, []);

    const [themeId, setThemeId] = useState<PastelThemeId>(() => {
        const raw = agenda.id ? (localStorage.getItem(THEME_KEY(agenda.id)) as PastelThemeId | null) : null;
        return raw ?? "sky";
    });

    useEffect(() => {
        if (!agenda.id) return;
        const raw = localStorage.getItem(THEME_KEY(agenda.id)) as PastelThemeId | null;
        if (raw) setThemeId(raw);
    }, [agenda.id]);

    const onPickTheme = (id: PastelThemeId) => {
        setThemeId(id);
        if (agenda.id) localStorage.setItem(THEME_KEY(agenda.id), id);
    };

    useEffect(() => {
        if (!agenda.id) return;
        getAllEventi(agenda.id, {})
            .then((res) => {
                if (res.success) setEvents(mapEvents(res.events ?? []));
            })
            .catch((err) => toast.error(typeof err === "string" ? err : (err as Error).message));
    }, [agenda.id, getAllEventi]);

    const ONE_HOUR = 60 * 60 * 1000;
    const handleDateClick = (arg: DateClickArg) => {
        const startISO = arg.date.toISOString();
        const endISO = new Date(arg.date.getTime() + ONE_HOUR).toISOString();
        setCreatePayload({startISO, endISO});
        setCreaEventoModal(true);
    };

    const handleSelect = (arg: DateSelectArg) => {
        const start = arg.start;
        let end = arg.end;
        if (arg.allDay) {
            end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
        }
        setCreatePayload({startISO: start.toISOString(), endISO: end.toISOString()});
        setCreaEventoModal(true);
    };

    const handleEventClick = async (arg: EventClickArg) => {
        await getAllEventi(agenda.id, {}).then((res) => {
            if (res.success && res.events) {
                const foundEvent = res.events.find(ev => ev.titolo === arg.event.title);
                if (!foundEvent)
                    return
                setSelectedEvent(foundEvent);
                setModalOpen(true);
            }
        })

    };

    const renderEventContent = (eventInfo: EventContentArg): JSX.Element => {
        const {event} = eventInfo;
        const rating = (event.extendedProps as { rating?: number }).rating ?? 0;
        return (
            <div className="fc-event-content-custom">
                <b>{event.title}</b>
                {renderStars(rating)}
            </div>
        );
    };

    const handleDeleteAgenda = async (agendaId: number) => {
        await deleteAgenda(agendaId)
            .then((res) =>
                res.success
                    ? toast.success(res.message || "Agenda eliminata con successo!")
                    : toast.error(res.error || "Impossibile eliminare l'agenda!")
            )
            .catch((err) => console.log(err));
        emitAgendaChanged();
    };

    const handleCreateEvento = async (dto: ReqEventoDTO) => {
        try {
            const res = await createEvent(dto);
            if (res.success) {
                toast.success(res.message ?? "Evento creato!");
                setCreaEventoModal(false);
                const r = await getAllEventi(agenda.id, {});
                if (r.success) setEvents(mapEvents(r.events ?? []));
                emitAgendaChanged();
            } else {
                toast.error(res.error ?? "Errore durante la creazione dell'evento.");
            }
        } catch (err) {
            toast.error(typeof err === "string" ? err : (err as Error).message);
        }
    };

    return (
        <>
            <div className={`calendar-outer theme-${themeId}`}>
                <div className="calendar-wrapper compact-calendar">
                    <div className="calendar-header-wrapper">
                        <h3 title={agenda.descrizione || ""}>{agenda.descrizione || "Nessuna descrizione"}</h3>
                        <div className="calendar-actions">
                            <ThemePills themes={PASTEL_THEMES} current={themeId} onPick={onPickTheme}/>
                            <button
                                className="calendar-trash-btn"
                                onClick={() => handleDeleteAgenda(agenda.id)}
                                aria-label="Elimina agenda"
                            >
                                <FaTrash className="icon calendar-trash-icon"/>
                            </button>
                        </div>
                    </div>

                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={isMobile ? "dayGridWeek" : "dayGridMonth"}
                        locale="it"
                        events={events}
                        dateClick={handleDateClick}
                        select={handleSelect}
                        selectable={true}
                        eventClick={handleEventClick}
                        eventContent={renderEventContent}
                        height="auto"
                        contentHeight={contentHeight}
                        expandRows={true}
                        handleWindowResize={true}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: ""
                        }}
                        dayMaxEvents={true}
                    />
                </div>
            </div>

            {modalOpen && selectedEvent && (
                <MostraEvento selectedEvent={selectedEvent} onClose={()=>{setSelectedEvent(null); setModalOpen(false)}} setModalOpen={setModalOpen}/>
            )}

            {creaEventoModal && createPayload && (
                <CreateEventoModale
                    isOpen={creaEventoModal}
                    onClose={() => setCreaEventoModal(false)}
                    onCreate={handleCreateEvento}
                    agendaId={agenda.id}
                    dataInizio={createPayload.startISO}
                    dataFine={createPayload.endISO}
                    defaultValues={{stato: "Pianificato", rating: 0}}
                />
            )}
        </>
    );
};

interface ThemePillsProps {
    themes: { id: PastelThemeId; label: string }[];
    current: PastelThemeId;
    onPick: (id: PastelThemeId) => void;
}

const ThemePills = ({themes, current, onPick}: ThemePillsProps) => {
    return (
        <div className="theme-pills" role="radiogroup" aria-label="Tema calendario">
            {themes.map((t) => (
                <label key={t.id} className={`pill ${current === t.id ? "active" : ""}`}>
                    <input
                        type="radio"
                        name="calendar-theme"
                        value={t.id}
                        checked={current === t.id}
                        onChange={() => onPick(t.id)}
                    />
                    <span className={`dot dot-${t.id}`}/>
                    <span className="pill-text">{t.label}</span>
                </label>
            ))}
        </div>
    );
};
