import { AnimatePresence, motion } from "framer-motion";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

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
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 6, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="confirm-popover"
                    role="dialog"
                    aria-label={title}
                >
                    <p className="confirm-popover-title">{title}</p>
                    {description && <p className="confirm-popover-description">{description}</p>}
                    <div className="confirm-popover-buttons">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="confirm-popover-cancel"
                        >
                            Annulla
                        </button>
                        <motion.button
                            type="button"
                            onClick={onConfirm}
                            whileTap={{ scale: 0.97 }}
                            className="confirm-popover-confirm"
                        >
                            Elimina
                        </motion.button>
                    </div>
                    <div className="confirm-popover-arrow" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
