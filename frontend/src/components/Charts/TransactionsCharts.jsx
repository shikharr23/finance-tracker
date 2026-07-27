import React, { useMemo } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'

const CATEGORY_COLORS = [
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#8B5CF6', // Purple
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F43F5E', // Rose
]

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

  return Object.values(map)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => {
      const d = new Date(item.date)
      const formattedDate = isNaN(d.getTime())
        ? item.date
        : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      return { ...item, formattedDate }
    })
}

function aggregateByCategory(transactions) {
  const map = {}
  let totalExpense = 0

  transactions.forEach((t) => {
    if (t.type !== 'expense') return
    const amt = Number(t.amount) || 0
    if (amt <= 0) return
    const cat = t.category || 'Other'
    map[cat] = (map[cat] || 0) + amt
    totalExpense += amt
  })

  return Object.entries(map)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpense > 0 ? ((value / totalExpense) * 100).toFixed(1) : 0,
    }))
    .sort((a, b) => b.value - a.value)
}

function aggregateByMonth(transactions) {
  const map = {}
  transactions.forEach((t) => {
    if (!t?.date) return
    const d = new Date(t.date)
    if (isNaN(d.getTime())) return
    const m = d.toISOString().slice(0, 7) // YYYY-MM
    if (!map[m]) map[m] = { month: m, total: 0, income: 0, expense: 0 }
    const amt = Number(t.amount) || 0
    if (t.type === 'income') {
      map[m].income += amt
      map[m].total += amt
    } else {
      map[m].expense += amt
      map[m].total -= amt
    }
  })

  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => {
      const [year, month] = item.month.split('-')
      const d = new Date(Number(year), Number(month) - 1, 1)
      const formattedMonth = isNaN(d.getTime())
        ? item.month
        : d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })
      return { ...item, formattedMonth }
    })
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-lg text-slate-900 text-xs space-y-1.5 min-w-[140px]">
        <p className="font-semibold text-slate-700 border-b border-slate-100 pb-1">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="capitalize text-slate-600 font-medium">{entry.name}:</span>
            </div>
            <span className="font-bold text-slate-900">
              ₹{Number(entry.value).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const formatYAxis = (val) => {
  if (Math.abs(val) >= 100000) return `₹${(val / 1000).toFixed(0)}k`
  if (Math.abs(val) >= 1000) return `₹${(val / 1000).toFixed(1)}k`
  return `₹${val}`
}

const TransactionsCharts = ({ transactions = [] }) => {
  const daily = useMemo(() => aggregateByDate(transactions), [transactions])
  const byCategory = useMemo(() => aggregateByCategory(transactions), [transactions])
  const byMonth = useMemo(() => aggregateByMonth(transactions), [transactions])

  const totalExpenseSum = useMemo(() => {
    return byCategory.reduce((sum, item) => sum + item.value, 0)
  }, [byCategory])

  if (!transactions.length) {
    return (
      <div className="p-8 text-center text-slate-500 rounded-2xl bg-slate-50 border border-slate-200">
        No transaction data available to render charts.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Line Chart: Income vs Expense Over Time */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Income vs Expense Trend</h3>
            <p className="text-xs text-slate-500">Daily financial trajectory</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Income
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Expense
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={daily} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10B981"
                strokeWidth={2.5}
                fill="none"
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF' }}
              />
              <Area
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#F43F5E"
                strokeWidth={2.5}
                fill="none"
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid for Pie Chart & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses by Category (Donut Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">Expenses by Category</h3>
            <p className="text-xs text-slate-500">Distribution of spending</p>
          </div>

          {byCategory.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm py-12">
              No expense transactions logged yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center flex-1">
              <div className="h-[220px] w-full min-w-0 min-h-0 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie
                      data={byCategory}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      cornerRadius={6}
                    >
                      {byCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    ₹{totalExpenseSum.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {byCategory.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                        }}
                      />
                      <span className="font-medium text-slate-700 truncate">{item.name}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-slate-900 block">
                        ₹{item.value.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Net Monthly Balance (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">Net Monthly Balance</h3>
            <p className="text-xs text-slate-500">Monthly net balance (Income - Expense)</p>
          </div>

          <div className="h-[220px] w-full min-w-0 min-h-0 flex-1">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={byMonth} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="formattedMonth"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={formatYAxis}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" name="Net Balance" radius={[6, 6, 0, 0]}>
                  {byMonth.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={entry.total >= 0 ? '#10B981' : '#F43F5E'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsCharts
