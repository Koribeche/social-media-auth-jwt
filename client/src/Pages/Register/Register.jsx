import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Error from "../../Components/Error";
import Spinner from "../../Components/Spinner";
import useRegister from "./useRegister";
import Input from "../../Components/Shared/Input";

function Register() {
  const { userInfo, errorInput, isLoading, isError, onSubmit, handleChange } =
    useRegister();

  return (
    <>
      <section className="w-100 text-center">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      {isLoading && <Spinner />}
      {isError && <Error msg={isError} />}

      <section className="form">
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            className="form-control"
            placeholder="nom"
            name="nom"
            label="nom"
            value={userInfo.nom}
            onChange={handleChange}
            isError={errorInput.nom}
          />
          <Input
            type="text"
            className="form-control"
            placeholder="prenom"
            name="prenom"
            label="prenom"
            value={userInfo.prenom}
            onChange={handleChange}
            isError={errorInput.prenom}
          />
          <Input
            type="email"
            className="form-control"
            placeholder="Adresse email"
            name="email"
            label="Email"
            value={userInfo.email}
            onChange={handleChange}
            isError={errorInput.email}
          />
          <Input
            type="password"
            className="form-control"
            placeholder="password"
            label="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            isError={errorInput.password}
          />
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Photo de profile
            </label>
            <input
              type="file"
              className="form-control"
              name="file"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn w-100 btn-secondary">
            Register
          </button>
          <p className="text-center text-muted mt-4 pb-3">
            Have already an account?
            <Link to="/login" className="fw-bold text-body">
              <u> Login here</u>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Register;
