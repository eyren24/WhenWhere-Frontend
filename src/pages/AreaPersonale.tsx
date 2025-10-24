import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import { useAgendaStore } from "../stores/AgendaStore.ts";
import type { ResAgendaDTO } from "../services/api";
import { Calendario } from "../components/calendario/Calendario.tsx";
import { EmptyAgendeState } from "./EmptyAgendeState.tsx";
import { CreateAgendaModal } from "../components/modals/CreateAgendaModal.tsx";
import {AgendaGrid} from "../components/areaPersonale/AgendaGrid.tsx";
import {AgendaDetailTopbar} from "../components/areaPersonale/AgendaDetailTopbar.tsx";

export const AreaPersonale = () => {
    const { getAll, deleteAgenda } = useAgendaStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedAgenda, setSelectedAgenda] = useState<ResAgendaDTO | null>(null);

    // reference per capire se abbiamo già pushato uno stato di dettaglio
    const pushedDetailRef = useRef(false);

    const fetchAgende = useCallback(() => {
        setIsLoading(true);
        getAll()
            .then((res) => {
                if (res.success) setAgende(res.agenda ?? []);
                else toast.error(res.error ?? "Errore imprevisto nel caricamento dell'agenda.");
            })
            .catch((err) => toast.error(String(err)))
            .finally(() => setIsLoading(false));
    }, [getAll]);

    useEffect(() => {
        fetchAgende();
    }, [fetchAgende]);

    const handleDeleteAgenda = useCallback(
        (agendaId: number) => {
            const prev = agende;
            setAgende((curr) => curr.filter((a) => a.id !== agendaId));
            const tId = toast.loading("Eliminazione in corso...");

            deleteAgenda(agendaId)
                .then((res) => {
                    if (!res?.success) throw new Error(res?.error ?? "Impossibile eliminare l'agenda.");
                    toast.success("Agenda eliminata con successo.", { id: tId });
                    setSelectedAgenda((curr) => (curr && curr.id === agendaId ? null : curr));
                })
                .catch((e) => {
                    setAgende(prev); // rollback
                    toast.error(String(e), { id: tId });
                });
        },
        [agende, deleteAgenda]
    );

    // --- Gestione history browser ---
    useEffect(() => {
        const handlePop = () => {
            setSelectedAgenda(null);
            pushedDetailRef.current = false;
        };

        if (selectedAgenda) {
            if (!pushedDetailRef.current) {
                window.history.pushState({ apDetail: true }, "");
                pushedDetailRef.current = true;
                window.addEventListener("popstate", handlePop, { once: true });
            }
        } else {
            if (pushedDetailRef.current && window.history.state?.apDetail) {
                window.history.back();
                pushedDetailRef.current = false;
            }
        }

        return () => {
            window.removeEventListener("popstate", handlePop);
        };
    }, [selectedAgenda]);

    // Chiudi dettaglio (sincronizzato con history)
    const closeDetail = () => {
        if (pushedDetailRef.current && window.history.state?.apDetail) {
            window.history.back(); // triggera handlePop
        } else {
            setSelectedAgenda(null);
        }
    };

    return (
        <div className="relative min-h-[50vh]">
            <AnimatePresence mode="wait">
                {selectedAgenda ? (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-full px-3 sm:px-4">
                            <div className="mx-auto max-w-[760px]">
                                <AgendaDetailTopbar agenda={selectedAgenda} onBack={closeDetail} />
                                <Calendario
                                    agenda={selectedAgenda}
                                    onDeleteAgenda={() => {
                                        handleDeleteAgenda(selectedAgenda.id);
                                        closeDetail();
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isLoading || agende.length > 0 ? (
                            <AgendaGrid
                                agende={agende}
                                isLoading={isLoading}
                                onOpen={(a) => setSelectedAgenda(a)}
                                onDelete={(id) => handleDeleteAgenda(id)}
                                onCreate={() => setIsCreateOpen(true)}
                                onRefresh={fetchAgende}
                            />
                        ) : (
                            <EmptyAgendeState onRefresh={fetchAgende} onCreate={() => setIsCreateOpen(true)} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center h-12 w-12 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 active:scale-95 transition"
                title="Nuova agenda"
                aria-label="Nuova agenda"
            >
                +
            </button>

            <CreateAgendaModal
                isOpen={isCreateOpen}
                onClose={() => {
                    setIsCreateOpen(false);
                    fetchAgende();
                }}
            />
        </div>
    );
};
