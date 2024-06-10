import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider",
    );
  }
  return context;
}
