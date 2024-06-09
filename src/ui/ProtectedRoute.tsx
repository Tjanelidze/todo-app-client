import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  IAuthenticationContext,
  useAuthentication,
} from "../context/AuthenticationContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } =
    useAuthentication() as IAuthenticationContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading)
    return <div className="h-[100vh] w-full bg-red-400">Loading...</div>;

  if (isAuthenticated) return children;
}
