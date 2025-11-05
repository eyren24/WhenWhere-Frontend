import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import "../../assets/css/modals/EditEventoModal.css";
import { FaCalendarCheck, FaInfoCircle, FaStickyNote, FaTag, FaTrash } from "react-icons/fa";
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
    const { aggiornaEvento, getTags, deleteEvento } = useEventoStore();
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

    const handleDelete = () => {
        deleteEvento(evento.id)
            .then((res) => {
                if (res.success) toast.success(res.message || "Evento eliminato");
                else toast.error(res.error || "Errore durante l'eliminazione");
            })
            .catch(console.error)
            .finally(() => {
                onSave();
                onClose();
            });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!titolo.trim()) return toast.error("Inserisci un titolo valido");
        if (!stato.trim()) return toast.error("Inserisci lo stato dell'evento");
        if (!descrizione.trim()) return toast.error("Inserisci una descrizione");
        if (!tagId) return toast.error("Seleziona un tag");

        const dto: ReqUpdateEventoDTO = { titolo, stato, descrizione, tagId };

        aggiornaEvento(evento.id, dto)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message || "Evento aggiornato");
                    onSave();
                    onClose();
                } else toast.error(res.error || "Errore aggiornamento evento");
            })
            .catch(console.error);
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Modifica evento - ${evento.titolo}`}
            width="min(95%, 600px)"
        >
            <form className="edit-evento-form" onSubmit={handleSubmit}>
                <div className="edit-grid">
                    <label>
                        <div className="edit-evento-label">
                            <FaCalendarCheck className="edit-evento-icon" /> Titolo
                        </div>
                        <input
                            type="text"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            placeholder="Titolo evento"
                        />
                    </label>

                    <label>
                        <div className="edit-evento-label">
                            <FaInfoCircle className="edit-evento-icon" /> Stato
                        </div>
                        <input
                            type="text"
                            value={stato}
                            onChange={(e) => setStato(e.target.value)}
                            placeholder="Esempio: in corso / annullato"
                        />
                    </label>

                    <label className="full-width">
                        <div className="edit-evento-label">
                            <FaStickyNote className="edit-evento-icon" /> Descrizione
                        </div>
                        <textarea
                            value={descrizione}
                            onChange={(e) => setDescrizione(e.target.value)}
                            placeholder="Descrizione breve..."
                            rows={3}
                        />
                    </label>

                    <label className="full-width">
                        <div className="edit-evento-label">
                            <FaTag className="edit-evento-icon" /> Tag
                        </div>
                        <select
                            value={tagId}
                            onChange={(e) => setTagId(Number(e.target.value))}
                        >
                            <option value="">-- Seleziona un tag --</option>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.nome}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="edit-evento-footer">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="edit-evento-delete"
                        >
                            <FaTrash />
                            <span>Elimina</span>
                        </button>
                        <button type="submit" className="edit-evento-submit">
                            Aggiorna evento
                        </button>
                    </div>
                </div>
            </form>
        </BaseModal>
    );
};
