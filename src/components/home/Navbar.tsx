import { useState, useEffect, useRef } from 'react';
import { LoginCard } from './LoginCard';
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router";
import { LoginModal } from "../modals/LoginModal";
import logo from '../../assets/imgs/logo.webp';
import '../../assets/css/home/Navbar.css';

export const Navbar = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleLoginClick = () => setLoginModal(true);
    const handleCloseLogin = () => setLoginModal(false);

    const handleMouseEnter = () => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        setIsRendered(true);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => {
            setIsVisible(false);
        }, 200); // delay di chiusura
    };

    useEffect(() => {
        if (!isVisible && isRendered) {
            const timeout = setTimeout(() => setIsRendered(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, isRendered]);

    return (
        <>
            <LoginModal show={loginModal} onClose={handleCloseLogin} />
            <div className="navbar-container">
                <div className="navbar-card">
                    <Link to="#" className="universal-link navbar-tab">
                        <IoHomeOutline className="icon navbar-icon" />
                    </Link>

                    <Link to="#" className="universal-link navbar-tab navbar-tab--center">
                        <img src={logo} alt="When & Where" className="navbar-logo-img" />
                    </Link>

                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="#" className="universal-link navbar-tab">
                            <FaRegUser className="icon navbar-icon" />
                        </Link>

                        {isRendered && (
                            <LoginCard
                                visible={isVisible}
                                onLoginClick={handleLoginClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
