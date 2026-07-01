import { useEffect, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    subirImagenGaleria,
    obtenerGaleria,
    borrarImagenGaleria,
    subirVideo,
    obtenerVideos,
    borrarVideo,
    publicarNovedad,
    obtenerNovedades,
    borrarNovedad,
    agregarVino,
    editarVino,
    obtenerVinos,
    borrarVino,
} from '../services/contenidoService';
import './Admin.css';

const VINO_VACIO = { nombre: '', anio: '', variedad: '', descripcion: '', precio: '', badge: 'Tinto' };
const TIPOS_VINO = ['Tinto', 'Blanco', 'Rosé'];

function Admin() {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const [tab, setTab] = useState('galeria');

    // Galería
    const [galeria, setGaleria] = useState([]);
    const [archivoImagen, setArchivoImagen] = useState(null);
    const [altImagen, setAltImagen] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    // Videos
    const [videos, setVideos] = useState([]);
    const [archivoVideo, setArchivoVideo] = useState(null);
    const [tituloVideo, setTituloVideo] = useState('');
    const [subiendoVideo, setSubiendoVideo] = useState(false);

    // Novedades
    const [novedades, setNovedades] = useState([]);
    const [tituloNovedad, setTituloNovedad] = useState('');
    const [textoNovedad, setTextoNovedad] = useState('');
    const [archivoNovedad, setArchivoNovedad] = useState(null);
    const [publicando, setPublicando] = useState(false);

    // Vinos
    const [vinos, setVinos] = useState([]);
    const [formVino, setFormVino] = useState(VINO_VACIO);
    const [archivoVino, setArchivoVino] = useState(null);
    const [editandoVinoId, setEditandoVinoId] = useState(null);
    const [guardandoVino, setGuardandoVino] = useState(false);

    const [mensaje, setMensaje] = useState('');

    const cargarTodo = async () => {
        const [g, v, n, w] = await Promise.all([
            obtenerGaleria(),
            obtenerVideos(),
            obtenerNovedades(),
            obtenerVinos(),
        ]);
        setGaleria(g);
        setVideos(v);
        setNovedades(n);
        setVinos(w);
    };

    useEffect(() => {
        cargarTodo();
    }, []);

    const mostrarMensaje = (texto) => {
        setMensaje(texto);
        setTimeout(() => setMensaje(''), 3000);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    // ---------- Galería ----------
    const handleSubirImagen = async (e) => {
        e.preventDefault();
        if (!archivoImagen) return;
        setSubiendoImagen(true);
        try {
            await subirImagenGaleria(archivoImagen, altImagen);
            setArchivoImagen(null);
            setAltImagen('');
            e.target.reset();
            await cargarTodo();
            mostrarMensaje('Imagen subida correctamente.');
        } catch (err) {
            mostrarMensaje('Error al subir la imagen: ' + err.message);
        } finally {
            setSubiendoImagen(false);
        }
    };

    const handleBorrarImagen = async (item) => {
        if (!confirm('¿Borrar esta imagen de la galería?')) return;
        await borrarImagenGaleria(item.id, item.path);
        await cargarTodo();
    };

    // ---------- Videos ----------
    const handleSubirVideo = async (e) => {
        e.preventDefault();
        if (!archivoVideo) return;
        setSubiendoVideo(true);
        try {
            await subirVideo(archivoVideo, tituloVideo);
            setArchivoVideo(null);
            setTituloVideo('');
            e.target.reset();
            await cargarTodo();
            mostrarMensaje('Video subido correctamente.');
        } catch (err) {
            mostrarMensaje('Error al subir el video: ' + err.message);
        } finally {
            setSubiendoVideo(false);
        }
    };

    const handleBorrarVideo = async (item) => {
        if (!confirm('¿Borrar este video?')) return;
        await borrarVideo(item.id, item.path);
        await cargarTodo();
    };

    // ---------- Novedades ----------
    const handlePublicarNovedad = async (e) => {
        e.preventDefault();
        if (!tituloNovedad.trim()) return;
        setPublicando(true);
        try {
            await publicarNovedad({
                titulo: tituloNovedad,
                texto: textoNovedad,
                archivo: archivoNovedad,
            });
            setTituloNovedad('');
            setTextoNovedad('');
            setArchivoNovedad(null);
            e.target.reset();
            await cargarTodo();
            mostrarMensaje('Novedad publicada.');
        } catch (err) {
            mostrarMensaje('Error al publicar: ' + err.message);
        } finally {
            setPublicando(false);
        }
    };

    const handleBorrarNovedad = async (item) => {
        if (!confirm('¿Borrar esta novedad?')) return;
        await borrarNovedad(item.id, item.imagenPath);
        await cargarTodo();
    };

    // ---------- Vinos ----------
    const handleGuardarVino = async (e) => {
        e.preventDefault();
        if (!formVino.nombre.trim() || !formVino.anio.trim() || !formVino.precio.trim()) return;
        setGuardandoVino(true);
        try {
            if (editandoVinoId) {
                const vinoActual = vinos.find((v) => v.id === editandoVinoId);
                await editarVino(editandoVinoId, {
                    ...formVino,
                    archivo: archivoVino,
                    imagenPathAnterior: vinoActual?.imagenPath,
                });
                mostrarMensaje('Vino actualizado.');
            } else {
                if (!archivoVino) {
                    mostrarMensaje('Elegí una foto para el vino.');
                    setGuardandoVino(false);
                    return;
                }
                await agregarVino({ ...formVino, archivo: archivoVino });
                mostrarMensaje('Vino agregado.');
            }
            cancelarEdicionVino();
            await cargarTodo();
        } catch (err) {
            mostrarMensaje('Error al guardar el vino: ' + err.message);
        } finally {
            setGuardandoVino(false);
        }
    };

    const abrirEdicionVino = (vino) => {
        setFormVino({
            nombre: vino.nombre || '',
            anio: vino.anio || '',
            variedad: vino.variedad || '',
            descripcion: vino.descripcion || '',
            precio: vino.precio || '',
            badge: vino.badge || 'Tinto',
        });
        setEditandoVinoId(vino.id);
        setArchivoVino(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicionVino = () => {
        setFormVino(VINO_VACIO);
        setArchivoVino(null);
        setEditandoVinoId(null);
    };

    const handleBorrarVino = async (item) => {
        if (!confirm(`¿Borrar "${item.nombre}" del catálogo?`)) return;
        await borrarVino(item.id, item.imagenPath);
        await cargarTodo();
    };

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Panel de administración — Finca la Dionisia</h1>
                <div className="admin-header_right">
                    <Link to="/" className="admin-ver-sitio">Ver sitio</Link>
                    <span className="admin-usuario">{usuario?.email}</span>
                    <button className="admin-logout" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </header>

            {mensaje && <div className="admin-toast">{mensaje}</div>}

            <nav className="admin-tabs">
                <button className={tab === 'galeria' ? 'activo' : ''} onClick={() => setTab('galeria')}>Galería</button>
                <button className={tab === 'videos' ? 'activo' : ''} onClick={() => setTab('videos')}>Videos</button>
                <button className={tab === 'novedades' ? 'activo' : ''} onClick={() => setTab('novedades')}>Novedades</button>
                <button className={tab === 'vinos' ? 'activo' : ''} onClick={() => setTab('vinos')}>Vinos</button>
            </nav>

            <main className="admin-content">
                {tab === 'galeria' && (
                    <section>
                        <form className="admin-form" onSubmit={handleSubirImagen}>
                            <h2>Subir imagen a la galería</h2>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setArchivoImagen(e.target.files[0])}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Descripción de la foto (opcional)"
                                value={altImagen}
                                onChange={(e) => setAltImagen(e.target.value)}
                            />
                            <button type="submit" disabled={subiendoImagen}>
                                {subiendoImagen ? 'Subiendo...' : 'Subir imagen'}
                            </button>
                        </form>

                        <div className="admin-grid">
                            {galeria.map((item) => (
                                <div className="admin-item" key={item.id}>
                                    <img src={item.url} alt={item.alt} />
                                    <button className="admin-item_borrar" onClick={() => handleBorrarImagen(item)}>Borrar</button>
                                </div>
                            ))}
                            {galeria.length === 0 && <p className="admin-vacio">Todavía no hay imágenes.</p>}
                        </div>
                    </section>
                )}

                {tab === 'videos' && (
                    <section>
                        <form className="admin-form" onSubmit={handleSubirVideo}>
                            <h2>Subir video</h2>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setArchivoVideo(e.target.files[0])}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Título del video (opcional)"
                                value={tituloVideo}
                                onChange={(e) => setTituloVideo(e.target.value)}
                            />
                            <button type="submit" disabled={subiendoVideo}>
                                {subiendoVideo ? 'Subiendo...' : 'Subir video'}
                            </button>
                        </form>

                        <div className="admin-grid">
                            {videos.map((item) => (
                                <div className="admin-item" key={item.id}>
                                    <video src={item.url} controls />
                                    <p>{item.titulo}</p>
                                    <button className="admin-item_borrar" onClick={() => handleBorrarVideo(item)}>Borrar</button>
                                </div>
                            ))}
                            {videos.length === 0 && <p className="admin-vacio">Todavía no hay videos.</p>}
                        </div>
                    </section>
                )}

                {tab === 'novedades' && (
                    <section>
                        <form className="admin-form" onSubmit={handlePublicarNovedad}>
                            <h2>Publicar novedad o aviso</h2>
                            <input
                                type="text"
                                placeholder="Título"
                                value={tituloNovedad}
                                onChange={(e) => setTituloNovedad(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Texto del aviso"
                                value={textoNovedad}
                                onChange={(e) => setTextoNovedad(e.target.value)}
                                rows={4}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setArchivoNovedad(e.target.files[0])}
                            />
                            <button type="submit" disabled={publicando}>
                                {publicando ? 'Publicando...' : 'Publicar novedad'}
                            </button>
                        </form>

                        <div className="admin-lista-novedades">
                            {novedades.map((item) => (
                                <div className="admin-novedad" key={item.id}>
                                    {item.imagenUrl && <img src={item.imagenUrl} alt={item.titulo} />}
                                    <div>
                                        <h3>{item.titulo}</h3>
                                        <p>{item.texto}</p>
                                    </div>
                                    <button className="admin-item_borrar" onClick={() => handleBorrarNovedad(item)}>Borrar</button>
                                </div>
                            ))}
                            {novedades.length === 0 && <p className="admin-vacio">Todavía no hay novedades.</p>}
                        </div>
                    </section>
                )}

                {tab === 'vinos' && (
                    <section>
                        <form className="admin-form" onSubmit={handleGuardarVino}>
                            <h2>{editandoVinoId ? 'Editar vino' : 'Agregar vino'}</h2>
                            <input
                                type="text"
                                placeholder="Nombre (ej: Malbec Reserva)"
                                value={formVino.nombre}
                                onChange={(e) => setFormVino({ ...formVino, nombre: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Año (ej: 2020)"
                                value={formVino.anio}
                                onChange={(e) => setFormVino({ ...formVino, anio: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Variedad (ej: Malbec)"
                                value={formVino.variedad}
                                onChange={(e) => setFormVino({ ...formVino, variedad: e.target.value })}
                            />
                            <textarea
                                placeholder="Descripción"
                                value={formVino.descripcion}
                                onChange={(e) => setFormVino({ ...formVino, descripcion: e.target.value })}
                                rows={3}
                            />
                            <input
                                type="text"
                                placeholder="Precio (ej: 45.00)"
                                value={formVino.precio}
                                onChange={(e) => setFormVino({ ...formVino, precio: e.target.value })}
                                required
                            />
                            <select
                                value={formVino.badge}
                                onChange={(e) => setFormVino({ ...formVino, badge: e.target.value })}
                            >
                                {TIPOS_VINO.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setArchivoVino(e.target.files[0])}
                            />
                            {editandoVinoId && <p className="admin-ayuda">Dejá la foto vacía para mantener la actual.</p>}

                            <div className="admin-form_botones">
                                <button type="submit" disabled={guardandoVino}>
                                    {guardandoVino ? 'Guardando...' : editandoVinoId ? 'Guardar cambios' : 'Agregar vino'}
                                </button>
                                {editandoVinoId && (
                                    <button type="button" className="admin-btn-secundario" onClick={cancelarEdicionVino}>
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="admin-grid">
                            {vinos.map((item) => (
                                <div className="admin-item" key={item.id}>
                                    {item.imagenUrl && <img src={item.imagenUrl} alt={item.nombre} />}
                                    <p><strong>{item.nombre}</strong> ({item.anio})</p>
                                    <p>${item.precio} — {item.badge}</p>
                                    <div className="admin-item_acciones">
                                        <button className="admin-item_editar" onClick={() => abrirEdicionVino(item)}>Editar</button>
                                        <button className="admin-item_borrar" onClick={() => handleBorrarVino(item)}>Borrar</button>
                                    </div>
                                </div>
                            ))}
                            {vinos.length === 0 && (
                                <p className="admin-vacio">
                                    Todavía no cargaste vinos propios — el sitio muestra el catálogo inicial de ejemplo.
                                </p>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Admin;