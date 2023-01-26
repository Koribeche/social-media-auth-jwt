import { useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import useAuth from "../../Contexts/AuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Accueil() {
  const axios = useAxiosPrivate();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const test = async () => {
    try {
      const res = await axios.get("/test");
      console.log(res);
    } catch (err) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div className="w-100 text-center">
      {user ? (
        <div>
          <img src={user.photo} className="userpic" alt="users profile" />
          <div>
            <span className="fw-bold">
              {user.nom} {user.prenom}
            </span>
            <p> {user.email} </p>
          </div>
          <button className="btn btn-primary" onClick={test}>
            Test Refresh Token
          </button>
        </div>
      ) : (
        <div>
          <div className="btn btn-primary" onClick={() => navigate("/login")}>
            <FaSignInAlt /> Login
          </div>
        </div>
      )}
    </div>
  );
}
