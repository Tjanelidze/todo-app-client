import { useEffect, useState } from "react";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";

interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoApp() {
  const { user } = useAuthentication() as IAuthenticationContext;
  const [todos, setTodos] = useState([
    {
      _id: "",
      title: "",
      description: "",
      completed: false,
    },
  ]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const data = await fetch("http://localhost:3000/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const response = await data.json();
    setTodos([...todos, response]);
  }

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("http://localhost:3000/api/v1/todos", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await response.json();

      setTodos(data);
    }

    fetchTodos();
  }, [user?.token]);

  return (
    <div className="mx-auto max-w-3xl pb-12">
      <div>
        <h1 className="mb-4 text-2xl font-bold dark:text-white">
          Welcome {user?.firstName}
        </h1>

        {todos.map((todo: ITodo) => (
          <div
            key={todo._id}
            className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <h3 className="text-lg font-bold dark:text-white">{todo.title}</h3>
            <p className="text-sm dark:text-white">{todo.description}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <div className="mb-4 rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Title"
              required
            />
          </div>
          <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Todo
            </label>

            <textarea
              id="comment"
              name="description"
              required
              rows={4}
              className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a todo..."
            ></textarea>
          </div>

          <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
            >
              Add Todo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
