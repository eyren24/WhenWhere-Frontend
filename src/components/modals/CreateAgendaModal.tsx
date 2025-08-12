import React, {useEffect, useRef} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {FaCalendarPlus, FaPalette, FaFont, FaInfoCircle, FaTimes, FaSpinner} from "react-icons/fa";
import toast from "react-hot-toast";
import '../../assets/css/creaAgendaModale.css';
import type {ReqAgendaDTO} from "../../services/api";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import {emitAgendaChanged} from "../../stores/lib/agendaBus.ts";


type CreateAgendaModalProps = {
    isOpen: boolean;
    onClose: () => void;
    isSubmitting?: boolean;
};

export const CreateAgendaModal: React.FC<CreateAgendaModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                    }) => {
    const firstFieldRef = useRef<HTMLInputElement | null>(null);
    const {isLoading, creaAgenda} = useAgendaStore();
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const nomeAgenda = (formData.get("nomeAgenda") as string)?.trim();
        const descrizione = formData.get("descrizione") as string;
        const tema = formData.get("tema") as string;

        if (!nomeAgenda) {
            toast.error("Il nome dell'agenda è obbligatorio.");
            return;
        }

        const payload: ReqAgendaDTO = {
            nomeAgenda,
            descrizione,
            tema,
        };

        await creaAgenda(payload).then((res) => {
            if (res.success) {
                toast.success(res.message || 'Agenda creata con successo!');
            } else
                toast.error(res.error || "Si è verificato un errore durante la creazione dell'agenda");
        }).catch((err) => {
            console.error(err);
        });
        emitAgendaChanged();
        onClose();

    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="agenda-create-backdrop"
                    role="presentation"
                    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.18}}
                >
                    <motion.div
                        className="agenda-create-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="agenda-create-title"
                        initial={{opacity: 0, y: 16, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 12, scale: 0.98}}
                        transition={{duration: 0.22, ease: [0.22, 1, 0.36, 1]}}
                    >
                        <header className="agenda-create-header">
                            <div className="agenda-create-header-left">
                                <FaCalendarPlus className="agenda-create-icon"/>
                                <h2 id="agenda-create-title" className="agenda-create-title">Nuova agenda</h2>
                            </div>
                            <button
                                type="button"
                                className="agenda-create-close"
                                onClick={onClose}
                                aria-label="Chiudi"
                            >
                                <FaTimes className="agenda-create-close-icon"/>
                            </button>
                        </header>

                        <form className="agenda-create-body" onSubmit={handleSubmit} noValidate>
                            <div className="agenda-create-row">
                                <label htmlFor="nomeAgenda" className="agenda-create-label">
                                    <FaFont className="agenda-create-label-icon"/>
                                    <span>Nome agenda</span>
                                    <span className="agenda-create-required">*</span>
                                </label>
                                <input
                                    ref={firstFieldRef}
                                    type="text"
                                    id="nomeAgenda"
                                    name="nomeAgenda"
                                    className="agenda-create-input"
                                    placeholder="Es. Team Marketing Q4"
                                    maxLength={120}
                                    required
                                />
                            </div>

                            <div className="agenda-create-row">
                                <label htmlFor="descrizione" className="agenda-create-label">
                                    <FaInfoCircle className="agenda-create-label-icon"/>
                                    <span>Descrizione (opzionale)</span>
                                </label>
                                <textarea
                                    id="descrizione"
                                    name="descrizione"
                                    className="agenda-create-textarea"
                                    placeholder="A cosa serve questa agenda?"
                                    rows={4}
                                    maxLength={600}
                                />
                            </div>

                            <div className="agenda-create-row">
                                <label htmlFor="tema" className="agenda-create-label">
                                    <FaPalette className="agenda-create-label-icon"/>
                                    <span>Tema (opzionale)</span>
                                </label>
                                <input
                                    type="text"
                                    id="tema"
                                    name="tema"
                                    className="agenda-create-input"
                                    placeholder="Es. scuro, chiaro, aziendale, #0F62FE…"
                                    maxLength={64}
                                    list="agenda-tema-suggestions"
                                />
                                <datalist id="agenda-tema-suggestions">
                                    <option value="chiaro"/>
                                    <option value="scuro"/>
                                    <option value="azienda"/>
                                    <option value="#0F62FE"/>
                                </datalist>
                            </div>

                            <footer className="agenda-create-footer">
                                <button
                                    type="button"
                                    className="agenda-create-btn agenda-create-btn-secondary"
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Annulla
                                </button>
                                <motion.button
                                    type="submit"
                                    className="agenda-create-btn agenda-create-btn-primary"
                                    disabled={isLoading}
                                    whileTap={{scale: 0.98}}
                                >
                                    {isLoading ? (
                                        <>
                                            <FaSpinner className="agenda-create-spin"/>
                                        </>
                                    ) : (
                                        <>
                                            <FaCalendarPlus className="agenda-create-btn-icon"/>
                                            Crea
                                        </>
                                    )}
                                </motion.button>
                            </footer>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateAgendaModal;
