import React from "react";
import { ModalShell } from "../ui/ModalShell";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    dateLabel: string;
    accentHex: string; // colore tema hex
    onPick: (type: "nota" | "evento") => void;
};

export const QuickCreateChoice: React.FC<Props> = ({ isOpen, onClose, dateLabel, accentHex, onPick }) => {
    return (
        <ModalShell isOpen={isOpen} onClose={onClose} title="Cosa vuoi creare?">
            <div className="rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 border p-5">
                <p className="text-sm text-gray-600 mb-4">
                    Data selezionata: <span className="font-medium text-gray-800">{dateLabel}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="rounded-xl border bg-white/60 backdrop-blur p-4 text-left shadow-sm focus:outline-none focus:ring-2 transition"
                        style={{ borderColor: accentHex }}
                        onClick={() => onPick("nota")}
                    >
                        <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: accentHex }}>
                            📝
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800">Scrivi una nota</h3>
                        <p className="text-xs text-gray-600">Un appunto veloce per ricordarti qualcosa.</p>
                    </button>

                    <button
                        type="button"
                        className="rounded-xl border bg-white/60 backdrop-blur p-4 text-left shadow-sm focus:outline-none focus:ring-2 transition"
                        style={{ borderColor: accentHex }}
                        onClick={() => onPick("evento")}
                    >
                        <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: accentHex }}>
                            📅
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800">Crea un evento</h3>
                        <p className="text-xs text-gray-600">Titolo, orario e dettagli dell’attività.</p>
                    </button>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 rounded-lg border border-gray-200 bg-white/60 backdrop-blur px-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 transition"
                    >
                        Annulla
                    </button>
                </div>
            </div>
        </ModalShell>
    );
};
