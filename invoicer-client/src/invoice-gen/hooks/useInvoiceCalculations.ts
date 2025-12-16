import { InvoiceConfig } from "@/invoice-gen/constants/invoice";

export const useInvoiceCalculations = (config?: InvoiceConfig) => {
  const calculateSubtotal = () => {
    if (!config?.items) return 0;
    return config.items.reduce(
      (sum, item) =>
        sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = config ? Number(config.discount) || 0 : 0;
    const vat = config ? Number(config.vat) || 0 : 0;
    const discountAmount = (subtotal * discount) / 100;
    const vatAmount = ((subtotal - discountAmount) * vat) / 100;
    return subtotal - discountAmount + vatAmount;
  };

  const formatCurrency = (amount: number) => {
    return `NGN ${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return { calculateSubtotal, calculateTotal, formatCurrency };
};
