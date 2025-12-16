import {
    Brain,
    FileText,
    Upload,
    FolderKanban,
    Award,
    Gift,
  } from "lucide-react";
  
  const features = [
    {
      name: "AI-Powered Invoicing",
      description:
        "Automatically generate professional invoices based on user inputs, past patterns, and business details — all with a single click.",
      icon: Brain,
    },
    {
      name: "Multi-Format Uploads",
      description:
        "Upload receipts, payment proofs, or expense docs in PDF or image format — our AI extracts and organizes key info instantly.",
      icon: Upload,
    },
    {
      name: "Smart Organization",
      description:
        "Tag and sort your invoices by clients, categories, or dates, and easily filter historical records for quick insights.",
      icon: FolderKanban,
    },
    {
      name: "Auto-Summarized Reports",
      description:
        "Turn your transaction data into readable summaries showing income, expenses, and profitability in real time.",
      icon: FileText,
    },
    {
      name: "Premium Power Tools",
      description:
        "Unlock powerful features like tax breakdowns, multi-currency invoicing, and scheduled recurring invoices.",
      icon: Award,
    },
    {
      name: "Referral Bonuses",
      description:
        "Earn credits and premium access when you refer clients or business owners to join the platform.",
      icon: Gift,
    },
  ];
  
  export default features;