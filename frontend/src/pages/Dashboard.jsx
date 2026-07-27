import React from "react";
import { useTransactions } from "../context/TransactionContext";
import TransactionsCharts from "../components/Charts/TransactionsCharts";

const Dashboard = () => {
  const { transactions, loading, error, deleteTransaction } =
    useTransactions();

  const netBalance = transactions.reduce((acc, t) => {
    const amt = Number(t?.amount) || 0;
    return t?.type === "income" ? acc + amt : acc - amt;
  }, 0);

  const totalIncome = transactions.reduce(
    (acc, t) => acc + (t?.type === "income" ? Number(t?.amount) || 0 : 0),
    0
  );

  const totalSpend = transactions.reduce(
    (acc, t) => acc + (t?.type === "expense" ? Number(t?.amount) || 0 : 0),
    0
  );

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert("Failed to delete transaction");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Dashboard
      </h1>

      {loading && (
        <div className="text-slate-600">
          Loading transactions...
        </div>
      )}

      {error && (
        <div className="text-red-600 mb-4">
          Error: {error}
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <div className="text-slate-600">
          No transactions yet!
        </div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-slate-500 mb-2">
                Transactions
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                {transactions.length}
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-slate-500 mb-2">
                Net Balance
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                ₹{netBalance}
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-slate-500 mb-2">
                Total Income
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                ₹{totalIncome}
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-slate-500 mb-2">
                Total Spend
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                ₹{totalSpend}
              </h2>
            </div>
          </div>

          {/* Charts */}
          <TransactionsCharts transactions={transactions} />
        </>
      )}
    </div>
  );
};

export default Dashboard;