import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import client from "../api/client.js";
import { useTransactions } from "../context/TransactionContext";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchTransactions } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!userName.trim() || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await client.post("/api/auth/signin", {
        userName,
        password,
      });

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        try {
          await fetchTransactions();
        } catch (err) {
          console.warn("fetch after signin failed", err);
        }
        navigate("/dashboard");
      } else {
        setErrorMessage("Sign in succeeded but token was missing.");
      }
    } catch (err) {
      console.error("Signin failed", err);
      setErrorMessage(err?.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back!
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Sign in to continue managing your finances
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {errorMessage}
          </div>
        )}

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            spellCheck={false}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
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
            <Button text={loading ? "Signing in..." : "Sign In"} />
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
          <span>Don't have an account? </span>
          <Link
            to="/signup"
            className="font-semibold text-slate-700 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
