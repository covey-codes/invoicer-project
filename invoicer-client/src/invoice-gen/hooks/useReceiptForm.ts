import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { receiptSchema, type ReceiptFormData, type InvoiceConfig } from "@/invoice-gen/constants/invoice";

export const useReceiptForm = (logoBase: string | undefined) => {
  const [invoiceConfig, setInvoiceConfig] = useState<InvoiceConfig | null>(null);
  

  const form = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      companyName: "",
      companyAddress: "",
      companyPhone: "",
      customerName: "",
      customerAddress: "",
      invoiceNumber: "",
      invoiceDate: "",
      discount: "",
      vat: "",
      thankYouMessage: "",
      items: [{ name: "", price: "", quantity: "" }],
    },
  });

  const onSubmit = (data: ReceiptFormData) => {
    const config: InvoiceConfig = {
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyPhone: data.companyPhone,
      customerName: data.customerName,
      customerAddress: data.customerAddress,
      invoiceNumber: data.invoiceNumber || "",
      invoiceDate: data.invoiceDate || "",
      discount: data.discount || "0",
      vat: data.vat || "0",
      thankYouMessage: data.thankYouMessage || "",
      items: data.items,
      dueDate: undefined,
      logoBase: logoBase || "", 
    };
    setInvoiceConfig(config);
  };

  return { form, onSubmit, invoiceConfig };
};
