import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer_inner">
                <div className="footer_col footer_brand">
                    <h3 className="footer_logo">Finca la Dionisia</h3>
                    <p className="footer_desc">
                        Vinos y licores artesanales con la esencia de nuestra tierra.
                    </p>
                </div>

                <div className="footer_col">
                    <h4 className="footer_heading">Enlaces</h4>
                    <ul className="footer_links">
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/vinos">Vinos</a></li>
                        <li><a href="/nosotros">Nosotros</a></li>
                        <li><a href="/fotos">Galería</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </ul>
                </div>

                <div className="footer_col">
                    <h4 className="footer_heading">Contacto</h4>
                    <ul className="footer_links">
                        <li>info@fincaladionisia.com</li>
                        <li>+54 9 261 123 4567</li>
                        <li>Mendoza, Argentina</li>
                    </ul>
                </div>

                <div className="footer_col">
                    <h4 className="footer_heading">Horarios</h4>
                    <ul className="footer_links">
                        <li>Lun - Vie: 10:00 - 19:00</li>
                        <li>Sáb: 10:00 - 16:00</li>
                        <li>Dom: Cerrado</li>
                    </ul>
                </div>
            </div>

            <div className="footer_bottom">
                <p>&copy; {new Date().getFullYear()} Finca la Dionisia. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer
