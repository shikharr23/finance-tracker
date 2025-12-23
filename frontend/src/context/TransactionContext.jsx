import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import client from '../api/client.js';

const TransactionContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'add':
      return [action.payload, ...state];
    case 'edit':
      return state.map((t) => (t._id === action.payload._id ? action.payload : t));
    case 'delete':
      return state.filter((t) => t._id !== action.payload);
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await client.get('/api/transaction/me');
      const data = res.data?.transactions || [];
      const normalize = (t) => ({
        ...t,
        amount: Number(t?.amount) || 0,
        date: t?.date ? new Date(t.date).toISOString() : null,
      });
      if (Array.isArray(data)) {
        dispatch({ type: 'set', payload: data.map(normalize) });
      } else {
        dispatch({ type: 'set', payload: [] });
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (payload) => {
    const res = await client.post('/api/transaction', payload);
    const createdRaw = res.data;
    const created = { ...createdRaw, amount: Number(createdRaw?.amount) || 0, date: createdRaw?.date ? new Date(createdRaw.date).toISOString() : null };
    dispatch({ type: 'add', payload: created });
    return created;
  };

  const editTransaction = async (id, payload) => {
    const prev = transactions;
    const existing = transactions.find((t) => t._id === id) || {};
    const optimistic = { ...existing, ...payload, _id: id };

    
    dispatch({ type: 'edit', payload: optimistic });
    try {
      const res = await client.put('/api/transaction/' + id, payload);
      const updatedRaw = res.data;
      const updated = { ...updatedRaw, amount: Number(updatedRaw?.amount) || 0, date: updatedRaw?.date ? new Date(updatedRaw.date).toISOString() : null };
      dispatch({ type: 'edit', payload: updated });
      return updated;
    } catch (err) {
      dispatch({ type: 'set', payload: prev });
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    const prev = transactions;
    dispatch({ type: 'delete', payload: id });
    try {
      await client.delete('/api/transaction/' + id);
    } catch (err) {
      dispatch({ type: 'set', payload: prev });
      throw err;
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, loading, error, fetchTransactions, addTransaction, editTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);

export default TransactionContext;
