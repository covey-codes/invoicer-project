import { useState } from "react";

const mockData = [
  { date: "2025-05-01", type: "income", amount: 80000 },
  { date: "2025-05-02", type: "expense", category: "Marketing", amount: 20000 },
  { date: "2025-05-03", type: "expense", category: "Salaries", amount: 30000 },
  { date: "2025-05-04", type: "income", amount: 50000 },
  { date: "2025-05-05", type: "expense", category: "Misc", amount: 10000 },
];

export const useFinancialReporting = () => {
  const [transactions] = useState(mockData);

  const incomeData = transactions
    .filter((t) => t.type === "income")
    .map((t) => ({ date: t.date, amount: t.amount }));

  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .map((t) => ({ date: t.date, amount: t.amount }));

  const totalIncome = incomeData.reduce((acc, cur) => acc + cur.amount, 0);
  const totalExpense = expenseData.reduce((acc, cur) => acc + cur.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc: Record<string, number>, curr) => {
      const cat = curr.category || "Misc";
      acc[cat] = (acc[cat] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: ["#F87171", "#60A5FA", "#FBBF24", "#34D399"],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: "Income",
        data: transactions.map((t) => (t.type === "income" ? t.amount : 0)),
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.3,
      },
      {
        label: "Expense",
        data: transactions.map((t) => (t.type === "expense" ? t.amount : 0)),
        fill: false,
        borderColor: "#EF4444",
        tension: 0.3,
      },
    ],
  };

  return {
    transactions,
    totalIncome,
    totalExpense,
    netProfit,
    pieData,
    lineData,
  };
};
