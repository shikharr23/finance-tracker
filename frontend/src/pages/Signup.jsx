import React from "react";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-neutral-300 min-h-screen flex items-center">
      <div className="mx-auto  bg-white p-8 w-130 rounded shadow">
        <div className="flex flex-col">
          <span className="text-5xl  mt-3 mb-2 font-semibold ">
            {" "}
            Get Started
          </span>
          <span className="text-3xl mt-2 mb-3 ">
            Welcome to finance-tracker <br /> Create your account
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              spellCheck={false}
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button text="SignUp" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
