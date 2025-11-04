import { useEffect, useState } from "react";
import type { FiltriUtenteDTO, ResUtenteDTO } from "../../services/api";
import { useAdminStore } from "../../stores/AdminStore.ts";
import toast from "react-hot-toast";
import { UsersTable } from "./UsersTable.tsx";
import { ClipLoader } from "react-spinners";

export const AdminUsersSection = () => {
    const { getAllUsers } = useAdminStore();
    const [users, setUsers] = useState<ResUtenteDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtri, setFiltri] = useState<FiltriUtenteDTO>({});
    const [formData, setFormData] = useState<FiltriUtenteDTO>({});
    const [refresh, setRefresh] = useState<boolean>(false);

    const handleSearch = () => setFiltri(formData);
    const handleRefresh = () => setRefresh((prev) => !prev);

    useEffect(() => {
        setIsLoading(true);
        getAllUsers(filtri)
            .then((res) => {
                if (res.success) setUsers(res.users);
                else toast.error(res.message);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Errore nel caricamento utenti");
            })
            .finally(() => setIsLoading(false));
    }, [filtri, getAllUsers, refresh]);

    return (
        <section className="AdminUsersSection">
            <h2 className="AdminUsersSection__title">Gestione Utenti</h2>

            <div className="AdminUsersSection__filters">
                <input
                    type="text"
                    placeholder="Nome"
                    value={formData.nome ?? ""}
                    onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value || null })
                    }
                />
                <input
                    type="text"
                    placeholder="Cognome"
                    value={formData.cognome ?? ""}
                    onChange={(e) =>
                        setFormData({ ...formData, cognome: e.target.value || null })
                    }
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={formData.email ?? ""}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value || null })
                    }
                />
                <select
                    value={
                        formData.statoAccount === undefined
                            ? ""
                            : formData.statoAccount
                                ? "attivo"
                                : "disabilitato"
                    }
                    onChange={(e) => {
                        const val = e.target.value;
                        setFormData({
                            ...formData,
                            statoAccount:
                                val === "" ? undefined : val === "attivo",
                        });
                    }}
                >
                    <option value="">Tutti</option>
                    <option value="attivo">Attivi</option>
                    <option value="disabilitato">Disabilitati</option>
                </select>

                <button
                    className="AdminUsersSection__searchBtn"
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? "Caricamento..." : "Cerca"}
                </button>
            </div>

            {isLoading ? (
                <p className="AdminUsersSection__loading">
                    Caricamento utenti... <ClipLoader color="#03ace4" size={20} />
                </p>
            ) : (
                <UsersTable users={users} onRefresh={handleRefresh} />
            )}
        </section>
    );
};
