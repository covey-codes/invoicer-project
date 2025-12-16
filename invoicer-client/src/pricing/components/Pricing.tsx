import Navbar from "@/landing/components/Navbar";
import Footer from "@/landing/components/Footer";
import PricingCard from "@/pricing/components/PricingCard";
import { pricingPlans } from "../constants/pricing";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh-gradient opacity-40 "></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"
          ></div>
        </div>

        <motion.div
          className="text-center"
        
        >
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-extrabold gradient-text sm:text-4xl">
            Choose the Perfect Plan
          </p>
          <p className="mt-4 text-lg text-dark-muted max-w-2xl mx-auto">
            All plans include a 7-day free trial with no credit card required.
            Cancel anytime.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
       
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </motion.div>

        <motion.div
         
        >
          <p className="text-dark-muted text-lg">
            Have questions about our pricing plans?
          </p>
          <Button variant="outline" className="mt-4 btn-outline">
            View FAQ
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
