import { useState, useEffect, useRef } from 'react';
import { LoginCard } from './LoginCard';
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import {Link, useNavigate} from "react-router";
import { LoginModal } from "../modals/LoginModal";
import logo from '../../assets/imgs/logo.webp';
import '../../assets/css/home/Navbar.css';
import { RegisterModal } from "../modals/RegisterModal";
import {useAuthStore} from "../../stores/AuthStore.ts";

export const Navbar = () => {
    const {isAuthenticated} = useAuthStore();
    const navigate = useNavigate();
    const [isLoginRendered, setIsLoginRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [registerModal, setRegisterModal] = useState(false);
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
        }, 200); // delay di chiusura
    };

    const handleUserClick = ()=>{
        if (isAuthenticated)
            navigate('/areaPersonale');
    }

    useEffect(() => {
        if (!isVisible && isLoginRendered) {
            const timeout = setTimeout(() => setIsLoginRendered(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isVisible, isLoginRendered, registerModal]);

    return (
        <>
            <LoginModal show={loginModal} onClose={handleCloseLogin} />
            <RegisterModal show={registerModal} onClose={handleCloseRegister} />
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
                        onMouseEnter={!isAuthenticated ? handleMouseEnter : undefined}
                        onMouseLeave={!isAuthenticated ? handleMouseLeave : undefined}
                        onClick={handleUserClick}
                    >
                        <Link to="#" className="universal-link navbar-tab">
                            <FaRegUser className="icon navbar-icon" />
                        </Link>

                        {!isAuthenticated && isLoginRendered && (
                            <LoginCard
                                visible={isVisible}
                                onLoginClick={handleLoginClick}
                                onRegisterClick={handleOpenRegister}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
