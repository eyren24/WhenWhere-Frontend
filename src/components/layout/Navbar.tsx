import {useEffect, useState} from "react";
import {FaRegUser} from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {LoginModal} from "../modals/LoginModal.tsx";
import {RegisterModal} from "../modals/RegisterModal.tsx";
import "../../assets/css/layout/Navbar.css";
import logo from "../../assets/imgs/logo.webp";

export const Navbar = () => {
    const {getTokenInfo, logout} = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const ruolo = useAuthStore.getState().tokenInfo?.ruolo;

    // Lock scroll su menu mobile
    useEffect(() => {
        const body = document.body;
        if (isMenuOpen) body.classList.add("no-scroll");
        else body.classList.remove("no-scroll");
        return () => body.classList.remove("no-scroll");
    }, [isMenuOpen]);

    // Chiudi dropdown su cambio pagina
    useEffect(() => {
        setShowDropdown(false);
    }, [location.pathname]);

    // Chiudi dropdown al click fuori
    useEffect(() => {
        const closeDropdownOnClickOutside = (e: MouseEvent) => {
            const dropdown = document.querySelector(".navbar-dropdown");
            const icon = document.querySelector(".navbar-login-icon");
            if (
                dropdown &&
                !dropdown.contains(e.target as Node) &&
                icon &&
                !icon.contains(e.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("click", closeDropdownOnClickOutside);
        return () => document.removeEventListener("click", closeDropdownOnClickOutside);
    }, []);

    const handleUserClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMenuOpen(false); // chiudi menu mobile

        getTokenInfo().then(token => {
            if (token.success && token.info) {
                setShowDropdown(prev => !prev); // toggle
            } else {
                setLoginModal(true);
            }
        }).catch(() => {
            setLoginModal(true);
        });
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDropdown(false); // chiudi menu utente
        setIsMenuOpen(prev => !prev);
    };

    const handleOpenRegister = () => {
        setLoginModal(false);
        setRegisterModal(true);
    };

    const handleCloseLogin = () => setLoginModal(false);
    const handleCloseRegister = () => setRegisterModal(false);

    return (
        <>
            <LoginModal show={loginModal} onClose={handleCloseLogin} onRegisterClick={handleOpenRegister} />
            <RegisterModal show={registerModal} onClose={handleCloseRegister} />
            <div className={`navbar-overlay ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(false)} />

            <header className="navbar-container">
                <nav className="navbar-glass" aria-label="Main navigation">
                    <div className="navbar-center-logo">
                        <img src={logo} alt="When & Where" className="navbar-logo-img" />
                    </div>

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
                            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/aboutus"
                                className={location.pathname === "/aboutus" ? "active" : ""}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Chi Siamo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/social"
                                className={location.pathname === "/social" ? "active" : ""}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Social
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-side">
                        <div onClick={handleUserClick} className="navbar-login-icon" aria-label="Area personale">
                            <FaRegUser />
                        </div>

                        {showDropdown && (
                            <div className="navbar-dropdown">
                                <button
                                    className={location.pathname === "/profilo" ? "active" : ""}
                                    onClick={() => navigate("/profilo")}
                                >
                                    Profilo
                                </button>
                                <button
                                    className={location.pathname === "/areaPersonale" ? "active" : ""}
                                    onClick={() => navigate("/areaPersonale")}
                                >
                                    Area Personale
                                </button>
                                {ruolo === "Amministratore" && (
                                    <button
                                        className={location.pathname === "/admin" ? "active" : ""}
                                        onClick={() => navigate("/admin")}
                                    >
                                        Amministrazione
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        logout().then(() => {
                                            navigate("/");
                                            setShowDropdown(false);
                                        });
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};
