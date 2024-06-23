import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { ITodo } from "../pages/TodoApp";
import { useState } from "react";
import TodoForm from "../ui/TodoForm";
import { IAuthenticationContext } from "../context/AuthenticationContext";
import { useAuthentication } from "../hooks/useAuthentication";

interface ITodoComponent {
  index: number;
  todo: ITodo;
  onDelete: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
}

export default function TodoComponent({
  index,
  todo,
  onDelete,
  onDragStart,
  onDragEnter,
}: ITodoComponent) {
  const { user } = useAuthentication() as IAuthenticationContext;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const data = await fetch(
        `http://localhost:3000/api/v1/todos/${todo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ title, description }),
        },
      );
      const response = await data.json();
      setTitle(response.title);
      setDescription(response.description);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isFormOpen ? (
        <TodoForm
          onSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          setIsFormOpen={setIsFormOpen}
          isFormOpen={isFormOpen}
        />
      ) : (
        <div
          onDragStart={() => onDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => onDragEnter(index)}
          draggable
          className="relative mb-4 cursor-move rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <h3 className="text-lg font-bold dark:text-white">{title}</h3>
          <p className="text-sm dark:text-white">{description}</p>
          <TrashIcon
            onClick={() => onDelete(todo._id)}
            className="absolute right-5 top-3 size-6 cursor-pointer text-red-500"
          />
          <PencilIcon
            onClick={() => setIsFormOpen(true)}
            className="absolute right-14 top-3 size-6 cursor-pointer text-zinc-600 dark:text-zinc-200"
          />
        </div>
      )}
    </>
  );
}
