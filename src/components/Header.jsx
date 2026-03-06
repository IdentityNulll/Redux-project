import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { useState } from "react";

function Header() {
  const profile = useSelector((state) => state.user.profile);
  const avatarUrl = useSelector((state) => state.user.avatarUrl);
  const id = useSelector((state) => state.auth.user.id);
  const location = useLocation();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  if (!profile) return null;

  const pageName = location.pathname.split("/")[1] || "dashboard";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="bg-[var(--bg-card)] border-b border-[var(--border-color)] px-6 py-[10px] flex items-center justify-between">
      {/* Left Section */}
      <div>
        <h1 className="text-lg font-semibold text-[var(--color-primary)] capitalize">
          {pageName}
        </h1>
        <p className="text-sm text-[var(--text-muted)] capitalize">
          {getGreeting()}, {profile.firstName} 👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-md">
          <IoMdSearch className="text-[var(--text-muted)] mr-2" />
          <input
            type="text"
            placeholder="Search users, classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent outline-none text-sm"
            aria-label="Search"
          />
        </div>

        {/* Notifications */}
        <Link className="relative cursor-pointer" to={"/notifications"} aria-label="Notfications">
          <IoMdNotificationsOutline
            size={22}
            className="text-[var(--color-primary)]"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </Link>

        {/* Avatar */}
        <Link to={`/profile/${id}`}>
          <img
            src={avatarUrl || "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border border-[var(--border-color)]"
            loading="lazy"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
