import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileText, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "../../hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Subscribed!",
          description: data.message || "You're now subscribed.",
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: data.error || "Subscription failed.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Try again later.",
        variant: "destructive",
      });
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
                href="https://github.com/demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>

              <a
                href="https://twitter.com/demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>

              <a
                href="https://linkedin.com/in/demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
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
                <a href="/convertor" className="hover:text-white">
                  Batch Processing
                </a>
              </li>
              <li>
                <a href="/docs" className="hover:text-white">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/aboutus" className="hover:text-white">
                  About Us
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
