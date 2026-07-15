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

  const navigate = useNavigate();
  const { fetchTransactions } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post("/api/auth/signup", {
        firstName,
        userName,
        password,
      });
      if (!data?.token) {
        console.error("No token returned from signup");
        return;
      }
      localStorage.setItem("token", data.token);
      // fetch transactions now that token is available
      try {
        await fetchTransactions();
      } catch (err) {
        console.warn("fetch after signup failed", err);
      }
      navigate("/dashboard");
      console.log("Signup succeessful!!", data);
    } catch (error) {
      console.error("Signup failed", error.message);
    }
  };
  return (
    <div className="bg-neutral-300 min-h-screen flex items-center">
      <div className="mx-auto  bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex flex-col">
          {/* <span className="text-3xl  mt-3 mb-1 font-semibold flex justify-center items-center ">
            {" "}
            Get Started
          </span> */}
          <span className="text-3xl mt-2 text-slate-900 font-bold flex justify-center items-center ">
            Welcome to finance-tracker  
          </span>
          <span className="text-xl mb-4 mt-1 text-slate-700 font-semibold flex justify-center items-center ">
            Create your account
          </span>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            <Input
              label="Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter Firstname"
              spellCheck={false}
            />
            <Input
              label="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
              spellCheck={false}
            />
            <Input
              label={"Password"}
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              spellCheck={false}
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button text="SignUp" />
          </div>
          <div className="mt-2">
            <span className="text-slate-500 text-xl font-semibold">
              Already have an account?
            </span>
            <Link
              to="/signin"
              className=" ml-2 hover:underline text-xl font-semibold hover:text-slate-700 text-slate-900"
            >
              Signin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
