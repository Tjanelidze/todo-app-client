import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

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
    Cookies.remove("jwt");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (Cookies.get("jwt")) {
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

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider",
    );
  }
  return context;
}
