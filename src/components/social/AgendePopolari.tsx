import React, {useEffect, useState} from "react";
import {useLikesStore} from "../../stores/LikesStore.ts";
import {useAuthStore} from "../../stores/AuthStore.ts";
import type {ResSocialDTO} from "../../services/api";
import toast from "react-hot-toast";
import {CustomLoader} from "../layout/CustomLoader.tsx";
import {FaSearch} from "react-icons/fa";

export const AgendePopolari = () => {
    const {getTopAgende, getByUser} = useLikesStore();
    const {getByUsername} = useAuthStore();

    const [agende, setAgende] = useState<ResSocialDTO[]>([]);
    const [filtered, setFiltered] = useState<ResSocialDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getTopAgende()
            .then((res) => {
                if (res.success) {
                    setAgende(res.agende);
                    setFiltered(res.agende);
                } else {
                    toast.error(res.error || "Errore generico");
                }
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [getTopAgende]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!search.trim()) return toast.error("Inserisci un nome utente");

        setIsLoading(true);
        const bho = filtered.map((res) =>{
            return res.utente.username == search;
        })
        const userRes = await getByUsername(search.trim());

        if (!userRes.success || !userRes.utente) {
            toast.error(userRes.error || "Utente non trovato");
            setIsLoading(false);
            return;
        }

        const likesRes = await getByUser(userRes.utente.id || 1);
        if (!likesRes.success) {
            toast.error(likesRes.message || "Errore nel recupero agende");
        } else {
            setAgende(likesRes.likes.map(l => l.agenda));
        }

        setIsLoading(false);
    };

    return (
        <section className="agende-section">
            <div className="agende-header">
                <h3 className="section-title">Agende più popolari</h3>
                <form className="agende-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Cerca per utente..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" aria-label="Cerca">
                        <FaSearch/>
                    </button>
                </form>
            </div>

            <div className="agende-grid">
                {isLoading ? (
                    <CustomLoader/>
                ) : agende.length === 0 ? (
                    <>Nessuna agenda</>
                ) : (
                    filtered.map((agenda) => (
                        <article key={agenda.id} className="agenda-card">
                            <h4>{agenda.nomeAgenda}</h4>
                            <p>{agenda.descrizione}</p>
                            <span className="agenda-likes">❤️ {agenda.likesCount ?? 0}</span>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};
