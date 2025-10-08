import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
    title: string;
    subtitle?: string;
    accent: string; // hex
    askDelete: boolean;
    setAskDelete: (v: boolean) => void;
    onConfirmDelete: () => void;
};

export const CalendarHeader = React.memo(
    ({ title, subtitle, accent, askDelete, setAskDelete, onConfirmDelete }: Props) => {
        return (
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white ring-1 ring-inset"
                        style={{ backgroundColor: accent, borderColor: accent }}
                    >
                        🗓️
                    </div>
                    <div className="leading-tight">
                        <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
                        {subtitle ? <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-1">{subtitle}</p> : null}
                    </div>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setAskDelete(!askDelete)}
                        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition"
                        style={{ backgroundColor: "#ffe4e6", color: "#b91c1c", border: "1px solid #fecaca" }}
                    >
                        🗑️ Elimina
                    </button>

                    <AnimatePresence>
                        {askDelete ? (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 6, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.18 }}
                                className="absolute right-0 mt-2 w-[260px] rounded-xl bg-white/90 backdrop-blur-md shadow-lg p-3 z-20 border"
                                style={{ borderColor: "#fecaca" }}
                            >
                                <p className="text-sm text-gray-700">
                                    Vuoi davvero eliminare <span className="font-semibold">{title}</span>?
                                </p>
                                <div className="mt-3 flex items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setAskDelete(false)}
                                        className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition border"
                                        style={{ borderColor: "#e5e7eb" }}
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onConfirmDelete}
                                        className="rounded-md px-3 py-1.5 text-sm font-semibold text-white transition shadow-sm"
                                        style={{ backgroundColor: "#dc2626" }}
                                    >
                                        Elimina
                                    </button>
                                </div>
                                <div
                                    className="pointer-events-none absolute -top-2 right-6 h-4 w-4 rotate-45 bg-white/90"
                                    style={{ borderTop: "1px solid #fecaca", borderLeft: "1px solid #fecaca" }}
                                />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        );
    }
);
CalendarHeader.displayName = "CalendarHeader";
