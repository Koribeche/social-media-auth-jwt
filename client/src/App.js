import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Accueil from "./Pages/Accueil/Accueil";
import Profile from "./Pages/Profile/Profile";
import NavBar from "./Components/NavBar";

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <NavBar />
        <div className="container pb-2">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}
