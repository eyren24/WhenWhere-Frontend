import { useState, useEffect, useRef } from 'react';
import { LoginCard } from './LoginCard';
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { LoginModal } from "../modals/LoginModal";
import { RegisterModal } from "../modals/RegisterModal";
import { useAuthStore } from "../../stores/AuthStore.ts";
import logo from '../../assets/imgs/logo.webp';
import '../../assets/css/home/Navbar.css';

export const Navbar = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoginRendered, setIsLoginRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu mobile

    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleOpenRegister = () => setRegisterModal(true);
    const handleCloseRegister = () => setRegisterModal(false);

    const handleLoginClick = () => setLoginModal(true);
    const handleCloseLogin = () => setLoginModal(false);

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
        if (isAuthenticated) navigate('/areaPersonale');
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

    return (
        <>
            {/* Modali di login e registrazione */}
            <LoginModal
                show={loginModal}
                onClose={handleCloseLogin}
                onRegisterClick={handleOpenRegister}
            />
            <RegisterModal show={registerModal} onClose={handleCloseRegister} />

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

                    {/* Link centrali come lista */}
                    <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                        <li>
                            <Link
                                to="/"
                                className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/aboutus"
                                className={`navbar-link ${location.pathname === "/aboutus" ? "active" : ""}`}
                            >
                                Chi Siamo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/calendario"
                                className={`navbar-link ${location.pathname === "/calendario" ? "active" : ""}`}
                            >
                                Calendario
                            </Link>
                        </li>
                    </ul>

                    {/* Lato destro: icona utente e dropdown login */}
                    <div
                        className="navbar-side right"
                        onMouseEnter={!isAuthenticated ? handleMouseEnter : undefined}
                        onMouseLeave={!isAuthenticated ? handleMouseLeave : undefined}
                        onClick={handleUserClick}
                    >
                        <Link to="#" className="navbar-tab">
                            <FaRegUser className="navbar-icon" />
                        </Link>

                        {!isAuthenticated && isLoginRendered && (
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
