import { useState } from "react";
import './Header.css';

function Header() {
    const [menuAbierto, setIsMenuAbierto] = useState(false);

    return (
        <header className="header">
            <div className="header_top">
                <span className="header_logo">Bodega la Dionisia</span>

                <button 
                className="header-toggle"
                onClick={() => setIsMenuAbierto(!menuAbierto)}
                >
                    
                </button>
            </div>
            <nav className={`header_nav ${menuAbierto ? 'header_nav--abierto    ' : ''}`}>

                <ul className="header_nav-list">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/">Productos</a></li>
                    <li><a href="/">Contacto</a></li>
                </ul>
            </nav>
                </header>
    );
}   

export default Header
