import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import "../../assets/css/modals/EditNotaModal.css";
import { FaPalette, FaStickyNote, FaTag } from "react-icons/fa";
import toast from "react-hot-toast";
import type { ReqUpdateNotaDTO, ResNotaDTO, ResTagDTO } from "../../services/api";
import { useNoteStore } from "../../stores/NoteStore.ts";
import { useEventoStore } from "../../stores/EventoStore.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    nota: ResNotaDTO;
    onSave: () => void;
}

export const EditNotaModal = ({ isOpen, onClose, nota, onSave }: Props) => {
    const { updateNote } = useNoteStore();
    const { getTags } = useEventoStore();
    const [tags, setTags] = useState<ResTagDTO[]>([]);

    const [titolo, setTitolo] = useState(nota.titolo);
    const [descrizione, setDescrizione] = useState(nota.descrizione || "");
    const [tema, setTema] = useState(nota.tema);
    const [tagId, setTagId] = useState<number>(nota.tagId);

    useEffect(() => {
        getTags()
            .then((res) => {
                if (res.success) setTags(res.tags || []);
                else toast.error(res.error || "Errore caricamento tag");
            })
            .catch(console.error);
    }, [getTags]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto: ReqUpdateNotaDTO = { titolo, descrizione, tema, tagId };

        updateNote(nota.id, dto)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message || "Nota aggiornata");
                    onSave();
                    onClose();
                } else {
                    toast.error(res.error || "Errore aggiornamento nota");
                }
            })
            .catch(console.error);
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Modifica nota ${nota.titolo}`}
            width="480px"
        >
            <form className="edit-nota-form" onSubmit={handleSubmit}>
                <label>
                    <div className="edit-nota-label">
                        <FaStickyNote className="edit-nota-icon" /> Titolo
                    </div>
                    <input
                        type="text"
                        name="titolo"
                        value={titolo}
                        onChange={(e) => setTitolo(e.target.value)}
                        placeholder="Titolo della nota"
                        required
                    />
                </label>

                <label>
                    <div className="edit-nota-label">
                        <FaStickyNote className="edit-nota-icon" /> Descrizione
                    </div>
                    <textarea
                        name="descrizione"
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                        placeholder="Contenuto o appunto..."
                        rows={4}
                    />
                </label>

                <label>
                    <div className="edit-nota-label">
                        <FaPalette className="edit-nota-icon" /> Tema
                    </div>
                    <input
                        type="text"
                        name="tema"
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                        placeholder="Esempio: #03ace4 o blu"
                    />
                </label>

                <label>
                    <div className="edit-nota-label">
                        <FaTag className="edit-nota-icon" /> Tag
                    </div>
                    <select
                        name="tagId"
                        value={tagId}
                        onChange={(e) => setTagId(Number(e.target.value))}
                    >
                        <option value="">-- Nessun tag --</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.nome}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="edit-nota-submit">
                    Aggiorna nota
                </button>
            </form>
        </BaseModal>
    );
};
