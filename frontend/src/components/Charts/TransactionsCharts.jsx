import React, { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'

const COLORS = ['#60A5FA', '#F59E0B', '#F472B6', '#34D399', '#F87171', '#A78BFA']

function aggregateByDate(transactions) {
  const map = {}
  transactions.forEach((t) => {
    if (!t?.date) return
    const d = new Date(t.date)
    if (isNaN(d.getTime())) return
    const day = d.toISOString().slice(0, 10)
    if (!map[day]) map[day] = { date: day, income: 0, expense: 0 }
    const amt = Number(t.amount) || 0
    if (t.type === 'income') map[day].income += amt
    else map[day].expense += amt
  })
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date))
}

function aggregateByCategory(transactions) {
  const map = {}
  transactions.forEach((t) => {
    if (t.type !== 'expense') return
    map[t.category] = (map[t.category] || 0) + t.amount
  })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

function aggregateByMonth(transactions) {
  const map = {}
  transactions.forEach((t) => {
    if (!t?.date) return
    const d = new Date(t.date)
    if (isNaN(d.getTime())) return
    const m = d.toISOString().slice(0, 7) // YYYY-MM
    if (!map[m]) map[m] = { month: m, total: 0 }
    const amt = Number(t.amount) || 0
    map[m].total += t.type === 'income' ? amt : -amt
  })
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month))
}

const TransactionsCharts = ({ transactions = [] }) => {
  const daily = useMemo(() => aggregateByDate(transactions), [transactions])
  const byCategory = useMemo(() => aggregateByCategory(transactions), [transactions])
  const byMonth = useMemo(() => aggregateByMonth(transactions), [transactions])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="col-span-1 md:col-span-2 bg-white p-4 rounded shadow border border-gray-200">
        <h3 className="font-semibold mb-2">Income vs Expense (by date)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={daily}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10B981" />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow border border-gray-200">
        <h3 className="font-semibold mb-2">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={80} label>
              {byCategory.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow border border-gray-200">
        <h3 className="font-semibold mb-2">Net by Month</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={byMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 

export default TransactionsCharts
