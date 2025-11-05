import {Navigate} from "react-router";
import {useAuthStore} from "../../stores/AuthStore.ts";

export const ProtectedLogged = ({children}: {children: React.ReactNode}) => {
    const {isAuthenticated} = useAuthStore();

    return (
        <>
            {!isAuthenticated ? <Navigate to="/" replace /> : children}
        </>
    );
};
