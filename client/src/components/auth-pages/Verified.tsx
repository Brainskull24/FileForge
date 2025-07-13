import type React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, ArrowRight, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const VerificationSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const emailVerified = Cookies.get("email_verified");
    if (!emailVerified) {
      navigate("/404", { replace: true });
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <CheckCircle className="absolute top-8 left-8 h-32 w-32 text-green-200/20 animate-pulse" />
        <FileText className="absolute bottom-12 right-16 h-28 w-28 text-emerald-200/25 animate-bounce" />
      </div>

      <Card className="relative max-w-md w-full bg-white/70 backdrop-blur-xl shadow-2xl border border-white/20">
        <CardContent className="relative p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Header */}
          <div className="space-y-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Email Verified!
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Your email has been successfully verified. You can now access all
              features of FileForge.
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-green-50/50 rounded-lg p-4 border border-green-200/30 mb-8">
            <p className="text-sm text-green-700 font-medium">
              🎉 Welcome to FileForge! Your account is now active and ready to
              use.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link to="/login">
              <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-center gap-2">
                  Continue to Login
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>
            </Link>

            <Link to="/">
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-300 bg-transparent"
              >
                Back to Homepage
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <p className="text-xs text-slate-500">
              If you have any questions, feel free to contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationSuccess;
