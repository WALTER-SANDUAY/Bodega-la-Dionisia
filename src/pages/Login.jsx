import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEnviando(true);
        try {
            await login(email, password);
            navigate('/admin');
        } catch {
            setError('Email o contraseña incorrectos.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1 className="login-title">Iniciar sesión</h1>
                <p className="login-subtitle">Acceso exclusivo para el administrador</p>

                <label className="login-label" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                />

                <label className="login-label" htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />

                {error && <p className="login-error">{error}</p>}

                <button type="submit" className="login-btn" disabled={enviando}>
                    {enviando ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
}

export default Login;
