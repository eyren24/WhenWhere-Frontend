    import "../../assets/css/modals/ViewEventoModal.css";

    interface Props {
        evento: {
            title: string;
            descrizione?: string;
            start?: string;
            end?: string;
            color?: string;
        };
        onClose: () => void;
    }

    export const ViewEventoModal = ({ evento, onClose }: Props) => {
        return (
            <div className="modal-overlay">
                <div className="view-modal" style={{ borderTopColor: evento.color }}>
                    <h3 className="view-title">{evento.title}</h3>
                    <p><b>Inizio:</b> {evento.start ? new Date(evento.start).toLocaleString("it-IT") : "-"}</p>
                    <p><b>Fine:</b> {evento.end ? new Date(evento.end).toLocaleString("it-IT") : "-"}</p>
                    <p><b>Descrizione:</b> {evento.descrizione || "Nessuna descrizione"}</p>
                    <button className="close-btn" onClick={onClose}>Chiudi</button>
                </div>
            </div>
        );
    };
