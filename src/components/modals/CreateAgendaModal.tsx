import { useState } from "react";
import type { ReqAgendaDTO } from "../../services/api";
import "../../assets/css/modals/createAgendaModal.css";
import { FaBook, FaLock, FaPalette, FaRegStickyNote, FaUnlock } from "react-icons/fa";
import { BaseModal } from "./BaseModal.tsx";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: ReqAgendaDTO) => void;
}

export const CreateAgendaModal = ({ isOpen, onClose, onCreate }: Props) => {
    const [isPrivate, setIsPrivate] = useState(true); // ⬅️ stato checkbox
    const [selectedColor, setSelectedColor] = useState("#03ace4");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const nomeAgenda = formData.get("nomeAgenda") as string;
        const descrizione = (formData.get("descrizione") as string) || "";
        const tema = (formData.get("tema") as string) || "#03ace4";

        const finalData: ReqAgendaDTO = {
            nomeAgenda,
            descrizione,
            tema,
            isprivate: isPrivate,
        };

        onCreate(finalData);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Crea una nuova agenda">
            <form onSubmit={handleSubmit} className="cam-form">
                <div className="cam-group">
                    <label className="cam-label">
                        <FaBook className="cam-icon" />
                        Nome Agenda
                    </label>
                    <input
                        name="nomeAgenda"
                        type="text"
                        className="cam-input"
                        required
                        placeholder="Es. Diario personale"
                    />
                </div>

                <div className="cam-group">
                    <label className="cam-label">
                        <FaRegStickyNote className="cam-icon" />
                        Descrizione (opzionale)
                    </label>
                    <textarea
                        name="descrizione"
                        className="cam-textarea"
                        placeholder="Breve descrizione della tua agenda"
                    />
                </div>

                <div className="cam-group">
                    <label className="cam-label">
                        <FaPalette className="cam-icon" />
                        Colore Tema
                        <span style={{ fontWeight: 400, fontSize: "0.85rem" }}>(opzionale)</span>
                    </label>

                    <div className="cam-color-wrapper">
                        <input
                            type="color"
                            name="tema"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="cam-color-input"
                        />
                        <div
                            className="cam-color-swatch"
                            style={{ backgroundColor: selectedColor }}
                        />
                        <span className="cam-color-code">{selectedColor}</span>
                    </div>
                </div>

                <div className="cam-toggle">
                    <input
                        type="checkbox"
                        id="cam-private"
                        checked={isPrivate}
                        onChange={() => setIsPrivate((prev) => !prev)}
                    />
                    <label htmlFor="cam-private" className="cam-label">
                        {isPrivate ? <FaLock className="cam-icon" /> : <FaUnlock className="cam-icon" />}
                        {isPrivate ? "Privata" : "Pubblica"}
                    </label>
                </div>

                <div className="cam-actions">
                    <button type="submit" className="cam-btn-primary">
                        Crea
                    </button>
                    <button type="button" className="cam-btn-secondary" onClick={onClose}>
                        Annulla
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};
