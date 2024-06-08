import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="container h-[80vh]">
        <Outlet />
      </main>
    </>
  );
}
