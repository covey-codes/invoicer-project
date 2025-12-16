import { z } from "zod";

export interface Item {
  name: string;
  price: string;
  quantity: string;
}

export interface InvoiceConfig {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  customerName: string;
  customerAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate?: string;
  discount: string;
  vat: string;
  items: Item[];
  thankYouMessage?: string;
  logoBase?: string;
}

export const receiptSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  companyPhone: z.string().min(1, "Company phone is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerAddress: z.string().min(1, "Customer address is required"),
  invoiceNumber: z.string().optional(),
  invoiceDate: z.string().optional(),
  discount: z.string().optional(),
  vat: z.string().optional(),
  thankYouMessage: z.string().optional(),
  items: z
    .array(
      z.object({
        name: z.string().min(1, "Item name is required"),
        price: z.string().min(1, "Price is required"),
        quantity: z.string().min(1, "Quantity is required"),
      })
    )
    .min(1, "At least one item is required"),
});

export type ReceiptFormData = z.infer<typeof receiptSchema>;