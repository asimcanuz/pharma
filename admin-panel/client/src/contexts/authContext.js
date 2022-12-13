import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authLocalData, setLocalAuthData] = useLocalStorage("auth", {});
  const [auth, setAuth] = useState(authLocalData || {});

  return (
    <AuthContext.Provider value={{ auth, setAuth, setLocalAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
