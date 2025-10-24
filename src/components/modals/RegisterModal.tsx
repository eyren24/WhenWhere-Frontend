import "../../assets/css/modals/login.css";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/AuthStore.ts";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { FaHome } from "react-icons/fa";

export const RegisterModal: React.FC<{ show: boolean; onClose: () => void }> = ({
                                                                                    show,
                                                                                    onClose,
                                                                                }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");

    const { isLoading, signup } = useAuthStore();
    const navigate = useNavigate();

    // ESC per chiudere
    useEffect(() => {
        if (!show) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [show, onClose]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !confirmPassword || !birthDate || !gender) {
            toast.error("Tutti i campi sono obbligatori");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Le password non coincidono");
            return;
        }

        try {
            const res = await signup({
                email,
                password,
                nome: firstName,
                cognome: lastName,
                dataNascita: birthDate,
                genere: gender,
                confermaPassword: confirmPassword,
            });

            if (!res.success) {
                const err = res.error;
                const msg =
                    typeof err === "string"
                        ? err
                        : typeof err === "object" && "title" in err
                            ? err.title
                            : "Registrazione fallita";
                toast.error(msg);
                return;
            }

            toast.success("Registrazione completata con successo!");
            onClose();
            navigate("/areaPersonale");
        } catch {
            toast.error("Errore imprevisto durante la registrazione");
        }
    };

    if (!show) return null;

    return (
        <div className="login-modal-wrapper" aria-modal="true" role="dialog" aria-labelledby="register-title">
            <div className="overlay" onClick={onClose} />
            <form onSubmit={handleSubmit} className="register-wrapper" onClick={(e) => e.stopPropagation()}>
                {/* Bottone Home */}
                <button
                    type="button"
                    className="modal-home-btn"
                    aria-label="Torna alla Home"
                    onClick={() => {
                        onClose();
                        navigate("/");
                    }}
                >
                    <FaHome size={16} />
                </button>

                <div className="register-header">
                    <h2 id="register-title">Registrazione</h2>
                </div>

                <div className="register-body">
                    {/* Nome & Cognome */}
                    <div className="register-form-row">
                        <div className="register-form-column">
                            <label htmlFor="firstName">Nome</label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Inserisci il nome"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="register-form-column">
                            <label htmlFor="lastName">Cognome</label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Inserisci il cognome"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Genere & Data di nascita */}
                    <div className="register-form-row">
                        <div className="register-form-column">
                            <label htmlFor="gender">Genere</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Seleziona il genere</option>
                                <option value="maschio">Maschio</option>
                                <option value="femmina">Femmina</option>
                                <option value="altro">Altro</option>
                            </select>
                        </div>
                        <div className="register-form-column">
                            <label htmlFor="birthDate">Data di nascita</label>
                            <input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="register-form-full">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Inserisci l'email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password & Conferma */}
                    <div className="register-form-row">
                        <div className="register-form-column">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Inserisci la password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="register-form-column">
                            <label htmlFor="confirmPassword">Conferma Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Conferma la password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="register-footer">
                    <button type="submit" className="register-button-full">
                        {isLoading ? <ClipLoader /> : "Registrati"}
                    </button>
                </div>
            </form>
        </div>
    );
};
