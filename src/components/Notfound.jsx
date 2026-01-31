import React from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <TbXboxXFilled className="text-4xl sm:text-5xl text-red-600" />
        <span className="text-3xl sm:text-4xl font-semibold text-red-600">
          404 Error
        </span>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-red-600 rounded-full mb-8"></div>

      {/* Message */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[var(--text-main)] leading-tight">
        Oops, there is nothing here.
      </h1>

      {/* Sub text (optional but nice) */}
      <p className="mt-4 text-[var(--text-muted)] max-w-md">
        The page you’re looking for might have been moved or doesn’t exist anymore.
      </p>


      <span className="text-[24px] mt-10">Go back To <Link className="underline  text-[var(--text-main)] " to={"/dashboard"}>Dashboard</Link></span>
    </div>
  );
}

export default Notfound;
