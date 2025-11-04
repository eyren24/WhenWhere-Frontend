import "../../assets/css/agendaPreview.css";
import type {ResAgendaDTO} from "../../services/api";
import {FaHeart, FaRegHeart, FaRegShareSquare} from "react-icons/fa";
import toast from "react-hot-toast";
import {useLikesStore} from "../../stores/LikesStore.ts";

type Props = { agenda: ResAgendaDTO, onRefresh: () => void };

async function copyToClipboard(text: string) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand("copy");
    } finally {
        document.body.removeChild(ta);
    }
}

export const AgendaPreview = ({agenda, onRefresh}: Props) => {
    const {add, remove} = useLikesStore();

    const handleAddLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        add({agendaid: agenda.id}).then((res) => {
            if (res.success) {
                toast.success(res.message);
            } else {
                if (res.message?.includes("tua agenda"))
                    toast.error("Non puoi mettere like alla tua agenda");
                else if (res.message?.includes("già messo"))
                    toast.error("Hai già messo like a questa agenda");
                else
                    toast.error(res.message || "Errore generico");

            }
        }).catch(console.error)
            .finally(() => {
                onRefresh();
            });
    };

    const handleRemoveLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        remove(agenda.id).then((res) => {
            if (res.success) toast.success(res.message);
            else toast.error(res.message || "Errore generico");
        }).catch(console.error)
            .finally(() =>
                onRefresh())
    };

    const handleShareButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const link = `${window.location.origin}/agenda/pubblica/${agenda.id}`;
        try {
            await copyToClipboard(link);
            toast.success("Link copiato negli appunti");
        } catch {
            toast.error("Copia non riuscita");
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
                    <span className="agendapreview-subtitle">Nome</span>
                    <h3 className="agendapreview-title" title={agenda.nomeAgenda}>
                        {agenda.nomeAgenda}
                    </h3>
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
                            data-no-nav
                            onClick={handleShareButton}
                            className="agendapreview-link universal-link"
                            style={{
                                background: agenda.tema,
                                border: `1px solid color-mix(in srgb, ${agenda.tema} 25%, transparent)`
                            }}
                        >
                            <FaRegShareSquare className="agendapreview-icon icons" />
                            Condividi
                        </button>

                        <button
                            type="button"
                            data-no-nav
                            onClick={agenda.hasLiked ? handleRemoveLike : handleAddLike}
                            className={`agendapreview-link`}
                            style={{
                                background: agenda.tema,
                                border: `1px solid color-mix(in srgb, ${agenda.tema} 25%, transparent)`,
                                opacity: agenda.hasLiked ? 0.7 : 1,
                            }}
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
