import { useState } from "react";
import client from "../api/client.js";
import { useNavigate, Link } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";

import Input from "../components/Input";
import Button from "../components/Button";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchTransactions } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!firstName.trim() || !userName.trim() || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await client.post("/api/auth/signup", {
        firstName,
        userName,
        password,
      });
      if (!data?.token) {
        setErrorMessage("No token returned from server.");
        return;
      }
      localStorage.setItem("token", data.token);
      try {
        await fetchTransactions();
      } catch (err) {
        console.warn("fetch after signup failed", err);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
      setErrorMessage(error?.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Create an Account
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Start tracking your income and expenses today
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {errorMessage}
          </div>
        )}

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            spellCheck={false}
          />
          <Input
            label="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
            spellCheck={false}
          />
          <div className="relative">
            <Input
              label="Password"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-[35px] text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="pt-2">
            <Button text={loading ? "Creating Account..." : "Sign Up"} />
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
          <span>Already have an account? </span>
          <Link
            to="/signin"
            className="font-semibold text-slate-900 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
