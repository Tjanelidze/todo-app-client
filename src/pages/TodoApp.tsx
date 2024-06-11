export default function TodoApp() {
  return (
    <div className="mx-auto max-w-3xl">
      <form>
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Todo
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a todo..."
              required
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
