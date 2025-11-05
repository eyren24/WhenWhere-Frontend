import {useEffect, useRef, useState} from "react";
import "../assets/css/verifyEmail.css";
import {useAuthStore} from "../stores/AuthStore.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

export const VerifyEmail = () => {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const {tokenInfo, verifyEmail, getUtenteById} = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (tokenInfo?.utenteId) {
            getUtenteById(tokenInfo.utenteId)
                .then((res) => {
                    if (res.success && res.utente?.email) {
                        setEmail(res.utente.email);
                        if (res.utente.verificato) {
                            setIsVerified(true);
                            toast.success("Email già verificata ✅");
                            setTimeout(() => navigate("/"), 1500);
                        }
                    } else {
                        toast.error("Impossibile recuperare l'email utente");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [getUtenteById, tokenInfo, navigate]);

    const handleChange = (value: string, index: number) => {
        if (!/^[A-F0-9]?$/i.test(value)) return;
        const newCode = [...code];
        newCode[index] = value.toUpperCase();
        setCode(newCode);
        if (value && index < 5) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const newCode = [...code];
            newCode[index - 1] = "";
            setCode(newCode);
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").slice(0, 6).toUpperCase();
        const arr = pasted.split("");
        setCode((prev) => prev.map((_, i) => (arr[i] ? arr[i] : "")));
        const next = arr.length < 6 ? arr.length : 5;
        inputsRef.current[next]?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const joined = code.join("");
        if (joined.length < 6) {
            toast.error("Inserisci il codice completo");
            return;
        }
        if (!email) {
            toast.error("Email non trovata");
            return;
        }

        setIsLoading(true);
        verifyEmail(email, joined)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    setTimeout(() => navigate("/"), 1500);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="verify-wrapper">
            {!isVerified && (
                <form onSubmit={handleSubmit} className="verify-form">
                    <h2>Verifica la tua email</h2>
                    <div className="code-inputs">
                        {code.map((c, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                value={c}
                                ref={(el) => {
                                    inputsRef.current[i] = el;
                                }}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onPaste={handlePaste}
                                autoFocus={i === 0}
                                className="circle-input"
                            />
                        ))}
                    </div>
                    <button type="submit" disabled={isLoading || !email}>
                        {isLoading ? "Verifica..." : "Verifica"}
                    </button>
                </form>
            )}
        </div>
    );
};
