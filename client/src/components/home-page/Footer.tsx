import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FileText,
  Linkedin,
  Mail,
  Instagram,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import api from "../../lib/axios";
import { useAuth } from "../../context/auth";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const handleSubscribe = async () => {
    if (!email) return;

    if (!user) {
      return toast.error("Not logged in", {
        description: "Please log in to subscribe.",
      });
    }

    if (email !== user.email) {
      return toast.error("Email mismatch", {
        description: "Please use the email associated with your account.",
      });
    }

    try {
      const res = await api.post("/marketing/subscribe", { email });
      toast.success("Subscribed!", {
        description: res.data.message || "You're now subscribed.",
      });
      setEmail("");
    } catch (err: any) {
      const description =
        err?.response?.data?.error || "Subscription failed.";
      toast.error("Newsletter Subscription failed", { description });
      setEmail("");
    }
  };

  const socialLinks = [
    {
      href: "https://www.linkedin.com/fileforge/",
      icon: <Linkedin className="h-5 w-5 hover:text-blue-600" />,
    },
    {
      href: "https://www.instagram.com/fileforge/",
      icon: <Instagram className="h-5 w-5 hover:text-pink-500" />,
    },
    {
      href: "https://www.youtube.com/fileforge",
      icon: <Youtube className="h-5 w-5 hover:text-red-500" />,
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Branding and social */}
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
            <div className="flex space-x-4 text-gray-400">
              {socialLinks.map(({ href, icon }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { name: "Base64 Tool", path: "/convertor" },
                { name: "Files Conversion", path: "/convertor" },
                { name: "Cloud Storage", path: "/cloud" },
                { name: "API Access", path: "/api-docs" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <a href={path} className="hover:text-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { name: "Help & Support", to: "/help" },
                { name: "Privacy Policy", to: "/policy" },
                { name: "Terms of Service", to: "/terms" },
                { name: "Contact Us", to: "/contact" },
              ].map(({ name, to }) => (
                <li key={name}>
                  <Link to={to} className="hover:text-white">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
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
              <Button size="sm" onClick={handleSubscribe}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} FileForge. All rights reserved. Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
