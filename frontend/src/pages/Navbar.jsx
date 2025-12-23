import React from "react";
import { Link, useLocation } from "react-router-dom";
import asaImg from "../assets/asa-1.jpeg";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const activeClasses = "bg-white text-neutral-800";
  const inactiveClasses = "text-white hover:underline";

  return (
    <div className="w-full bg-neutral-600 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={asaImg} alt="Finance Tracker logo" className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-neutral-800" />
          {/* <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-neutral-800">FT</div> */}
          <div className="text-pink-300 text-lg font-semibold hover:text-pink-400 cursor-pointer">Finance Tracker</div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className={`px-2 py-1 text-xl  hover:text-pink-400  rounded ${isActive("/dashboard") ? activeClasses : inactiveClasses}`}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/add"
            className={`px-2 py-1 text-xl rounded hover:text-pink-400 ${isActive("/dashboard/add") ? activeClasses : inactiveClasses}`}
          >
            Add
          </Link>
          <Link 
            to="/dashboard/transactions"
            className={`px-2 py-1 text-xl rounded hover:text-pink-400 ${isActive("/dashboard/transactions") ? activeClasses : inactiveClasses}`}
          >
            Transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
