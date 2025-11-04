import {useEffect, useState} from "react";
import {BaseModal} from "./BaseModal";
import "../../assets/css/modals/CreateEventoModal.css"; // usa lo stesso CSS per coerenza
import type {DateClickArg} from "@fullcalendar/interaction";
import {FaPalette, FaStickyNote, FaTag} from "react-icons/fa";
import toast from "react-hot-toast";
import type {ReqNotaDTO, ResAgendaDTO, ResTagDTO} from "../../services/api";
import {useNoteStore} from "../../stores/NoteStore.ts";
import {useEventoStore} from "../../stores/EventoStore.ts";

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
    const {createNote} = useNoteStore();
    const {getTags} = useEventoStore();
    const [tags, setTags] = useState<ResTagDTO[]>([]);

    useEffect(() => {
        getTags()
            .then((res) => {
                if (res.success) setTags(res.tags || []);
                else toast.error(res.error || "Errore caricamento tag");
            })
            .catch(console.error);
    }, [getTags]);

    const resetForm = (form: HTMLFormElement) => {
        form.reset();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);

        const titolo = formdata.get("titolo") as string;
        const descrizione = (formdata.get("descrizione") as string);
        const tema = (formdata.get("tema") as string);
        const tagId = Number(formdata.get("tagId"));

        const dto: ReqNotaDTO = {
            titolo,
            descrizione,
            tema,
            tagId,
            agendaId: agenda.id,
            dataCreazione: selectedDate.dateStr
        };

        createNote(dto)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    onSave();
                    resetForm(e.currentTarget);
                } else {
                    toast.error(res.message);
                }
            })
            .catch(console.error)
            .finally(() => onClose());
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Nuova nota - ${new Date(selectedDate.dateStr).toLocaleDateString("it-IT")}`}
            width="480px"
        >
            <form className="create-evento-form" onSubmit={handleSubmit}>
                <label>
                    <div className="label-header">
                        <FaStickyNote className="icon"/> Titolo
                    </div>
                    <input
                        type="text"
                        name="titolo"
                        placeholder="Titolo della nota"
                        required
                    />
                </label>

                <label>
                    <div className="label-header">
                        <FaStickyNote className="icon"/> Descrizione
                    </div>
                    <textarea
                        name="descrizione"
                        placeholder="Contenuto o appunto..."
                        rows={4}
                    />
                </label>

                <label>
                    <div className="label-header">
                        <FaPalette className="icon"/> Tema (colore o stile)
                    </div>
                    <input
                        type="text"
                        name="tema"
                        placeholder="Esempio: blu, #03ace4, 'chiaro', ecc."
                    />
                </label>

                <label>
                    <div className="label-header">
                        <FaTag className="icon"/> Tag
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

                <button type="submit" className="create-evento-submit">
                    Salva nota
                </button>
            </form>
        </BaseModal>
    );
};
