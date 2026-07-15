import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import client from "../api/client.js";
import { useTransactions } from "../context/TransactionContext";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { fetchTransactions } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.log("Signin succeessful!!", data);
      } else {
        console.error("Signin succeeded but no token returned");
      }
    } catch (err) {
      console.error("Signin failed", err?.response?.data || err.message);
    }
  };

  return (
    <div className="bg-neutral-300 min-h-screen flex items-center">
      <div className="mx-auto  bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex flex-col">
          <span className=" text-3xl text-slate-900 mx-auto font-bold">
            Welcome back!
          </span>
          {/* <span className="text-2xl mt-2 mb-1 font-semibold ">
            Sign In to Your Account
          </span> */}
          <span className="w-90 mx-auto block text-center text-slate-700 font-semibold text-lg mt-1 mb-4">
              Sign in to continue managing your finances.
          </span>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              label="Username"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              spellCheck={false}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              spellCheck={false}
            />
            <button
              className="text-left text-md border border-black w-15 flex justify-center rounded-md cursor-pointer hover:bg-slate-400 hover:text-white font-semibold px-2 py-1"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <Button text="Signin" />
          </div>
          <div className="mt-4">
            <span className="text-slate-500 text-xl font-semibold ">
              New User?
            </span>
            <Link
              to="/signup"
              className=" ml-2 hover:underline text-xl font-semibold"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
