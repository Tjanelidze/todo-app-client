import { useEffect, useRef, useState } from "react";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";

import TodoForm from "../ui/TodoForm";
import TodoComponent from "../components/TodoComponent";
const API_URL = import.meta.env.VITE_API_URL;

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const defaultTodo: ITodo = {
  _id: "",
  title: "",
  description: "",
  completed: false,
};

export default function TodoApp() {
  // Global state
  const { user } = useAuthentication() as IAuthenticationContext;

  // Local state
  const [todos, setTodos] = useState<ITodo[]>([defaultTodo]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Local refs
  const draggingItem = useRef<number | undefined>();
  const dragOverItem = useRef<number | undefined>();

  // Local functions
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const data = await fetch(`${API_URL}todos`, {
      method: "POST",
      headers: {
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

    fetch(`${API_URL}todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  }

  function handleDragStart(position: number) {
    draggingItem.current = position;
  }

  function handleDragEnter(position: number) {
    dragOverItem.current = position;
    const todoCopy = [...todos];
    if (
      draggingItem.current !== undefined &&
      dragOverItem.current !== undefined
    ) {
      const draggingItemContent = todoCopy[draggingItem.current];
      todoCopy.splice(draggingItem.current, 1);
      todoCopy.splice(dragOverItem.current, 0, draggingItemContent);
    }

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = undefined;

    setTodos(todoCopy);
  }

  // Global functions
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(`${API_URL}todos`, {
        method: "GET",
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

        {todos.map((todo: ITodo, index) => (
          <TodoComponent
            index={index}
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
          />
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
