import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

interface ModalShellProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const ModalShell: React.FC<ModalShellProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div
                className="modal-shell-overlay"
                role="presentation"
                onMouseDown={(e) => e.target === e.currentTarget && onClose()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
            >
                <motion.div
                    className="modal-shell-content"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onMouseDown={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="modal-shell-header">
                        <h2 id="modal-title" className="modal-shell-title">{title}</h2>
                        <button
                            type="button"
                            className="modal-shell-close"
                            onClick={onClose}
                            aria-label="Chiudi"
                            title="Chiudi"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="modal-shell-body">{children}</div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
