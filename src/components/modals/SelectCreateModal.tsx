import { FaCalendarPlus, FaStickyNote } from "react-icons/fa";
import { BaseModal } from "./BaseModal";
import type { DateClickArg } from "@fullcalendar/interaction";
import "../../assets/css/modals/SelectCreateModal.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: DateClickArg;
    onCreateEvento: (arg: DateClickArg) => void;
    onCreateNota: (arg: DateClickArg) => void;
}

export const SelectCreateModal = ({
                                      isOpen,
                                      onClose,
                                      selectedDate,
                                      onCreateEvento,
                                      onCreateNota,
                                  }: Props) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Crea per il ${new Date(selectedDate.dateStr).toLocaleDateString("it-IT")}`}
            width="400px"
        >
            <div className="select-modal-content">
                <button
                    className="select-btn evento"
                    onClick={() => onCreateEvento(selectedDate)}
                >
                    <FaCalendarPlus className="select-icon" />
                    Crea Evento
                </button>

                <button
                    className="select-btn nota"
                    onClick={() => onCreateNota(selectedDate)}
                >
                    <FaStickyNote className="select-icon" />
                    Crea Nota
                </button>
            </div>
        </BaseModal>
    );
};
