import "../../assets/css/AreaPersonale/Agenda.css";
import FullCalendar from "@fullcalendar/react";
import type {EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { useAgendaStore } from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type { ResAgendaDTO } from "../../services/api";
import { CustomLoader } from "./CustomLoader.tsx";
import { ViewEventoModal } from "../modals/ViewEventoModal.tsx";
import { ViewNotaModal } from "../modals/ViewNotaModal.tsx";

interface EventoDisplay {
    id: string;
    type: "evento";
    title: string;
    start: string;
    end?: string;
    descrizione?: string;
    color: string;
}

interface NotaDisplay {
    id: string;
    type: "nota";
    title: string;
    start: string;
    contenuto?: string;
    color: string;
}

type CalendarItem = EventoDisplay | NotaDisplay;

export const AgendaPubblica = () => {
    const { getAgendaById } = useAgendaStore();
    const [agenda, setAgenda] = useState<ResAgendaDTO>();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEvento, setSelectedEvento] = useState<EventoDisplay | null>(null);
    const [selectedNota, setSelectedNota] = useState<NotaDisplay | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setIsLoading(true);
        getAgendaById(Number(id))
            .then((res) => {
                if (res.success) setAgenda(res.agenda);
                else toast.error(res.error || "Errore generale!");
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [getAgendaById, id]);

    const events = useMemo<CalendarItem[]>(() => {
        if (!agenda) return [];

        const eventi: EventoDisplay[] = (agenda.evento ?? []).map((e) => ({
            id: `evento-${e.id}`,
            type: "evento",
            title: e.titolo,
            start: e.dataInizio,
            end: e.dataFine,
            descrizione: e.descrizione,
            color: agenda.tema,
        }));

        const note: NotaDisplay[] = (agenda.nota ?? []).map((n) => ({
            id: `nota-${n.id}`,
            type: "nota",
            title: n.titolo || "Nota",
            start: n.dataCreazione,
            contenuto: n.descrizione,
            color: n.tema || "#bbb",
        }));

        return [...eventi, ...note];
    }, [agenda]);

    const handleEventClick = (info: EventClickArg) => {
        const props = info.event.extendedProps as CalendarItem;

        if (props.type === "evento") {
            const eventoSelezionato: EventoDisplay = {
                id: info.event.id,
                type: "evento",
                title: info.event.title,
                descrizione: props.descrizione,
                start: info.event.start?.toISOString() || "",
                end: info.event.end?.toISOString() || "",
                color: props.color,
            };
            setSelectedEvento(eventoSelezionato);
        } else {
            const notaSelezionata: NotaDisplay = {
                id: info.event.id,
                type: "nota",
                title: info.event.title,
                contenuto: (props as NotaDisplay).contenuto,
                start: info.event.start?.toISOString() || "",
                color: props.color,
            };
            setSelectedNota(notaSelezionata);
        }
    };



    return (
        <section className="agenda-wrapper">
            <div className="agenda-header">
                <h2 className="agenda-title">{agenda?.nomeAgenda || "Agenda pubblica"}</h2>
                <p className="agenda-desc">{agenda?.descrizione || "Nessuna descrizione disponibile"}</p>
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
                        eventClick={handleEventClick}
                        selectable={false}
                        editable={false}
                        dayMaxEvents
                    />
                </div>
            )}

            {selectedEvento && (
                <ViewEventoModal evento={selectedEvento} onClose={() => setSelectedEvento(null)} />
            )}
            {selectedNota && (
                <ViewNotaModal nota={selectedNota} onClose={() => setSelectedNota(null)} />
            )}
        </section>
    );
};
