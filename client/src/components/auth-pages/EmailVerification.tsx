import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  ArrowLeft,
  Code2,
  Database,
  Mail,
  RefreshCw,
  Zap,
  Loader2,
} from "lucide-react";

interface EmailVerificationProps {
  email: string;
  onBack: () => void;
  onResend: () => Promise<void>;
  loading: boolean;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onBack,
  onResend,
  loading,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Code2 className="absolute top-8 left-8 h-32 w-32 text-blue-200/20 animate-pulse" />
        <Database
          className="absolute bottom-12 right-16 h-28 w-28 text-indigo-200/25 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <Zap
          className="absolute top-16 right-12 h-20 w-20 text-purple-200/30 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Card className="relative max-w-md w-full bg-white/70 backdrop-blur-xl shadow-2xl border border-white/20">
        <CardContent className="relative p-8">
          <div className="absolute top-4 left-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </Button>
          </div>

          <div className="text-center space-y-4 mb-8 mt-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-sm text-slate-600">
                We've sent a verification link to
              </p>
              <p className="text-sm font-semibold text-blue-600">{email}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/30">
              <p className="text-sm text-slate-700 leading-relaxed">
                Click the verification link in your email to activate your
                account. The link will expire in 24 hours.
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-600 mb-4">
                Didn't receive the email? Check your spam folder or
              </p>
              <Button
                onClick={onResend}
                disabled={loading}
                variant="outline"
                className="w-full h-11 rounded-xl font-semibold border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Resend Verification Email
                  </div>
                )}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-500">
              Having trouble? Contact our support team
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
