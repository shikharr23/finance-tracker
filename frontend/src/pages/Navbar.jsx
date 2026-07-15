import React from "react";
import { Link, useLocation } from "react-router-dom";
import asaImg from "../assets/asa-1.jpeg";
import moneyImg from "../assets/money.jpg";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const activeClasses =
    "bg-white text-slate-900 shadow-sm";

  const inactiveClasses =
    "text-slate-100 hover:text-slate-300";

  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={moneyImg}
            alt="Finance Tracker"
            className="w-12 h-12 rounded-full object-cover"
          />

          <h1 className="text-2xl font-bold text-white">
            Finance Tracker
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/dashboard") &&
              !isActive("/dashboard/add") &&
              !isActive("/dashboard/transactions")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/dashboard/add"
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/dashboard/add")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            Add
          </Link>

          <Link
            to="/dashboard/transactions"
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/dashboard/transactions")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            Transactions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;