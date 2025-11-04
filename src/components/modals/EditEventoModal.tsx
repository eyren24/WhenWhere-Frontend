import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import "../../assets/css/modals/EditEventoModal.css";
import { FaCalendarCheck, FaTag, FaStickyNote, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import type { ReqUpdateEventoDTO, ResEventoDTO, ResTagDTO } from "../../services/api";
import { useEventoStore } from "../../stores/EventoStore.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    evento: ResEventoDTO;
    onSave: () => void;
}

export const EditEventoModal = ({ isOpen, onClose, evento, onSave }: Props) => {
    const { aggiornaEvento, getTags } = useEventoStore();
    const [tags, setTags] = useState<ResTagDTO[]>([]);

    const [titolo, setTitolo] = useState(evento.titolo);
    const [stato, setStato] = useState(evento.stato);
    const [descrizione, setDescrizione] = useState(evento.descrizione);
    const [tagId, setTagId] = useState<number>(evento.tagId);

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

        const dto: ReqUpdateEventoDTO = {
            titolo,
            stato,
            descrizione,
            tagId,
        };

        aggiornaEvento(evento.id, dto)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message || "Evento aggiornato");
                    onSave();
                    onClose();
                } else {
                    toast.error(res.error || "Errore aggiornamento evento");
                }
            })
            .catch(console.error);
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Modifica evento ${evento.titolo}`}
            width="500px"
        >
            <form className="edit-evento-form" onSubmit={handleSubmit}>
                <label>
                    <div className="edit-evento-label">
                        <FaCalendarCheck className="edit-evento-icon" /> Titolo
                    </div>
                    <input
                        type="text"
                        name="titolo"
                        value={titolo}
                        onChange={(e) => setTitolo(e.target.value)}
                        placeholder="Titolo evento"
                        required
                    />
                </label>

                <label>
                    <div className="edit-evento-label">
                        <FaStickyNote className="edit-evento-icon" /> Descrizione
                    </div>
                    <textarea
                        name="descrizione"
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                        placeholder="Descrizione breve..."
                        rows={4}
                        required
                    />
                </label>

                <label>
                    <div className="edit-evento-label">
                        <FaInfoCircle className="edit-evento-icon" /> Stato
                    </div>
                    <input
                        type="text"
                        name="stato"
                        value={stato}
                        onChange={(e) => setStato(e.target.value)}
                        placeholder="Esempio: in corso / annullato"
                        required
                    />
                </label>

                <label>
                    <div className="edit-evento-label">
                        <FaTag className="edit-evento-icon" /> Tag
                    </div>
                    <select
                        name="tagId"
                        value={tagId}
                        onChange={(e) => setTagId(Number(e.target.value))}
                        required
                    >
                        <option value="">-- Seleziona un tag --</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.nome}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="edit-evento-submit">
                    Aggiorna evento
                </button>
            </form>
        </BaseModal>
    );
};
