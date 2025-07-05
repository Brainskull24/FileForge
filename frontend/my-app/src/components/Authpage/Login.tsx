import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { auth, googleProvider, githubProvider } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import {
  Code2,
  Mail,
  Github,
  Zap,
  Database,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Sparkles,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const res = await api.post(endpoint, { email, password });

      const data = res.data;
      console.log("Success:", data);

      localStorage.setItem("token", data.token);
      navigate("/convertor");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // const handleSocial = async (providerName: string) => {
  //   setLoading(true);
  //   try {
  //     const provider = providerName === "Google" ? googleProvider : githubProvider;
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  
  //     const res = await fetch("/api/auth/social-login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email: user.email,
  //         provider: providerName,
  //       }),
  //     });
  
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message);
  //     console.log("Social login success:", data);
  
  //   } catch (err: any) {
  //     alert(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleSocial = async (providerName: string) => {
    setLoading(true);
    try {
      const provider = providerName === "Google" ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("Firebase user:", user);
      localStorage.setItem("user", JSON.stringify({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        uid: user.uid,
        provider: providerName,
      }));
  
      // Navigate directly
      navigate("/convertor");
  
    } catch (err: any) {
      alert(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };


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
          {/* Back to Homepage Button */}
          <div className="absolute top-4 left-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Button>
          </div>

          {/* Enhanced Header */}
          <div className="text-center space-y-3 mb-8 mt-8">
            {/* Icon + Name Inline */}

            <div className="flex items-center justify-center gap-2">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">FileForge</h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm text-slate-600/80 font-medium">
              {mode === "login"
                ? "Welcome back! Please sign in to your account"
                : "Create your account and start your journey"}
            </p>
          </div>

          {/* Enhanced Tabs */}
          <Tabs
            value={mode}
            onValueChange={(v) => setMode(v as any)}
            className="mb-8"
          >
            <TabsList className="bg-slate-100/80 backdrop-blur-sm rounded-xl p-1.5 shadow-inner grid grid-cols-2 border border-white/20">
              <TabsTrigger
                value="login"
                className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 transition-all duration-300 rounded-lg"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 transition-all duration-300 rounded-lg"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
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
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-slate-200/60 bg-white/50 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500/20 focus:bg-white/80 transition-all duration-300 placeholder:text-slate-400 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating Account..."}
                </div>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Enhanced Separator */}
          <div className="my-8 flex items-center">
            <Separator className="flex-1 bg-slate-200/60" />
            <span className="px-4 text-sm text-slate-500 font-medium bg-white/50 rounded-full">
              or continue with
            </span>
            <Separator className="flex-1 bg-slate-200/60" />
          </div>

          {/* Enhanced Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocial("Google")}
              className="h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 border-slate-200/60 bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:border-red-200 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              disabled={loading}
            >
              <Mail className="h-5 w-5 text-red-500" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocial("GitHub")}
              className="h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 border-slate-200/60 bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              disabled={loading}
            >
              <Github className="h-5 w-5" />
              GitHub
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    Log In
                  </button>
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
