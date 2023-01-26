import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../Contexts/AuthContext";

const useLogin = () => {
  const { user, setUser, setToken } = useAuth();

  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  const [errorInput, seterrorInput] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // si l'utilisateur est connecté, on le redirige vers la page d'accueil
  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate]);

  // valide le formulaire d'inscription
  const validate = () => {
    //validate input
    let error = {};

    if (userInfo.email === "") {
      //validate email
      error.email = "Email is required";
    }

    if (userInfo.password === "") {
      //validate password
      error.password = "Password is required";
    }

    seterrorInput(error);
    return error;
  };

  // submit de formulaire pour login
  const onSubmit = (e) => {
    e.preventDefault();
    setisError(false);
    const error = validate();
    if (Object.keys(error).length !== 0) {
      return;
    }

    setisLoading(true);
    axios
      .post("/api/auth/login", userInfo)
      .then((res) => {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setisError("Bad credentials");
      })
      .finally(() => setisLoading(false));
  };

  // login avec google
  const google = () => {
    setisLoading(true);
    window.open(`${process.env.REACT_APP_SERVER_URL}/api/auth/google`, "_self");
  };

  // login avec github
  const github = () => {
    setisLoading(true);
    window.open(`${process.env.REACT_APP_SERVER_URL}/api/auth/github`, "_self");
  };

  // login avec facebook
  const facebook = () => {
    setisLoading(true);
    window.open(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/facebook`,
      "_self"
    );
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  return {
    userInfo,
    errorInput,
    isLoading,
    isError,
    onSubmit,
    handleChange,
    google,
    facebook,
    github,
  };
};
export default useLogin;
