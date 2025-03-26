import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import PlayerPage from "./pages/player";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
