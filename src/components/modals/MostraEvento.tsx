import {useEffect, useMemo, useRef, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import "../../assets/css/mostraEventoModale.css";
import {
    FaCalendarAlt,
    FaInfoCircle,
    FaBell,
    FaTag,
    FaPen,
    FaTimes,
    FaStar,
    FaPlus,
    FaSave,
    FaTimesCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import type {ReqUpdateEventoDTO, ResEventoDTO} from "../../services/api";
import {FaTrash} from "react-icons/fa6";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import {emitAgendaChanged} from "../../stores/lib/agendaBus.ts";
import {ClipLoader} from "react-spinners";

type MostraEventoProps = {
    selectedEvent: ResEventoDTO;
    setModalOpen: (open: boolean) => void;
    onClose: () => void;
};

const clampRating = (n: number) => Math.max(1, Math.min(5, Math.floor(n)));

export const MostraEvento = ({
                                 selectedEvent,
                                 setModalOpen,
                                 onClose,
                             }: MostraEventoProps) => {
    const {deleteEvento, isLoading, aggiornaEvento} = useAgendaStore();
    const descrizione: string = selectedEvent.descrizione ?? "";
    const stato: string = selectedEvent.stato ?? "";
    const tagNome: number = selectedEvent.tagId ?? "";
    const notifica: boolean = selectedEvent.notifica ?? false;
    const rating: number = selectedEvent.rating ?? 0;

    const hasRating = useMemo(() => rating > 0, [rating]);

    // Inline edit mode (stesso modale)
    const [isEditing, setIsEditing] = useState(false);
    const editFormRef = useRef<HTMLFormElement | null>(null);

    // Rating (solo se assente)
    const [addingRating, setAddingRating] = useState(false);
    const [tempRating, setTempRating] = useState<number>(3);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    useEffect(() => {
        setIsEditing(false);
        setAddingRating(false);
        setTempRating(3);
        setHoverRating(null);
    }, [selectedEvent?.id]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setModalOpen(false);
    };

    const handleSaveRating = () => {
        const value = clampRating(tempRating);
    }
    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const titolo = (fd.get("titolo") as string)?.trim();
        const nuovoStato = (fd.get("stato") as string)?.trim();
        const nuovaDescrizione = (fd.get("descrizione") as string)?.trim() ?? "";

        if (!titolo) {
            toast.error("Il titolo è obbligatorio.");
            return;
        }
        if (!nuovoStato) {
            toast.error("Lo stato è obbligatorio.");
            return;
        }

        const dto: ReqUpdateEventoDTO = {titolo, descrizione: nuovaDescrizione, tagId: 1, stato: nuovoStato};

        await aggiornaEvento(selectedEvent.id, dto).then((res) => {
            if (res.success) {
                toast.success(res.message || '')
            } else {
                toast.error(res.message || '')
            }
        }).catch((err) => {
            toast.error(err.message);
        })
        onClose();
        emitAgendaChanged();
    };
    const handleDeleteEvento = async () => {
        await deleteEvento(selectedEvent.id).then((res) => {
            if (res.success) {
                toast.success(res.message || '')
            } else {
                toast.error(res.message || '')
            }
        }).catch(err => {
            toast.error(err.message);
        });
        onClose();
        emitAgendaChanged();
    }
    const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        const t = setTimeout(() => firstFocusableRef.current?.focus(), 0);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="event-view-overlay"
                onMouseDown={handleBackdropClick}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <motion.div
                    className="event-view-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="event-view-title"
                    onMouseDown={(e) => e.stopPropagation()}
                    initial={{y: 18, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 12, opacity: 0}}
                    transition={{duration: 0.22, ease: [0.22, 1, 0.36, 1]}}
                >
                    {/* Header */}
                    <header className="event-view-header">
                        <div className="event-view-header-left">
                            <FaCalendarAlt className="event-view-icon" aria-hidden/>
                            <h2 id="event-view-title" className="event-view-title">
                                {selectedEvent.titolo}
                            </h2>
                        </div>
                        <button
                            ref={firstFocusableRef}
                            type="button"
                            className="event-view-close"
                            onClick={() => setModalOpen(false)}
                            aria-label="Chiudi"
                            title="Chiudi"
                        >
                            <FaTimes/>
                        </button>
                    </header>

                    {/* Body */}
                    <div className="event-view-body">
                        {!isEditing ? (
                            <>
                                <div className="event-view-row">
                  <span className="event-view-key">
                    <FaInfoCircle aria-hidden/> Descrizione:
                  </span>
                                    <span className="event-view-value">{descrizione || "-"}</span>
                                </div>

                                <div className="event-view-row">
                                    <span className="event-view-key">Stato:</span>
                                    <span className="event-view-badge">{stato || "-"}</span>
                                </div>

                                <div className="event-view-row">
                  <span className="event-view-key">
                    <FaTag aria-hidden/> Tag:
                  </span>
                                    <span className="event-view-value">{tagNome || "-"}</span>
                                </div>

                                {notifica && (
                                    <div className="event-view-row">
                    <span className="event-view-key">
                      <FaBell aria-hidden/> Notifica:
                    </span>
                                        <span className="event-view-value">Attiva</span>
                                    </div>
                                )}

                                {/* Rating: mostra solo se esiste */}
                                {hasRating ? (
                                    <div className="event-view-row">
                                        <span className="event-view-key">Valutazione:</span>
                                        <div
                                            className="event-view-stars"
                                            aria-label={`Valutazione ${rating}/5`}
                                        >
                                            {Array.from({length: 5}, (_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`event-view-star ${
                                                        i < rating ? "filled" : ""
                                                    }`}
                                                    aria-hidden
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    // Nessuna valutazione → mostra solo il pulsante per aggiungerla
                                    <div className="event-view-row">
                                        {!addingRating ? (
                                            <button
                                                type="button"
                                                className="event-view-btn event-view-btn-outline"
                                                onClick={() => setAddingRating(true)}
                                            >
                                                <FaPlus/> Aggiungi valutazione
                                            </button>
                                        ) : (
                                            <div className="event-view-add-rating">
                                                <div
                                                    className="event-view-stars-input"
                                                    role="radiogroup"
                                                    aria-label="Seleziona valutazione"
                                                >
                                                    {Array.from({length: 5}, (_, i) => {
                                                        const index = i + 1;
                                                        const active = (hoverRating ?? tempRating) >= index;
                                                        return (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                className={`event-view-star-btn ${
                                                                    active ? "active" : ""
                                                                }`}
                                                                onMouseEnter={() => setHoverRating(index)}
                                                                onMouseLeave={() => setHoverRating(null)}
                                                                onClick={() => setTempRating(index)}
                                                                aria-label={`${index} stelle`}
                                                            >
                                                                <FaStar/>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                <div className="event-view-actions">
                                                    <button
                                                        type="button"
                                                        className="event-view-btn event-view-btn-secondary"
                                                        onClick={() => {
                                                            setAddingRating(false);
                                                            setTempRating(3);
                                                            setHoverRating(null);
                                                        }}
                                                    >
                                                        <FaTimesCircle/> Annulla
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="event-view-btn event-view-btn-primary"
                                                        onClick={handleSaveRating}
                                                    >
                                                        <FaSave/> Salva
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            // EDIT INLINE: stesso modale
                            <form
                                ref={editFormRef}
                                className="event-view-editform"
                                onSubmit={handleEditSubmit}
                                noValidate
                            >
                                <div className="event-view-row">
                                    <label htmlFor="titolo" className="event-view-label">
                                        Titolo <span className="event-view-required">*</span>
                                    </label>
                                    <input
                                        id="titolo"
                                        name="titolo"
                                        type="text"
                                        defaultValue={selectedEvent.titolo || ""}
                                        className="event-view-input"
                                        placeholder="Titolo evento"
                                        maxLength={140}
                                        required
                                    />
                                </div>

                                <div className="event-view-row">
                                    <label htmlFor="descrizione" className="event-view-label">
                                        Descrizione
                                    </label>
                                    <textarea
                                        id="descrizione"
                                        name="descrizione"
                                        defaultValue={descrizione}
                                        className="event-view-input"
                                        placeholder="A cosa serve questo evento?"
                                        rows={4}
                                        maxLength={800}
                                    />
                                </div>

                                <div className="event-view-row">
                                    <label htmlFor="stato" className="event-view-label">
                                        Stato <span className="event-view-required">*</span>
                                    </label>
                                    <input
                                        id="stato"
                                        name="stato"
                                        type="text"
                                        defaultValue={stato || ""}
                                        className="event-view-input"
                                        placeholder="Es. Pianificato / In corso / Completato"
                                        maxLength={80}
                                        required
                                    />
                                </div>

                                <div className="event-view-actions">
                                    <button
                                        type="button"
                                        className="event-view-btn event-view-btn-secondary"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        <FaTimesCircle/> Annulla
                                    </button>
                                    <button type="submit" className="event-view-btn event-view-btn-primary">
                                        <FaSave/> Salva modifiche
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {!isEditing && (
                        <footer className="event-view-footer">
                            <button
                                type="button"
                                className="event-view-btn event-view-btn-danger"
                                title="Modifica questo evento"
                                onClick={handleDeleteEvento}
                            >
                                <FaTrash/> {isLoading ? <ClipLoader /> : 'Elimina evento'}
                            </button>
                            <button
                                type="button"
                                className="event-view-btn event-view-btn-primary"
                                onClick={() => setIsEditing(true)}
                                title="Modifica questo evento"
                            >
                                <FaPen/> {isLoading ? <ClipLoader /> : 'Modifica evento'}
                            </button>
                        </footer>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
