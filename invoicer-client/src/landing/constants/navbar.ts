import { FilePlus2, ReceiptText, Wallet, BarChart2 } from "lucide-react";

export const featureLinks = [
  {
    path: "/create-invoice",
    label: "Create an Invoice ",
    icon: FilePlus2,
  },
  {
    path: "/track-expenses",
    label: "Track Your Expenses",
    icon: Wallet,
  },
  {
    path: "/generate-receipt",
    label: "Generate a Free Receipt",
    icon: ReceiptText,
  },
  {
    path: "/weekly-report",
    label: "Get Your Weekly Report",
    icon: BarChart2,
  },
];
