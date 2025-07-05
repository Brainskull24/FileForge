import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Code2, Mail, Zap, Database, Shield, Sparkles, ArrowLeft, FileText, Loader2, CheckCircle } from "lucide-react"

const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setEmailSent(true)
    }, 2000)
  }

  const handleBackToLogin = () => {
    // Navigate back to login page
    window.location.href = "/login"
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 overflow-hidden">
      {/* Animated Background Elements */}
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
        <Shield
          className="absolute bottom-20 left-16 h-24 w-24 text-cyan-200/20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <Sparkles
          className="absolute top-1/3 left-1/4 h-16 w-16 text-pink-200/25 animate-bounce"
          style={{ animationDuration: "4s" }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Enhanced Glassmorphic Card */}
      <Card className="relative max-w-md w-full bg-white/70 backdrop-blur-xl shadow-2xl border border-white/20 transition-all duration-500 hover:shadow-3xl hover:bg-white/75">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg" />
        <CardContent className="relative p-8">
          {/* Back to Login Button */}
          <div className="absolute top-4 left-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToLogin}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Login</span>
            </Button>
          </div>

          {!emailSent ? (
            <>
              {/* Enhanced Header */}
              <div className="text-center space-y-3 mb-8 mt-8">
                {/* Icon + Name Inline */}
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-900">FileForge</h1>
                </div>

                {/* Title and Subtitle */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
                  <p className="text-sm text-slate-600/80 font-medium">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>
              </div>

              {/* Enhanced Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
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

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Reset Link...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Send Reset Link
                    </div>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center space-y-6 mt-8">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                </div>

                {/* Icon + Name Inline */}
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-indigo-600" />
                  <h1 className="text-3xl font-bold text-gray-900">FileForge</h1>
                </div>

                {/* Success Message */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600 font-medium">We've sent a password reset link to:</p>
                    <p className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">{email}</p>
                    <p className="text-xs text-slate-500">
                      If you don't see the email, check your spam folder or try again with a different email address.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleBackToLogin}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Back to Login
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmailSent(false)
                      setEmail("")
                    }}
                    className="w-full h-12 rounded-xl font-semibold text-sm border-slate-200/60 bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Try Different Email
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
