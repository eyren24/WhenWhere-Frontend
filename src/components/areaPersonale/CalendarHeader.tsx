import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

type Props = {
    title: string;
    subtitle?: string;
    accent: string;
    askDelete: boolean;
    setAskDelete: (v: boolean) => void;
    onConfirmDelete: () => void;
};

export const CalendarHeader = React.memo(
    ({ title, subtitle, accent, askDelete, setAskDelete, onConfirmDelete }: Props) => {
        return (
            <div className="calendar-header">
                <div className="calendar-header-left">
                    <div
                        className="calendar-header-icon"
                        style={{ backgroundColor: accent, borderColor: accent }}
                    >
                        🗓️
                    </div>
                    <div className="calendar-header-text">
                        <h3 className="calendar-header-title">{title}</h3>
                        {subtitle && <p className="calendar-header-subtitle">{subtitle}</p>}
                    </div>
                </div>

                <div className="calendar-header-actions">
                    <button
                        type="button"
                        onClick={() => setAskDelete(!askDelete)}
                        className="calendar-header-delete"
                    >
                        🗑️ Elimina
                    </button>

                    <AnimatePresence>
                        {askDelete && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 6, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.18 }}
                                className="calendar-header-popover"
                            >
                                <p className="calendar-header-popover-text">
                                    Vuoi davvero eliminare <span className="font-semibold">{title}</span>?
                                </p>
                                <div className="calendar-header-popover-buttons">
                                    <button
                                        type="button"
                                        onClick={() => setAskDelete(false)}
                                        className="calendar-header-popover-cancel"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onConfirmDelete}
                                        className="calendar-header-popover-confirm"
                                    >
                                        Elimina
                                    </button>
                                </div>
                                <div className="calendar-header-popover-arrow" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    }
);
CalendarHeader.displayName = "CalendarHeader";
