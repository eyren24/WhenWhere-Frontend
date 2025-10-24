import { motion } from "framer-motion";
import type { ResAgendaDTO } from "../../services/api";
import { useState } from "react";
import { ConfirmPopover } from "./ConfirmPopover.tsx";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

const isHex = (c?: string) =>
    !!c && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c);

const monogramFrom = (name: string): string => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "A";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

type Props = {
    agenda: ResAgendaDTO;
    onOpen: (agenda: ResAgendaDTO) => void;
    onDelete: (agendaId: number) => void;
};

export const AgendaCard = ({ agenda, onOpen, onDelete }: Props) => {
    const accent = isHex(agenda.tema) ? agenda.tema! : "#0ea5e9";
    const [openConfirm, setOpenConfirm] = useState(false);

    return (
        <div className="agenda-card-wrapper">
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -2 }}
                className="agenda-card"
                style={{ borderColor: accent }}
            >
                <div
                    className="agenda-card-bar"
                    style={{ backgroundImage: `linear-gradient(90deg, ${accent}, ${accent})` }}
                />
                <div className="agenda-card-header">
                    <div className="agenda-card-header-left">
                        <div
                            className="agenda-card-monogram"
                            style={{ backgroundColor: accent }}
                        >
                            {monogramFrom(agenda.nomeAgenda)}
                        </div>
                        <div className="agenda-card-header-text">
                            <h3 className="agenda-card-title">{agenda.nomeAgenda}</h3>
                            <p className="agenda-card-description">
                                {agenda.descrizione || "Nessuna descrizione"}
                            </p>
                        </div>
                    </div>
                    <div className="agenda-card-delete">
                        <button
                            type="button"
                            aria-label="Elimina agenda"
                            title="Elimina agenda"
                            onClick={() => setOpenConfirm((v) => !v)}
                            className="agenda-delete-button"
                            style={{ backgroundColor: "#ef4444" }}
                        >
                            ×
                        </button>
                        <ConfirmPopover
                            open={openConfirm}
                            onCancel={() => setOpenConfirm(false)}
                            onConfirm={() => onDelete(agenda.id)}
                            title="Eliminare questa agenda?"
                            description={agenda.nomeAgenda}
                        />
                    </div>
                </div>

                <div className="agenda-card-body">
                    <div className="agenda-card-chips">
            <span className="agenda-card-chip-accent" style={{ backgroundColor: accent }}>
              Tema: {agenda.tema || "default"}
            </span>
                        <span className="agenda-card-chip-id">ID #{agenda.id}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => onOpen(agenda)}
                        className="agenda-card-preview"
                        style={{ borderColor: accent }}
                    >
                        <div className="agenda-card-preview-bar" style={{ backgroundColor: accent }} />
                        <div className="agenda-card-preview-grid">
                            {Array.from({ length: 21 }).map((_, i) => (
                                <div key={i} className="agenda-card-preview-cell" />
                            ))}
                        </div>
                    </button>

                    <div className="agenda-card-footer">
                        <button
                            type="button"
                            onClick={() => onOpen(agenda)}
                            className="agenda-card-footer-link"
                            style={{ color: accent }}
                        >
                            Apri calendario →
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
