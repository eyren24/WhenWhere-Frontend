import "../../assets/css/AreaPersonale/Agenda.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import { EditAgendaModal } from "../modals/EditAgendaModal.tsx";

export const Agenda = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateClick = (arg: { dateStr: string }) => {
        console.log("Giorno cliccato:", arg.dateStr);
    };

    const handleSaveChanges = ()=>{

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
                    events={[
                        { title: "Evento di prova", date: "2025-10-28" },
                    ]}
                    dateClick={handleDateClick}
                />
            </div>

            {isModalOpen && (
                <EditAgendaModal onSave={handleSaveChanges} onClose={() => setIsModalOpen(false)} />
            )}
        </section>
    );
};
