import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";
import "../../assets/css/modals/CreateEventoModal.css";
import type { DateClickArg } from "@fullcalendar/interaction";
import { FaMapMarkerAlt, FaRegClock, FaRegStar, FaStar, FaTag } from "react-icons/fa";
import toast from "react-hot-toast";
import type { ReqEventoDTO, ResAgendaDTO, ResTagDTO } from "../../services/api";
import { useEventoStore } from "../../stores/EventoStore.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: DateClickArg;
    onSave: () => void;
    agenda: ResAgendaDTO;
}

export const CreateEventoModal = ({
                                      isOpen,
                                      onClose,
                                      selectedDate,
                                      onSave,
                                      agenda,
                                  }: Props) => {
    const { getTags, createEvent } = useEventoStore();
    const [tags, setTags] = useState<ResTagDTO[]>([]);
    const [terminato, setTerminato] = useState(false);
    const [dataInizio, setDataInizio] = useState(selectedDate.dateStr);
    const [dataFine, setDataFine] = useState(selectedDate.dateStr);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        getTags()
            .then((res) => {
                if (res.success) setTags(res.tags || []);
                else toast.error(res.error || "Errore caricamento tag");
            })
            .catch(console.error);
    }, [getTags]);

    useEffect(() => {
        if (terminato) setDataFine(dataInizio);
    }, [terminato, dataInizio]);

    const resetForm = () => {
        setTerminato(false);
        setRating(0);
        setDataInizio(selectedDate.dateStr);
        setDataFine(selectedDate.dateStr);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);

        const titolo = formdata.get("titolo") as string;
        const descrizione = (formdata.get("descrizione") as string) || "";
        const dataFineFinale = terminato ? dataInizio : (formdata.get("dataFine") as string);
        const luogo = (formdata.get("luogo") as string);
        const stato = (formdata.get("stato") as string) || "";
        const notifica = formdata.get("notifica") === "on";
        const tagId = Number(formdata.get("tagId")) || 0;

        const dto: ReqEventoDTO = {
            titolo,
            descrizione,
            dataInizio,
            dataFine: dataFineFinale,
            luogo,
            stato,
            tagId,
            notifica,
            rating,
            agendaId: agenda.id,
        };

        createEvent(dto)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    onSave();
                    resetForm(); // reset completo degli state
                    e.currentTarget.reset(); // reset campi del form
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
            title={`Nuovo evento - ${new Date(selectedDate.dateStr).toLocaleDateString("it-IT")}`}
            width="520px"
        >
            <form className="create-evento-form" onSubmit={handleSubmit}>
                <label>
                    <div className="label-header">Titolo</div>
                    <input type="text" name="titolo" placeholder="Titolo evento" required />
                </label>

                <label>
                    <div className="label-header">Descrizione</div>
                    <textarea name="descrizione" placeholder="Descrizione breve..." rows={3} />
                </label>

                <div className="date-row">
                    <label>
                        <div className="label-header">
                            <FaRegClock className="icon" /> Inizio
                        </div>
                        <input
                            type="date"
                            name="dataInizio"
                            value={dataInizio}
                            onChange={(e) => setDataInizio(e.target.value)}
                        />
                    </label>

                    <label>
                        <div className="label-header">
                            <FaRegClock className="icon" /> Fine
                        </div>
                        <input
                            type="date"
                            name="dataFine"
                            value={dataFine}
                            onChange={(e) => setDataFine(e.target.value)}
                            disabled={terminato}
                        />
                    </label>
                </div>

                <div className="checkbox-row">
                    <label>
                        <input
                            type="checkbox"
                            name="terminato"
                            checked={terminato}
                            onChange={(e) => setTerminato(e.target.checked)}
                        />
                        Terminato
                    </label>

                    <label>
                        <input type="checkbox" name="notifica" />
                        Notifica
                    </label>
                </div>

                <div className="rating-row">
                    <span>
                        <FaStar className="icon" /> Valutazione
                    </span>
                    <div className="stars">
                        {Array.from({ length: 5 }, (_, i) =>
                            i < rating ? (
                                <FaStar
                                    key={i}
                                    onClick={() => setRating(i + 1)}
                                    className="star active"
                                />
                            ) : (
                                <FaRegStar
                                    key={i}
                                    onClick={() => setRating(i + 1)}
                                    className="star"
                                />
                            )
                        )}
                    </div>
                </div>

                <div className="row">
                    <label>
                        <div className="label-header">
                            <FaMapMarkerAlt className="icon" /> Luogo
                        </div>
                        <input type="text" name="luogo" placeholder="Luogo evento" />
                    </label>

                    <label>
                        <div className="label-header">Stato</div>
                        <input
                            type="text"
                            name="stato"
                            placeholder="Esempio: in corso / annullato"
                        />
                    </label>
                </div>

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

                <button type="submit" className="create-evento-submit">
                    Salva evento
                </button>
            </form>
        </BaseModal>
    );
};
