import {useAgendaStore} from "../../stores/AgendaStore.ts";
import {useEffect, useState} from "react";
import type {ReqAgendaDTO, ResAgendaDTO} from "../../services/api";
import toast from "react-hot-toast";
import {AgendaPreview} from "./AgendaPreview.tsx";
import {FaPlus} from "react-icons/fa";
import "../../assets/css/listaAgende.css";
import {CustomLoader} from "../layout/CustomLoader.tsx";
import {CreateAgendaModal} from "../modals/CreateAgendaModal.tsx";
import {Link} from "react-router";

export const ListaAgende = () => {
    const {getAll, creaAgenda} = useAgendaStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getAll()
            .then((res) => {
                if (res.success) setAgende(res.agenda || []);
                else toast.error(res.error || "Errore generico");
            })
            .catch(console.error).finally(() => {
            setIsLoading(false);
        });
    }, [getAll, refresh]);

    const handleCreate = (data: ReqAgendaDTO) => {
        setIsLoading(true);
        creaAgenda(data).then((res) => {
            if (res.success) {
                toast.success("Agenda creata con successo!");
                setRefresh((prev) => !prev)
            } else {
                toast.error(res.error || "Errore generico");
            }
        }).catch(console.error).finally(() => setIsLoading(false));
    };

    return (
        <>
            <CreateAgendaModal isOpen={showModal} onClose={() => setShowModal(false)} onCreate={handleCreate}/>
            <section className="listaAgende-section">
                <header className="likedAgende-header">
                    <h2 className="likedAgende-title">
                        Le tue agende
                        <span className="liked-badge"
                              aria-label={`${agende.length} agende piaciute`}>{agende.length}</span>
                    </h2>
                    <p className="likedAgende-subtitle">Gestisci, condividi e crea nuove agende in pochi clic.</p>
                </header>

                <div className="listaAgende-wrapper">
                    {isLoading ? <CustomLoader/> :
                        <>
                            {agende.map((item, index) => (
                                <div className="listaAgende-div" key={index}>
                                    <Link className="universal-link" to={`/agenda/pubblica/${item.id}`}><AgendaPreview agenda={item}/></Link>
                                </div>
                            ))}
                            <div className="listaAgende-div">
                                <button
                                    type="button"
                                    className="new-agenda-card"
                                    onClick={() => setShowModal(true)}
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
        </>
    );
};
