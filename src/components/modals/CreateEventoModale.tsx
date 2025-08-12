import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FaCalendarPlus,
    FaHeading,
    FaInfoCircle,
    FaClock,
    FaMapMarkerAlt,
    FaTag,
    FaStar,
    FaSave,
    FaTimes,
} from "react-icons/fa";
import "../../assets/css/createEventoModale.css";
import toast from "react-hot-toast";
import type { ReqEventoDTO } from "../../services/api";
import { emitAgendaChanged } from "../../stores/lib/agendaBus";

const pad2 = (n: number): string => (n < 10 ? `0${n}` : `${n}`);
const toDatetimeLocal = (iso: string): string => {
    const d = new Date(iso);
    // YYYY-MM-DDTHH:MM
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(
        d.getHours()
    )}:${pad2(d.getMinutes())}`;
};
const fromDatetimeLocal = (local: string): string => {
    // interpreta come ora locale e converte in ISO
    const d = new Date(local);
    return d.toISOString();
};
const getErrorMessage = (err: Error | string): string =>
    typeof err === "string" ? err : err.message;

/* rating 0.0–0.9 a step 0.1 */
const clampRating = (n: number): number =>
    Math.max(0, Math.min(0.9, Math.round(n * 10) / 10));

type CreateEventoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (payload: ReqEventoDTO) => Promise<void> | void;

    /** predefiniti dal calendario */
    agendaId: number;
    dataInizio: string; // ISO
    dataFine: string; // ISO

    defaultValues?: Partial<ReqEventoDTO>;
    isSubmitting?: boolean;
};

export const CreateEventoModale: React.FC<CreateEventoModalProps> = ({
                                                                         isOpen,
                                                                         onClose,
                                                                         onCreate,
                                                                         agendaId,
                                                                         dataInizio,
                                                                         dataFine,
                                                                         defaultValues,
                                                                         isSubmitting = false,
                                                                     }) => {
    // rating (0.0–0.9)
    const [rating, setRating] = useState<number>(clampRating(defaultValues?.rating ?? 0));

    // focus primo campo
    const firstFieldRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // ESC chiude
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    // dataCreazione
    const dataCreazione = useMemo(() => new Date().toISOString(), [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    // datetime-local controllati + istantaneo
    const defaultStartLocal = toDatetimeLocal(dataInizio);
    const defaultEndLocal = toDatetimeLocal(dataFine);
    const initialInstant = new Date(dataInizio).getTime() === new Date(dataFine).getTime();

    const [startLocal, setStartLocal] = useState<string>(defaultStartLocal);
    const [endLocal, setEndLocal] = useState<string>(defaultEndLocal);
    const [isInstant, setIsInstant] = useState<boolean>(initialInstant);

    // se è istantaneo, allinea fine a inizio
    useEffect(() => {
        if (isInstant) setEndLocal(startLocal);
    }, [isInstant, startLocal]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);

        const titolo = (fd.get("titolo") as string) || "";
        const descrizione = (fd.get("descrizione") as string) || "";
        const luogo = (fd.get("luogo") as string) || "";
        const stato = (fd.get("stato") as string) || "";
        const notifica = fd.get("notifica") === "on";
        const tagIdStr = (fd.get("tagId") as string) || "";
        const ratingStr = (fd.get("rating") as string) || rating.toString();

        // validazioni minime
        if (!titolo.trim()) return toast.error("Il titolo è obbligatorio.");
        if (!descrizione.trim()) return toast.error("La descrizione è obbligatoria.");
        if (!luogo.trim()) return toast.error("Il luogo è obbligatorio.");
        if (!stato.trim()) return toast.error("Lo stato è obbligatorio.");
        if (!startLocal) return toast.error("La data/ora di inizio è obbligatoria.");
        if (!isInstant && !endLocal) return toast.error("La data/ora di fine è obbligatoria.");

        const tagId = Number(tagIdStr);
        if (!Number.isFinite(tagId)) return toast.error("Seleziona un tag valido.");

        // rating 0.0–0.9
        const ratingNum = clampRating(parseFloat(ratingStr));
        if (!Number.isFinite(ratingNum)) return toast.error("Rating non valido.");

        const dataInizioISO = fromDatetimeLocal(startLocal);
        const dataFineISO = fromDatetimeLocal(isInstant ? startLocal : endLocal);

        if (!isInstant && new Date(dataFineISO).getTime() < new Date(dataInizioISO).getTime()) {
            return toast.error("La fine non può essere precedente all'inizio.");
        }

        const payload: ReqEventoDTO = {
            agendaId,
            dataInizio: dataInizioISO,
            dataFine: dataFineISO, // se istantaneo = inizio
            descrizione,
            rating: ratingNum,
            luogo,
            stato,
            notifica,
            dataCreazione,
            titolo,
            tagId,
        };

        try {
            await Promise.resolve(onCreate(payload));
            emitAgendaChanged();
            onClose();
        } catch (err) {
            toast.error(getErrorMessage(err as Error | string));
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="event-create-backdrop"
                role="presentation"
                onMouseDown={handleBackdropClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
            >
                <motion.div
                    className="event-create-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="event-create-title"
                    onMouseDown={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                    <header className="event-create-header">
                        <div className="event-create-header-left">
                            <FaCalendarPlus className="event-create-icon" aria-hidden />
                            <h2 id="event-create-title" className="event-create-title">
                                Nuovo evento
                            </h2>
                        </div>
                        <button
                            type="button"
                            className="event-create-close"
                            onClick={onClose}
                            aria-label="Chiudi"
                            title="Chiudi"
                        >
                            <FaTimes />
                        </button>
                    </header>

                    <form className="event-create-body" onSubmit={handleSubmit} noValidate>
                        {/* Titolo */}
                        <div className="event-create-row">
                            <label htmlFor="titolo" className="event-create-label">
                                <FaHeading className="event-create-label-icon" aria-hidden />
                                Titolo <span className="event-create-required">*</span>
                            </label>
                            <input
                                ref={firstFieldRef}
                                id="titolo"
                                name="titolo"
                                type="text"
                                className="event-create-input"
                                placeholder="Es. Riunione Progetto A"
                                maxLength={140}
                                defaultValue={defaultValues?.titolo ?? ""}
                                required
                            />
                        </div>

                        {/* Descrizione */}
                        <div className="event-create-row">
                            <label htmlFor="descrizione" className="event-create-label">
                                <FaInfoCircle className="event-create-label-icon" aria-hidden />
                                Descrizione <span className="event-create-required">*</span>
                            </label>
                            <textarea
                                id="descrizione"
                                name="descrizione"
                                className="event-create-textarea"
                                placeholder="Dettagli o obiettivi dell'evento"
                                rows={4}
                                maxLength={800}
                                defaultValue={defaultValues?.descrizione ?? ""}
                                required
                            />
                        </div>

                        {/* Stato */}
                        <div className="event-create-row">
                            <label htmlFor="stato" className="event-create-label">
                                <FaInfoCircle className="event-create-label-icon" aria-hidden />
                                Stato <span className="event-create-required">*</span>
                            </label>
                            <input
                                id="stato"
                                name="stato"
                                type="text"
                                className="event-create-input"
                                placeholder="Es. Pianificato / In corso / Completato"
                                maxLength={80}
                                defaultValue={defaultValues?.stato ?? ""}
                                required
                                list="event-stato-suggestions"
                            />
                            <datalist id="event-stato-suggestions">
                                <option value="Pianificato" />
                                <option value="In corso" />
                                <option value="Completato" />
                                <option value="Rinviato" />
                            </datalist>
                        </div>

                        {/* Luogo */}
                        <div className="event-create-row">
                            <label htmlFor="luogo" className="event-create-label">
                                <FaMapMarkerAlt className="event-create-label-icon" aria-hidden />
                                Luogo <span className="event-create-required">*</span>
                            </label>
                            <input
                                id="luogo"
                                name="luogo"
                                type="text"
                                className="event-create-input"
                                placeholder="Es. Sala Riunioni 2 / Milano"
                                maxLength={160}
                                defaultValue={defaultValues?.luogo ?? ""}
                                required
                            />
                        </div>

                        {/* Tag */}
                        <div className="event-create-row">
                            <label htmlFor="tagId" className="event-create-label">
                                <FaTag className="event-create-label-icon" aria-hidden />
                                Tag ID <span className="event-create-required">*</span>
                            </label>
                            <input
                                id="tagId"
                                name="tagId"
                                type="number"
                                className="event-create-input"
                                placeholder="Es. 1"
                                min={1}
                                step={1}
                                defaultValue={
                                    typeof defaultValues?.tagId === "number" ? defaultValues.tagId : undefined
                                }
                                required
                            />
                        </div>

                        {/* Date: EDITABILI (datetime-local) + ISTANTANEO */}
                        <div className="event-create-row event-create-row-inline">
                            <div className="event-create-col">
                                <label htmlFor="dataInizioLocal" className="event-create-label">
                                    <FaClock className="event-create-label-icon" aria-hidden />
                                    Inizio
                                </label>
                                <input
                                    id="dataInizioLocal"
                                    name="dataInizioLocal"
                                    type="datetime-local"
                                    className="event-create-input"
                                    value={startLocal}
                                    onChange={(e) => setStartLocal(e.target.value)}
                                    step={60}
                                    required
                                />
                            </div>
                            <div className="event-create-col">
                                <label htmlFor="dataFineLocal" className="event-create-label">
                                    <FaClock className="event-create-label-icon" aria-hidden />
                                    Fine
                                </label>
                                <input
                                    id="dataFineLocal"
                                    name="dataFineLocal"
                                    type="datetime-local"
                                    className="event-create-input"
                                    value={endLocal}
                                    onChange={(e) => setEndLocal(e.target.value)}
                                    step={60}
                                    min={startLocal}
                                    disabled={isInstant}
                                    required={!isInstant}
                                />
                            </div>
                        </div>

                        {/* Toggle evento istantaneo */}
                        <div className="event-create-row">
                            <label className="event-create-checkbox">
                                <input
                                    type="checkbox"
                                    checked={isInstant}
                                    onChange={(e) => setIsInstant(e.target.checked)}
                                />
                                <span>Evento istantaneo (senza fine)</span>
                            </label>
                        </div>

                        {/* Rating 0.0–0.9 con stelline */}
                        <div className="event-create-row">
                            <label className="event-create-label">
                                <FaStar className="event-create-label-icon" aria-hidden />
                                Rating (0.0–0.9)
                            </label>
                            <div className="event-create-stars">
                                {/* Step 0.1–0.9 */}
                                {Array.from({ length: 9 }, (_, i) => {
                                    const value = (i + 1) / 10; // 0.1, 0.2, ...
                                    const active = rating >= value;
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            className={`event-create-star-btn ${active ? "active" : ""}`}
                                            onClick={() => setRating(value)}
                                            aria-label={`${value.toFixed(1)} stelle`}
                                        >
                                            <FaStar />
                                        </button>
                                    );
                                })}
                                {/* 0 (nessuna valutazione) */}
                                <button
                                    type="button"
                                    className={`event-create-star-zero ${rating === 0 ? "active" : ""}`}
                                    onClick={() => setRating(0)}
                                    aria-label="Nessuna valutazione"
                                    title="Nessuna valutazione"
                                >
                                    0
                                </button>
                            </div>
                            <input type="hidden" name="rating" value={rating.toString()} />
                        </div>

                        {/* Hidden/derivati */}
                        <input type="hidden" name="agendaId" value={agendaId} />
                        <input type="hidden" name="dataCreazione" value={dataCreazione} />

                        <footer className="event-create-footer">
                            <button
                                type="button"
                                className="event-create-btn event-create-btn-secondary"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Annulla
                            </button>
                            <motion.button
                                type="submit"
                                className="event-create-btn event-create-btn-primary"
                                disabled={isSubmitting}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaSave />
                                {isSubmitting ? "Creazione..." : "Crea evento"}
                            </motion.button>
                        </footer>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CreateEventoModale;
