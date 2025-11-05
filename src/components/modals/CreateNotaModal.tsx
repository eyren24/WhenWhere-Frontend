import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import "../../assets/css/modals/CreateNotaModal.css";
import type { DateClickArg } from "@fullcalendar/interaction";
import { FaPalette, FaStickyNote, FaTag } from "react-icons/fa";
import toast from "react-hot-toast";
import type { ReqNotaDTO, ResAgendaDTO, ResTagDTO } from "../../services/api";
import { useNoteStore } from "../../stores/NoteStore.ts";
import { useEventoStore } from "../../stores/EventoStore.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: DateClickArg;
    onSave: () => void;
    agenda: ResAgendaDTO;
}

export const CreateNotaModal = ({
                                    isOpen,
                                    onClose,
                                    selectedDate,
                                    onSave,
                                    agenda,
                                }: Props) => {
    const { createNote } = useNoteStore();
    const { getTags } = useEventoStore();
    const [tags, setTags] = useState<ResTagDTO[]>([]);
    const [tema, setTema] = useState("#03ace4");

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
        const formdata = new FormData(e.currentTarget);

        const titolo = (formdata.get("titolo") as string)?.trim();
        const descrizione = (formdata.get("descrizione") as string)?.trim();
        const tagId = Number(formdata.get("tagId"));

        if (!titolo) {
            toast.error("Inserisci un titolo per la nota");
            return;
        }

        const dto: ReqNotaDTO = {
            titolo,
            descrizione: descrizione || "",
            tema,
            tagId,
            agendaId: agenda.id,
            dataCreazione: selectedDate.dateStr,
        };

        createNote(dto)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    onSave();
                    e.currentTarget.reset();
                    setTema("#03ace4");
                } else toast.error(res.message);
            })
            .catch(console.error)
            .finally(() => onClose());
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Nuova nota - ${new Date(selectedDate.dateStr).toLocaleDateString("it-IT")}`}
            width="min(95%, 600px)"
        >
            <form className="create-nota-form" onSubmit={handleSubmit}>
                <div className="form-card">
                    <label>
                        <div className="label-header">
                            <FaStickyNote className="icon" /> Titolo
                        </div>
                        <input
                            type="text"
                            name="titolo"
                            placeholder="Titolo della nota"
                        />
                    </label>

                    <label>
                        <div className="label-header">
                            <FaTag className="icon" /> Tag
                        </div>
                        <select name="tagId" defaultValue="">
                            <option value="">-- Nessun tag --</option>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.nome}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <div className="label-header">
                            <FaPalette className="icon" /> Tema
                        </div>
                        <div className="color-picker">
                            <input
                                type="color"
                                name="tema"
                                value={tema}
                                onChange={(e) => setTema(e.target.value)}
                            />
                            <span className="color-text">Colore nota</span>
                        </div>
                    </label>

                    <label className="full-width">
                        <div className="label-header">
                            <FaStickyNote className="icon" /> Descrizione
                        </div>
                        <textarea
                            name="descrizione"
                            placeholder="Contenuto o appunto..."
                            rows={4}
                        />
                    </label>

                    <button type="submit" className="create-nota-submit full-width">
                        Salva nota
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};
