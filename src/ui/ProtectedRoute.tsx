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
  const { isAuthenticated } = useAuthentication() as IAuthenticationContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return children;
}
