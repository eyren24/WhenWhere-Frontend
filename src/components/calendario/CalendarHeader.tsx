import { FaTrash } from "react-icons/fa6";
import type { ResAgendaDTO } from "../../services/api";

export const CalendarHeader = ({
                                   agenda,
                                   onDelete,
                               }: {
    agenda: ResAgendaDTO;
    onDelete: () => void;
}) => {
    return (
        <div
            className="relative w-full rounded-md mb-5 p-3 flex items-center justify-between gap-3 transition"
            style={{
                backgroundColor: agenda.tema,
            }}
        >
            {/* Overlay per leggibilità */}
            <div className="absolute inset-0 bg-black/5 rounded-md pointer-events-none"></div>

            {/* Contenuto */}
            <div className="relative z-10 flex flex-col w-full">
                <h3
                    className="text-sm sm:text-base font-semibold text-gray-900 truncate"
                    title={agenda.nomeAgenda}
                >
                    {agenda.nomeAgenda}
                </h3>

                {agenda.descrizione && (
                    <p
                        className="text-xs sm:text-sm text-gray-700 truncate"
                        title={agenda.descrizione}
                    >
                        {agenda.descrizione}
                    </p>
                )}
            </div>

            <button
                type="button"
                onClick={onDelete}
                aria-label="Elimina agenda"
                className="
                    relative z-10 inline-flex items-center justify-center
                    w-9 h-9 rounded-full
                    text-red-500 hover:text-red-600
                    hover:bg-white/40 active:scale-95
                    transition
                "
            >
                <FaTrash className="text-[17px]" />
            </button>
        </div>
    );
};
