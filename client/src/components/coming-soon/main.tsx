import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Bell, CheckCircle, Sparkles, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import Header from "../home-page/Header";
import Footer from "../home-page/Footer";

interface ComingSoonProps {
  title: string;
  subtitle?: string;
  description: string;
  expectedDate?: string;
  features?: string[];
  backUrl?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

export function ComingSoon({
  title,
  description,
  expectedDate = "Coming Soon",
  features = [],
  gradient = "from-blue-600 to-purple-600",
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600">
              <FileText className=" h-16 w-16 text-white" />
            </div>

            <div className="space-y-4">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {expectedDate}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {title}
                <span
                  className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent block mt-2`}
                >
                  Coming Soon
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white/60 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${gradient} rounded-full`}
                        ></div>
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Email Signup */}
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Notified
              </h3>
              <p className="text-gray-600">
                Be the first to know when this feature launches
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex space-x-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button
                  type="submit"
                  className={`bg-gradient-to-r ${gradient} hover:opacity-90`}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  Thanks! We'll notify you when it's ready.
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-8 space-y-4">
            <p className="text-gray-600">
              Have questions about this feature?{" "}
              <NavLink
                to="/contact"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact us
              </NavLink>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
