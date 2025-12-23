import React from "react";
import { useTransactions } from "../context/TransactionContext";
import TransactionsCharts from "../components/Charts/TransactionsCharts";

const Dashboard = () => {
  const { transactions, loading, error, deleteTransaction } = useTransactions();

  const netBalance = transactions.reduce((acc, t) => {
    const amt = Number(t?.amount) || 0;
    return t?.type === 'income' ? acc + amt : acc - amt;
  }, 0);

  const totalIncome = transactions.reduce((acc, t) => acc + (t?.type === 'income' ? Number(t?.amount) || 0 : 0), 0);
  const totalSpend = transactions.reduce((acc, t) => acc + (t?.type === 'expense' ? Number(t?.amount) || 0 : 0), 0);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert("Failed to delete transaction");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {loading && <div className="text-gray-600">Loading transactions...</div>}

      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      {!loading && !error && transactions.length === 0 && (
        <div className="text-gray-600">No transactions yet!</div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              {" "}
              You have made{" "}
              <span className="text-pink-500 font-bold">
                {" "}
                {transactions.length}
              </span>{" "}
              transactions
            </div>
            <div>
              {" "}
              Net Balance{" "}
              <span className="text-pink-500 font-bold">
                {" "}
                ₹{netBalance}
              </span>{" "}
            </div>
            <div>
              {" "}
              Total Income{" "}
              <span className="text-pink-500 font-bold">
                {" "}
                ₹{totalIncome}
              </span>{" "}
            </div>
            <div>
              {" "}
              Total spend{" "}
              <span className="text-pink-500 font-bold">
                {" "}
                ₹{totalSpend}
              </span>{" "}
            </div>
          </div>

          {/* charts here */}
          <TransactionsCharts transactions={transactions} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
