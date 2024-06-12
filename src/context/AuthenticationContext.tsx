import { createContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  _id: string;
}

export interface IAuthenticationContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthenticationContext =
  createContext<IAuthenticationContext | null>(null);

export const AuthenticationContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}") as User,
  );

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Cookies.remove("jwt");
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    if (!localStorage.getItem("jwt")) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // const jwtToken = sessionStorage.getItem("jwt");
    const jwtToken = localStorage.getItem("jwt");
    localStorage.setItem("user", JSON.stringify(user));

    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        isLoading,
        setIsLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
