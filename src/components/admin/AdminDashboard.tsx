import {useEffect, useState} from "react";
import {StatsCard} from "./StatsCard.tsx";
import {useAdminStore} from "../../stores/AdminStore.ts";
import toast from "react-hot-toast";

interface AdminStats {
    totaleUtenti: number;
    utentiAttivi: number;
    utentiDisabilitati: number;
    nuoviUtentiUltimi7Giorni: number;
    ultimoLoginMedioGiorni: number;
}

export const AdminDashboard = () => {
    const [stats, setStats] = useState<AdminStats>();
    const [isLoading, setIsLoading] = useState(true);
    const {getStats} = useAdminStore();

    useEffect(() => {
        getStats().then((res) => {
            if (res.success) {
                setStats(res.stats)
            } else {
                toast.error(res.message)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => setIsLoading(false))
    }, [getStats]);

    if (isLoading) return <p className="AdminDashboard__loading">Caricamento dati...</p>;
    if (!stats) return <p className="AdminDashboard__error">Nessun dato disponibile</p>;

    return (
        <section className="AdminDashboard__wrapper">
            <h2 className="AdminDashboard__title">Dashboard Amministratore</h2>

            <div className="AdminDashboard__grid">
                <StatsCard title="Utenti totali" value={stats.totaleUtenti} accent="blue"/>
                <StatsCard title="Attivi" value={stats.utentiAttivi} accent="green"/>
                <StatsCard title="Disabilitati" value={stats.utentiDisabilitati} accent="red"/>
                <StatsCard title="Nuovi (7 giorni)" value={stats.nuoviUtentiUltimi7Giorni} accent="gray"/>
                <StatsCard
                    title="Ultimo login medio (giorni)"
                    value={stats.ultimoLoginMedioGiorni}
                    accent="blue"
                />
            </div>
        </section>
    );
};
