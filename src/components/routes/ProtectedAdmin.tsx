import {Navigate} from "react-router";
import {useAuthStore} from "../../stores/AuthStore.ts";
import type {ERuolo} from "../../services/api";

export const ProtectedAdmin = ({children}: {children: React.ReactNode}) => {
    const {isAuthenticated, tokenInfo} = useAuthStore();
    const isAdmin = tokenInfo?.ruolo === ("Amministratore" as ERuolo);

    return (
        <>
            {!isAuthenticated || !isAdmin ? <Navigate to="/" replace /> : children}
        </>
    );
};
