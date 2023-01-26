import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import Spinner from "./Spinner";
import axios from "axios";
import useAuth from "../Contexts/AuthContext";

export default function NavBar() {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const logout = () => {
    setisLoading(true);
    axios
      .get("/api/auth/logout")
      .then(() => {
        setUser(null);
        setToken(null);
        navigate("/");
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };
  return (
    <>
      {isLoading && <Spinner />}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 mb-5">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <h1>Amir</h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto gap-3">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>
                      <FaSignOutAlt /> Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <FaUser /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
