

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const activeClasses = "bg-white text-neutral-800";
  const inactiveClasses = "text-white hover:underline";

  return (
    <div className="w-full bg-neutral-600 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-neutral-800">FT</div>
          <div className="text-white text-lg font-semibold">Finance Tracker</div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded ${isActive("/dashboard") ? activeClasses : inactiveClasses}`}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/add"
            className={`px-3 py-2 rounded ${isActive("/dashboard/add") ? activeClasses : inactiveClasses}`}
          >
            Add
          </Link>
          <Link
            to="/dashboard/transactions"
            className={`px-3 py-2 rounded ${isActive("/dashboard/transactions") ? activeClasses : inactiveClasses}`}
          >
            Transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
