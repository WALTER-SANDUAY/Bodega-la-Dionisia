import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ children }) {
    const { usuario, cargando } = useAuth();

    if (cargando) {
        return <div className="cargando-pantalla">Cargando...</div>;
    }

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RutaProtegida;