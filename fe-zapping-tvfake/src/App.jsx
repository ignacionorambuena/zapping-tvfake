import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import PlayerPage from "./pages/player";

function App() {
  return (
    <>
      <div className="h-screen w-screen m-0 p-0">
        <Router>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/player" element={<PlayerPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
