import { Outlet } from "react-router-dom";
import Topbar from "../../components/Topbar";

export default function Layout(params) {
  return (
    <main className="content">
      {/* TOPBAR */}
      <Topbar />
      <Outlet />
    </main>
  );
}
