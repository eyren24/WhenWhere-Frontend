import {useAgendaStore} from "../../stores/AgendaStore.ts";
import {useEffect, useState} from "react";
import type {ResAgendaDTO} from "../../services/api";
import toast from "react-hot-toast";
import {AgendaPreview} from "./AgendaPreview.tsx";
import {FaPlus} from "react-icons/fa";
import "../../assets/css/listaAgende.css";
import {CustomLoader} from "../layout/CustomLoader.tsx";

export const ListaAgende = () => {
    const { getAll } = useAgendaStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAll()
            .then((res) => {
                if (res.success) setAgende(res.agenda || []);
                else toast.error(res.error || "Errore generico");
            })
            .catch(console.error).finally(() => {
            setIsLoading(false);
        });
    }, [getAll]);

    const handleCreate = () => {
        toast("Creazione nuova agenda in arrivo");
    };

    return (
        <section className="listaAgende-section">
            <header className="likedAgende-header">
                <h2 className="likedAgende-title">
                    Le tue agende
                    <span className="liked-badge" aria-label={`${agende.length} agende piaciute`}>{agende.length}</span>
                </h2>
                <p className="likedAgende-subtitle">Gestisci, condividi e crea nuove agende in pochi clic.</p>
            </header>

            <div className="listaAgende-wrapper">
                {isLoading ? <CustomLoader/> :
                    <>
                        {agende.map((item, index) => (
                            <div className="listaAgende-div" key={index}>
                                <AgendaPreview agenda={item}/>
                            </div>
                        ))}
                        <div className="listaAgende-div">
                            <button
                                type="button"
                                className="new-agenda-card"
                                onClick={handleCreate}
                                aria-label="Crea nuova agenda"
                            >
                                <FaPlus className="new-agenda-icon"/>
                                <span className="new-agenda-text">Nuova Agenda</span>
                            </button>
                        </div>
                    </>
                }
            </div>
        </section>
    );
};
