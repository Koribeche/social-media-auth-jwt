import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../Contexts/AuthContext";

const useSignUp = () => {
  const { user } = useAuth();

  const [userInfo, setuserInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    file: null,
  });

  const [errorInput, seterrorInput] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const navigate = useNavigate();

  // si l'utilisateur est connecté, on le redirige vers la page d'accueil
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // valide le formulaire d'inscription
  const validate = () => {
    //validate input
    let error = {};
    if (userInfo.nom === "") {
      //validate fullname
      error.nom = "nom is required";
    }

    if (userInfo.prenom === "") {
      //validate confirm prenom
      error.prenom = "prenom is required";
    }

    if (userInfo.email === "") {
      //validate email
      error.email = "Email is required";
    }

    if (userInfo.password.length < 4) {
      //validate password
      error.password = "Password must be longer than 4 characters";
    }

    if (userInfo.password === "") {
      //validate password
      error.password = "Password is required";
    }

    seterrorInput(error);
    return error;
  };

  // submit de formulaire pour l'inscription
  const onSubmit = (e) => {
    e.preventDefault();
    setisError(false);
    const error = validate();
    if (Object.keys(error).length !== 0) {
      return;
    }

    const formData = new FormData();
    formData.append("nom", userInfo.nom);
    formData.append("prenom", userInfo.prenom);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("file", userInfo.file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    setisLoading(true);
    axios
      .post("/api/auth/register", userInfo, config)
      .then(() => navigate("/login"))
      .catch(() => setisError("l'adresse email existe déja"))
      .finally(() => setisLoading(false));
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setuserInfo((userInfo) => ({ ...userInfo, [name]: e.target.files[0] }));
    } else {
      setuserInfo((userInfo) => ({ ...userInfo, [name]: value }));
    }
  };

  return {
    userInfo,
    errorInput,
    isLoading,
    isError,
    onSubmit,
    handleChange,
  };
};
export default useSignUp;
