import {FaAlignLeft, FaBook, FaLock, FaLockOpen, FaPalette} from "react-icons/fa";
import {BaseModal} from "./BaseModal.tsx";
import type {ReqUpdateAgenda, ResAgendaDTO} from "../../services/api";
import "../../assets/css/modals/editAgendaModal.css";
import {useState} from "react";

interface Props {
    onClose: () => void;
    onSave: (data: ReqUpdateAgenda) => void;
    agenda: ResAgendaDTO;
}

export const EditAgendaModal = ({
                                    onClose,
                                    onSave,
                                    agenda
                                }: Props) => {
    const [isPrivate, setIsPrivate] = useState(agenda.isprivate);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const nomeAgenda = formdata.get("nomeAgenda") as string;
        const descrizione = formdata.get("descrizione") as string;
        const tema = formdata.get("tema") as string;

        const dto: ReqUpdateAgenda = {
            nomeAgenda,
            descrizione,
            tema,
            isprivate: isPrivate,
        }
        onSave(dto);
        onClose();
    };

    return (
        <BaseModal isOpen={true} onClose={onClose} title="Modifica agenda" width="520px">
            <form onSubmit={handleSubmit} className="edit-agenda-modal-form">
                {/* Nome */}
                <div className="edit-agenda-modal-group">
                    <label className="edit-agenda-modal-label">
                        <FaBook className="edit-agenda-modal-icon"/>
                        Nome Agenda
                    </label>
                    <input
                        type="text"
                        name="nomeAgenda"
                        defaultValue={agenda.nomeAgenda}
                        className="edit-agenda-modal-input"
                        required
                        placeholder="Es. Diario segreto"
                    />
                </div>

                {/* Descrizione */}
                <div className="edit-agenda-modal-group">
                    <label className="edit-agenda-modal-label">
                        <FaAlignLeft className="edit-agenda-modal-icon"/>
                        Descrizione
                    </label>
                    <textarea
                        name="descrizione"
                        defaultValue={agenda.descrizione || "Nessuna descrizione"}
                        className="edit-agenda-modal-textarea"
                        placeholder="Aggiungi una breve descrizione (opzionale)"
                        rows={3}
                    />
                </div>

                <div className="edit-agenda-modal-group">
                    <label className="edit-agenda-modal-label">
                        <FaPalette className="edit-agenda-modal-icon"/>
                        Colore Tema
                    </label>
                    <div className="edit-agenda-modal-color-wrapper">
                        <input
                            type="color"
                            name="tema"
                            defaultValue={agenda.tema}
                            onChange={(e) => (agenda.tema = e.target.value)}
                            className="edit-agenda-modal-color-input"
                        />
                        <span className="edit-agenda-modal-color-code">{agenda.tema}</span>
                    </div>
                </div>


                <div className="edit-agenda-modal-group edit-agenda-modal-toggle-group">
                    <label className="edit-agenda-modal-label">
                        {isPrivate ? (
                            <FaLock className="edit-agenda-modal-icon"/>
                        ) : (
                            <FaLockOpen className="edit-agenda-modal-icon"/>
                        )}
                        Privacy
                    </label>
                    <div
                        className={`edit-agenda-modal-toggle ${isPrivate ? "" : "active"}`}
                        onClick={() => setIsPrivate((prev) => !prev)}
                    >
                        <div className="edit-agenda-modal-toggle-circle"/>
                        <span className="edit-agenda-modal-toggle-text">
            {isPrivate ? "Privata" : "Pubblica"}
        </span>
                    </div>
                    <input type="hidden" name="isprivate" onChange={() => setIsPrivate((prev) => !prev)}
                           defaultValue={String(isPrivate)}/>
                </div>


                {/* Actions */}
                <div className="edit-agenda-modal-actions">
                    <button type="submit" className="edit-agenda-modal-btn-primary">
                        Salva
                    </button>
                    <button
                        type="button"
                        className="edit-agenda-modal-btn-secondary"
                        onClick={onClose}
                    >
                        Annulla
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};
