import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoMdHome,
  IoMdAnalytics,
  IoMdCalendar,
  IoMdPeople,
  IoMdPerson,
  IoMdLogOut,
} from "react-icons/io";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userId = localStorage.getItem("id")
  const dispatch = useDispatch()


  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <IoMdHome /> },
    { name: "Analytics", path: "/analytics", icon: <IoMdAnalytics /> },
    { name: "Schedule", path: "/schedule", icon: <IoMdCalendar /> },
    { name: "Manage Users", path: "/manageusers", icon: <IoMdPeople /> },
    { name: "Profile", path: `/profile/${userId}`, icon: <IoMdPerson /> },
  ];

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout())
    navigate("/", {replace : true});
  };
  return (
    <aside
      className={clsx(
        "h-screen flex flex-col border-r transition-all duration-300",
        collapsed ? "w-20" : "w-72",
      )}
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-5 border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        {!collapsed && (
          <h4
            className="text-lg font-semibold tracking-wide"
            style={{ color: "var(--color-primary)" }}
          >
            Attendance system
          </h4>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-600 hover:text-slate-800 transition"
        >
          <TbLayoutSidebarFilled className="text-2xl" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const active = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition",
                active ? "font-semibold" : "hover:bg-slate-50",
              )}
              style={{
                color: active ? "var(--color-primary)" : "var(--text-muted)",
                backgroundColor: active
                  ? "rgba(37, 99, 235, 0.1)"
                  : "transparent",
                fontSize: "1rem",
              }}
            >
              <span
                className="text-2xl"
                style={{
                  color: active ? "var(--color-primary)" : "var(--text-muted)",
                }}
              >
                {item.icon}
              </span>

              <span
                className={clsx(
                  "whitespace-nowrap transition-all duration-300",
                  collapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto",
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div
        className="px-6 py-5 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <button
          className={clsx(
            "flex items-center gap-4 w-full transition cursor-pointer text-slate-500 hover:text-red-600 text-base",
          )}
          onClick={handleLogOut}
        >
          <IoMdLogOut className="text-2xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
