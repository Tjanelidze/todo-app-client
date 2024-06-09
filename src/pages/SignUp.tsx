export default function SignUp() {
  return (
    <div className="mx-auto w-1/3">
      <h1 className="mb-12 block text-center text-3xl text-stone-900">
        Sign Up
      </h1>
      <form className="flex flex-col gap-6">
        <input
          className="border-b-2 border-stone-500"
          type="text"
          id="firstName"
          placeholder="Firstname"
        />

        <input
          className="border-b-2 border-stone-500"
          placeholder="Lastname"
          type="text"
          id="lastName"
        />

        <input
          className="border-b-2 border-stone-500"
          placeholder="Email"
          type="email"
          autoComplete="email"
          id="email"
        />

        <input
          className="border-b-2 border-stone-500"
          placeholder="Password"
          type="password"
          id="password"
        />

        <input
          className="border-b-2 border-stone-500"
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
