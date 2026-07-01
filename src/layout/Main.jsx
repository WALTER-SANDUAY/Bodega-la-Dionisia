import { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import Lightbox from '../components/Lightbox';
import vinoTinto from '../Finca la Dionicia fotos/00be0c61-d090-4a9e-b90f-b7e04b3725f8.jpg';
import vinoBlanco from '../Finca la Dionicia fotos/2fb5e58e-8246-43be-afec-37051e4ced48.jpg';
import vinoReserva from '../Finca la Dionicia fotos/fac750a1-442c-4e2c-a06f-3922546885d9.jpg';
import foto4 from '../Finca la Dionicia fotos/33bc434a-7793-4238-aee0-7486e7551135.jpg';
import foto5 from '../Finca la Dionicia fotos/6a7bf868-1255-4436-94d3-d1f7558f1ecb.jpg';
import { obtenerGaleria, obtenerVideos, obtenerNovedades, obtenerVinos } from '../services/contenidoService';
import './Main.scss';

const galeriaFotos = [
  { src: vinoTinto, alt: 'Bodega' },
  { src: vinoBlanco, alt: 'Viñedos' },
  { src: vinoReserva, alt: 'Barricas' },
  { src: foto4, alt: 'Cosecha' },
  { src: foto5, alt: 'Botellas' },
];

// Catálogo inicial, se muestra solo hasta que el administrador cargue vinos propios.
const vinosIniciales = [
  { id: 'i1', nombre: 'Malbec Reserva', anio: '2020', variedad: 'Malbec', descripcion: 'Intenso y sedoso, con notas a frutos rojos y un leve paso por roble.', precio: '45.00', badge: 'Tinto', imagenUrl: vinoTinto },
  { id: 'i2', nombre: 'Cabernet Sauvignon', anio: '2019', variedad: 'Cabernet Sauvignon', descripcion: 'Cuerpo completo con taninos firmes, aroma a cassis y pimienta negra.', precio: '52.00', badge: 'Tinto', imagenUrl: vinoBlanco },
  { id: 'i3', nombre: 'Torrontés', anio: '2021', variedad: 'Torrontés', descripcion: 'Fresco y floral, con aromas a rosas y durazno, final cítrico.', precio: '38.00', badge: 'Blanco', imagenUrl: vinoReserva },
  { id: 'i4', nombre: 'Chardonnay', anio: '2022', variedad: 'Chardonnay', descripcion: 'Cremoso con notas a vainilla y mantequilla, crianza en barrica.', precio: '42.00', badge: 'Blanco', imagenUrl: vinoTinto },
  { id: 'i5', nombre: 'Blend de la Casa', anio: '2018', variedad: 'Malbec - Cabernet - Merlot', descripcion: 'Ensamblaje equilibrado, complejo y de guarda. Cosecha limitada.', precio: '58.00', badge: 'Tinto', imagenUrl: vinoReserva },
  { id: 'i6', nombre: 'Rosé de Malbec', anio: '2023', variedad: 'Malbec Rosé', descripcion: 'Fresco y vibrante, con notas a frutillas y un toque floral.', precio: '35.00', badge: 'Rosé', imagenUrl: vinoBlanco },
];

function Main() {
    const [lightboxImg, setLightboxImg] = useState(null);
    const [fotosAdmin, setFotosAdmin] = useState([]);
    const [videos, setVideos] = useState([]);
    const [novedades, setNovedades] = useState([]);
    const [vinosAdmin, setVinosAdmin] = useState([]);

    useEffect(() => {
        obtenerGaleria()
            .then((items) => setFotosAdmin(items.map((i) => ({ src: i.url, alt: i.alt }))))
            .catch(() => {});
        obtenerVideos()
            .then(setVideos)
            .catch(() => {});
        obtenerNovedades()
            .then(setNovedades)
            .catch(() => {});
        obtenerVinos()
            .then(setVinosAdmin)
            .catch(() => {});
    }, []);

    // La galería muestra primero las fotos cargadas por el administrador,
    // y si todavía no subió ninguna, se completa con las fotos iniciales del sitio.
    const galeriaCompleta = fotosAdmin.length > 0 ? fotosAdmin : galeriaFotos;
    const vinosAMostrar = vinosAdmin.length > 0 ? vinosAdmin : vinosIniciales;

    return (
        <main>
            <HeroBanner />

            <section id="nosotros" className="section about">
                <div className="section_inner">
                    <span className="section_tag">Nuestra historia</span>
                    <h2 className="section_title">Pasión por el vino desde 1985</h2>
                    <p className="section_text">
                        En Finca la Dionisia elaboramos vinos con tradición y dedicación.
                        Cada botella cuenta la historia de nuestra tierra y el cuidado
                        artesanal que ponemos en cada proceso.
                    </p>
                </div>
            </section>

            <section id="vinos" className="section wines">
                <div className="section_inner">
                    <span className="section_tag">Catálogo</span>
                    <h2 className="section_title">Nuestros Vinos</h2>

                    <div className="wine-grid">
                        {vinosAMostrar.map((vino) => (
                            <div className="wine-card" key={vino.id}>
                                <img className="wine-card_img" src={vino.imagenUrl} alt={vino.nombre} />
                                <div className="wine-card_body">
                                    <span className="wine-card_year">{vino.anio}</span>
                                    <h3 className="wine-card_name">{vino.nombre}</h3>
                                    <span className="wine-card_variety">{vino.variedad}</span>
                                    <p className="wine-card_desc">{vino.descripcion}</p>
                                    <div className="wine-card_footer">
                                        <span className="wine-card_price">${vino.precio}</span>
                                        <span className="wine-card_badge">{vino.badge}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="galeria" className="section gallery">
                <div className="section_inner">
                    <span className="section_tag">Galería</span>
                    <h2 className="section_title">Nuestros momentos</h2>

                    <div className="gallery-grid">
                        {galeriaCompleta.map((foto, i) => (
                            <button key={i} className="gallery-item" onClick={() => setLightboxImg(foto)}>
                                <img src={foto.src} alt={foto.alt} />
                                <div className="gallery-item_overlay">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.3-4.3" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {novedades.length > 0 && (
                <section id="novedades" className="section novedades">
                    <div className="section_inner">
                        <span className="section_tag">Al día</span>
                        <h2 className="section_title">Novedades y avisos</h2>

                        <div className="novedades-grid">
                            {novedades.map((n) => (
                                <article className="novedad-card" key={n.id}>
                                    {n.imagenUrl && (
                                        <img className="novedad-card_img" src={n.imagenUrl} alt={n.titulo} />
                                    )}
                                    <div className="novedad-card_body">
                                        <h3 className="novedad-card_titulo">{n.titulo}</h3>
                                        {n.texto && <p className="novedad-card_texto">{n.texto}</p>}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {videos.length > 0 && (
                <section id="videos" className="section videos">
                    <div className="section_inner">
                        <span className="section_tag">Conocenos</span>
                        <h2 className="section_title">Videos</h2>

                        <div className="videos-grid">
                            {videos.map((v) => (
                                <div className="video-card" key={v.id}>
                                    <video src={v.url} controls />
                                    {v.titulo && <p className="video-card_titulo">{v.titulo}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section cta-section">
                <div className="section_inner">
                    <h2 className="cta_title">Visitanos y descubre el verdadero sabor artesanal</h2>
                    <p className="cta_text">
                        Te esperamos en nuestra bodega para una experiencia única de cata.
                    </p>
                    <a href="/contacto" className="hero_cta">Contactanos</a>
                </div>
            </section>

            {lightboxImg && (
                <Lightbox
                    src={lightboxImg.src}
                    alt={lightboxImg.alt}
                    onClose={() => setLightboxImg(null)}
                />
            )}
        </main>
    )
}

export default Main;