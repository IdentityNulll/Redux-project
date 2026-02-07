import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading"; 
import { useSelector } from "react-redux";

export default function AppLayout() {
  const loading = useSelector((state) => state.user.loading);

  return (
    <div className="flex h-screen relative">
      {loading && <Loading />}

      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
