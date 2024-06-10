import { useNavigate } from "react-router-dom";
import {
  IAuthenticationContext,
 
} from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";

export default function Header() {
  const { isAuthenticated, logout } =
    useAuthentication() as IAuthenticationContext;

  const navigate = useNavigate();
  return (
    <header className="container flex h-[20vh] items-center justify-between">
      <a href="/" className="text-xl font-bold">
        Todo App
      </a>

      <nav>
        <ul>
          <li>
            {isAuthenticated ? (
              <button
                className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                logout
              </button>
            ) : (
              <button
                className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
