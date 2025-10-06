import {useCallback, useEffect, useMemo, useState} from "react";
import toast from "react-hot-toast";
import {motion} from "framer-motion";

import {useAgendaStore} from "../stores/AgendaStore.ts";
import type {ResAgendaDTO} from "../services/api";
import {Calendario} from "../components/calendario/Calendario.tsx";
import {EmptyAgendeState} from "./EmptyAgendeState.tsx";
import {CreateAgendaModal} from "../components/modals/CreateAgendaModal.tsx";

export const AreaPersonale = () => {
    const { getAll, deleteAgenda } = useAgendaStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

    const fetchAgende = useCallback(() => {
        setIsLoading(true);
        getAll()
            .then((res) => {
                if (res.success) setAgende(res.agenda || []);
                else toast.error(res.error || "Errore imprevisto nel caricamento dell'agenda.");
            })
            .catch((err) => toast.error(String(err)))
            .then(() => setIsLoading(false));
    }, [getAll]);

    useEffect(() => {
        fetchAgende();
    }, [fetchAgende]);

    const handleDeleteAgenda = useCallback((agendaId: number) => {
        const conferma = window.confirm("Vuoi davvero eliminare questa agenda?");
        if (!conferma) return;

        const prev = agende;
        setAgende((curr) => curr.filter((a) => a.id !== agendaId));
        const tId = toast.loading("Eliminazione in corso...");

        deleteAgenda(agendaId)
            .then((res) => {
                if (!res?.success) throw new Error(res?.error || "Impossibile eliminare l'agenda.");
                toast.success("Agenda eliminata con successo.", { id: tId });
            })
            .catch((e) => {
                setAgende(prev); // rollback
                toast.error(String(e), { id: tId });
            });
    }, [agende, deleteAgenda]);

    const content = useMemo(() => (
        isLoading ? (
            <div className="flex justify-center items-center py-24">
                <div className="w-full max-w-lg rounded-2xl border border-gray-200/70 bg-white/70 p-8">
                    <div className="h-5 w-40 rounded bg-gray-200 animate-pulse mb-4" />
                    <div className="h-4 w-64 rounded bg-gray-200 animate-pulse mb-2" />
                    <div className="h-4 w-56 rounded bg-gray-200 animate-pulse" />
                </div>
            </div>
        ) : agende.length === 0 ? (
            <EmptyAgendeState onRefresh={fetchAgende} onCreate={() => setIsCreateOpen(true)} />
        ) : (
            <div className="flex flex-col gap-10 px-4 sm:px-6">
                {agende.map((agenda) => (
                    <motion.div
                        key={agenda.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Calendario
                            agenda={agenda}
                            onDeleteAgenda={() => handleDeleteAgenda(agenda.id)}
                        />
                    </motion.div>
                ))}
            </div>
        )
    ), [isLoading, agende, fetchAgende, handleDeleteAgenda]);

    return (
        <div className="relative min-h-[50vh]">
            {content}

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
