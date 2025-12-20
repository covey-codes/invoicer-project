import { Button } from "@/shared/components/ui/button";
import { TrendingUp, File, PiggyBank, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import hero from "@/assets/dashboard.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 mt-[70px]">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold font-clash text-dark-text tracking-tight leading-tight">
              Built To Take Your Business From Surviving To{" "}
              <span className="bg-clip-text text-purple-900">
                Booming
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-dark-muted opacity-90">
              Easily manage your bookkeeping, send invoices quickly, and seamlessly connect with customers.
            </p>

            <div className="mt-8 flex justify-center items-center md:justify-start">
              <Link to="/invoiceForm">
                <Button
                  variant="outline"
                  className="bg-[#03192F] text-white px-15 py-8 text-base font-semibold rounded-2xl transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Quick Invoice
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full mt-10">
            <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src={hero}
                alt="App dashboard preview"
                className="w-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-30 text-center">
          <div className="flex justify-center mb-4 animate-pulse">
            <Globe size={80} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-dark-text">
            Transform your business from a small brand to a global force.
          </h2>
          <p className="mt-6 text-lg font-medium text-dark-muted">Here's what that looks like:</p>
        </div>

        <div className="mt-16">
  <div className="flex overflow-x-auto space-x-4 md:hidden px-2">
    {[
      { icon: PiggyBank, title: "Increased Revenue" },
      { icon: TrendingUp, title: "Greater Impact" },
      { icon: File, title: "More Job Opportunities" },
    ].map((feature, index) => (
      <div
        key={index}
        className="min-w-[80%] flex-shrink-0 backdrop-blur-lg bg-white/10 border border-white/20 shadow-md rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#03192F] text-white mb-4 animate-glow">
          <feature.icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-dark-text">{feature.title}</h3>
      </div>
    ))}
  </div>

  <div className="hidden md:grid grid-cols-3 gap-8">
    {[
      { icon: PiggyBank, title: "Increased Revenue" },
      { icon: TrendingUp, title: "Greater Impact" },
      { icon: File, title: "More Job Opportunities" },
    ].map((feature, index) => (
      <div
        key={index}
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-md rounded-2xl p-10 text-center transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#03192F] text-white mb-4 animate-glow">
          <feature.icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-dark-text">{feature.title}</h3>
      </div>
    ))}
  </div>
</div>

      </div>
    </section>
  );
};

export default HeroSection;
