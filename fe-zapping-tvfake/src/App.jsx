import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import PlayerPage from "./pages/player";
import Index from "./pages";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <div className="h-screen w-screen m-0 p-0">
        <AuthProvider>
          <Router>
            <ToastContainer position="bottom-right" autoClose={5000} />
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/player"
                element={
                  <ProtectedRoute>
                    <PlayerPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
