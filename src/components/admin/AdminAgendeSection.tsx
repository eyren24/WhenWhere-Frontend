import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {StatsCard} from "./StatsCard.tsx";
import type {ResAdminAgendeStatsDTO} from "../../services/api";
import {useAdminStore} from "../../stores/AdminStore.ts";

export const AdminAgendeSection = () => {
    const [stats, setStats] = useState<ResAdminAgendeStatsDTO>();
    const [isLoading, setIsLoading] = useState(true);
    const {getAgendeStats} = useAdminStore();
    useEffect(() => {
        getAgendeStats().then((res) => {
            if (res.success) {
                setStats(res.stats)
            } else {
                toast.error(res.message)
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => setIsLoading(false))
    }, [getAgendeStats]);

    if (isLoading)
        return <p className="AdminUsersSection__loading">Caricamento dati agende...</p>;
    if (!stats)
        return <p className="AdminUsersSection__loading">Nessun dato disponibile</p>;

    return (
        <section className="AdminUsersSection">
            <h2 className="AdminUsersSection__title">Gestione Agende e Like</h2>

            <div className="AdminDashboard__grid">
                <StatsCard title="Totale Agende" value={stats.totaleAgende} accent="blue"/>
                <StatsCard title="Agende Pubbliche" value={stats.agendePubbliche} accent="green"/>
                <StatsCard title="Agende Private" value={stats.agendePrivate} accent="gray"/>
                <StatsCard title="Totale Likes" value={stats.totaleLikes} accent="red"/>
            </div>

            <div className="UsersTable__container" style={{marginTop: "2rem"}}>
                <table className="UsersTable__table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome Agenda</th>
                        <th>Proprietario</th>
                        <th>Likes</th>
                        <th>Privacy</th>
                        <th>Tema</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stats.topAgende.map((a, index) => (
                        <tr key={a.id}>
                            <td>{index + 1}</td>
                            <td>{a.nomeAgenda}</td>
                            <td>{a.utente}</td>
                            <td>{a.likesCount}</td>
                            <td>
                  <span
                      className={`UsersTable__status ${
                          a.isPrivate
                              ? "UsersTable__status--disabled"
                              : "UsersTable__status--active"
                      }`}
                  >
                    {a.isPrivate ? "Privata" : "Pubblica"}
                  </span>
                            </td>
                            <td>
                                <div
                                    style={{
                                        background: a.tema,
                                        width: "22px",
                                        height: "22px",
                                        borderRadius: "6px",
                                        border: "1px solid var(--bombay)",
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
