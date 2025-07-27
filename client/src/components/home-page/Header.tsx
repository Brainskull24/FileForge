import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import api from "../../lib/axios";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authType, logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      if (authType === "firebase") {
        await signOut(auth);
      } else if (authType === "custom") {
        await api.post("/auth/logout");
      }
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FileForge</h1>
              <p className="text-xs text-gray-500">Universal File Processing</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="/#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <Link
              to="/api-docs"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              API Docs
            </Link>
            <Link
              to="/cli"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              CLI
            </Link>
            {user ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/account")}
                >
                  Account
                </Button>
                <Button size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/login")}>
                  Sign Up
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <a href="#features" className="block py-2 text-gray-600">
              Features
            </a>
            <a href="#pricing" className="block py-2 text-gray-600">
              Pricing
            </a>
            <Link to="/api-docs" className="block py-2 text-gray-600">
              API Docs
            </Link>
            <Link to="/cli" className="block py-2 text-gray-600">
              CLI
            </Link>
            <div className="pt-2 space-y-2">
              {user ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/account")}
                  >
                    Account
                  </Button>
                  <Button size="sm" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="w-full">
                    Login
                  </Button>
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
