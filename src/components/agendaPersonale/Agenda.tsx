import "../../assets/css/AreaPersonale/Agenda.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {FaPen} from "react-icons/fa";
import {useEffect, useState} from "react";
import {EditAgendaModal} from "../modals/EditAgendaModal.tsx";
import {useParams} from "react-router";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import toast from "react-hot-toast";
import type {ReqUpdateAgenda, ResAgendaDTO} from "../../services/api";
import {CustomLoader} from "../layout/CustomLoader.tsx";

export const Agenda = () => {
    const {getAgendaById, aggiorna} = useAgendaStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [agenda, setAgenda] = useState<ResAgendaDTO>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        getAgendaById(Number(id)).then((res) => {
            if (res.success) {
                setAgenda(res.agenda);
            } else {
                toast.error(res.error || "Errore generale!");
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [getAgendaById, id, refresh]);

    const handleDateClick = (arg: { dateStr: string }) => {
        console.log("Giorno cliccato:", arg.dateStr);
    };
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

    const handleSaveChanges = (dto: ReqUpdateAgenda) => {
        if (!agenda) return;
        aggiorna(agenda.id, dto).then((res) => {
            if (res.success) {
                toast.success(res.message || "Agenda aggiornata!")
            } else {
                toast.error(res.error || "Errore generale!");
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setRefresh((prev) => !prev);
        })
    }
    return (
        <section className="agenda-wrapper">
            <div className="agenda-header">
                <h2 className="agenda-title">La mia agenda</h2>
                <button
                    className="agenda-edit-btn"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Modifica agenda"
                >
                    <FaPen />
                </button>
            </div>
            {isLoading ? <CustomLoader/> :
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
                    dateClick={handleDateClick}
                />
            </div>
            }

            {isModalOpen && agenda && (
                <EditAgendaModal agenda={agenda} onSave={handleSaveChanges} onClose={() => setIsModalOpen(false)}/>
            )}
        </section>
    );
};
