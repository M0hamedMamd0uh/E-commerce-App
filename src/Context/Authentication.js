import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setToken(localStorage.getItem("token"));
      const data = jwtDecode(localStorage.getItem("token"));
      setUserName(data.name);
    }
  }, [token]);

  return (
    <authContext.Provider value={{ token, setToken, setUserName, userName }}>
      {children}
    </authContext.Provider>
  );
}
