import { useState, useEffect, useRef } from "react";
import { LoginCard } from "./LoginCard";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { LoginModal } from "../modals/LoginModal";
import { RegisterModal } from "../modals/RegisterModal";
import { useAuthStore } from "../../stores/AuthStore.ts";
import logo from "../../assets/imgs/logo.webp";
import "../../assets/css/home/Navbar.css";

export const Navbar = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoginRendered, setIsLoginRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger mobile

    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // --- Apertura/chiusura modali: MUTUALMENTE ESCLUSIVI ---
    const handleOpenRegister = () => {
        setLoginModal(false);
        setRegisterModal(true);
    };
    const handleCloseRegister = () => setRegisterModal(false);

    const handleLoginClick = () => {
        setRegisterModal(false);
        setLoginModal(true);
    };
    const handleCloseLogin = () => setLoginModal(false);

    // --- Hover card login (solo se non autenticato e nessun modale aperto) ---
    const handleMouseEnter = () => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        setIsLoginRendered(true);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => {
            setIsVisible(false);
        }, 200);
    };

    const handleUserClick = () => {
        if (isAuthenticated) navigate("/areaPersonale");
    };

    useEffect(() => {
        if (!isVisible && isLoginRendered) {
            const timeout = setTimeout(() => setIsLoginRendered(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, isLoginRendered, registerModal]);

    // Chiude il menu mobile quando cambia pagina
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Blocca/riabilita lo scroll sotto quando un modale è aperto
    useEffect(() => {
        const open = loginModal || registerModal;
        document.body.classList.toggle("no-scroll", open);
        return () => document.body.classList.remove("no-scroll");
    }, [loginModal, registerModal]);

    return (
        <>
            {/* Modali (mutualmente esclusivi) */}
            <LoginModal
                show={loginModal && !registerModal}
                onClose={handleCloseLogin}
                onRegisterClick={handleOpenRegister}
            />
            <RegisterModal
                show={registerModal && !loginModal}
                onClose={handleCloseRegister}
            />

            {/* Overlay scuro quando il menu mobile è aperto */}
            <div
                className={`navbar-overlay ${isMenuOpen ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <header className="navbar-container">
                <nav className="navbar-glass select-none">
                    {/* Logo a sinistra */}
                    <div className="navbar-center-logo">
                        <img src={logo} alt="When & Where" className="navbar-logo-img" />
                    </div>

                    {/* Hamburger menu per mobile */}
                    <div
                        className={`navbar-burger ${isMenuOpen ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* Link centrali */}
                    <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                        <li>
                            <Link
                                to="/"
                                className={`navbar-link ${
                                    location.pathname === "/" ? "active" : ""
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/aboutus"
                                className={`navbar-link ${
                                    location.pathname === "/aboutus" ? "active" : ""
                                }`}
                            >
                                Chi Siamo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/calendario"
                                className={`navbar-link ${
                                    location.pathname === "/calendario" ? "active" : ""
                                }`}
                            >
                                Calendario
                            </Link>
                        </li>
                    </ul>

                    {/* Lato destro: icona utente e dropdown login */}
                    <div
                        className="navbar-side right"
                        onMouseEnter={
                            !isAuthenticated && !loginModal && !registerModal
                                ? handleMouseEnter
                                : undefined
                        }
                        onMouseLeave={!isAuthenticated ? handleMouseLeave : undefined}
                        onClick={handleUserClick}
                    >
                        <Link to="#" className="navbar-tab">
                            <FaRegUser className="navbar-icon" />
                        </Link>

                        {!isAuthenticated && isLoginRendered && !loginModal && !registerModal && (
                            <LoginCard
                                visible={isVisible}
                                onLoginClick={handleLoginClick}
                                onRegisterClick={handleOpenRegister}
                            />
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};
