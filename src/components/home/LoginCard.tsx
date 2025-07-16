import '../../assets/css/home/LoginCard.css';

interface LoginCardProps {
    visible: boolean;
}

export const LoginCard: React.FC<LoginCardProps> = ({ visible }) => {
    return (
        <div className={`login-popup ${visible ? 'open' : 'closing'}`}>
            <button className="login-btn">Sign in</button>
            <button className="login-btn secondary">Create Account</button>
        </div>
    );
};
