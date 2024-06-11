import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { ClipLoader } from "react-spinners";
const API_URL = import.meta.env.VITE_API_URL;

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<IFormInput>();
  const navigate = useNavigate();
  const { login, setIsLoading, isLoading } =
    useAuthentication() as IAuthenticationContext;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;

    setIsLoading(true);
    try {
      // Send the data to the server
      const response = await fetch(`${API_URL}users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });
      const data = await response.json();

      // if there is an error in the response then throw an error
      if (!response.ok) {
        toast.error("Something went wrong");

        if (data.field === "email") {
          setError("email", { type: "server", message: data.error });
        }

        throw new Error(data.error);
      }

      // set the jwt in the session storage
      // sessionStorage.setItem("jwt", data.token);
      localStorage.setItem("jwt", data.token);

      // Navigate to the home page
      login();
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-1/3">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <ClipLoader color={"#2c50ec"} loading={isLoading} size={150} />
        </div>
      ) : (
        <>
          <h1 className="mb-12 block text-center text-3xl text-stone-900 dark:text-white">
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <input
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "First name is required",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Invalid First name",
                  },
                })}
                className={`mb-1 w-full border-b-2 py-2 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${errors.firstName ? "border-red-500" : "border-stone-500 dark:border-stone-200"}`}
                type="text"
                id="firstName"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Last name is required",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Invalid Last name",
                  },
                })}
                className={`mb-1 w-full border-b-2 py-2 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${errors.lastName ? "border-red-500" : "border-stone-500 dark:border-stone-200"}`}
                placeholder="Last name"
                type="text"
                id="lastName"
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`mb-1 w-full border-b-2 py-2 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${errors.email ? "border-red-500" : "border-stone-500 dark:border-stone-200"}`}
                placeholder="Email"
                type="email"
                autoComplete="email"
                id="email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Must be 20 characters or less",
                  },
                  minLength: {
                    value: 8,
                    message: "Must be 8 characters or more",
                  },
                })}
                className={`mb-1 w-full border-b-2 py-2 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${errors.password ? "border-red-500" : "border-stone-500 dark:border-stone-200"}`}
                placeholder="Password"
                type="password"
                id="password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Must be 20 characters or less",
                  },
                  minLength: {
                    value: 8,
                    message: "Must be 8 characters or more",
                  },
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className={`mb-1 w-full border-b-2 py-2 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 ${errors.confirmPassword ? "border-red-500" : "border-stone-500 dark:border-stone-200"}`}
                placeholder="Confirm Password"
                type="password"
                id="confirmPassword"
              />{" "}
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button className="bg-stone-950 p-2 font-bold text-white hover:bg-stone-800 hover:text-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
              Submit
            </button>
          </form>
          <Toaster />
        </>
      )}
    </div>
  );
}
