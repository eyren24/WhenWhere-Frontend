import React, { useEffect, useState } from "react";
import { useLikesStore } from "../../stores/LikesStore.ts";
import { useAgendaStore } from "../../stores/AgendaStore.ts";
import type { ResSocialDTO } from "../../services/api";
import toast from "react-hot-toast";
import { CustomLoader } from "../layout/CustomLoader.tsx";
import { FaSearch } from "react-icons/fa";
import { AgendaPreview } from "../agendaPersonale/AgendaPreview.tsx";
import {Link} from "react-router";

export const AgendePopolari = () => {
    const { getTopAgende } = useLikesStore();
    const { byOwner } = useAgendaStore();
    const [filtered, setFiltered] = useState<ResSocialDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false); // 👈 per distinguere se sto cercando

    useEffect(() => {
        // caricamento iniziale: top agende
        setIsLoading(true);
        getTopAgende()
            .then((res) => {
                if (res.success) {
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
        const username = search.trim();
        if (!username) return toast.error("Inserisci un nome utente");

        setIsLoading(true);
        const res = await byOwner(username);

        if (res.success) {
            setFiltered(res.agende);
            setIsSearchActive(true);
        } else {
            toast.error(res.error || "Nessuna agenda trovata");
            setFiltered([]);
        }

        setIsLoading(false);
    };

    const resetSearch = () => {
        setSearch("");
        setIsSearchActive(false);
        setIsLoading(true);
        getTopAgende()
            .then((res) => {
                if (res.success) {
                    const sorted = [...res.agende].sort((a, b) => b.likesCount - a.likesCount);
                    setFiltered(sorted);
                } else {
                    toast.error(res.error || "Errore nel caricamento");
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <section className="agende-section">
            <div className="agende-header">
                <h3 className="section-title">
                    {isSearchActive ? `Risultati per "${search}"` : "Agende più popolari"}
                </h3>

                <form className="agende-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Cerca per utente..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" aria-label="Cerca">
                        <FaSearch />
                    </button>
                    {isSearchActive && (
                        <button
                            type="button"
                            className="reset-search-btn"
                            onClick={resetSearch}
                            aria-label="Resetta ricerca"
                        >
                            ❌
                        </button>
                    )}
                </form>
            </div>

            <div className="agende-grid">
                {isLoading ? (
                    <CustomLoader />
                ) : filtered.length === 0 ? (
                    <>Nessuna agenda trovata</>
                ) : (
                    filtered.map((agenda, index) => (
                        <Link key={index} className="universal-link" to={`/agenda/pubblica/${agenda.id}`}><AgendaPreview key={agenda.id} agenda={agenda} /></Link>
                    ))
                )}
            </div>
        </section>
    );
};
