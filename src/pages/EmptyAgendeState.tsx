import {motion} from "framer-motion";
import toast from "react-hot-toast";

export const EmptyAgendeState = ({
                                     onRefresh,
                                     onCreate,
                                 }: {
    onRefresh: () => void;
    onCreate?: () => void;
}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
            className="w-full flex items-center justify-center py-24 px-6"
        >
            <div className="relative max-w-xl w-full text-center rounded-3xl border border-dashed border-sky-200 bg-gradient-to-b from-white to-sky-50 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-200 bg-white shadow-sm">
                    <span className="text-2xl select-none animate-bounce">🗓️</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Nessuna agenda ancora</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Crea la tua prima agenda per iniziare a pianificare eventi, note e promemoria.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        className="rounded-xl px-4 py-2 text-sm font-medium text-sky-900 bg-sky-100 hover:bg-sky-200 active:bg-sky-300 transition"
                        onClick={onRefresh}
                    >
                        Aggiorna
                    </button>

                    <button
                        type="button"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 shadow-sm transition"
                        onClick={() => (onCreate ? onCreate() : toast("Azione di creazione agenda non collegata"))}
                    >
                        Crea nuova
                    </button>
                </div>

                <ul className="mt-6 text-left text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                        <span className="mt-[3px]">✨</span>
                        <span>Organizza eventi con tag, rating e intervalli orari.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-[3px]">🔔</span>
                        <span>Ricevi promemoria e gestisci le tue priorità.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-[3px]">📊</span>
                        <span>Visualizza tutto a colpo d’occhio nel calendario.</span>
                    </li>
                </ul>

                <div className="pointer-events-none absolute inset-x-0 -bottom-8 mx-auto h-16 w-40 blur-2xl bg-sky-300/30 rounded-full" />
            </div>
        </motion.div>
    );
};
