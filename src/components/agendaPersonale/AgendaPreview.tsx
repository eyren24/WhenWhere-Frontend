import "../../assets/css/agendaPreview.css";
import type {ResAgendaDTO} from "../../services/api";
import {FaHeart, FaRegHeart, FaRegShareSquare, FaUser} from "react-icons/fa";
import toast from "react-hot-toast";
import {useLikesStore} from "../../stores/LikesStore.ts";
import {useNavigate} from "react-router";

type Props = { agenda: ResAgendaDTO; onRefresh: () => void };

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Link copiato negli appunti");
    } catch {
        toast.error("Copia non riuscita");
    }
}

export const AgendaPreview = ({agenda, onRefresh}: Props) => {
    const {add, remove} = useLikesStore();
    const navigate = useNavigate();

    const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (agenda.hasLiked) {
            remove(agenda.id).then((res) => {
                if (res.success) {
                    toast.success(res.message)
                } else {
                    toast.error(res.message)
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                onRefresh();
            });
        } else {
            add({agendaid: agenda.id}).then((res) => {
                if (res.success) {
                    toast.success(res.message)
                } else {
                    toast.error(res.message)
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                onRefresh();
            });
        }
    };

    return (
        <article
            className="agendapreview-wrapper"
            role="button"
            tabIndex={0}
            aria-label={`Anteprima agenda: ${agenda.nomeAgenda}`}
            data-privacy={agenda.isprivate ? "private" : "public"}
        >
            <header className="agendapreview-header">
                <div className="agendapreview-avatar" style={{ background: agenda.tema }}>
                    {agenda.nomeAgenda.charAt(0).toUpperCase()}
                </div>

                <div className="agendapreview-headings">
                    <h3 className="agendapreview-title" title={agenda.nomeAgenda}>
                        {agenda.nomeAgenda}
                    </h3>
                    <button
                        type="button"
                        className="agendapreview-author"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/profilo/${agenda.utente?.id}`);
                        }}
                    >
                        <FaUser className="author-icon"/>
                        {agenda.utente?.username ?? "Utente sconosciuto"}
                    </button>
                </div>

                <span className="agendapreview-badge" style={{ background: agenda.tema }}>
                    {agenda.isprivate ? "Privata" : "Pubblica"}
                </span>
            </header>

            <section className="agendapreview-description">
                {agenda.descrizione || "Nessuna descrizione"}
            </section>

            <footer className="agendapreview-footer">
                <div className="agendapreview-meta">
                    <span className="agendapreview-dot" style={{ color: agenda.tema }} />
                    <span className="agendapreview-meta-text">
                        {agenda.isprivate ? "Solo tu e invitati" : "Visibile a tutti"}
                    </span>
                </div>

                {!agenda.isprivate && (
                    <div className="agendapreview-actions">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                copyToClipboard(`${window.location.origin}/agenda/pubblica/${agenda.id}`);
                            }}
                            className="agendapreview-btn share-btn"
                            style={{background: agenda.tema}}
                        >
                            <FaRegShareSquare/>
                            Condividi
                        </button>

                        <button
                            type="button"
                            onClick={toggleLike}
                            className={`agendapreview-btn like-btn ${agenda.hasLiked ? "liked" : ""}`}
                            style={{background: agenda.tema}}
                        >
                            {agenda.hasLiked ? <FaHeart/> : <FaRegHeart/>}
                            {agenda.likesCount}
                        </button>
                    </div>
                )}
            </footer>
        </article>
    );
};
