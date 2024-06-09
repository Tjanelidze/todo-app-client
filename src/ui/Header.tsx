import { useNavigate } from "react-router-dom";
import {
  IAuthenticationContext,
  useAuthentication,
} from "../context/AuthenticationContext";

export default function Header() {
  const { isAuthenticated, logout } =
    useAuthentication() as IAuthenticationContext;

  console.log(isAuthenticated);

  const navigate = useNavigate();
  return (
    <header className="container flex h-[20vh] items-center justify-between">
      <a href="/" className="text-xl font-bold">
        Todo App
      </a>

      <nav>
        <ul>
          <li>
            <a
              className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
