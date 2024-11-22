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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAccessToken = async () => {
    const result = await api.getAccessToken();
    setToken(result.accessToken);
    setLoading(false);
    setUser({ id: result.userId, name: result.username });
    return result.ok;
  };

  useEffect(() => {
    fetchAccessToken();
  }, [token]);

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
    const result = await api.signout();
    setToken(null);
    return result;
  };

  const editUserDetail = async (newUname) => {
    const result = await api.editUserDetail(token, newUname);
    if (result.ok) {
      setUser({ ...user, name: newUname });
      console.log("HEY!")
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{token, user, editUserDetail, loading, signin, signup, signout, fetchAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
export default useAuth;
