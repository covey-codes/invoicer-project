import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { InvoiceConfig } from "@/invoice-gen/constants/invoice";
import { useInvoiceCalculations } from "@/invoice-gen/hooks/useInvoiceCalculations";

export const useGeneratePDF = () => {
  const generatePDF = (config: InvoiceConfig) => {
    const { calculateSubtotal, calculateTotal, formatCurrency } =
      useInvoiceCalculations(config);

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40;
    const logoHeight = 20;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 10;

    if (config.logoBase) {
      try {
        const imgFormat = config.logoBase.startsWith("data:image/jpeg")
          ? "JPEG"
          : "PNG";
        doc.addImage(
          config.logoBase,
          imgFormat,
          logoX,
          logoY,
          logoWidth,
          logoHeight
        );
      } catch (error) {
        console.warn("Failed to render logo image:", error);
      }
    }

    const headerY = config.logoBase ? logoY + logoHeight + 10 : 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text("INVOICE", 160, headerY);
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const companyStartY = headerY + 10;
    doc.text(config.companyName, 20, companyStartY);
    if (config.companyAddress)
      doc.text(config.companyAddress, 20, companyStartY + 10);
    if (config.companyPhone)
      doc.text(config.companyPhone, 20, companyStartY + 20);

    const lineY = companyStartY + 30;
    doc.line(20, lineY, 190, lineY);

    doc.setFont("helvetica", "bold");
    const detailsStartY = lineY + 10;
    doc.text("RECEIVED BY", 20, detailsStartY);
    doc.text("RECEIPT DATE", 100, detailsStartY);
    doc.text("RECEIPT NO", 160, detailsStartY);

    doc.setFont("helvetica", "normal");
    doc.text(config.customerName, 20, detailsStartY + 10);
    if (config.customerAddress)
      doc.text(config.customerAddress, 20, detailsStartY + 20);
    doc.text(config.invoiceDate, 100, detailsStartY + 10);
    doc.text(config.invoiceNumber, 160, detailsStartY + 10);

    const tableColumn = [
      "#",
      "Item(s) and Description",
      "Qty",
      "Rate",
      "Amount",
    ];

    const tableRows = config.items.map((item, index) => {
      const quantity = parseFloat(item.quantity || "0") || 0;
      const rate = parseFloat(item.price || "0") || 0;
      const amount = quantity * rate;

      return [
        (index + 1).toString(),
        item.name,
        quantity.toString(),
        formatCurrency(rate),
        formatCurrency(amount),
      ];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: detailsStartY + 30,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    });

    let yPosition = (doc as any).lastAutoTable.finalY + 10;

    const subtotal = calculateSubtotal();
    const discount = parseFloat(config.discount || "0") || 0;
    const vat = parseFloat(config.vat || "0") || 0;
    const discountAmount = (subtotal * discount) / 100;
    const vatAmount = ((subtotal - discountAmount) * vat) / 100;
    const total = calculateTotal();

    const rowSpacing = 8;
    const labelX = 110;
    const amountX = 200;

    doc.text("Sub-total:", labelX, yPosition);
    doc.text(formatCurrency(subtotal), amountX, yPosition, { align: "right" });

    yPosition += rowSpacing;
    doc.text(`Discount (${discount}%):`, labelX, yPosition);
    doc.text(`-${formatCurrency(discountAmount)}`, amountX, yPosition, {
      align: "right",
    });

    yPosition += rowSpacing;
    doc.text(`VAT (${vat}%):`, labelX, yPosition);
    doc.text(formatCurrency(vatAmount), amountX, yPosition, { align: "right" });

    yPosition += rowSpacing + 5;
    doc.setFont("helvetica", "bold");
    doc.setFillColor(230, 230, 230);
    doc.rect(labelX, yPosition - 5, 90, 10, "F");
    doc.text("Total Paid [NGN]:", labelX, yPosition);
    doc.text(formatCurrency(total), amountX, yPosition, { align: "right" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      config.thankYouMessage ||
        `Thank you for choosing ${config.companyName || "us"}`,
      20,
      doc.internal.pageSize.height - 30
    );
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text("Powered by e/emie", 20, doc.internal.pageSize.height - 20);

    doc.save(`Receipt_${config.customerName}.pdf`);
  };

  return { generatePDF };
};
