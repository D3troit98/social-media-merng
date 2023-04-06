import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const context = createContext();

export const StateContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
      } else {
        setUser(decodedToken);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("jwtToken", userData.token);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <context.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useStateContext = () => useContext(context);
