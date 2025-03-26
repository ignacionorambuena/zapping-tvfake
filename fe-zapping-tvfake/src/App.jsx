import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import PlayerPage from "./pages/player";
import Index from "./pages";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";

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
