import type { ResUtenteDTO } from "../../services/api";

interface Props {
    utente: ResUtenteDTO;
}

export const ProfiloInfo = ({ utente }: Props) => {
    const formatDate = (d?: string | null) => {
        if (!d) return "—";
        const date = new Date(d);
        return date.toLocaleDateString("it-IT", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    return (
        <section className="profilo-header">
            <div className="profilo-avatar">
                {utente.username.charAt(0).toUpperCase()}
            </div>
            <div className="profilo-info">
                <h2 className="profilo-username">{utente.username}</h2>
                <p className="profilo-email">{utente.email}</p>
                <div className="profilo-details-grid">
                    <span><strong>Nome:</strong> {utente.nome || "—"}</span>
                    <span><strong>Cognome:</strong> {utente.cognome || "—"}</span>
                    <span><strong>Genere:</strong> {utente.genere || "—"}</span>
                    <span><strong>Data di nascita:</strong> {formatDate(utente.dataNascita)}</span>
                    <span><strong>Stato account:</strong> {utente.statoAccount ? "Attivo" : "Disattivo"}</span>
                    <span><strong>Ruolo:</strong> {utente.ruoloId === 1 ? "Utente" : "Staff/Admin"}</span>
                    <span><strong>Ultimo accesso:</strong> {formatDate(utente.lastLogin)}</span>
                </div>
            </div>
        </section>
    );
};
