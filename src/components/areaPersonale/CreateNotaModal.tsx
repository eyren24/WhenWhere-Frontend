import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ModalShell } from "./ModalShell";
import type { ReqNotaDTO, ResTagDTO } from "../../services/api";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    accentHex: string;
    agendaId: number;
    startISO: string;
    endISO: string;
    tags: ResTagDTO[];
    onSubmit: (payload: ReqNotaDTO) => Promise<void> | void;
};

const isHex = (c?: string) =>
    !!c && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c);

export const CreateNotaModal: React.FC<Props> = ({
                                                     isOpen,
                                                     onClose,
                                                     accentHex,
                                                     agendaId,
                                                     startISO,
                                                     endISO,
                                                     tags,
                                                     onSubmit,
                                                 }) => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const [titolo, setTitolo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [tagId, setTagId] = useState<number>(0);

    useEffect(() => {
        if (!isOpen) return;
        const t = setTimeout(() => titleRef.current?.focus(), 0);
        return () => clearTimeout(t);
    }, [isOpen]);

    const accent = useMemo(() => (isHex(accentHex) ? accentHex : "#0ea5e9"), [accentHex]);

    const selectedTag = useMemo(
        () => tags.find((t) => Number(t.id) === Number(tagId)),
        [tags, tagId]
    );

    const tagColor = useMemo(() => {
        const c = (selectedTag as unknown as { colore?: string; tema?: string }) || {};
        const maybe = c.colore || c.tema || "";
        return isHex(maybe) ? maybe : undefined;
    }, [selectedTag]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const titoloTrim = titolo.trim();
        const descrizioneTrim = descrizione.trim();

        if (!titoloTrim && !descrizioneTrim) {
            toast.error("Inserisci un titolo o una descrizione.");
            return;
        }

        const payload: ReqNotaDTO = {
            agendaId,
            titolo: titoloTrim,
            descrizione: descrizioneTrim,
            dataCreazione: new Date().toISOString(),
            tema: accent,
            tagId: Number(tagId) || 0,
        };

        await Promise.resolve(onSubmit(payload));
        toast.success("Nota salvata.");
        onClose();
        setTitolo("");
        setDescrizione("");
        setTagId(0);
    };

    return (
        <ModalShell isOpen={isOpen} onClose={onClose} title="Nuova nota">
            <form
                onSubmit={handleSubmit}
                className="nota-modal-form"
                noValidate
            >
                {/* Step 1 */}
                <div className="nota-modal-step">
                    <div className="nota-modal-step-bullet" style={{ backgroundColor: accent }}>1</div>
                    <div className="nota-modal-step-body">
                        <label htmlFor="titolo" className="nota-modal-label">Titolo (opzionale)</label>
                        <input
                            ref={titleRef}
                            id="titolo"
                            type="text"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            placeholder="Es. Appunto riunione"
                            className="nota-modal-input"
                            style={{ outlineColor: accent }}
                            maxLength={120}
                        />
                        <p className="nota-modal-hint">Meglio breve e chiaro.</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="nota-modal-step">
                    <div className="nota-modal-step-bullet" style={{ backgroundColor: accent }}>2</div>
                    <div className="nota-modal-step-body">
                        <label htmlFor="descrizione" className="nota-modal-label">Descrizione (opzionale)</label>
                        <textarea
                            id="descrizione"
                            rows={5}
                            value={descrizione}
                            onChange={(e) => setDescrizione(e.target.value)}
                            placeholder="Aggiungi dettagli utili…"
                            className="nota-modal-input"
                            style={{ outlineColor: accent }}
                        />
                        <p className="nota-modal-hint">Puoi lasciarla vuota se vuoi solo il titolo.</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="nota-modal-step">
                    <div className="nota-modal-step-bullet" style={{ backgroundColor: accent }}>3</div>
                    <div className="nota-modal-step-body">
                        <label htmlFor="tagId" className="nota-modal-label">Tag</label>
                        <select
                            id="tagId"
                            value={tagId}
                            onChange={(e) => setTagId(Number(e.target.value))}
                            className="nota-modal-input"
                            style={{ outlineColor: accent }}
                        >
                            <option value={0}>Nessun tag</option>
                            {tags.map((t) => (
                                <option key={t.id} value={Number(t.id)}>
                                    {t.nome}
                                </option>
                            ))}
                        </select>

                        {selectedTag ? (
                            <div className="nota-modal-preview">
                                <span className="nota-modal-preview-label">Selezionato:</span>
                                <span
                                    className="nota-modal-preview-badge"
                                    style={{
                                        backgroundColor: tagColor || "#f1f5f9",
                                        color: "#0f172a",
                                        border: "1px solid #e5e7eb",
                                    }}
                                    title={selectedTag.nome}
                                >
                  {tagColor && (
                      <span
                          className="nota-modal-preview-dot"
                          style={{ backgroundColor: tagColor }}
                      />
                  )}
                                    {selectedTag.nome}
                </span>
                            </div>
                        ) : (
                            <p className="nota-modal-hint">Gli stessi tag disponibili nella creazione evento.</p>
                        )}
                    </div>
                </div>

                {/* Date range info */}
                <div className="nota-modal-range">
                    <span>Da: {new Date(startISO).toLocaleString()}</span>
                    <span>A: {new Date(endISO).toLocaleString()}</span>
                </div>

                {/* CTA */}
                <div className="nota-modal-actions">
                    <button
                        type="button"
                        className="nota-modal-cancel"
                        onClick={onClose}
                    >
                        Annulla
                    </button>
                    <button
                        type="submit"
                        className="nota-modal-submit"
                        style={{ backgroundColor: accent }}
                    >
                        Salva nota
                    </button>
                </div>
            </form>
        </ModalShell>
    );
};
