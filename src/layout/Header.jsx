import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/Logo_principal.png';
import './Header.css';

function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { usuario } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cerrarMenu = () => setMenuAbierto(false);
    const destinoLogin = usuario ? "/admin" : "/login";
    const textoLogin = usuario ? "Panel admin" : "Iniciar sesión";

    return (
        <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
            <div className="header_inner">
                <a href="/">
                    <img src={logo} alt="Finca la Dionisia" className="header_logo" />
                </a>

                <button
                    className={`header_toggle${menuAbierto ? ' header_toggle--abierto' : ''}`}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Menú"
                >
                    <span className="header_linea"></span>
                    <span className="header_linea"></span>
                    <span className="header_linea"></span>
                </button>

                <div
                    className={`header_nav-overlay${menuAbierto ? ' header_nav-overlay--visible' : ''}`}
                    onClick={cerrarMenu}
                />

                <nav className={`header_nav${menuAbierto ? ' header_nav--abierto' : ''}`}>
                    <ul className="header_nav-list">
                        <li><a href="/" onClick={cerrarMenu}>Inicio</a></li>
                        <li><a href="#vinos" onClick={cerrarMenu}>Vinos</a></li>
                        <li><a href="#nosotros" onClick={cerrarMenu}>Nosotros</a></li>
                        <li><a href="#galeria" onClick={cerrarMenu}>Galería</a></li>
                        <li className="header_nav-login-mobile">
                            <Link to={destinoLogin} onClick={cerrarMenu} className="header_login-link">{textoLogin}</Link>
                        </li>
                    </ul>
                </nav>
                <Link to={destinoLogin} className="header_login-btn">{textoLogin}</Link>
            </div>
        </header>
    );
}

export default Header;