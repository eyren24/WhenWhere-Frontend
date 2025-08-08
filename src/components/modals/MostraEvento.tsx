import type {EventApi} from "@fullcalendar/core";

const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? "star filled" : "star"}>
        ★
      </span>
        );
    }
    return <div className="stars">{stars}</div>;
};

export const MostraEvento = ({selectedEvent, setModalOpen}: {
    selectedEvent: EventApi,
    setModalOpen: (view: boolean) => void
}) => {
    return (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{selectedEvent.title}</h2>
                <div>
                    <strong>Descrizione:</strong>{" "}
                    {selectedEvent.extendedProps.descrizione || "-"}
                </div>
                <div>
                    <strong>Stato:</strong> {selectedEvent.extendedProps.stato || "-"}
                </div>
                <div>
                    <strong>Tag:</strong> {selectedEvent.extendedProps.tagNome}
                </div>
                <div>
                    <strong>Rating:</strong>{" "}
                    {renderStars(selectedEvent.extendedProps.rating ?? 0)}
                </div>
                {selectedEvent.extendedProps.notifica && (
                    <p className="notifica">🔔 Notifica attiva</p>
                )}
                <button className="btn-close" onClick={() => setModalOpen(false)}>
                    Chiudi
                </button>
            </div>
        </div>
    );
};
