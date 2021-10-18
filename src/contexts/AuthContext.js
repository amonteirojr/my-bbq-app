import React, { createContext, useState } from "react";
import useHandleErrors from "../hooks/HandleErrorsHook";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const handleErrorStatus = useHandleErrors();

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );

  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );

  async function login(user) {
    try {
      setAuthenticated(true);
      setUserName(user);
    } catch (error) {
      handleErrorStatus(error);
    }
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, userName }}>
      {children}
    </AuthContext.Provider>
  );
}
