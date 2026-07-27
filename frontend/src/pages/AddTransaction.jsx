import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

    if (!amount || Number(amount) <= 0)
      v.amount = "Enter a positive amount";

    if (!category.trim())
      v.category = "Category is required";

    if (!date)
      v.date = "Date is required";

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

      await addTransaction(payload);

      setSuccess("Transaction added successfully!");

      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().slice(0, 10));

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setErrors({
        submit:
          error?.response?.data?.msg ||
          error?.response?.data ||
          error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4 py-8">
      <Card className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-slate-900 text-center">
          Add Transaction
        </h1>

        <p className="text-slate-500  text-center mt-2 mb-6">
          Record a new income or expense.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Amount"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
            spellCheck={false}
          />

          {errors.amount && (
            <p className="text-red-500 text-sm">
              {errors.amount}
            </p>
          )}

          <Input
            label="Category"
            value={category}
            placeholder="e.g. Food, Salary, Kiraya"
            onChange={(e) => setCategory(e.target.value)}
            spellCheck={false}
          />

          {errors.category && (
            <p className="text-red-500 text-sm">
              {errors.category}
            </p>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Transaction Type
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-left text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 flex justify-between items-center transition"
              >
                <span className="capitalize">{type}</span>
                <span className="text-slate-400 text-xs font-semibold">
                  {dropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-1.5 z-50 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <div
                    onClick={() => {
                      setType("income");
                      setDropdownOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition flex items-center justify-between ${
                      type === "income"
                        ? "bg-slate-100 text-slate-900 font-bold"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>Income</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div
                    onClick={() => {
                      setType("expense");
                      setDropdownOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition flex items-center justify-between ${
                      type === "expense"
                        ? "bg-slate-100 text-slate-900 font-bold"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>Expense</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {errors.date && (
            <p className="text-red-500 text-sm">
              {errors.date}
            </p>
          )}

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">
              {errors.submit}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-center">
              {success}
            </p>
          )}

          <Button
            text={loading ? "Saving..." : "Add Transaction"}
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl py-3 transition-colors flex justify-center items-center"
          />
        </form>
      </Card>
    </div>
  );
};

export default AddTransaction;