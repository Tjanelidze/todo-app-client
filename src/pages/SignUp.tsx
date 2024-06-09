import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL;

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const { register, handleSubmit, getValues } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;
    try {
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

      if (!response.ok) {
        throw new Error(data.message);
      }

      Cookies.set("jwt", data.token, { expires: 7 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto w-1/3">
      <h1 className="mb-12 block text-center text-3xl text-stone-900">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <input
          {...register("firstName", {
            required: {
              value: true,
              message: "Firstname is required",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Invalid firstname",
            },
          })}
          className="border-b-2 border-stone-500 py-2"
          type="text"
          id="firstName"
          placeholder="Firstname"
        />

        <input
          {...register("lastName", {
            required: {
              value: true,
              message: "Lastname is required",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Invalid lastname",
            },
          })}
          className="border-b-2 border-stone-500 py-2"
          placeholder="Lastname"
          type="text"
          id="lastName"
        />

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
          className="border-b-2 border-stone-500 py-2"
          placeholder="Email"
          type="email"
          autoComplete="email"
          id="email"
        />

        <input
          {...register("password", {
            required: true,
            maxLength: {
              value: 20,
              message: "Must be 20 characters or less",
            },
            minLength: {
              value: 6,
              message: "Must be 6 characters or more",
            },
          })}
          className="border-b-2 border-stone-500 py-2"
          placeholder="Password"
          type="password"
          id="password"
        />

        <input
          {...register("confirmPassword", {
            required: true,
            maxLength: {
              value: 20,
              message: "Must be 20 characters or less",
            },
            minLength: {
              value: 6,
              message: "Must be 6 characters or more",
            },
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          className="border-b-2 border-stone-500 py-2"
          placeholder="Confirm Password"
          type="password"
          id="confirmPassword"
        />

        <button className="bg-stone-950 p-2 font-bold text-white hover:bg-stone-800 hover:text-gray-200">
          Submit
        </button>
      </form>
    </div>
  );
}
