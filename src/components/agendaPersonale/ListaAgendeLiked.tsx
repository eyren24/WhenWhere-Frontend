import {useEffect, useState} from "react";
import type {ResAgendaDTO} from "../../services/api";
import toast from "react-hot-toast";
import {AgendaPreview} from "./AgendaPreview.tsx";
import {FaHeart} from "react-icons/fa";
import "../../assets/css/listaAgendeLiked.css";
import {CustomLoader} from "../layout/CustomLoader.tsx";
import {useAgendaStore} from "../../stores/AgendaStore.ts";

export const ListaAgendeLiked = () => {
    const {getUserAll} = useAgendaStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        getUserAll()
            .then((res) => {
                if (res.success) setAgende(res.agenda);
                else toast.error(res.error || "Errore di caricamento");
            })
            .catch(console.error).finally(() => setIsLoading(false));
    }, [getUserAll, refresh]);

    const count = agende.length;

    return (
        <section className="likedAgende-section">
            <header className="likedAgende-header">
                <h2 className="likedAgende-title">
                    Agende che ti piacciono
                    <span className="liked-badge" aria-label={`${count} agende piaciute`}>{count}</span>
                </h2>
                <p className="likedAgende-subtitle">Le tue preferite, sempre a portata di click.</p>
            </header>
            {isLoading ? <CustomLoader /> : count === 0 ? (
                <div className="liked-empty" role="status" aria-live="polite">
                    <FaHeart className="liked-empty-icon"/>
                    <h3 className="liked-empty-title">Nessun like ancora</h3>
                    <p className="liked-empty-sub">Metti il cuore alle agende che vuoi ritrovare qui.</p>
                </div>
            ) : (
                <div className="likedAgende-wrapper">
                    {agende.map((item, i) => (
                        <div className="likedAgende-div" key={i}>
                            <AgendaPreview agenda={item} onRefresh={() => setRefresh((prev) => !prev)}/>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
