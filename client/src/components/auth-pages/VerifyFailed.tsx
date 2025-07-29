import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  XCircle,
  RefreshCw,
  ArrowLeft,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const VerificationFailed: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResendForm, setShowResendForm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const emailVerified = Cookies.get("email_verified");
    if (!emailVerified || emailVerified !== "false") {
      navigate("/404", { replace: true });
    }
  }, []);

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/resend-verification", { email });
      toast.success("Verification email sent successfully! Please check your inbox.");
      setShowResendForm(false);
      setEmail("");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to resend email";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-pink-100 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <XCircle className="absolute top-8 left-8 h-32 w-32 text-red-200/20 animate-pulse" />
        <AlertTriangle className="absolute bottom-12 right-16 h-28 w-28 text-rose-200/25 animate-bounce" />
      </div>

      <Card className="relative max-w-md w-full bg-white/70 backdrop-blur-xl shadow-2xl border border-white/20">
        <CardContent className="relative p-8">
          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Auth</span>
              </Button>
            </Link>
          </div>

          <div className="text-center mt-8">
            {/* Error Icon */}
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>

            {/* Header */}
            <div className="space-y-3 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Verification Failed
              </h1>
              <p className="text-slate-600 leading-relaxed">
                The verification link is invalid or has expired. This could
                happen if:
              </p>
            </div>

            {/* Reasons */}
            <div className="bg-red-50/50 rounded-lg p-4 border border-red-200/30 mb-8 text-left">
              <ul className="text-sm text-red-700 space-y-2">
                <li>• The link has expired (links expire after 24 hours)</li>
                <li>• The link has already been used</li>
                <li>• The link was copied incorrectly</li>
              </ul>
            </div>

            {/* Resend Form or Button */}
            {!showResendForm ? (
              <div className="space-y-4">
                <Button
                  onClick={() => setShowResendForm(true)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Request New Verification Email
                  </div>
                </Button>

                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-300 bg-transparent"
                  >
                    Back to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleResendVerification} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-slate-200/60 bg-white/50 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500/20 focus:bg-white/80 transition-all duration-300 placeholder:text-slate-400"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending Email...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5" />
                        Send Verification Email
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowResendForm(false)}
                    className="w-full h-11 rounded-xl font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8">
              <p className="text-xs text-slate-500">
                Still having trouble? Contact our support team for assistance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationFailed;
