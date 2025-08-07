import {useEffect, useState, forwardRef} from "react";
import "../../assets/css/home/LoginCard.css";

export const LoginCard = forwardRef<HTMLDivElement, {
    visible: boolean;
    onLoginClick: () => void;
    onRegisterClick: () => void;
}>(({visible, onLoginClick, onRegisterClick}, ref) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (!visible) {
            setClosing(true);
            const timeout = setTimeout(() => setClosing(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [visible]);

    return (
        <div
            ref={ref}
            className={`login-popup ${
                visible && !closing
                    ? "open"
                    : closing
                        ? "closing"
                        : ""
            }`}
        >
            <button className="login-btn" onClick={onLoginClick}>Login</button>
            <button className="login-btn secondary" onClick={onRegisterClick}>Registrati</button>
        </div>
    );
});
