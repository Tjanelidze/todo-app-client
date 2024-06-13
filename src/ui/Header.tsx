import { useNavigate } from "react-router-dom";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, logout } =
    useAuthentication() as IAuthenticationContext;

  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <header className="container flex h-[20vh] items-center justify-between">
      <a href="/" className="text-xl font-bold dark:text-white">
        Todo App
      </a>

      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <button onClick={darkModeHandler}>
              {dark && <SunIcon className="size-7 text-yellow-500" />}
              {!dark && <MoonIcon className="size-7 text-yellow-500" />}
            </button>
          </li>
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
