import { createContext, useContext } from "react";

export interface User {
    utenteId: string;
    nomeCompleto: string;
    ruolo: string;
}

export interface UserContextType {
    users: User[];
}

export const UserContext = createContext<UserContextType>({
    users: [],
});

export function useUserContext() {
    return useContext(UserContext);
}

