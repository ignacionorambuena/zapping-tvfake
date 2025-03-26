import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-[#e93f6e]">
            StreamingTV
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/player"
                  className="text-gray-700 hover:text-[#e93f6e] transition"
                >
                  Ver TV
                </Link>
                <button
                  onClick={signOut}
                  className="bg-[#e93f6e] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#e93f6e] transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#e93f6e] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
