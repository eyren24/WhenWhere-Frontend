import '../../assets/css/modals/login.css';
import React, { useState } from 'react';

export const LoginModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        console.log(formdata);
    };

    return (
        <>
        { show &&
        <div className="login-modal-wrapper">
            <div className="overlay" onClick={onClose} />
            <form onSubmit={handleSubmit} className="login-wrapper">
                <div className="login-header">
                    <h2>Accesso</h2>
                </div>
                <div className="login-body">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Inserisci l'email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Inserisci la password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="login-footer">
                    <button type="button" onClick={onClose}>Close</button>
                    <button type="submit">Accedi</button>
                </div>
            </form>
        </div>}</>
    );
};
