import React from "react";
import { AnimatePresence, motion } from "framer-motion";

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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                role="presentation"
                onMouseDown={(e) => e.target === e.currentTarget && onClose()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
            >
                <motion.div
                    className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onMouseDown={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
                        <h2 id="modal-title" className="text-lg font-semibold text-gray-800">
                            {title}
                        </h2>
                        <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:bg-gray-50"
                            onClick={onClose}
                            aria-label="Chiudi"
                            title="Chiudi"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="px-5 pb-5 pt-4">{children}</div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
