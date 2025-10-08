import {motion} from "framer-motion";
import type {ResAgendaDTO} from "../../services/api";
import {useState} from "react";
import {ConfirmPopover} from "./ConfirmPopover.tsx";

const isHex = (c?: string) => !!c && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c);

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
    const accent = isHex(agenda.tema) ? agenda.tema! : "#0ea5e9"; // fallback sky-500
    const [openConfirm, setOpenConfirm] = useState(false);

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -2 }}
                className="
          rounded-2xl p-4 transition
          bg-white/70 backdrop-blur-md
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          ring-1 ring-black/5
          border
        "
                style={{ borderColor: accent }}
            >
                {/* Barra tema */}
                <div
                    className="h-1.5 w-full rounded-md mb-3"
                    style={{ backgroundImage: `linear-gradient(90deg, ${accent}, ${accent})` }}
                    aria-hidden
                />

                {/* Header: monogramma + titolo + X rossa */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold text-gray-900 ring-1 ring-black/10"
                            style={{ backgroundColor: accent }}
                            aria-hidden
                        >
                            {monogramFrom(agenda.nomeAgenda)}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-gray-800 truncate">{agenda.nomeAgenda}</h3>
                            {agenda.descrizione ? (
                                <p className="mt-0.5 text-xs text-gray-700/90 line-clamp-2">{agenda.descrizione}</p>
                            ) : (
                                <p className="mt-0.5 text-xs text-gray-500">Nessuna descrizione</p>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Elimina agenda"
                            title="Elimina agenda"
                            onClick={() => setOpenConfirm((v) => !v)}
                            className="h-8 w-8 rounded-full flex items-center justify-center text-white shadow hover:scale-105 active:scale-95 transition"
                            style={{ backgroundColor: "#ef4444" }} // red-500 (hex: #ef4444)
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

                {/* Body distintivo: chip tema + ID + mini-griglia */}
                <div className="mt-3">
                    <div className="flex flex-wrap items-center gap-2">
            <span
                className="text-[11px] px-2 py-1 rounded-md text-white"
                style={{ backgroundColor: accent }}
            >
              Tema: {isHex(agenda.tema) ? agenda.tema : "default"}
            </span>
                        <span className="text-[11px] px-2 py-1 rounded-md bg-white/60 backdrop-blur ring-1 ring-inset ring-gray-200 text-gray-700">
              ID #{agenda.id}
            </span>
                    </div>

                    {/* Preview cliccabile */}
                    <button
                        type="button"
                        onClick={() => onOpen(agenda)}
                        className="mt-3 w-full text-left rounded-xl p-2 transition hover:ring-1 hover:ring-inset"
                        style={{ borderColor: accent }}
                    >
                        <div className="h-4 w-24 rounded mb-2" style={{ backgroundColor: accent }} />
                        <div className="grid grid-cols-7 gap-[2px]">
                            {Array.from({ length: 21 }).map((_, i) => (
                                <div key={i} className="aspect-square rounded-sm bg-gray-100" />
                            ))}
                        </div>
                    </button>

                    <div className="mt-2 flex items-center justify-end">
                        <button
                            type="button"
                            onClick={() => onOpen(agenda)}
                            className="text-xs font-medium hover:underline"
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
