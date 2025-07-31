import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/auth-pages/Login";
import Homepage from "./components/home-page/main";
import PricingPage from "./components/pricing-section/main";
import { UniversalConverterDashboard } from "./components/universal-convertor/main";
import AccountSettings from "./components/user-account/main";
import SecurityPrivacyPage from "./components/privacy-policy/main";
import TermsOfService from "./components/terms-of-service/main";
import ContactSupportPage from "./components/contact-page/main";
import CloudIntegrationPage from "./components/cloud-integration/coming-soon";
import CLIDocsPage from "./components/cli-tool/coming-soon";
import ForgotPasswordPage from "./components/auth-pages/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import VerificationFailed from "./components/auth-pages/VerifyFailed";
import VerificationSuccess from "./components/auth-pages/Verified";
import ResetPasswordPage from "./components/auth-pages/ResetPassword";
import APIDocsComingSoon from "./components/api-docs/coming-soon";
import NotFound from "./components/not-found/main";
import { Toaster } from "sonner";
import { useAuth } from "./context/auth";
import { Loader2 } from "lucide-react";

function App() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/verify-failed" element={<VerificationFailed />} />
        <Route path="/verified" element={<VerificationSuccess />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route
          path="/convertor"
          element={
            <ProtectedRoute>
              <UniversalConverterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cloud"
          element={
            <ProtectedRoute>
              <CloudIntegrationPage />
            </ProtectedRoute>
          }
        />

        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/policy" element={<SecurityPrivacyPage />} />
        <Route path="/api-docs" element={<APIDocsComingSoon />} />
        <Route path="/contact" element={<ContactSupportPage />} />
        <Route path="/cli" element={<CLIDocsPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
