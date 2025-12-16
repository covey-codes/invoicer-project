import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Card } from "@/shared/components/ui/card";
import Navbar from "@/landing/components/Navbar";
import { useFinancialReporting } from "../hooks/useFinancialReporting";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const FinancialReportingPage = () => {
  const {
    transactions,
    totalIncome,
    totalExpense,
    netProfit,
    pieData,
    lineData,
  } = useFinancialReporting();

  return (
    <><Navbar></Navbar><div className="max-w-7xl mt-[-20] mx-auto p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3"> Financial Reporting</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="p-4 shadow-lg rounded-xl bg-blue-50">
                  <h2 className="text-lg font-semibold text-blue-700">Total Income</h2>
                  <p className="text-2xl font-bold text-blue-800">₦{totalIncome.toLocaleString()}</p>
              </Card>
              <Card className="p-4 shadow-lg rounded-xl bg-red-50">
                  <h2 className="text-lg font-semibold text-red-700">Total Expenses</h2>
                  <p className="text-2xl font-bold text-red-800">₦{totalExpense.toLocaleString()}</p>
              </Card>
              <Card className="p-4 shadow-lg rounded-xl bg-green-50">
                  <h2 className="text-lg font-semibold text-green-700">Net Profit</h2>
                  <p className="text-2xl font-bold text-green-800">₦{netProfit.toLocaleString()}</p>
              </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">📈 Income vs. Expenses</h3>
                  <Line data={lineData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">🧾 Expense Breakdown</h3>
                  <Pie data={pieData} />
              </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700"> Recent Transactions</h3>
              <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                      <thead>
                          <tr className="border-b">
                              <th className="py-2 px-4 font-medium text-gray-600">Date</th>
                              <th className="py-2 px-4 font-medium text-gray-600">Type</th>
                              <th className="py-2 px-4 font-medium text-gray-600">Category</th>
                              <th className="py-2 px-4 font-medium text-gray-600">Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                          {transactions.map((t, idx) => (
                              <tr key={idx} className="border-b hover:bg-gray-50">
                                  <td className="py-2 px-4">{t.date}</td>
                                  <td className="py-2 px-4 capitalize text-sm">
                                      {t.type === "income" ? (
                                          <span className="text-blue-600">Income</span>
                                      ) : (
                                          <span className="text-red-500">Expense</span>
                                      )}
                                  </td>
                                  <td className="py-2 px-4">{t.category || "—"}</td>
                                  <td className="py-2 px-4 font-medium">₦{t.amount.toLocaleString()}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div></>
  );
};

export default FinancialReportingPage;
