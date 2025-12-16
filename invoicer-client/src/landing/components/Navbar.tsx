import { Button } from "@/shared/components/ui/button";
import { Menu, X, ChevronDown, FileText, Users, BarChart2 } from "lucide-react";
import { useNavbar } from "@/landing/hooks/navhooks";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isMenuOpen, toggleMenu, setIsMenuOpen, menuRef, iconRef } = useNavbar();
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
      setIsMobileFeaturesOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsMenuOpen]);

  return (
    <nav className="relative lg:w-[90%] mt-5 mx-4 lg:mx-20 bg-[#03192F] rounded-2xl py-4 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-2xl text-white font-extrabold gradient-text">
              Invoicer-Client
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="no-underline">
              <div className="text-white hover:text-indigo-400 text-sm font-medium cursor-pointer">
                Home
              </div>
            </Link>

            <div className="relative group">
              <div className="text-white hover:text-indigo-400 text-sm font-medium flex items-center gap-1 cursor-pointer">
                Features <ChevronDown size={16} />
              </div>
              <div className="absolute top-10 left-0 w-64 bg-white rounded-lg shadow-lg z-50 p-2 flex flex-col gap-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/invoiceForm" className="no-underline">
                  <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 hover:text-indigo-600 cursor-pointer">
                    <FileText size={16} /> Smart Invoicing
                  </div>
                </Link>
                <Link to="/clientManagement" className="no-underline">
                  <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 hover:text-indigo-600 cursor-pointer">
                    <Users size={16} /> Client Management
                  </div>
                </Link>
                <Link to="/financialReporting" className="no-underline">
                  <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 hover:text-indigo-600 cursor-pointer">
                    <BarChart2 size={16} /> Financial Reporting
                  </div>
                </Link>
              </div>
            </div>

            <div className="text-white hover:text-indigo-400 text-sm font-medium cursor-pointer">
              Programs
            </div>
            <div className="text-white hover:text-indigo-400 text-sm font-medium cursor-pointer">
              Blogs
            </div>
            <Link to="/pricing" className="no-underline">
              <div className="text-white hover:text-indigo-400 text-sm font-medium cursor-pointer">
                Pricing
              </div>
            </Link>
          </div>

          <div className="hidden md:flex space-x-3">
            <Link to="/signin">
              <Button variant="outline" className="font-medium border-white/20 hover:bg-dark-accent text-slate-100">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              ref={iconRef}
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`fixed top-5 right-0 w-64 bg-[#03192F] rounded-lg shadow-xl p-4 space-y-2 z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link to="/dashboard" className="block text-white hover:text-indigo-400 text-base font-medium">
          Home
        </Link>

        <div>
          <button
            onClick={() => setIsMobileFeaturesOpen((prev) => !prev)}
            className="flex justify-between items-center w-full text-white text-base font-medium focus:outline-none"
          >
            <span>Features</span>
            <ChevronDown
              size={18}
              className={`transform transition-transform duration-200 ${
                isMobileFeaturesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMobileFeaturesOpen && (
            <div className="space-y-1 mt-1 pl-3">
              <Link to="/invoiceForm" className="block text-sm text-white hover:text-indigo-400">
                Smart Invoicing
              </Link>
              <Link to="/clientManagement" className="block text-sm text-white hover:text-indigo-400">
                Client Management
              </Link>
              <Link to="/financialReporting" className="block text-sm text-white hover:text-indigo-400">
                Financial Reporting
              </Link>
            </div>
          )}
        </div>

        <div className="block text-white hover:text-indigo-400 text-base font-medium">Programs</div>
        <div className="block text-white hover:text-indigo-400 text-base font-medium">Blogs</div>
        <Link to="/pricing" className="block text-white hover:text-indigo-400 text-base font-medium">
          Pricing
        </Link>

        <div className="pt-4 border-t border-white/10 space-x-3">
          <Link to="/signin">
            <Button variant="outline" className="w-20 font-medium border-white/20 text-white">
              Sign in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="w-20 font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
