import "../../assets/css/AreaPersonale/Agenda.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaPen } from "react-icons/fa";

export const Agenda = () => {
    const handleDateClick = (arg: { dateStr: string }) => {
        console.log("Giorno cliccato:", arg.dateStr);
        // TODO: Apri modale / aggiungi evento
    };

    return (
        <section className="agenda-wrapper">
            <div className="agenda-toolbar-extra">
                <button
                    className="agenda-edit-btn"
                    onClick={() => console.log("Modifica agenda")}
                    aria-label="Modifica agenda"
                >
                    <FaPen />
                </button>
            </div>

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
        </section>
    );
};
