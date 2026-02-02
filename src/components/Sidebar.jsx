import React, { useState } from "react";
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

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userId = localStorage.getItem("id");

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <IoMdHome /> },
    { name: "Analytics", path: "/analytics", icon: <IoMdAnalytics /> },
    { name: "Schedule", path: "/schedule", icon: <IoMdCalendar /> },
    { name: "Manage Users", path: "/manageusers", icon: <IoMdPeople /> },
    { name: "Profile", path: `/profile/${userId}`, icon: <IoMdPerson /> },
  ];

  return( <aside className={clsx(
    
  )}>
        <div></div>
  </aside>);
}

export default Sidebar;
