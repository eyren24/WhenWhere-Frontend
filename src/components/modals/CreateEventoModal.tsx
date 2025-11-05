import {useEffect, useState} from "react";
import {BaseModal} from "./BaseModal";
import "../../assets/css/modals/CreateEventoModal.css";
import type {DateClickArg} from "@fullcalendar/interaction";
import {FaMapMarkerAlt, FaRegClock, FaRegStar, FaStar, FaTag} from "react-icons/fa";
import toast from "react-hot-toast";
import type {ReqEventoDTO, ResAgendaDTO, ResTagDTO} from "../../services/api";
import {useEventoStore} from "../../stores/EventoStore.ts";

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
    const [oraInizio, setOraInizio] = useState("09:00");
    const [oraFine, setOraFine] = useState("10:00");
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
        setOraInizio("09:00");
        setOraFine("10:00");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);

        const titolo = (formdata.get("titolo") as string)?.trim();
        const descrizione = (formdata.get("descrizione") as string)?.trim() || "";
        const dataFineFinale = terminato ? dataInizio : (formdata.get("dataFine") as string);
        const luogo = (formdata.get("luogo") as string)?.trim();
        const stato = (formdata.get("stato") as string)?.trim();
        const notifica = formdata.get("notifica") === "on";
        const tagId = Number(formdata.get("tagId")) || 0;

        if (!titolo) return toast.error("Il titolo è obbligatorio");
        if (!dataInizio) return toast.error("Seleziona la data di inizio");
        if (!oraInizio) return toast.error("Seleziona l’ora di inizio");
        if (!terminato && !dataFineFinale) return toast.error("Seleziona la data di fine");
        if (!oraFine) return toast.error("Seleziona l’ora di fine");
        if (!luogo) return toast.error("Inserisci il luogo dell’evento");
        if (!stato) return toast.error("Inserisci lo stato dell’evento");
        if (!tagId) return toast.error("Seleziona un tag per l’evento");

        const dto: ReqEventoDTO = {
            titolo,
            descrizione,
            dataInizio: `${dataInizio}T${oraInizio}`,
            dataFine: `${dataFineFinale}T${oraFine}`,
            luogo,
            stato,
            tagId,
            notifica,
            rating: terminato ? rating : 0,
            agendaId: agenda.id,
        };

        createEvent(dto)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    onSave();
                    resetForm();
                    e.currentTarget.reset();
                } else toast.error(res.message);
            })
            .catch(console.error)
            .finally(() => onClose());
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={`Nuovo evento - ${new Date(selectedDate.dateStr).toLocaleDateString("it-IT")}`}
            width="min(95%, 640px)"
        >
            <form className="create-evento-form" onSubmit={handleSubmit}>
                <div className="evento-grid">
                    <label>
                        <div className="label-header">
                            <FaTag className="icon"/> Titolo
                        </div>
                        <input type="text" name="titolo" placeholder="Titolo evento"/>
                    </label>

                    <label>
                        <div className="label-header">
                            <FaTag className="icon"/> Tag
                        </div>
                        <select name="tagId" defaultValue="">
                            <option value="">-- Seleziona tag --</option>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.nome}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="date-group">
                        <div className="date-group">
                            <div className="date-time">
                                <div className="datetime-field">
                                    <label>
                                        <div className="label-header">
                                            <FaRegClock className="icon"/> Inizio
                                        </div>
                                        <input
                                            type="date"
                                            name="dataInizio"
                                            value={dataInizio}
                                            onChange={(e) => setDataInizio(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="datetime-field">
                                    <input
                                        type="time"
                                        name="oraInizio"
                                        value={oraInizio}
                                        onChange={(e) => setOraInizio(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="date-time">
                                <div className="datetime-field">
                                    <label>
                                        <div className="label-header">
                                            <FaRegClock className="icon"/> Fine
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
                                <div className="datetime-field">
                                    <input
                                        type="time"
                                        name="oraFine"
                                        value={oraFine}
                                        onChange={(e) => setOraFine(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkbox-row full-width">
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
                            <input type="checkbox" name="notifica"/>
                            Notifica
                        </label>
                    </div>

                    <label className="full-width">
                        <div className="label-header">
                            <FaMapMarkerAlt className="icon"/> Luogo
                        </div>
                        <input type="text" name="luogo" placeholder="Luogo evento"/>
                    </label>

                    <label className="full-width">
                        <div className="label-header">Descrizione</div>
                        <textarea
                            name="descrizione"
                            placeholder="Descrizione breve..."
                            rows={3}
                        />
                    </label>

                    {terminato && (
                        <div className="rating-row full-width">
                            <span>
                                <FaStar className="icon"/> Valutazione
                            </span>
                            <div className="stars">
                                {Array.from({length: 5}, (_, i) =>
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
                    )}

                    <button type="submit" className="create-evento-submit full-width">
                        Salva evento
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};
