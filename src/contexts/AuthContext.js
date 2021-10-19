import React, { createContext, useState } from "react";
import useHandleErrors from "../hooks/HandleErrorsHook";
import api from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const handleErrorStatus = useHandleErrors();

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("accessToken") !== null
  );

  async function login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response && response.status === 201) {
        const { data } = response;

        if (data.accessToken) {
          setAuthenticated(true);
          localStorage.setItem("accessToken", data.accessToken);
        }

        return data;
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("accessToken");
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
