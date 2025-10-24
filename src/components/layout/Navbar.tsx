import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuthStore } from "../../stores/AuthStore.ts";
import { LoginModal } from "../modals/LoginModal.tsx";
import { RegisterModal } from "../modals/RegisterModal.tsx";
import logo from "../../assets/imgs/logo.webp";
import "../../assets/css/layout/Navbar.css";

export const Navbar = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Blocca lo scroll quando il menu è aperto
    useEffect(() => {
        const body = document.body;
        if (isMenuOpen) body.classList.add("no-scroll");
        else body.classList.remove("no-scroll");
        return () => body.classList.remove("no-scroll");
    }, [isMenuOpen]);

    const handleUserClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAuthenticated) navigate("/areaPersonale");
        else setLoginModal(true);
    };

    const handleOpenRegister = () => {
        setLoginModal(false);
        setRegisterModal(true);
    };

    const handleCloseLogin = () => setLoginModal(false);
    const handleCloseRegister = () => setRegisterModal(false);

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen((v) => !v);
    };

    return (
        <>
            <LoginModal show={loginModal} onClose={handleCloseLogin} onRegisterClick={handleOpenRegister} />
            <RegisterModal show={registerModal} onClose={handleCloseRegister} />

            {/* Overlay cliccabile per chiudere */}
            <div className={`navbar-overlay ${isMenuOpen ? "active" : ""}`} onClick={closeMenu} />

            <header className="navbar-container">
                <nav className="navbar-glass" aria-label="Main navigation">
                    <div className="navbar-center-logo">
                        <img src={logo} alt="When & Where" className="navbar-logo-img" />
                    </div>

                    {/* Burger NON cambia aspetto: niente classe active */}
                    <button
                        type="button"
                        className="navbar-burger"
                        aria-label="Apri menù"
                        aria-expanded={isMenuOpen}
                        aria-controls="navbar-links"
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul id="navbar-links" className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                        <li>
                            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/aboutus"
                                className={location.pathname === "/aboutus" ? "active" : ""}
                                onClick={closeMenu}
                            >
                                Chi Siamo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/calendario"
                                className={location.pathname === "/calendario" ? "active" : ""}
                                onClick={closeMenu}
                            >
                                Calendario
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-side">
                        <a href="#" onClick={handleUserClick} className="navbar-login-icon" aria-label="Area personale">
                            <FaRegUser />
                        </a>
                    </div>
                </nav>
            </header>
        </>
    );
};
