interface ITodoForm {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setIsFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  isFormOpen?: boolean;
}

export default function TodoForm({
  onSubmit,
  title,
  description,
  setTitle,
  setDescription,
  setIsFormOpen,
  isFormOpen,
}: ITodoForm) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700">
        <div className="mb-4 rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="comment"
            name="description"
            required
            rows={4}
            className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a todo..."
          ></textarea>
        </div>

        <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
          {isFormOpen ? (
            <>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-blue-700 px-4 py-2 font-medium text-white"
              >
                Submit
              </button>
              <button
                onClick={() => setIsFormOpen && setIsFormOpen(false)}
                className="cursor-pointer rounded-md bg-red-500 px-4 py-2 font-medium text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
            >
              Add Todo
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
