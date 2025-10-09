import "../../assets/css/modals/login.css";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/AuthStore.ts";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { FaHome } from "react-icons/fa";

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
    onRegisterClick: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
                                                          show,
                                                          onClose,
                                                          onRegisterClick,
                                                      }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, login } = useAuthStore();
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const emailVal = String(formdata.get("email") || "");
        const passwordVal = String(formdata.get("password") || "");

        if (!emailVal || !passwordVal) {
            toast.error("Non possono essere vuoti");
            return;
        }

        login({ email: emailVal, password: passwordVal })
            .then((res) => {
                if (res.success) {
                    toast.success("Autenticato con successo!");
                    navigate("/areaPersonale");
                    onClose();
                } else {
                    toast.error(res.error || "Errore generico");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Errore di rete");
            });
    };

    if (!show) return null;

    return (
        <div className="login-modal-wrapper" aria-modal="true" role="dialog" aria-labelledby="login-title">
            <div className="overlay" onClick={onClose} />
            <form onSubmit={handleSubmit} className="login-wrapper" onClick={(e) => e.stopPropagation()}>
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

                <div className="login-header">
                    <h2 id="login-title">Accesso</h2>
                </div>

                <div className="login-body">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Inserisci l'email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Inserisci la password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="login-footer">
                    <button type="submit">{isLoading ? <ClipLoader /> : "Accedi"}</button>
                </div>

                <div className="login-switch">
                    <span>Non sei registrato? </span>
                    <button
                        type="button"
                        className="switch-button"
                        onClick={() => {
                            onClose();
                            onRegisterClick();
                        }}
                    >
                        Registrati
                    </button>
                </div>
            </form>
        </div>
    );
};
