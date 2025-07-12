import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileText, Linkedin, Mail, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
import api from "../../lib/axios";
import { useAuth } from "../../context/auth";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!email) return;
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to subscribe.",
        variant: "destructive",
      });
      return;
    }
    if (email !== user.email) {
      toast({
        title: "Email mismatch",
        description: "Please use the email associated with your account.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/social/newsletter", { email });

      toast({
        title: "Subscribed!",
        description: res.data.message || "You're now subscribed.",
      });

      setEmail("");
    } catch (err: any) {
      if (err.response) {
        toast({
          title: "Error",
          description: err.response.data.error || "Subscription failed.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Network Error",
          description: "Try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">FileForge</span>
            </div>
            <p className="text-gray-400 mb-4">
              Universal file processing platform for developers and businesses.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/fileforge/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
              </a>

              <a
                href="https://www.instagram.com/fileforge/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              </a>

              <a
                href="https://www.youtube.com/fileforge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/convertor" className="hover:text-white">
                  Base64 Encoder
                </a>
              </li>
              <li>
                <a href="/convertor" className="hover:text-white">
                  File Converter
                </a>
              </li>
              <li>
                <a href="/cloud" className="hover:text-white">
                  Cloud Storage
                </a>
              </li>
              <li>
                <a href="/api/docs" className="hover:text-white">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/help" className="hover:text-white">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates and features.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button size="sm" onClick={handleSubscribe} disabled={loading}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} FileForge. All rights reserved.
            Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
