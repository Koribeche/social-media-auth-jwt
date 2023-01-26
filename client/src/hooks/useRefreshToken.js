import useAuth from "../Contexts/AuthContext";
import axios from "axios";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    try {
      const res = await axios.get("/api/auth/refresh");
      setToken(res.data.accessToken);
      return res.data.accessToken;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
