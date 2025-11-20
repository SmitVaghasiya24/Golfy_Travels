import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const login = ({ user, token }) => {
    if (!token || !user) return;

    const userData = {
      ...user,
      token
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
  };


  const logout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };



  const [signupData, setSignupData] = useState(() => {
    const storedData = localStorage.getItem("signupData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const saveSignupData = (data) => {
    if (!data?.token) return;

    let decoded = {};
    try {
      decoded = jwtDecode(data.token);
    } catch (error) {
      console.error("Invalid token");
      console.log(error);

    }

    const cleanData = {
      id: decoded.id,
      name:decoded.name,
      email: decoded.email,
      token: data.token,
    };

    localStorage.setItem("signupData", JSON.stringify(cleanData));
    setSignupData(cleanData);
  };

  const Signout = () => {
    localStorage.removeItem("signupData");
    setSignupData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, signupData, saveSignupData, Signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
