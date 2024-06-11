import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, setIsLoading, setIsAuthenticated } =
    useAuthentication() as IAuthenticationContext;
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    if (!isAuthenticated && !isLoading && !jwtToken) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate, setIsAuthenticated, setIsLoading]);

  if (isAuthenticated) return children;
}
