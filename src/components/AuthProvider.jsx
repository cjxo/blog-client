import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import api from "../api/api.js";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const fetchAccessToken = async () => {
    const result = await api.getAccessToken();
    setToken(result.accessToken);
    return result.ok;
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const signin = async (username, password) => {
    const result = await api.signin(username, password);
    if (result.ok) {
      setToken(result.accessToken);
    }

    return result;
  }; 

  const signup = async (firstName, lastName, username, email, password) => {
    const result = await api.signup(firstName, lastName, username, email, password);
    return result;
  };

  const signout = async () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{token, signin, signup, fetchAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
export default useAuth;
