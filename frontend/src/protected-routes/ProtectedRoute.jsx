import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Revisamos si el token que guardamos en el login existe
    const token = localStorage.getItem("accessToken");

    if (!token) {
        // Si no está logueado, lo mandamos al login
        return <Navigate to="./../features/auth/signin/SigninSection.jsx" replace />;
    }

    // Si está logueado, mostramos la pantalla que pidió
    return children;
};

export default ProtectedRoute;