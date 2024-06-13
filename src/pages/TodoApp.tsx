import { useEffect, useState } from "react";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";

import TodoForm from "../ui/TodoForm";
import TodoComponent from "../components/TodoComponent";

export interface ITodo {
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

    setTitle("");
    setDescription("");
  }

  function handleDelete(id: string) {
    setTodos(todos.filter((todo) => todo._id !== id));

    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
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
          <TodoComponent key={todo._id} todo={todo} onDelete={handleDelete} />
        ))}
      </div>

      <TodoForm
        onSubmit={handleSubmit}
        setTitle={setTitle}
        title={title}
        setDescription={setDescription}
        description={description}
      />
    </div>
  );
}
