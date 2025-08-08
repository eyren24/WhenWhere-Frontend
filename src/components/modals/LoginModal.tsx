import '../../assets/css/modals/login.css';
import React, {useState} from 'react';
import toast from "react-hot-toast";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {useNavigate} from "react-router";
import {ClipLoader} from "react-spinners";

export const LoginModal = ({show, onClose}: { show: boolean; onClose: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isLoading, login} = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const email = formdata.get('email') as string;
        const password = formdata.get('password') as string;
        if (email.length === 0 || password.length === 0) {
            toast.error('Non possono essere vuoti')
            return;
        }
        login({email, password}).then((res) => {
            if (res.success) {
                toast.success('Autenticato con successo!')
                navigate('/areaPersonale');
            }else{
                toast.error(res.error || 'Errore generico')
            }
        }).catch((err) => {
            toast.error(err || 'Errore generico')
        });
    };

    return (
        <>
            {show &&
                <div className="login-modal-wrapper">
                    <div className="overlay" onClick={onClose}/>
                    <form onSubmit={handleSubmit} className="login-wrapper">
                        <div className="login-header">
                            <h2>Accesso</h2>
                        </div>
                        <div className="login-body">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Inserisci l'email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Inserisci la password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-footer">
                            <button type="submit">{
                                isLoading ? <ClipLoader /> : "Accedi"
                            }</button>
                        </div>
                    </form>
                </div>}</>
    );
};
