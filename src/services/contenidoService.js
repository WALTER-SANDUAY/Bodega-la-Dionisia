import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { db, storage } from '../firebase/config';

// ---------- Helpers genéricos ----------

async function subirArchivo(carpeta, archivo) {
    const nombreUnico = `${Date.now()}-${archivo.name}`;
    const storageRef = ref(storage, `${carpeta}/${nombreUnico}`);
    await uploadBytes(storageRef, archivo);
    const url = await getDownloadURL(storageRef);
    return { url, path: storageRef.fullPath };
}

async function borrarArchivo(path) {
    if (!path) return;
    try {
        await deleteObject(ref(storage, path));
    } catch (err) {
        // Si el archivo ya no existe en Storage, no frenamos el borrado del registro.
        console.warn('No se pudo borrar el archivo en Storage:', err.message);
    }
}

// ---------- Galería (imágenes) ----------

export async function subirImagenGaleria(archivo, alt) {
    const { url, path } = await subirArchivo('galeria', archivo);
    await addDoc(collection(db, 'galeria'), {
        url,
        path,
        alt: alt || '',
        creadoEn: serverTimestamp(),
    });
}

export async function obtenerGaleria() {
    const q = query(collection(db, 'galeria'), orderBy('creadoEn', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function borrarImagenGaleria(id, path) {
    await borrarArchivo(path);
    await deleteDoc(doc(db, 'galeria', id));
}

// ---------- Videos ----------

export async function subirVideo(archivo, titulo) {
    const { url, path } = await subirArchivo('videos', archivo);
    await addDoc(collection(db, 'videos'), {
        url,
        path,
        titulo: titulo || '',
        creadoEn: serverTimestamp(),
    });
}

export async function obtenerVideos() {
    const q = query(collection(db, 'videos'), orderBy('creadoEn', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function borrarVideo(id, path) {
    await borrarArchivo(path);
    await deleteDoc(doc(db, 'videos', id));
}

// ---------- Novedades / avisos ----------

export async function publicarNovedad({ titulo, texto, archivo }) {
    let imagenUrl = null;
    let imagenPath = null;

    if (archivo) {
        const subida = await subirArchivo('novedades', archivo);
        imagenUrl = subida.url;
        imagenPath = subida.path;
    }

    await addDoc(collection(db, 'novedades'), {
        titulo,
        texto,
        imagenUrl,
        imagenPath,
        creadoEn: serverTimestamp(),
    });
}

export async function obtenerNovedades() {
    const q = query(collection(db, 'novedades'), orderBy('creadoEn', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function borrarNovedad(id, imagenPath) {
    if (imagenPath) await borrarArchivo(imagenPath);
    await deleteDoc(doc(db, 'novedades', id));
}

// ---------- Vinos ----------

export async function agregarVino({ nombre, anio, variedad, descripcion, precio, badge, archivo }) {
    let imagenUrl = null;
    let imagenPath = null;

    if (archivo) {
        const subida = await subirArchivo('vinos', archivo);
        imagenUrl = subida.url;
        imagenPath = subida.path;
    }

    await addDoc(collection(db, 'vinos'), {
        nombre,
        anio,
        variedad,
        descripcion,
        precio,
        badge,
        imagenUrl,
        imagenPath,
        creadoEn: serverTimestamp(),
    });
}

export async function editarVino(id, { nombre, anio, variedad, descripcion, precio, badge, archivo, imagenPathAnterior }) {
    const datos = { nombre, anio, variedad, descripcion, precio, badge };

    if (archivo) {
        if (imagenPathAnterior) await borrarArchivo(imagenPathAnterior);
        const subida = await subirArchivo('vinos', archivo);
        datos.imagenUrl = subida.url;
        datos.imagenPath = subida.path;
    }

    await updateDoc(doc(db, 'vinos', id), datos);
}

export async function obtenerVinos() {
    const q = query(collection(db, 'vinos'), orderBy('creadoEn', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function borrarVino(id, imagenPath) {
    if (imagenPath) await borrarArchivo(imagenPath);
    await deleteDoc(doc(db, 'vinos', id));
}