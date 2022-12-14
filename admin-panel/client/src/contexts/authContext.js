import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authLocalData, setLocalAuthData] = useLocalStorage("auth", {});
  const [auth, setAuth] = useState(authLocalData || {});

  useEffect(() => {
    setLocalAuthData(auth);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, authLocalData, setLocalAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
