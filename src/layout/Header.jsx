import { useState } from "react";
import logo from '../assets/logo principal.png';
import './Header.css';

function Header() {
    const [menuAbierto, setIsMenuAbierto] = useState(false);

    return (
        <header className="header">
            <div className="header_top">
                <img src={logo} alt="Logo de la empresa" className="header_logo" />

                <button 
                className="header_toggle"
                onClick={() => setIsMenuAbierto(!menuAbierto)}>
                <span className="header_linea"></span>
                <span className="header_linea"></span>
                <span className="header_linea"></span>
                </button>
            </div>
            <nav className={`header_nav ${menuAbierto ? 'header_nav--abierto    ' : ''}`}>

                <ul className="header_nav-list">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/">Vinos</a></li>
                    <li><a href="/">Nosotros</a></li>
                    <li><a href="/">Fotos</a></li>
                    <li><a href="/">Contacto</a></li>
                </ul>
            </nav>
                </header>
    );
}   

export default Header
