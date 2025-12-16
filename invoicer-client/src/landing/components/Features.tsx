import { useEffect, useState } from "react";
import features from "@/landing/constants/features";

const FeaturesSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState(features);

  useEffect(() => {
    const updateFeatures = () => {
      const isSmallScreen = window.innerWidth < 768; 
      setVisibleFeatures(isSmallScreen ? features.slice(0, 3) : features);
    };

    updateFeatures(); 
    window.addEventListener("resize", updateFeatures); 

    return () => window.removeEventListener("resize", updateFeatures);
  }, []);

  return (
    <div id="features" className="py-16 sm:py-24 bg-dark-background relative">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-mesh-gradient opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/70 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/70 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
            Features
          </h2>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold gradient-text leading-tight">
            Ready To Ring in Huge Capital
          </p>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-dark-muted mx-auto opacity-90">
            Our platform is designed to help you master new skills faster and more effectively by helping you manage and track your expenses.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFeatures.map((feature) => (
              <div
                key={feature.name}
                className="relative p-6 glass-card rounded-lg hover:shadow-lg transition-all overflow-hidden group"
              >
                <div>
                  <div className="absolute h-12 w-12 rounded-md bg-[#03192F] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg md:text-xl font-bold text-dark-text mb-2">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-dark-muted opacity-90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
