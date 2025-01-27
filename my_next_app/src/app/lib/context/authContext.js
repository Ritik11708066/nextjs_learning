"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
// here we will first create a context so that we can store our user information
// like its role and other imp thing into global state of our app

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // load user info from the incoming token if exists
  useEffect(() => {
    const userToken = Cookies.get("token");
    if (userToken) {
      console.log("from the context, inside use effect", userToken);
      const userData = JSON.parse(atob(userToken.split(".")[1]));
      setUser(userData)
    }
  }, []);

  const login = (token) => {
    // Create a date object for 1 hour from now
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds
    console.log("from the context", token);
    Cookies.set("token", token, { expires: expirationDate });
    const userData = JSON.parse(atob(token.split(".")[1]));
    console.log("from the context, from the token", userData);
    setUser(userData);
    router.push(
      userData.role === "admin" ? "/admin/dashboard" : "/restraunt/dashboard"
    );
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/restraunt");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
