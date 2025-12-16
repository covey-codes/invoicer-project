import { useState } from "react";
import { InvoiceConfig } from "@/invoice-gen/constants/invoice";
import { useGeneratePDF } from "@/invoice-gen/hooks/useGeneratePDF";

interface InvoiceGeneratorProps {
  config?: InvoiceConfig;
}

export const InvoiceGenerator = ({ config }: InvoiceGeneratorProps) => {
  const { generatePDF } = useGeneratePDF();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!config) {
      alert("No receipt configuration provided!");
      return;
    }
    setIsGenerating(true);
    try {
      generatePDF(config);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl mb-4 font-bold">Receipt Generator</h2>
      <button
        onClick={handleGenerate}
        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-[20px] w-full disabled:opacity-50"
        disabled={!config || isGenerating}
      >
        {isGenerating ? "Generating..." : "Download Receipt"}
      </button>
    </div>
  );
};