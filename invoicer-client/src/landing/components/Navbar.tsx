import { Button } from "@/shared/components/ui/button";
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

  const [user, setUser] = useState(mockUser);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
      setIsMobileFeaturesOpen(false);
      setIsUserMenuOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsAuthenticated(false);

    setIsUserMenuOpen(false);
    setIsMenuOpen(false);

    navigate("/signin");
  };

  return (
    <nav className="relative lg:w-[90%] mt-5 mx-4 lg:mx-20 bg-[#03192F] rounded-2xl py-4 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <span className="text-2xl text-white font-extrabold gradient-text">
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
          </div>

          {/* DESKTOP AUTH / USER */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div ref={profileMenuRef} className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-white"
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown size={16} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/signin">
                  <Button variant="outline" className="text-white">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button ref={iconRef} onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`fixed top-5 right-0 w-64 bg-[#03192F] p-4 transition-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="block text-white">
              Profile
            </Link>
            <button onClick={handleLogout} className="block text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="outline" className="w-full text-white">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
