import { useState } from "react";

export type Expense = {
  amount: number;
  description: string;
  category: string;
};

export const useClientManagement = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [invoices, setInvoices] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Miscellaneous");

  const handleAdd = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && description.trim()) {
      const entry = { amount: num, description, category };
      if (type === "expense") setExpenses([...expenses, entry]);
      else setInvoices([...invoices, entry]);
      setAmount("");
      setDescription("");
      setCategory("Miscellaneous");
    }
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalInvoices = invoices.reduce((sum, item) => sum + item.amount, 0);

  return {
    expenses,
    invoices,
    amount,
    description,
    type,
    category,
    setAmount,
    setDescription,
    setType,
    setCategory,
    handleAdd,
    totalExpenses,
    totalInvoices,
  };
};
