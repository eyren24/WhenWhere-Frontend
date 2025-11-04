import {FaLock, FaUnlock} from "react-icons/fa";
import type {ResUtenteDTO} from "../../services/api";
import {useAdminStore} from "../../stores/AdminStore.ts";
import {useState} from "react";
import toast from "react-hot-toast";
import {ClipLoader} from "react-spinners";

interface Props {
    users: ResUtenteDTO[];
    onRefresh: () => void;
}

export const UsersTable = ({users, onRefresh}: Props) => {
    const {toggleStatusUtente} = useAdminStore();
    const [loadingId, setLoadingId] = useState<number | null>(null);

    if (users.length === 0)
        return <p className="UsersTable__empty">Nessun utente trovato.</p>;

    const handleToggleStatus = async (userId: number) => {
        setLoadingId(userId);
        try {
            const res = await toggleStatusUtente(userId);
            if (res.success) {
                toast.success("Stato utente aggiornato");
                onRefresh(); // aggiorna tabella dopo la chiamata
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Errore durante l'aggiornamento dello stato");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="UsersTable__container">
            <table className="UsersTable__table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Genere</th>
                    <th>Ruolo</th>
                    <th>Stato</th>
                    <th>Data di nascita</th>
                    <th>Ultimo accesso</th>
                    <th>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    const isLoading = loadingId === user.id;
                    return (
                        <tr
                            key={user.id}
                            className={`UsersTable__row ${
                                !user.statoAccount ? "UsersTable__row--disabled" : ""
                            }`}
                        >
                            <td>{user.id}</td>
                            <td>
                                {user.nome} {user.cognome}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.genere || "-"}</td>
                            <td>{user.ruoloId ?? "-"}</td>
                            <td>
                  <span
                      className={`UsersTable__status ${
                          user.statoAccount
                              ? "UsersTable__status--disabled"
                              : "UsersTable__status--active"
                      }`}
                  >
                    {user.statoAccount ? "Disabilitato" : "Attivo"}
                  </span>
                            </td>
                            <td>
                                {user.dataNascita
                                    ? new Date(user.dataNascita).toLocaleDateString()
                                    : "-"}
                            </td>
                            <td>
                                {user.lastLogin
                                    ? new Date(user.lastLogin).toLocaleDateString()
                                    : "-"}
                            </td>
                            <td className="UsersTable__actions">
                                {isLoading ? (
                                    <ClipLoader color={'#000'}/>
                                ) : (
                                    <button
                                        title={
                                            user.statoAccount ? "Riattiva" : "Disabilita"
                                        }
                                        className="UsersTable__btn status"
                                        onClick={() => handleToggleStatus(user.id)}
                                    >
                                        {user.statoAccount ? <FaLock/> : <FaUnlock/>}
                                    </button>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};
