import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ModalShell } from "../ui/ModalShell";
import type { ReqNotaDTO, ResTagDTO } from "../../services/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    accentHex: string;   // tema corrente (hex)
    agendaId: number;
    startISO: string;    // solo UI
    endISO: string;      // solo UI
    tags: ResTagDTO[];   // stessa lista usata in crea evento
    onSubmit: (payload: ReqNotaDTO) => Promise<void> | void;
};

const isHex = (c?: string) => !!c && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c);

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

    // focus sul titolo quando apre
    useEffect(() => {
        if (!isOpen) return;
        const t = setTimeout(() => titleRef.current?.focus(), 0);
        return () => clearTimeout(t);
    }, [isOpen]);

    // colore di accento (HEX fallback)
    const accent = useMemo(() => (isHex(accentHex) ? accentHex : "#0ea5e9"), [accentHex]);

    // trova il tag selezionato per anteprima
    const selectedTag = useMemo(
        () => tags.find((t) => Number(t.id) === Number(tagId)),
        [tags, tagId]
    );

    // accetta sia t.colore che t.tema come possibile colore del tag
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
                className="rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 border p-5 space-y-4"
                noValidate
            >
                {/* Step 1: Titolo */}
                <div className="flex items-start gap-3">
                    <div
                        className="h-6 w-6 rounded-full text-white flex items-center justify-center text-xs"
                        style={{ backgroundColor: accent }}
                    >
                        1
                    </div>
                    <div className="flex-1">
                        <label htmlFor="titolo" className="block text-sm font-medium text-gray-800">
                            Titolo (opzionale)
                        </label>
                        <input
                            ref={titleRef}
                            id="titolo"
                            type="text"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            placeholder="Es. Appunto riunione"
                            className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 transition"
                            style={{ outlineColor: accent }}
                            maxLength={120}
                        />
                        <p className="mt-1 text-xs text-gray-500">Meglio breve e chiaro.</p>
                    </div>
                </div>

                {/* Step 2: Descrizione */}
                <div className="flex items-start gap-3">
                    <div
                        className="h-6 w-6 rounded-full text-white flex items-center justify-center text-xs"
                        style={{ backgroundColor: accent }}
                    >
                        2
                    </div>
                    <div className="flex-1">
                        <label htmlFor="descrizione" className="block text-sm font-medium text-gray-800">
                            Descrizione (opzionale)
                        </label>
                        <textarea
                            id="descrizione"
                            rows={5}
                            value={descrizione}
                            onChange={(e) => setDescrizione(e.target.value)}
                            placeholder="Aggiungi dettagli utili…"
                            className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 transition"
                            style={{ outlineColor: accent }}
                        />
                        <p className="mt-1 text-xs text-gray-500">Puoi lasciarla vuota se vuoi solo il titolo.</p>
                    </div>
                </div>

                {/* Step 3: Tag */}
                <div className="flex items-start gap-3">
                    <div
                        className="h-6 w-6 rounded-full text-white flex items-center justify-center text-xs"
                        style={{ backgroundColor: accent }}
                    >
                        3
                    </div>
                    <div className="flex-1">
                        <label htmlFor="tagId" className="block text-sm font-medium text-gray-800">
                            Tag
                        </label>
                        <select
                            id="tagId"
                            value={tagId}
                            onChange={(e) => setTagId(Number(e.target.value))}
                            className="mt-1 block w-full rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 transition"
                            style={{ outlineColor: accent }}
                        >
                            <option value={0}>Nessun tag</option>
                            {tags.map((t) => (
                                <option key={t.id} value={Number(t.id)}>
                                    {t.nome}
                                </option>
                            ))}
                        </select>

                        {/* Anteprima del tag selezionato */}
                        {selectedTag ? (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-gray-600">Selezionato:</span>
                                <span
                                    className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium"
                                    style={{
                                        backgroundColor: tagColor || "#f1f5f9", // slate-100 fallback
                                        color: "#0f172a",
                                        border: tagColor ? "1px solid #e5e7eb" : "1px solid #e5e7eb",
                                    }}
                                    title={selectedTag.nome}
                                >
                  {tagColor ? (
                      <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: tagColor }}
                      />
                  ) : null}
                                    {selectedTag.nome}
                </span>
                            </div>
                        ) : (
                            <p className="mt-1 text-xs text-gray-500">Gli stessi tag disponibili nella creazione evento.</p>
                        )}
                    </div>
                </div>

                {/* Info range selezionato (solo UI) */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Da: {new Date(startISO).toLocaleString()}</span>
                    <span>A: {new Date(endISO).toLocaleString()}</span>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                        type="button"
                        className="h-10 rounded-lg border border-gray-200 bg-white/60 backdrop-blur px-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 transition"
                        onClick={onClose}
                    >
                        Annulla
                    </button>
                    <button
                        type="submit"
                        className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white shadow focus:outline-none focus:ring-2 transition"
                        style={{ backgroundColor: accent }}
                    >
                        Salva nota
                    </button>
                </div>
            </form>
        </ModalShell>
    );
};
