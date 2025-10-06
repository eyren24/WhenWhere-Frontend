import React from "react";
import { UserContext } from "./UserContext";
import type { User } from "./UserContext";

const LS_KEY_LIST = "UserList";

function loadUsersFromStorage(): User[] {
    try {
        const raw = localStorage.getItem(LS_KEY_LIST);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const users = loadUsersFromStorage();

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    );
}
