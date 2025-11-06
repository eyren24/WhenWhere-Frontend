import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../stores/AuthStore";
import type { ResUtenteDTO } from "../services/api";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import "../assets/css/profiloEdit.css";

export const ProfiloEdit = () => {
    const { getTokenInfo, getUtenteById, updateUtente } = useAuthStore();
    const [utente, setUtente] = useState<ResUtenteDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        getTokenInfo()
            .then((tokenRes) => {
                if (!tokenRes.success || !tokenRes.info) {
                    toast.error("Token non valido, effettua nuovamente l'accesso.");
                    return;
                }
                const userId = tokenRes.info.utenteId;
                getUtenteById(userId)
                    .then((res) => {
                        if (res.success && res.utente) setUtente(res.utente);
                        else toast.error(res.error || "Impossibile caricare i dati utente.");
                    })
                    .catch(() => toast.error("Errore durante il caricamento del profilo."))
                    .finally(() => setLoading(false));
            })
            .catch(() => {
                toast.error("Errore nel recupero del token.");
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!utente || !formRef.current) return;

        const formData = new FormData(formRef.current);
        const updateData = {
            nome: formData.get("nome") as string,
            cognome: formData.get("cognome") as string,
            genere: formData.get("genere") as string,
            dataNascita: formData.get("dataNascita") as string,
            preferenzeNotifiche: formData.get("preferenzeNotifiche") === "on",
        };

        updateUtente(utente.id, updateData)
            .then((res) => {
                if (res.success) {
                    toast.success("Profilo aggiornato con successo!");
                    setEditing(false);
                } else toast.error(res.message || "Errore durante l'aggiornamento.");
            })
            .catch(() => toast.error("Errore imprevisto durante l'aggiornamento."));
    };

    if (loading) return <p className="profilo-loader">Caricamento profilo...</p>;
    if (!utente) return <p className="profilo-loader">Utente non trovato.</p>;

    return (
        <div className="profilo-card">
            <header className="profilo-header">
                <h2 className="profilo-username">{utente.username}</h2>
                <button onClick={() => setEditing(!editing)} className="profilo-edit-btn">
                    <FaUserEdit />
                    {editing ? "Annulla" : "Modifica"}
                </button>
            </header>

            {editing ? (
                <form ref={formRef} onSubmit={handleSubmit} className="profilo-form">
                    <div className="profilo-grid">
                        <label>
                            Nome
                            <input type="text" name="nome" defaultValue={utente.nome || ""} />
                        </label>
                        <label>
                            Cognome
                            <input type="text" name="cognome" defaultValue={utente.cognome || ""} />
                        </label>
                        <label>
                            Genere
                            <select name="genere" defaultValue={utente.genere || ""}>
                                <option value="">—</option>
                                <option value="maschio">Maschio</option>
                                <option value="femmina">Femmina</option>
                                <option value="altro">Altro</option>
                            </select>
                        </label>
                        <label>
                            Data di nascita
                            <input
                                type="date"
                                name="dataNascita"
                                defaultValue={utente.dataNascita?.split("T")[0] || ""}
                            />
                        </label>
                        <label className="profilo-switch">
                            <span>Ricevi notifiche email</span>
                            <input
                                type="checkbox"
                                name="preferenzeNotifiche"
                                defaultChecked={utente.preferenzeNotifiche ?? false}
                            />
                            <span className="slider" />
                        </label>
                    </div>

                    <button type="submit" className="profilo-save-btn">
                        Salva modifiche
                    </button>
                </form>
            ) : (
                <div className="profilo-info">
                    <p><strong>Nome:</strong> {utente.nome || "—"}</p>
                    <p><strong>Cognome:</strong> {utente.cognome || "—"}</p>
                    <p><strong>Email:</strong> {utente.email}</p>
                    <p><strong>Genere:</strong> {utente.genere || "—"}</p>
                    <p>
                        <strong>Data di nascita:</strong>{" "}
                        {utente.dataNascita
                            ? new Date(utente.dataNascita).toLocaleDateString("it-IT")
                            : "—"}
                    </p>
                    <p>
                        <strong>Notifiche:</strong>{" "}
                        {utente.preferenzeNotifiche ? "Attive" : "Disattivate"}
                    </p>
                </div>
            )}
        </div>
    );
};
