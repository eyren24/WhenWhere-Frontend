import {useEffect, useState} from "react";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {useLikesStore} from "../../stores/LikesStore.ts";
import {useAgendaStore} from "../../stores/AgendaStore.ts";
import type {ResAgendaDTO, ResLikesDTO} from "../../services/api";
import toast from "react-hot-toast";
import {AgendaPreview} from "./AgendaPreview.tsx";
import {FaHeart} from "react-icons/fa";
import "../../assets/css/listaAgendeLiked.css";

export const ListaAgendeLiked = () => {
    const {getByUser} = useLikesStore();
    const {getAgendaById} = useAgendaStore();
    const {tokenInfo} = useAuthStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);

    useEffect(() => {
        if (!tokenInfo?.utenteId) return;

        getByUser(tokenInfo.utenteId)
            .then(async (res) => {
                if (!res.success) {
                    toast.error(res.message || "Errore di caricamento");
                    return;
                }

                const promises = res.agenda.map((like: ResLikesDTO) =>
                    getAgendaById(like.agendaid).then(r => r.agenda)
                );

                const results = await Promise.all(promises);
                const agendasPulite = results.filter((a): a is ResAgendaDTO => a !== undefined);
                setAgende(agendasPulite);
            })
            .catch(console.error);
    }, [getByUser, getAgendaById, tokenInfo?.utenteId]);

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

            {count === 0 ? (
                <div className="liked-empty" role="status" aria-live="polite">
                    <FaHeart className="liked-empty-icon"/>
                    <h3 className="liked-empty-title">Nessun like ancora</h3>
                    <p className="liked-empty-sub">Metti il cuore alle agende che vuoi ritrovare qui.</p>
                </div>
            ) : (
                <div className="likedAgende-wrapper">
                    {agende.map((item, i) => (
                        <div className="likedAgende-div" key={i}>
                            <AgendaPreview agenda={item}/>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
