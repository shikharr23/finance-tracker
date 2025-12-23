import React, { useState } from 'react'
import { useTransactions } from '../context/TransactionContext'

const Transactions = () => {
  const { transactions, editTransaction, deleteTransaction, loading, error } = useTransactions();

  const [editID, setEditID] = useState('');
  const [form, setForm] = useState({ amount: '', category: '', type: 'income', date: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editErrors, setEditErrors] = useState({});

  const startEdit = (t) => {
    setEditID(t._id);
    setForm({ amount: t.amount, category: t.category, type: t.type, date: new Date(t.date).toISOString().slice(0, 10) });
  };

  const cancelEdit = () => {
    setEditID('');
    setForm({ amount: '', category: '', type: 'income', date: '' });
  };

  const saveEdit = async () => {
    setEditErrors({});
    const v = {};
    if (!form.amount || Number(form.amount) <= 0) v.amount = 'Enter a positive amount';
    if (!form.category || !form.category.trim()) v.category = 'Category is required';
    if (!form.date) v.date = 'Date is required';
    if (Object.keys(v).length) {
      setEditErrors(v);
      return;
    }

    setEditLoading(true);
    try {
      const payload = { amount: Number(form.amount), category: form.category, type: form.type, date: new Date(form.date).toISOString() };
      await editTransaction(editID, payload);
      setEditID('');
    } catch (err) {
      console.error('Edit failed', err);
      setEditErrors({ submit: err?.response?.data?.message || err.message || 'Failed to save changes' });
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && transactions.length === 0 && <div>No transactions yet.</div>}

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t._id} className="border p-3 rounded-md  bg-white flex justify-between items-center">
            <div>
              <div className="font-medium">{t.category} — {t.type}</div>
              <div className="text-sm text-gray-600">{new Date(t.date).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-lg">₹{t.amount}</div>
              <button className="px-2 py-1 bg-neutral-400 rounded cursor-pointer" onClick={() => startEdit(t)}>Edit</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer" onClick={() => deleteTransaction(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editID && (
        <div className="mt-6 border p-4 rounded bg-white">
          <h2 className="font-semibold mb-2">Edit Transaction</h2>
          <div className="grid grid-cols-1 gap-2">
            <label>
              Amount
              <input className="border w-full p-2 mt-1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </label>
            <label>
              Category
              <input className="border w-full p-2 mt-1" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </label>
            <label>
              Type
              <select className="border w-full p-2 mt-1" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>
            <label>
              Date
              <input type="date" className="border w-full p-2 mt-1" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </label>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={saveEdit} disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</button>
              <button className="px-3 py-1 bg-gray-300 rounded" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
            </div>
            {editErrors.amount && <div className="text-red-600 text-sm mt-1">{editErrors.amount}</div>}
            {editErrors.category && <div className="text-red-600 text-sm mt-1">{editErrors.category}</div>}
            {editErrors.date && <div className="text-red-600 text-sm mt-1">{editErrors.date}</div>}
            {editErrors.submit && <div className="text-red-600 text-sm mt-2">{editErrors.submit}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default Transactions
