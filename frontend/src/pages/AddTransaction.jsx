import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client.js";
import { useTransactions } from "../context/TransactionContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";


const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const v = {};
    if (!amount || Number(amount) <= 0) v.amount = "Enter a positive amount";
    if (!category || !category.trim()) v.category = "Category is required";
    if (!date) v.date = "Date is required";

    // check if there are any errors, if any then return
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: Number(amount),
        type,
        category,
        date: new Date(date).toISOString(),
      };

      console.log("Submitting payload:", payload);
      const created = await addTransaction(payload);
      console.log("Transaction created", created);

      setSuccess("Transaction added successfully");

      // Clear form first, then navigate after a short delay
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().slice(0, 10));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error?.response);
      console.error("Error data:", error?.response?.data);
      setErrors({ submit: error?.response?.data?.msg || error?.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="max-w-xl flex flex-col mx-auto pt-30">
        <div className="flex justify-center mb-3">
          <div className="font-semibold text-3xl text-pink-300 underline mb-3 ">
            Add a Transaction
          </div>
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
                label="Category"
                value={category}
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                spellCheck={false}
              />
              {errors.category && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.category}
                </div>
              )}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border  w-full mt-4 mb-2 p-2 rounded-sm text-xl"
              >
                <option value="income">Income </option>

                <option value="expense">Expense </option>
              </select>
              <Input
                label="Date"
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && (
                <div className="text-red-600 text-sm mt-1">{errors.date}</div>
              )}
              {errors.submit && (
                <div className="text-red-600 text-sm mt-2">{errors.submit}</div>
              )}
              {success && (
                <div className="text-green-600 text-sm mt-2">{success}</div>
              )}
              <div className="flex justify-center mt-6 ">
                <Button
                  text={loading ? "Saving..." : "Submit"}
                  disabled={loading}
                />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
