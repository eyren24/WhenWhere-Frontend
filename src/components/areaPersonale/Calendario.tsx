import {useEffect, useMemo, useRef, useState} from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {type DateClickArg} from "@fullcalendar/interaction";
import type {ResAgendaDTO, ResEventoDTO} from "../../services/api";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {EventApi, EventClickArg, EventContentArg, EventInput} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import {MostraEvento} from "../modals/MostraEvento.tsx";
import {FaTrash} from "react-icons/fa6";
import {emitAgendaChanged} from "../../stores/lib/agendaBus.ts";
import "../../assets/css/calendarTheme.css";
import type { JSX } from "react";


interface CalendarioProps {
    agenda: ResAgendaDTO;
}

/** ---------- THEME PRESETS (10) ---------- */
type CalendarPresetId =
    | "ocean"
    | "forest"
    | "sunset"
    | "grape"
    | "sky"
    | "coral"
    | "slate"
    | "mint"
    | "amber"
    | "rose";

interface CalendarTheme {
    id: CalendarPresetId;
    label: string;
    // CSS variables
    bg: string;           // background container
    fg: string;           // text color base
    headerBg: string;     // header/topbar background
    headerFg: string;     // header/topbar text
    accent: string;       // borders, hover, focus
    eventBg: string;      // event background
    eventFg: string;      // event text
}

const THEME_PRESETS: CalendarTheme[] = [
    { id: "ocean",  label: "Ocean",  bg: "#0b1220", fg: "#e6eefc", headerBg: "#12284a", headerFg: "#e6eefc", accent: "#3da9fc", eventBg: "#2a4365", eventFg: "#e6eefc" },
    { id: "forest", label: "Forest", bg: "#0f1310", fg: "#e7f5e5", headerBg: "#1f3d2a", headerFg: "#e7f5e5", accent: "#58c497", eventBg: "#2d5a3a", eventFg: "#e7f5e5" },
    { id: "sunset", label: "Sunset", bg: "#1b1410", fg: "#ffeadd", headerBg: "#5e2a17", headerFg: "#ffeadd", accent: "#ff8e3c", eventBg: "#7a341e", eventFg: "#ffeadd" },
    { id: "grape",  label: "Grape",  bg: "#120f18", fg: "#efe7ff", headerBg: "#2a1b4a", headerFg: "#efe7ff", accent: "#a78bfa", eventBg: "#3d2b6b", eventFg: "#efe7ff" },
    { id: "sky",    label: "Sky",    bg: "#0f1216", fg: "#e8f3ff", headerBg: "#16324a", headerFg: "#e8f3ff", accent: "#7cc4ff", eventBg: "#214b73", eventFg: "#e8f3ff" },
    { id: "coral",  label: "Coral",  bg: "#171012", fg: "#ffeef0", headerBg: "#4a1f25", headerFg: "#ffeef0", accent: "#ff6b6b", eventBg: "#6b2b33", eventFg: "#ffeef0" },
    { id: "slate",  label: "Slate",  bg: "#0f1115", fg: "#e6eaf2", headerBg: "#1f2430", headerFg: "#e6eaf2", accent: "#8aa1c1", eventBg: "#2b3342", eventFg: "#e6eaf2" },
    { id: "mint",   label: "Mint",   bg: "#0e1412", fg: "#e6fff7", headerBg: "#1a3c33", headerFg: "#e6fff7", accent: "#3fe0b5", eventBg: "#24564a", eventFg: "#e6fff7" },
    { id: "amber",  label: "Amber",  bg: "#161208", fg: "#fff6e0", headerBg: "#3a2a08", headerFg: "#fff6e0", accent: "#fbbf24", eventBg: "#5a3f0c", eventFg: "#fff6e0" },
    { id: "rose",   label: "Rose",   bg: "#140f12", fg: "#ffe6f0", headerBg: "#3a1f2d", headerFg: "#ffe6f0", accent: "#f472b6", eventBg: "#5b2b43", eventFg: "#ffe6f0" },
];

const THEME_STORAGE_KEY = (agendaId: number) => `calendar-theme:${agendaId}`;

const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<span key={i} className={i <= rating ? "star filled" : "star"}>★</span>);
    }
    return <div className="stars">{stars}</div>;
};

const mapEvents = (events: ResEventoDTO[]): EventInput[] => {
    return events.map((e) => {
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
};

export const Calendario = ({ agenda }: CalendarioProps) => {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { deleteAgenda, getAllEventi } = useAgendaStore();
    const calendarRef = useRef<FullCalendar | null>(null);

    // Load persisted theme or default
    const persistedThemeId: CalendarPresetId | null = useMemo(() => {
        if (!agenda.id) return null;
        const raw = localStorage.getItem(THEME_STORAGE_KEY(agenda.id));
        return (raw as CalendarPresetId | null) ?? null;
    }, [agenda.id]);

    const [theme, setTheme] = useState<CalendarTheme>(() => {
        const fallback = THEME_PRESETS[0];
        if (!persistedThemeId) return fallback;
        return THEME_PRESETS.find(t => t.id === persistedThemeId) ?? fallback;
    });

    useEffect(() => {
        if (!agenda.id) return;
        getAllEventi(agenda.id, {})
            .then((res) => {
                if (res.success) setEvents(mapEvents(res.events ?? []));
            })
            .catch((err) => toast.error(err));
    }, [agenda.id, getAllEventi]);

    // Persist theme when it changes
    useEffect(() => {
        if (agenda.id) {
            localStorage.setItem(THEME_STORAGE_KEY(agenda.id), theme.id);
        }
    }, [agenda.id, theme.id]);

    const handleDateClick = (arg: DateClickArg) => {
        console.log("Clicked date: ", arg.dateStr);
    };

    const handleEventClick = (arg: EventClickArg) => {
        setSelectedEvent(arg.event);
        setModalOpen(true);
    };

    const renderEventContent = (eventInfo: EventContentArg) => {
        const { event } = eventInfo;
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
            .then((res) => {
                if (res.success) toast.success(res.message || "Agenda eliminata con successo!");
                else toast.error(res.error || "Impossibile eliminare l'agenda!");
            })
            .catch((err) => console.log(err));
        emitAgendaChanged();
    };

    const onPickTheme = (id: CalendarPresetId) => {
        const next = THEME_PRESETS.find(t => t.id === id);
        if (next) setTheme(next);
    };

    // Inline CSS variables for this instance
    const cssVars: React.CSSProperties & Record<
        "--cal-bg" | "--cal-fg" | "--cal-header-bg" | "--cal-header-fg" |
        "--cal-accent" | "--cal-event-bg" | "--cal-event-fg", string
    > = {
        "--cal-bg": theme.bg,
        "--cal-fg": theme.fg,
        "--cal-header-bg": theme.headerBg,
        "--cal-header-fg": theme.headerFg,
        "--cal-accent": theme.accent,
        "--cal-event-bg": theme.eventBg,
        "--cal-event-fg": theme.eventFg
    };

    return (
        <>
            <div className="calendar-wrapper compact-calendar" style={cssVars}>
                {/* Header + Theme Picker */}
                <div className="calendar-header-wrapper" style={{ background: "var(--cal-header-bg)", color: "var(--cal-header-fg)" }}>
                    <h3 title={agenda.descrizione || ""}>{agenda.descrizione || "Nessuna descrizione"}</h3>
                    <div className="calendar-actions">
                        <ThemePicker
                            current={theme.id}
                            onPick={onPickTheme}
                        />
                        <FaTrash onClick={() => handleDeleteAgenda(agenda.id)} className='icon calendar-trash-icon' />
                    </div>
                </div>

                {/* Calendar */}
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
                    // As fallback, set event colors (we still primarily theme via CSS vars)
                    eventColor={theme.eventBg}
                    eventTextColor={theme.eventFg}
                />
            </div>

            {modalOpen && selectedEvent && (
                <MostraEvento selectedEvent={selectedEvent} setModalOpen={setModalOpen}/>
            )}
        </>
    );
};

/** ---------- ThemePicker (UI) ---------- */
interface ThemePickerProps {
    current: CalendarPresetId;
    onPick: (id: CalendarPresetId) => void;
}

const ThemePicker = ({ current, onPick }: ThemePickerProps) => {
    return (
        <div className="theme-picker" role="listbox" aria-label="Selettore tema calendario">
            {THEME_PRESETS.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    className={`theme-swatch ${current === t.id ? "active" : ""}`}
                    onClick={() => onPick(t.id)}
                    title={t.label}
                    aria-pressed={current === t.id}
                    style={{
                        background: `linear-gradient(135deg, ${t.headerBg} 0%, ${t.eventBg} 100%)`,
                        color: t.headerFg,
                    }}
                >
                    <span className="theme-dot" style={{ background: t.accent }} />
                </button>
            ))}
        </div>
    );
};
