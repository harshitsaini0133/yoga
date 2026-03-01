import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/user.api";

const authContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const user = await getMe();
        console.log("user", user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("isAuthenticated", isAuthenticated);
        setLoading(false);
      }
    };

    isLoggedIn();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <authContext.Provider value={{ isAuthenticated, setIsAuthenticated, role }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
