import Navbar from "@/landing/components/Navbar";
import { Button } from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useReceiptFormFields } from "../constants/useFieldArray";
import { useReceiptForm } from "@/invoice-gen/hooks/useReceiptForm";
import { InvoiceGenerator } from "@/invoice-gen/components/InvoiceGenerator";
import { UploadCloud, PlusCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const InvoiceForm = () => {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { form, onSubmit, invoiceConfig } = useReceiptForm(logoPreview || undefined);
  const { fields, append, remove } = useReceiptFormFields(form.control);

  const [invoiceList, setInvoiceList] = useState<any[]>([]);

  const handleSubmit = (data: any) => {
    const id = crypto.randomUUID(); 
    const newInvoice = { ...data, id, logo: logoPreview };

    setInvoiceList((prev) => [...prev, newInvoice]);
    onSubmit(data); 
  };

  const handleViewInvoice = (invoice: any) => {
    navigate(`/invoice/${invoice.id}`, { state: { invoice } });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-[10px] px-4 md:px-10 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Create a Receipt</h1>
          <p className="text-gray-600 mt-2 text-lg">Fill in the details to generate a sleek, professional receipt.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 w-full lg:w-1/2">
            <Label className="text-md font-medium mb-2 block">Company Logo</Label>
            <div
              className="w-full h-40 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => document.getElementById("logo")?.click()}
            >
              <UploadCloud className="w-6 h-6 mr-2" />
              Click to upload logo
            </div>
            <input
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setLogoPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {logoPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img src={logoPreview} alt="Company Logo" className="h-20 object-contain" />
              </div>
            )}
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 w-full lg:w-1/2">
            <h2 className="text-xl font-bold mb-4">Past Invoices</h2>
            {invoiceList.length === 0 ? (
              <p className="text-gray-500 text-sm">No saved invoices yet.</p>
            ) : (
              <ul className="grid gap-4 max-h-[200px] overflow-y-auto pr-2">
                {invoiceList.map((invoice) => (
                  <li
                    key={invoice.id}
                    className="border p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => handleViewInvoice(invoice)}
                  >
                    <p className="text-gray-700 font-semibold">Invoice #{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">
                      {invoice.companyName} ➝ {invoice.customerName}
                    </p>
                    <p className="text-sm text-gray-500">Date: {invoice.invoiceDate}</p>
                    <p className="text-sm text-gray-500">
                      Total: ₦
                      {invoice.items.reduce(
                        (acc: number, item: any) => acc + item.price * item.quantity,
                        0
                      ).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10 mt-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-20 rounded-xl shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
              <div>
                <Label>Company Name</Label>
                <Input className="mt-2" {...form.register("companyName")} />
              </div>
              <div>
                <Label>Address</Label>
                <Textarea className="mt-2" {...form.register("companyAddress")} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input className="mt-2" {...form.register("companyPhone")} />
              </div>
            </div>

            <div className="bg-white p-20 rounded-xl shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Customer Information</h2>
              <div>
                <Label>Name</Label>
                <Input className="mt-2" {...form.register("customerName")} />
              </div>
              <div>
                <Label>Address</Label>
                <Textarea className="mt-2" {...form.register("customerAddress")} />
              </div>
            </div>
          </div>

          <div className="bg-white p-20 rounded-xl shadow-sm grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Invoice Number</Label>
              <Input className="mt-2" {...form.register("invoiceNumber")} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" className="mt-2" {...form.register("invoiceDate")} />
            </div>
            <div>
              <Label>Discount (%)</Label>
              <Input type="number" className="mt-2" {...form.register("discount")} />
            </div>
            <div>
              <Label>VAT (%)</Label>
              <Input type="number" className="mt-2" {...form.register("vat")} />
            </div>
          </div>

          <div className="bg-white p-20 rounded-xl shadow-sm">
  <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
  {fields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end mb-4">
      <div className="sm:col-span-5">
        <Label>Item</Label>
        <Input placeholder="e.g., Product A" {...form.register(`items.${index}.name`)} />
      </div>
      <div className="sm:col-span-2">
        <Label>Price</Label>
        <Input type="number" {...form.register(`items.${index}.price`)} />
      </div>
      <div className="sm:col-span-2">
        <Label>Quantity</Label>
        <Input type="number" {...form.register(`items.${index}.quantity`)} />
      </div>
      <div className="sm:col-span-3 flex justify-end">
        <Button
          type="button"
          variant="destructive"
          className="mt-5"
          onClick={() => remove(index)}
        >
          <X className="w-4 h-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  ))}
  <Button
    type="button"
    onClick={() => append({ name: "", price: "", quantity: "" })}
    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
  >
    <PlusCircle className="w-4 h-4 mr-2" />
    Add Item
  </Button>
  <div className="text-right mt-6 text-lg font-semibold text-gray-700">
    Total: ₦
    {fields.reduce((acc, _item, idx) => {
      const price = parseFloat(form.getValues(`items.${idx}.price`) || "0");
      const quantity = parseFloat(form.getValues(`items.${idx}.quantity`) || "0");
      return acc + price * quantity;
    }, 0).toFixed(2)}
  </div>
</div>


          <div className="bg-white p-10 rounded-xl shadow-sm">
            <Label className="block text-md font-medium mb-2">Thank You Message</Label>
            <Textarea {...form.register("thankYouMessage")} placeholder="e.g., Thank you for your business!" />
          </div>

          <div className="text-right">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
              Generate Invoice
            </Button>
          </div>
        </form>

        {invoiceConfig && (
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
            <InvoiceGenerator config={invoiceConfig} />
          </div>
        )}
      </div>
    </>
  );
};
