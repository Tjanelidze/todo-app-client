import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAuthentication } from "../hooks/useAuthentication";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#2c50ec",
};

export default function AppLayout() {
  const { isLoading } = useAuthentication() as IAuthenticationContext;

  if (isLoading)
    return (
      <div className="flex h-[100vh] items-center justify-center bg-gray-50">
        <ClipLoader
          color={"#2c50ec"}
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    <>
      <Header />
      <main className="container h-[80vh]">
        <Outlet />
      </main>
    </>
  );
}
