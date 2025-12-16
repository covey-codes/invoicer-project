import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const storedInvoice = localStorage.getItem(`invoice-${id}`);
      if (storedInvoice) {
        setInvoice(JSON.parse(storedInvoice));
      }
    }
  }, [id]);

  const total =
    invoice?.items?.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    ) || 0;

  if (!invoice) return <p className="text-center mt-10">Loading invoice details...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Invoice Details</h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Invoice #{invoice.id}</h2>
            <p className="text-gray-500">{invoice.date}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              invoice.status === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {invoice.status}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-medium">Client</h3>
          <p>{invoice.clientName}</p>
          <p className="text-sm text-gray-500">{invoice.email}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Services</h3>
          <table className="w-full text-sm border-t border-gray-200">
            <thead>
              <tr className="text-left">
                <th className="py-2">Item</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item: any, i: number) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">₦{item.price.toLocaleString()}</td>
                  <td className="py-2 text-right">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <div className="text-right">
              <p className="font-semibold text-lg">
                Total: ₦{total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button variant="default">Download PDF</Button>
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
