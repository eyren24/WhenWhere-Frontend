import "../../assets/css/AreaPersonale/Agenda.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {ResAgendaDTO} from "../../services/api";
import {CustomLoader} from "./CustomLoader.tsx";

export const AgendaPubblica = () => {
    const {getAgendaById} = useAgendaStore();
    const [agenda, setAgenda] = useState<ResAgendaDTO>();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        getAgendaById(Number(id))
            .then((res) => {
                if (res.success) setAgenda(res.agenda);
                else toast.error(res.error || "Errore generale!");
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [getAgendaById, id]);

    const mapAgendaToEvents = () => {
        if (!agenda) return [];

        const eventi = (agenda.eventi ?? []).map(e => ({
            id: `evento-${e.id}`,
            title: e.titolo,
            start: e.dataInizio,
            end: e.dataFine,
            color: agenda.tema,
        }));

        const note = (agenda.note ?? []).map(n => ({
            id: `nota-${n.id}`,
            title: n.titolo || "Nota",
            start: n.dataCreazione,
            color: "#bbb",
        }));

        return [...eventi, ...note];
    };


    return (
        <section className="agenda-wrapper">
            <div className="agenda-header">
                <h2 className="agenda-title">
                    {agenda?.nomeAgenda || "Agenda pubblica"}
                </h2>
                <p className="agenda-desc">
                    {agenda?.descrizione || "Nessuna descrizione disponibile"}
                </p>
            </div>

            {isLoading ? (
                <CustomLoader/>
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
                        events={mapAgendaToEvents()}
                        selectable={false}
                        editable={false}
                        dayMaxEvents={true}
                    />
                </div>
            )}
        </section>
    );
};
