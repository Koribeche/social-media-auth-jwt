import { ImFacebook, ImGoogle, ImGithub } from "react-icons/im";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import Error from "../../Components/Error";
import useLogin from "./useLogin";
import Input from "../../Components/Shared/Input";

const Login = () => {
  const {
    userInfo,
    errorInput,
    isLoading,
    isError,
    onSubmit,
    handleChange,
    google,
    facebook,
    github,
  } = useLogin();

  return (
    <div>
      <section className="w-100 text-center ">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start Shopping</p>
      </section>

      {isLoading && <Spinner />}

      {isError && <Error msg={isError} />}

      <section className="form">
        <form onSubmit={onSubmit}>
          <Input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            label="Email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            isError={errorInput.email}
          />
          <Input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            label="Password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            isError={errorInput.password}
          />

          <div className=" w-75 m-auto mt-5">
            <button type="submit" className="btn w-100 btn-secondary">
              Login
            </button>

            <div className="d-flex justify-content-around align-items-center mt-3">
              <div className="btn rounded-circle google" onClick={google}>
                <ImGoogle />
              </div>
              <div className="btn rounded-circle facebook" onClick={facebook}>
                <ImFacebook />
              </div>
              <div className="btn rounded-circle github" onClick={github}>
                <ImGithub />
              </div>
            </div>
          </div>

          <p className="text-center text-muted mt-4 pb-3">
            you don't have an account?
            <Link to="/register" className="fw-bold text-body">
              <u> Register here</u>
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
