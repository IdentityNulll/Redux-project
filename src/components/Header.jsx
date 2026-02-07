import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const profile = useSelector((state) => state.user.profile);
  const avatarUrl = useSelector((state) => state.user.avatarUrl);
  const id = useSelector((state) => state.auth.user.id);
  if (!profile) return null;

  return (
    <header className="flex items-center justify-between p-[10px] pr-[40px]">
      <div className="flex capitalize text-[var(--color-primary)] text-[20px] font-semibold tracking-wide">
        <p>
          {profile.firstName} {profile.lastName}
        </p>
      </div>  
      <Link to={`/profile/${id}`}>
        <img
          src={avatarUrl || "/default-avatar.png"}
          alt="avatar"
          className="avatar"
          width={"50px"}
        />
      </Link>
    </header>
  );
}

export default Header;
