import React from "react";
import { ModalShell } from "./ModalShell";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    dateLabel: string;
    accentHex: string;
    onPick: (type: "nota" | "evento") => void;
};

export const QuickCreateChoice: React.FC<Props> = ({ isOpen, onClose, dateLabel, accentHex, onPick }) => {
    return (
        <ModalShell isOpen={isOpen} onClose={onClose} title="Cosa vuoi creare?">
            <div className="quick-create-wrapper">
                <p className="quick-create-subtitle">
                    Data selezionata: <span className="quick-create-date">{dateLabel}</span>
                </p>

                <div className="quick-create-options">
                    <button
                        type="button"
                        className="quick-create-button"
                        style={{ borderColor: accentHex }}
                        onClick={() => onPick("nota")}
                    >
                        <div className="quick-create-icon" style={{ backgroundColor: accentHex }}>📝</div>
                        <h3 className="quick-create-title">Scrivi una nota</h3>
                        <p className="quick-create-desc">Un appunto veloce per ricordarti qualcosa.</p>
                    </button>

                    <button
                        type="button"
                        className="quick-create-button"
                        style={{ borderColor: accentHex }}
                        onClick={() => onPick("evento")}
                    >
                        <div className="quick-create-icon" style={{ backgroundColor: accentHex }}>📅</div>
                        <h3 className="quick-create-title">Crea un evento</h3>
                        <p className="quick-create-desc">Titolo, orario e dettagli dell’attività.</p>
                    </button>
                </div>

                <div className="quick-create-footer">
                    <button
                        type="button"
                        onClick={onClose}
                        className="quick-create-cancel"
                    >
                        Annulla
                    </button>
                </div>
            </div>
        </ModalShell>
    );
};
