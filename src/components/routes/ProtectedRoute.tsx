import {Navigate, useParams} from "react-router";
import { useEffect, useState} from "react";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {useAgendaStore} from "../../stores/AgendaStore.ts";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams<{ id: string }>();
    const { isAuthenticated, tokenInfo } = useAuthStore();
    const { getAgendaById } = useAgendaStore();
    const [status, setStatus] = useState<"checking" | "denied" | "allowed">("checking");

    useEffect(() => {
        if (!isAuthenticated || !id) {
            setStatus("denied");
            return;
        }

        getAgendaById(Number(id))
            .then((res) => {
                const agenda = res.agenda;
                const ok = res.success && agenda && agenda.utenteId === tokenInfo?.utenteId;
                setStatus(ok ? "allowed" : "denied");
            })
            .catch(() => setStatus("denied"));
    }, [id, isAuthenticated, getAgendaById, tokenInfo]);

    return !isAuthenticated ? (
        <Navigate to="/" replace/>
    ) : status === "checking" ? (
        <></>
    ) : status === "denied" ? (
        <Navigate to="/" replace/>
    ) : (
        children
    );
};
