import { Crown, Settings } from "lucide-react";

export const pricingPlans = [
  {
    name: "Starter",
    price: "N0.00",
    period: "per month",
    description: "For freelancers and solo entrepreneurs",
    features: [
      "Create up to 20 invoices/month",
      "Basic expense tracking",
      "Email invoice delivery",
      "Custom invoice templates",
      "Download PDF invoices",
    ],
    cta: "Start for Free",
    highlighted: false,
    icon: Settings,
  },
  {
    name: "Pro",
    price: "N5,000.00",
    period: "per month",
    description: "Best for growing businesses",
    features: [
      "Unlimited invoices",
      "Income and expense analytics",
      "Recurring invoices",
      "Multiple currencies",
      "Client history tracking",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
    icon: Crown,
  },
  {
    name: "Enterprise",
    price: "N10,000.00",
    period: "per month",
    description: "For teams and finance departments",
    features: [
      "Everything in Pro",
      "Multi-user collaboration",
      "Custom branding",
      "Team access controls",
      "Advanced reporting",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
    icon: Settings,
  },
];
