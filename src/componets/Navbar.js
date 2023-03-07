import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl text-[#3b436d] font-bold"
        >
          Contact Form
        </Link>
      </div>
      <div className="flex-none mr-4 md:mr-24">
        <Link
          className="text-gray-200 font-bold text-xl  bg-[#3b436d] px-6 py-1 rounded-2xl"
          to="/user"
        >
          Users
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
