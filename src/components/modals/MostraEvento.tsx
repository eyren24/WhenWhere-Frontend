import { useEffect, useMemo, useRef, useState } from "react";
import type { EventApi } from "@fullcalendar/core";
import { motion, AnimatePresence } from "framer-motion";
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
import type { ReqUpdateEventoDTO } from "../../services/api";
import { emitAgendaChanged } from "../../stores/lib/agendaBus.ts";

type MostraEventoProps = {
    selectedEvent: EventApi;
    setModalOpen: (open: boolean) => void;
    onUpdateEvent?: (event: EventApi, dto: ReqUpdateEventoDTO) => Promise<void> | void;
    onRate?: (event: EventApi, rating: number) => Promise<void> | void;
    /** opzionale: persistenza descrizione lato API */
    onUpdateDescrizione?: (event: EventApi, descrizione: string) => Promise<void> | void;
};

const clampRating = (n: number) => Math.max(1, Math.min(5, Math.floor(n)));
const getErrorMessage = (err: Error | string): string =>
    typeof err === "string" ? err : err.message;

export const MostraEvento = ({
                                 selectedEvent,
                                 setModalOpen,
                                 onUpdateEvent,
                                 onRate,
                                 onUpdateDescrizione,
                             }: MostraEventoProps) => {
    const { extendedProps } = selectedEvent;
    const descrizione: string = extendedProps?.descrizione ?? "";
    const stato: string = extendedProps?.stato ?? "";
    const tagNome: string = extendedProps?.tagNome ?? "";
    const notifica: boolean = extendedProps?.notifica ?? false;
    const rating: number = extendedProps?.rating ?? 0;

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
        if (!onRate) {
            toast.error("Funzione di salvataggio valutazione non configurata.");
            return;
        }
        Promise.resolve(onRate(selectedEvent, value))
            .then(() => {
                toast.success("Valutazione aggiunta!");
                setAddingRating(false);
                emitAgendaChanged();
            })
            .catch((err: Error | string) => toast.error(getErrorMessage(err)));
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        const dto: ReqUpdateEventoDTO = { titolo, descrizione: nuovaDescrizione, stato: nuovoStato };

        const doUpdateEvento = (): Promise<void> =>
            onUpdateEvent
                ? Promise.resolve(onUpdateEvent(selectedEvent, dto))
                : Promise.resolve().then(() => {
                    // fallback locale su FullCalendar
                    selectedEvent.setProp("title", dto.titolo);
                    selectedEvent.setExtendedProp("stato", dto.stato);
                });

        const doUpdateDescrizione = (): Promise<void> =>
            onUpdateDescrizione
                ? Promise.resolve(onUpdateDescrizione(selectedEvent, nuovaDescrizione))
                : Promise.resolve().then(() => {
                    selectedEvent.setExtendedProp("descrizione", nuovaDescrizione);
                });

        doUpdateEvento()
            .then(() => doUpdateDescrizione())
            .then(() => {
                toast.success("Evento aggiornato!");
                setIsEditing(false);
                emitAgendaChanged();
            })
            .catch((err: Error | string) => toast.error(getErrorMessage(err)));
    };

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="event-view-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="event-view-title"
                    onMouseDown={(e) => e.stopPropagation()}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Header */}
                    <header className="event-view-header">
                        <div className="event-view-header-left">
                            <FaCalendarAlt className="event-view-icon" aria-hidden />
                            <h2 id="event-view-title" className="event-view-title">
                                {selectedEvent.title}
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
                            <FaTimes />
                        </button>
                    </header>

                    {/* Body */}
                    <div className="event-view-body">
                        {!isEditing ? (
                            <>
                                <div className="event-view-row">
                  <span className="event-view-key">
                    <FaInfoCircle aria-hidden /> Descrizione:
                  </span>
                                    <span className="event-view-value">{descrizione || "-"}</span>
                                </div>

                                <div className="event-view-row">
                                    <span className="event-view-key">Stato:</span>
                                    <span className="event-view-badge">{stato || "-"}</span>
                                </div>

                                <div className="event-view-row">
                  <span className="event-view-key">
                    <FaTag aria-hidden /> Tag:
                  </span>
                                    <span className="event-view-value">{tagNome || "-"}</span>
                                </div>

                                {notifica && (
                                    <div className="event-view-row">
                    <span className="event-view-key">
                      <FaBell aria-hidden /> Notifica:
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
                                            {Array.from({ length: 5 }, (_, i) => (
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
                                                <FaPlus /> Aggiungi valutazione
                                            </button>
                                        ) : (
                                            <div className="event-view-add-rating">
                                                <div
                                                    className="event-view-stars-input"
                                                    role="radiogroup"
                                                    aria-label="Seleziona valutazione"
                                                >
                                                    {Array.from({ length: 5 }, (_, i) => {
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
                                                                <FaStar />
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
                                                        <FaTimesCircle /> Annulla
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="event-view-btn event-view-btn-primary"
                                                        onClick={handleSaveRating}
                                                    >
                                                        <FaSave /> Salva
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
                                        defaultValue={selectedEvent.title || ""}
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
                                        <FaTimesCircle /> Annulla
                                    </button>
                                    <button type="submit" className="event-view-btn event-view-btn-primary">
                                        <FaSave /> Salva modifiche
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {!isEditing && (
                        <footer className="event-view-footer">
                            <button
                                type="button"
                                className="event-view-btn event-view-btn-primary"
                                onClick={() => setIsEditing(true)}
                                title="Modifica questo evento"
                            >
                                <FaPen /> Modifica evento
                            </button>
                        </footer>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
