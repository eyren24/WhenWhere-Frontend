import { useState } from "react";
import { FaBook, FaPalette } from "react-icons/fa";
import { BaseModal } from "./BaseModal.tsx";

interface Props {
    onClose: () => void;
    onSave: (data: { nome: string; colore: string }) => void;
    defaultNome?: string;
    defaultColore?: string;
}

export const EditAgendaModal = ({ onClose, onSave, defaultNome = "", defaultColore = "#03ace4" }: Props) => {
    const [nome, setNome] = useState(defaultNome);
    const [colore, setColore] = useState(defaultColore);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({ nome, colore });
        onClose();
    };

    return (
        <BaseModal isOpen={true} onClose={onClose} title="Modifica agenda">
            <form onSubmit={handleSubmit} className="cam-form">
                <div className="cam-group">
                    <label className="cam-label">
                        <FaBook className="cam-icon" />
                        Nome Agenda
                    </label>
                    <input
                        type="text"
                        className="cam-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        placeholder="Es. Diario segreto"
                    />
                </div>

                <div className="cam-group">
                    <label className="cam-label">
                        <FaPalette className="cam-icon" />
                        Colore Tema
                    </label>

                    <div className="cam-color-wrapper">
                        <input
                            type="color"
                            name="colore"
                            value={colore}
                            onChange={(e) => setColore(e.target.value)}
                            className="cam-color-input"
                        />
                        <div
                            className="cam-color-swatch"
                            style={{ backgroundColor: colore }}
                        />
                        <span className="cam-color-code">{colore}</span>
                    </div>
                </div>

                <div className="cam-actions">
                    <button type="submit" className="cam-btn-primary">
                        Salva
                    </button>
                    <button type="button" className="cam-btn-secondary" onClick={onClose}>
                        Annulla
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};
