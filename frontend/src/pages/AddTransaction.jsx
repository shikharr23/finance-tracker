import React, { useState } from "react";
import client from "../api/client.js";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="bg-neutral-500 min-h-screen">
      <div className="max-w-xl flex flex-col mx-auto pt-30">
        <div className="flex justify-center mb-3">
          <div className="font-semibold text-3xl text-pink-300 ">Add a Transaction</div>
        </div>
        <div className=" ">
          <Card>
            <form onSubmit={handleSubmit}>
              <Input
                label="Amount"
                value={amount}
                placeholder="Enter amount"
                onChange={(e) => setAmount(e.target.value)}
                spellCheck={false}
              />
              <Input
                label="Type"
                value={type}
                placeholder="Expense or income"
                onChange={(e) => setType(e.target.value)}
                spellCheck={false}
              />
              <Input
                label="Category"
                value={category}
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                spellCheck={false}
              />
              <Input
                label="Date"
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="flex justify-center mt-6 ">
                <Button text="Submit" />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
