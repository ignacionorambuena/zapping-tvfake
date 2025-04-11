import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md z-50 py-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-8">
          <h1 className="text-4xl text-[#e93f6e] font-bold">Zapping TVFake</h1>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/player"
                  className="bg-[#e93f6e] text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition"
                >
                  Ver TV
                </Link>
                <button
                  onClick={signOut}
                  className="bg-[#f4e387] text-[#e93f6e] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/signin"
                  className="bg-[#e93f6e] text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#f4e387] text-[#e93f6e] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
