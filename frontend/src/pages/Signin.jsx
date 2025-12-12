import React from "react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-neutral-300 min-h-screen flex items-center">
      <div className="mx-auto bg-white p-8 w-130 rounded shadow">
        <div className="flex flex-col">
          <span className="text-4xl mt-3 mb-2 font-semibold ">
            Sign In to Your Account
          </span>
          <span className="text-2xl mt-2 mb-3">
            Welcome back! Please enter your credentials to access your finance
            tracker.
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
            <button className="text-left text-xl border border-black w-20 flex justify-center rounded-md cursor-pointer "
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <Button text="Signin" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
