import { Menu, X, ChevronDown, FileText, Users, BarChart2 } from "lucide-react";
import { useNavbar } from "@/landing/hooks/navhooks";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const mockUser = {
  name: "Kelvin",
  avatar: "",
};

const Navbar = () => {
  const { isMenuOpen, toggleMenu, setIsMenuOpen, menuRef, iconRef } = useNavbar();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [user] = useState(mockUser);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
      setIsMobileFeaturesOpen(false);
      setIsUserMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    navigate("/signin");
  };

  return (
    <nav className="relative lg:w-[100%] mt-5 mx-4 lg:mx-20 bg-[#03192F] rounded-2xl py-4 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <span className="text-2xl text-white font-extrabold">
            Invoicer-Client
          </span>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-white hover:text-indigo-400">
              Home
            </Link>

            <div className="relative group">
              <div className="text-white flex items-center gap-1 cursor-pointer">
                Features <ChevronDown size={16} />
              </div>

              <div className="absolute top-10 left-0 w-64 bg-white rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <Link to="/invoiceForm" className="flex gap-3 px-4 py-2 hover:bg-gray-100">
                  <FileText size={16} /> Smart Invoicing
                </Link>
                <Link to="/clientManagement" className="flex gap-3 px-4 py-2 hover:bg-gray-100">
                  <Users size={16} /> Client Management
                </Link>
                <Link to="/financialReporting" className="flex gap-3 px-4 py-2 hover:bg-gray-100">
                  <BarChart2 size={16} /> Financial Reporting
                </Link>
              </div>
            </div>

            <Link to="/pricing" className="text-white hover:text-indigo-400">
              Pricing
            </Link>

            <Link to="/support" className="text-white hover:text-indigo-400">
              Support
            </Link>
          </div>

          <div className="md:hidden">
            <button ref={iconRef} onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-1/2 bg-[#03192F] p-6 z-50 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-1 text-white">

<Link
  to="/dashboard"
  className="block px-4 py-3 border-t border-b border-white/20"
  onClick={() => setIsMenuOpen(false)}
>
  Home
</Link>

<button
  onClick={() => setIsMobileFeaturesOpen((p) => !p)}
  className="w-full text-left px-4 py-3 border-t border-b border-white/20 flex items-center justify-between"
>
  Features <ChevronDown size={16} />
</button>

{isMobileFeaturesOpen && (
  <div className="text-sm">
    <Link
      to="/invoiceForm"
      className="block px-6 py-3 border-b border-white/20"
    >
      Smart Invoicing
    </Link>
    <Link
      to="/clientManagement"
      className="block px-6 py-3 border-b border-white/20"
    >
      Client Management
    </Link>
    <Link
      to="/financialReporting"
      className="block px-6 py-3 border-b border-white/20"
    >
      Financial Reporting
    </Link>
  </div>
)}

<Link
  to="/pricing"
  className="block px-4 py-3 border-t border-b border-white/20"
>
  Pricing
</Link>

<Link
  to="/support"
  className="block px-4 py-3 border-t border-b border-white/20"
>
  Support
</Link>

<Link
  to="/profile"
  className="block px-4 py-3 border-t border-b border-white/20"
>
  Profile
</Link>

{/* LOGOUT */}
{isAuthenticated && (
  <button
    onClick={handleLogout}
    className="w-full mt-6 px-4 py-3 text-red-400 border-t border-red-500"
  >
    Logout
  </button>
)}
</div>

      </div>
    </nav>
  );
};

export default Navbar;
