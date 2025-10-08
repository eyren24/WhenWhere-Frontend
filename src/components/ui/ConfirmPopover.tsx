import {AnimatePresence, motion} from "framer-motion";

type Props = {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
};

export const ConfirmPopover = ({ open, onCancel, onConfirm, title = "Confermi l’azione?", description }: Props) => {
    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 6, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 mt-2 w-[260px] rounded-xl border bg-white/95 backdrop-blur-md shadow-lg p-3 z-20"
                    role="dialog"
                    aria-label={title}
                    style={{ borderColor: "#fecaca" }} // rose-200
                >
                    <p className="text-sm text-gray-800 font-medium">{title}</p>
                    {description ? <p className="mt-1 text-xs text-gray-600">{description}</p> : null}
                    <div className="mt-3 flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 ring-1 ring-inset ring-gray-200 transition"
                        >
                            Annulla
                        </button>
                        <motion.button
                            type="button"
                            onClick={onConfirm}
                            whileTap={{ scale: 0.97 }}
                            className="rounded-md px-3 py-1.5 text-sm font-semibold text-white transition shadow-sm"
                            style={{ backgroundColor: "#dc2626" }} // red-600
                        >
                            Elimina
                        </motion.button>
                    </div>
                    <div
                        className="pointer-events-none absolute -top-2 right-6 h-4 w-4 rotate-45 bg-white/95"
                        style={{ borderTopColor: "#fecaca", borderLeftColor: "#fecaca", borderTopWidth: 1, borderLeftWidth: 1, borderStyle: "solid" }}
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
