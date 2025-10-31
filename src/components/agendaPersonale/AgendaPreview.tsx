import "../../assets/css/agendaPreview.css";
import type {ResAgendaDTO} from "../../services/api";
import {useNavigate} from "react-router";
import {FaRegShareSquare} from "react-icons/fa";
import type {MouseEventHandler} from "react";
import toast from "react-hot-toast";

type Props = { agenda: ResAgendaDTO };

async function copyToClipboard(text: string) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }
    // 2) Fallback compatibile
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

export const AgendaPreview = ({ agenda }: Props) => {
    const navigate = useNavigate();

    const handleNav: MouseEventHandler<HTMLElement> = (e) => {
        if ((e.target as HTMLElement).closest("[data-no-nav]")) return;
        navigate(`/agenda/${agenda.id}`);
    };

    const handleShareButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const link = `${window.location.origin}/agenda/${agenda.id}`;
        try {
            await copyToClipboard(link);
            toast.success("Link copiato negli appunti");
        } catch {
            toast.error("Copia non riuscita");
        }
    };

    return (
        <article
            onClick={handleNav}
            className="agendapreview-wrapper"
            role="button"
            tabIndex={0}
            aria-label={`Anteprima agenda: ${agenda.nomeAgenda}`}
            data-privacy={agenda.isprivate ? "private" : "public"}
        >
            <header className="agendapreview-header">
                <div className="agendapreview-avatar" style={{background: agenda.tema}}>{agenda.nomeAgenda}</div>
                <div className="agendapreview-headings">
                    <span className="agendapreview-subtitle">Nome</span>
                    <h3 className="agendapreview-title" title={agenda.nomeAgenda}>
                        {agenda.nomeAgenda}
                    </h3>
                </div>
                <span className={`agendapreview-badge`} style={{background: agenda.tema}}>
          {agenda.isprivate ? "Privata" : "Pubblica"}
        </span>
            </header>

            <section className="agendapreview-description">{agenda.descrizione || "Nessuna descrizione"}</section>

            <footer className="agendapreview-footer">
                <div className="agendapreview-meta">
                    <span className="agendapreview-dot" style={{color: agenda.tema}} />
                    <span className="agendapreview-meta-text">
            {agenda.isprivate ? "Solo tu e invitati" : "Visibile a tutti"}
          </span>
                </div>
                {!agenda.isprivate &&
                <button
                    type="button"
                    data-no-nav
                    onClick={handleShareButton}
                    className="agendapreview-link universal-link"
                    style={{
                        background: agenda.tema,
                        border: `1px solid color-mix(in srgb, ${agenda.tema} 25%, transparent);`
                    }}
                >
                    <FaRegShareSquare className="agendapreview-icon icons" />
                    Condividi
                </button>
                }
            </footer>
        </article>
    );
};
