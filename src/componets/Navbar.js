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
          className="font-bold text-xl border-b-4 border-b-[#3b436d]  text-[#3b436d] px-1 py-1 "
          to="/user"
        >
          Contact Request
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
