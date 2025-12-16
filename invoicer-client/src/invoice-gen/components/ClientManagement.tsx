import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import Navbar from "@/landing/components/Navbar";
import { useClientManagement } from "../hooks/useClientManagement";

ChartJS.register(ArcElement, Tooltip, Legend);

const ClientManagementPage = () => {
  const {
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
  } = useClientManagement();

  const chartData = {
    labels: ["Expenses", "Invoices (Profit)"],
    datasets: [
      {
        data: [totalExpenses, totalInvoices],
        backgroundColor: ["#F87171", "#60A5FA"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <><Navbar /><div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Client Financial Overview
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Transaction</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Office Rent" />
            </div>

            {type === "expense" && (
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option>Miscellaneous</option>
                  <option>Office Rent</option>
                  <option>Supplies</option>
                  <option>Utilities</option>
                  <option>Marketing</option>
                </select>
              </div>
            )}

            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="expense">Expense</option>
                <option value="invoice">Invoice (Profit)</option>
              </select>
            </div>

            <Button className="w-full bg-amber-600 mt-2" onClick={handleAdd}>
              Add Entry
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Spending vs Profit</h2>
          <Pie data={chartData} />
          <div className="mt-6 text-sm text-gray-600">
            <div className="flex items-center mb-2">
              <span className="inline-block w-4 h-4 mr-2 bg-red-400 rounded-full" /> Expenses
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 mr-2 bg-blue-400 rounded-full" /> Invoices (Profit)
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">All Expenses</h3>
          <ul className="space-y-2">
            {expenses.map((item, index) => (
              <li key={index} className="bg-red-50 p-3 rounded-md shadow-sm">
                <div className="text-sm font-semibold text-red-700">
                  ₦{item.amount.toFixed(2)} - {item.description}
                </div>
                <div className="text-xs text-gray-500">Category: {item.category}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">All Invoices (Profit)</h3>
          <ul className="space-y-2">
            {invoices.map((item, index) => (
              <li key={index} className="bg-blue-50 p-3 rounded-md shadow-sm">
                <div className="text-sm font-semibold text-blue-700">
                  ₦{item.amount.toFixed(2)} - {item.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div></>
  );
};

export default ClientManagementPage;
