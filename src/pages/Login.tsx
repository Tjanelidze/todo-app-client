import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const { register } = useForm<IFormInput>();
  return (
    <div className="mx-auto w-1/3">
      <h1 className="mb-12 block text-center text-3xl text-stone-900">Login</h1>
      <form className="flex flex-col gap-6">
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

        <button className="bg-stone-950 p-2 font-bold text-white hover:bg-stone-800 hover:text-gray-200">
          Submit
        </button>
      </form>
    </div>
  );
}
