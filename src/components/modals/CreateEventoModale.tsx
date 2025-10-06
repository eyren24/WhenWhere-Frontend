import React, {useEffect, useMemo, useRef, useState} from "react";
import {motion} from "framer-motion";
import {FaSave, FaBell} from "react-icons/fa";
import toast from "react-hot-toast";
import type {ReqEventoDTO, ResTagDTO} from "../../services/api";
import {emitAgendaChanged} from "../../stores/lib/agendaBus";
import {ModalShell} from "../ui/ModalShell";
import {toDatetimeLocal, isSameInstant} from "../datetime.ts";
import {TextField} from "../ui/TextField.tsx";
import {TextAreaField} from "../ui/TextAreaField.tsx";
import {DateTimeRange} from "../ui/DateTimeRange.tsx";
import {StarRating} from "../ui/StarRating.tsx";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import {SelectField} from "../ui/SelectField.tsx";

export type CreateEventoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (payload: ReqEventoDTO) => Promise<void> | void;
    agendaId: number;
    dataInizio: string;
    dataFine: string;
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
    const [rating, setRating] = useState<number>(Math.min(5, Math.max(1, Number(defaultValues?.rating ?? 3))));
    const [notifica, setNotifica] = useState<boolean>(Boolean(defaultValues?.notifica ?? false));
    const [tags, setTags] = useState<ResTagDTO[]>([]);
    const {isLoading, getTags} = useAgendaStore();
    const firstFieldRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        getTags().then((res) => {
            if (res.success) {
                setTags(res.tags || []);
            } else {
                toast.error(res.error || "Errore durante il recupero dei Tags.")
            }
        }).catch((err) => {
            console.error(err);
        });
    }, [getTags]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    const dataCreazione = useMemo(() => new Date().toISOString(), [isOpen]);

    const defaultStartLocal = toDatetimeLocal(dataInizio);
    const defaultEndLocal = toDatetimeLocal(dataFine);
    const initialInstant = isSameInstant(dataInizio, dataFine);

    const [startLocal, setStartLocal] = useState<string>(defaultStartLocal);
    const [endLocal, setEndLocal] = useState<string>(defaultEndLocal);
    const [isInstant, setIsInstant] = useState<boolean>(initialInstant);

    useEffect(() => {
        if (isInstant) setEndLocal(startLocal);
    }, [isInstant, startLocal]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        const titolo = String(fd.get("titolo") ?? "");
        const descrizione = String(fd.get("descrizione") ?? "");
        const luogo = String(fd.get("luogo") ?? "");
        const stato = String(fd.get("stato") ?? "");
        const tagIdStr = String(fd.get("tagId") ?? "");

        if (!titolo.trim()) return toast.error("Il titolo è obbligatorio.");
        if (!descrizione.trim()) return toast.error("La descrizione è obbligatoria.");
        if (!luogo.trim()) return toast.error("Il luogo è obbligatorio.");
        if (!stato.trim()) return toast.error("Lo stato è obbligatorio.");
        if (!startLocal) return toast.error("La data/ora di inizio è obbligatoria.");
        if (!isInstant && !endLocal) return toast.error("La data/ora di fine è obbligatoria.");

        const tagId = Number(tagIdStr);
        if (!Number.isFinite(tagId)) return toast.error("Seleziona un tag valido.");

        const dataInizioISO = toDatetimeLocal(startLocal);
        const dataFineISO = toDatetimeLocal(isInstant ? startLocal : endLocal);

        if (!isInstant && new Date(dataFineISO).getTime() < new Date(dataInizioISO).getTime()) {
            return toast.error("La fine non può essere precedente all'inizio.");
        }

        const payload: ReqEventoDTO = {
            agendaId,
            dataInizio: dataInizioISO,
            dataFine: dataFineISO,
            descrizione,
            rating,
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
            toast.error((err as Error).message);
        }
    };

    return (
        <ModalShell isOpen={isOpen} onClose={onClose} title="Nuovo evento">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <TextField
                    ref={firstFieldRef}
                    id="titolo"
                    name="titolo"
                    type="text"
                    label="Titolo"
                    requiredMark
                    placeholder="Es. Riunione Progetto A"
                    maxLength={140}
                    defaultValue={defaultValues?.titolo ?? ""}
                />

                <TextAreaField
                    id="descrizione"
                    name="descrizione"
                    label="Descrizione"
                    requiredMark
                    placeholder="Dettagli o obiettivi dell'evento"
                    rows={4}
                    maxLength={800}
                    defaultValue={defaultValues?.descrizione ?? ""}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                        id="stato"
                        name="stato"
                        type="text"
                        label="Stato"
                        requiredMark
                        list="event-stato-suggestions"
                        placeholder="Es. Pianificato / In corso / Completato"
                        maxLength={80}
                        defaultValue={defaultValues?.stato ?? ""}
                    />
                    <TextField
                        id="luogo"
                        name="luogo"
                        type="text"
                        label="Luogo"
                        requiredMark
                        placeholder="Es. Sala Riunioni 2 / Milano"
                        maxLength={160}
                        defaultValue={defaultValues?.luogo ?? ""}
                    />
                </div>

                <datalist id="event-stato-suggestions">
                    <option value="Pianificato"/>
                    <option value="In corso"/>
                    <option value="Completato"/>
                    <option value="Rinviato"/>
                </datalist>

                <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                        id="tagId"
                        name="tagId"
                        disabled={isLoading}
                        label="Tag"
                        requiredMark
                        placeholder="Seleziona un tag"
                        options={tags}
                        defaultValue={
                            typeof defaultValues?.tagId === "number" ? String(defaultValues.tagId) : ""
                        }
                    />

                    <label className="mt-6 inline-flex items-center gap-3 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            className="size-4 accent-blue-600"
                            name="notifica"
                            checked={notifica}
                            onChange={(e) => setNotifica(e.target.checked)}
                        />
                        <span className="inline-flex items-center gap-2">
      <FaBell/> Notifica
    </span>
                    </label>
                </div>


                <DateTimeRange
                    start={startLocal}
                    end={endLocal}
                    setStart={setStartLocal}
                    setEnd={setEndLocal}
                    isInstant={isInstant}
                    setIsInstant={setIsInstant}
                />

                <StarRating value={rating} onChange={setRating}/>

                <input type="hidden" name="agendaId" value={String(agendaId)}/>
                <input type="hidden" name="dataCreazione" value={dataCreazione}/>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        className="h-10 rounded-lg border px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Annulla
                    </button>
                    <motion.button
                        type="submit"
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-60"
                        disabled={isSubmitting}
                        whileTap={{scale: 0.98}}
                    >
                        <FaSave/> {isSubmitting ? "Creazione..." : "Crea evento"}
                    </motion.button>
                </div>
            </form>
        </ModalShell>
    );
};

export default CreateEventoModale;
