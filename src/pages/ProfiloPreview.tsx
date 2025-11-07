import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router";
import "../assets/css/profiloPreview.css";
import toast from "react-hot-toast";
import type {ResAgendaDTO, ResUtenteDTO} from "../services/api";
import {useAuthStore} from "../stores/AuthStore.ts";
import {useAgendaStore} from "../stores/AgendaStore.ts";
import {AgendaPreview} from "../components/agendaPersonale/AgendaPreview.tsx";
import {ClipLoader} from "react-spinners";
import {ProfiloInfo} from "../components/profilo/ProfiloInfo.tsx";

export const ProfiloPreview = () => {
    const {id} = useParams<{ id: string }>();
    const {getUtenteById} = useAuthStore();
    const {byOwner} = useAgendaStore();
    const navigate = useNavigate();

    const [utente, setUtente] = useState<ResUtenteDTO | null>(null);
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshed, setRefreshed] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        getUtenteById(Number(id)).then((res) => {
            if (res.success && res.utente) {
                setUtente(res.utente);
                byOwner(res.utente.username).then((res) => {
                    if (res.success && res.agende) {
                        setAgende(res.agende);
                    } else {
                        toast.error(res.error || "Errore generico");
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                toast.error(res.error || "Errore generico.");
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [byOwner, getUtenteById, id, refreshed]);

    return (
        <div className="profilo-container">
            {/* 🔙 Pulsante Torna indietro */}
            <button onClick={() => navigate(-1)} className="go-back-button">
                ← Torna indietro
            </button>

            {loading ? (
                <div className="profilo-loader">
                    <ClipLoader color="var(--cerulean)" size={50}/>
                </div>
            ) : (
                utente && <ProfiloInfo utente={utente}/>
            )}

            <section className="profilo-agende">
                <h3 className="profilo-section-title">Agende pubbliche</h3>
                {agende.length === 0 ? (
                    <p className="profilo-empty">Nessuna agenda pubblica disponibile.</p>
                ) : (
                    <div className="profilo-agende-grid">
                        {agende.map((agenda, index) => (
                            <Link to={`/agenda/pubblica/${agenda.id}`} className="universal-link" key={index}>
                                <AgendaPreview agenda={agenda} onRefresh={() => setRefreshed(prev => !prev)}/>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};
