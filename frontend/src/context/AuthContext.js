import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Try to fetch logged-in user on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me"); // backend should have a /me route
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
