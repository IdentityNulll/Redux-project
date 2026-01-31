import React from "react";
import { TbXboxXFilled } from "react-icons/tb";

function Notfound() {
  return (
    <div className="flex items-start  justify-center flex-col gap-20">
      <div className="flex items-center gap-5">
        <TbXboxXFilled  className="text-[50px] text-red-600" />
        <span className="text-[40px] text-red-600">404 Error</span>
      </div>
      <h1 className="text-[80px] ">Oops, there is nothing here.</h1>
    </div>
  );
}

export default Notfound;
