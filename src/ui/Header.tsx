export default function Header() {
  return (
    <header className="container flex h-[20vh] items-center justify-between">
      <a href="/" className="text-xl font-bold">
        Todo App
      </a>

      <nav>
        <ul>
          <li>
            <a href="/login">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
