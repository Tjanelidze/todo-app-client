import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthenticationContextProvider } from "./context/AuthenticationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </React.StrictMode>,
);
