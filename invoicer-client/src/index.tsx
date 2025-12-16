import Navbar from "@/landing/components/Navbar";
import HeroSection from "@/landing/components/HeroSection";
import { motion } from "framer-motion";
import FeaturesSection from "./landing/components/Features";
import TestimonialsSection from "./landing/components/TestimonialsSection";
import FAQSection from "./landing/components/FAQSection";
import CTASection from "./landing/components/CTASection";
import Footer from "./landing/components/Footer";

export const LandingPage = () => {
  return (
    <motion.div>
      <Navbar /> 
        <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
        <FAQSection />
        <CTASection />
      <Footer /> 
    </motion.div>
  );
};
