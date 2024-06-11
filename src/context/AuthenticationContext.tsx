import { createContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";

export interface IAuthenticationContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthenticationContext =
  createContext<IAuthenticationContext | null>(null);

export const AuthenticationContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Cookies.remove("jwt");
    localStorage.removeItem("jwt");
    if (!localStorage.getItem("jwt")) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // const jwtToken = sessionStorage.getItem("jwt");
    const jwtToken = localStorage.getItem("jwt");

    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
