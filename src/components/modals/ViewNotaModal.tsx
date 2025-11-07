import "../../assets/css/modals/ViewNotaModal.css";

interface Props {
    nota: {
        title: string;
        contenuto?: string;
        start?: string;
        color?: string;
    };
    onClose: () => void;
}

export const ViewNotaModal = ({ nota, onClose }: Props) => {
    return (
        <div className="modal-overlay">
            <div className="view-modal" style={{ borderTopColor: nota.color }}>
                <h3 className="view-title">{nota.title}</h3>
                <p><b>Data creazione:</b> {nota.start ? new Date(nota.start).toLocaleString("it-IT") : "-"}</p>
                <p><b>Contenuto:</b> {nota.contenuto || "Nessun contenuto"}</p>
                <button className="close-btn" onClick={onClose}>Chiudi</button>
            </div>
        </div>
    );
};
