import "../../assets/css/AreaPersonale/EditAgendaModal.css";
import { useState } from "react";

interface Props {
    onClose: () => void;
}

export const EditAgendaModal = ({ onClose }: Props) => {
    const [nome, setNome] = useState("");
    const [colore, setColore] = useState("#03ace4");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nuovo nome:", nome, "Colore:", colore);
        onClose();
    };

    return (
        <div className="agenda-modal-backdrop" onClick={onClose}>
            <div className="agenda-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Modifica agenda</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Inserisci nome"
                            required
                        />
                    </label>
                    <label>
                        Colore
                        <input
                            type="color"
                            value={colore}
                            onChange={(e) => setColore(e.target.value)}
                        />
                    </label>

                    <div className="agenda-modal-actions">
                        <button type="submit" className="btn-confirm">
                            Salva
                        </button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
